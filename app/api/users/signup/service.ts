import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { generateRandomString } from "@/lib/utils";
import { UserRegister } from "@/types";

export const signup = async ({
  email,
  username,
  password,
  name,
}: UserRegister) => {
  if (await prisma.user.findFirst({ where: { email } }))
    throw new Error("Email is already registered");

  if (!username || !username?.length) {
    for (;;) {
      username = generateRandomString(15);

      const usernameExists = await prisma.user.findFirst({
        where: {
          username,
        },
      });

      if (!usernameExists) break;
    }
  } else {
    const usernameExists = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (usernameExists) throw new Error("Username is already registered");
  }

  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name, username },
    select: { email: true, username: true, name: true },
  });

  return user;
};
