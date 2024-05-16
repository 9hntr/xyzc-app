import { prisma } from "@/lib/prisma";

export const getFollowing = async ({
  userId,
}: {
  userId: string;
}): Promise<string[]> => {
  const followers = await prisma.follower.findMany({
    where: {
      followerId: userId,
    },
    select: {
      followingId: true,
    },
  });

  return followers.map((following) => following.followingId);
};

export const followUser = async ({
  followerId, // User A follows
  followingId, // User B receives a follower
}: {
  followerId: string;
  followingId: string;
}) => {
  if (followerId === followingId) throw new Error("Error same user");

  const existingFollower = await prisma.follower.findFirst({
    where: {
      followerId,
      followingId,
    },
  });

  const user = await prisma.user.findFirst({
    where: {
      id: followingId,
    },
    select: {
      username: true,
      totalSupporters: true,
    },
  });

  if (!user) throw new Error("User not found");

  if (existingFollower) {
    const updatedTotalSupporters =
      user.totalSupporters > 0 ? user.totalSupporters - 1 : 0;

    await Promise.all([
      prisma.user.update({
        where: {
          id: followingId,
        },
        data: {
          totalSupporters: updatedTotalSupporters,
        },
      }),
      prisma.follower.delete({
        where: {
          id: existingFollower.id,
        },
      }),
    ]);

    return { success: true, message: "Follower removed" };
  }

  const follower = await prisma.user.findFirst({
    where: {
      id: followerId,
    },
    select: {
      username: true,
    },
  });

  if (!follower) throw new Error("Follower not found");

  const updatedTotalSupporters = user.totalSupporters + 1;

  Promise.all([
    prisma.user.update({
      where: {
        id: followingId,
      },
      data: {
        totalSupporters: updatedTotalSupporters,
      },
    }),
    prisma.follower.create({
      data: {
        followerId,
        followingId,
      },
    }),
    prisma.notification.create({
      data: {
        userId: followingId,
        message: `${follower.username} is following you.`,
      },
    }),
  ]);

  return { success: true, message: "Follower created" };
};
