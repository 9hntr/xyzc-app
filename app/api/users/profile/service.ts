import { prisma } from "@/lib/prisma";
import { singleCoffeePrice } from "@/lib/constants";

export const findUserByUsername = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: { username },
    include: {
      categories: true,
      socials: true,
      donations: {
        take: 3,
        orderBy: {
          amount: "desc",
        },
        select: {
          amount: true,
          name: true,
        },
      },
    },
  });

  if (!user) throw new Error("User not found");

  return {
    id: user.id,
    username: user.username,
    avatar: user.avatar,
    backgroundCover: user.backgroundCover,
    createdAt: user.createdAt,
    about: user.about,
    email: user.email,
    name: user.name,
    mainUrl: user.mainUrl,
    categories: user.categories,
    goalAmount: user.goalAmount,
    totalProgress: user.totalProgress,
    totalGains: user.totalGains,
    socials: user.socials,
    totalSupporters: user.totalSupporters,
    topSupporters: user.donations.map(({ amount, ...values }) => ({
      ...values,
      totalCoffees: amount / singleCoffeePrice,
    })),
  };
};
