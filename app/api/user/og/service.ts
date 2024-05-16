import { prisma } from "@/lib/prisma";

export const findUserAvatar = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: { username },
    select: {
      avatar: true,
    },
  });

  if (!user) throw new Error("User not found");

  return {
    avatar: user?.avatar,
  };
};
