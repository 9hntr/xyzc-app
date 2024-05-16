import { prisma } from "@/lib/prisma";

export const findUsers = async (
  query: string,
  pageSize: number,
  categories: string,
  page: number
) => {
  const skip = (page - 1) * pageSize;

  let findArgs: any = {
    select: {
      id: true,
      username: true,
      avatar: true,
      backgroundCover: true,
      totalSupporters: true,
      verified: true,
    },
    where: {
      goalAmount: { not: 0 },
      name: { not: null },
      about: { not: null },
    },
  };

  if (query.length) {
    findArgs = {
      ...findArgs,
      where: {
        ...findArgs.where,
        username: {
          contains: query,
        },
      },
    };
  }

  if (categories.length) {
    const categoryIds = categories.split(",").map(Number);

    findArgs = {
      ...findArgs,
      where: {
        ...findArgs.where,
        OR: categoryIds.map((id) => ({
          categories: {
            some: { id },
          },
        })),
      },
    };
  }

  // @ts-ignore
  const totalUsers = (await prisma.user.count(findArgs)).id;
  const totalPages = Math.ceil(totalUsers / pageSize);

  const users = await prisma.user.findMany({
    take: pageSize,
    skip,
    ...findArgs,
  });

  const nextPage = page < totalPages ? page + 1 : null;

  return { users, currentPage: page, nextPage };
};
