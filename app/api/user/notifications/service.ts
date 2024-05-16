import { prisma } from "@/lib/prisma";

export const markAsReadNotifications = async (userId: string) => {
  await prisma.notification.updateMany({
    where: { userId },
    data: {
      isRead: true,
    },
  });
};

export const findNotifications = async (userId: string) => {
  const notifications = await prisma.notification.findMany({
    take: 3,
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      isRead: true,
      createdAt: true,
      message: true,
    },
    distinct: ["message"],
  });

  let allRead: boolean = true;
  for (let i of notifications) {
    if (i.isRead === false) {
      allRead = false;
      break;
    }
  }

  return { notifications, allRead };
};
