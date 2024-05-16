import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { siteConfig } from "@/siteConfig";
import { compare } from "bcrypt";
import { Adapter } from "next-auth/adapters";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: siteConfig.nextAuth.secret,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) return null;

        const passwordMatch = await compare(
          credentials?.password,
          user?.password!
        );
        if (!passwordMatch) return null;

        return {
          id: String(user?.id) || null,
          email: user.email,
          username: user?.username || null,
          avatar: user?.avatar || null,
          backgroundCover: user?.backgroundCover || null,
        } as any;
      },
    }),
    GoogleProvider({
      clientId: siteConfig.nextAuth.google.clientId,
      clientSecret: siteConfig.nextAuth.google.clientSecret,
    }),
  ],
  pages: {
    signIn: "/account/login",
  },
  callbacks: {
    jwt(data: any) {
      if (data.trigger === "update") {
        return { ...data.token, ...data.session.user };
      }

      if (data.user) {
        return {
          ...data.token,
          id: data.user.id,
          username: data.user.username,
          avatar: data.user.avatar,
          backgroundCover: data.user.backgroundCover,
        };
      }

      return data.token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
    },
  },
  session: { strategy: "jwt" },
} satisfies NextAuthOptions;
