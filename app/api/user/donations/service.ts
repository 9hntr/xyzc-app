import { prisma } from "@/lib/prisma";

export const makeDonation = async ({
  targetId,
  name,
  message,
  amount,
}: {
  targetId: string;
  name: string;
  message: string;
  amount: number;
}) => {
  const newDonation = await prisma.donation.create({
    data: {
      amount,
      name,
      message,
      to: {
        connect: { id: targetId },
      },
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: targetId,
    },
    select: {
      donations: {
        orderBy: {
          createdAt: "desc",
        },
      },
      goalAmount: true,
    },
  });

  if (!user) throw new Error("User not found");

  const totalGains = user.donations.reduce(
    (acum, { amount }) => acum + amount,
    0
  );

  let totalProgress = 0;
  if (user.goalAmount) totalProgress = (totalGains * 100) / user.goalAmount;

  await Promise.all([
    prisma.user.update({
      where: {
        id: targetId,
      },
      data: {
        totalProgress,
        totalGains,
      },
    }),
    prisma.notification.create({
      data: {
        userId: targetId,
        message: `Received $${amount} from ${name?.length ? name : "someone"}`,
      },
    }),
  ]);

  return newDonation;
};

export const getDonations = async (
  username: string,
  skipDonations: number = 0
) => {
  const takeDefault = 3;

  const user = await prisma.user.findFirst({
    where: { username },
    include: {
      donations: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) throw new Error("User not found");

  return {
    donations: user.donations.slice(0, takeDefault + skipDonations),
    countDonations: user.donations.length,
  };
};
