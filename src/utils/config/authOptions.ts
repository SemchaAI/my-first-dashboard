import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/prisma/prismaClient";

import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        if (!credentials?.email || !credentials?.password) return null;

        const values = { email: credentials.email };
        const findUser = await prisma.user.findFirst({ where: values });
        // const findUser = false;
        if (!findUser) return null;

        const isPassValid = await compare(
          credentials.password,
          findUser.password,
        );
        if (!isPassValid) return null;
        // if (!findUser.verified) return null;
        console.log({
          id: findUser.id,
          username: findUser.username,
          email: findUser.email,
          role: findUser.role,
          avatar: findUser.avatar,
        });
        return {
          id: findUser.id,
          username: findUser.username,
          email: findUser.email,
          role: findUser.role,
          avatar: findUser.avatar,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // session: { strategy: "jwt" },
  pages: { signIn: "/", error: "/error" },
  callbacks: {
    // async signIn({ user, account }) {
    //   try {
    //     if (!user.email)  return false;
    //     const findUserByEmail = await prisma.user.findFirst({
    //       where: {
    //         email: user.email,
    //       },
    //     });
    //     if (findUserByEmail) return true;

    //   } catch (error) {
    //     console.log("Error [signIn]: ", error);
    //     return false;
    //   }
    // },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.username = user.username;
        token.avatar = user.avatar;
      }
      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.username = token.username;
        session.user.avatar = token.avatar;
      }
      return session;
    },
  },
};
