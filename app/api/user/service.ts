import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { Todo } from "@/types";
import { deleteImage } from "@/lib/cloudinary";

export const deleteUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      avatar: true,
      backgroundCover: true,
    },
  });

  if (user?.avatar) await deleteImage(user.avatar);
  if (user?.backgroundCover) await deleteImage(user.backgroundCover);

  await prisma.user.delete({
    where: { id: userId },
  });
};

export const updateUser = async (userId: string, data: Todo) => {
  if (data.socials) {
    Object.keys(data.socials).map(async (platform: string) => {
      if (typeof data.socials[platform] === "string") {
        await prisma.socials.upsert({
          where: {
            userId_platform: {
              platform,
              userId,
            },
          },
          create: {
            platform,
            accountName: data.socials[platform],
            user: {
              connect: { id: userId },
            },
          },
          update: {
            accountName: data.socials[platform],
          },
        });
      }
    });

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        socials: true,
      },
    });

    if (!user) return null;

    return {
      socials: user.socials,
    };
  }

  if (data.password) {
    const saltRounds = 10;
    const password = await hash(data.password, saltRounds);

    data = { password };
  }

  if (data.username) {
    if (
      await prisma.user.findFirst({
        where: { username: data.username, NOT: { id: userId } },
      })
    )
      throw new Error("This username is not available");
  }

  const categories = await prisma.category.findMany();
  const userData = await prisma.user.findUnique({
    where: { id: userId },
    select: { categories: true },
  });

  if (data.categories) {
    const { categories: selectedCategoryTitles } = data;
    if (!selectedCategoryTitles?.length) {
      data.categories = {
        disconnect: userData?.categories.filter((c) => ({ id: c.id })),
      };
    } else {
      data.categories = {
        connect: categories
          .filter((category) => selectedCategoryTitles.includes(category.title))
          .map((category) => ({ id: category.id })),
        disconnect: userData?.categories
          .filter(
            (category) => !selectedCategoryTitles.includes(category.title)
          )
          .map((category) => ({ id: category.id })),
      };
    }
  }

  if (data?.goalAmount) data.goalAmount = Number(data.goalAmount);

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data,
    select: {
      about: true,
      avatar: true,
      backgroundCover: true,
      mainUrl: true,
      name: true,
      username: true,
      categories: true,
    },
  });

  return user;
};

export const findUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      avatar: true,
      backgroundCover: true,
      createdAt: true,
      about: true,
      email: true,
      name: true,
      username: true,
      mainUrl: true,
      categories: true,
      goalAmount: true,
      notifyDonation: true,
      notifyNewFollower: true,
      socials: true,
    },
  });

  return user;
};
