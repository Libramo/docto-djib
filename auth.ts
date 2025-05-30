import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/db";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const { auth, handlers, signOut, signIn } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET!,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          console.log(
            "Authorize function called with credentials:",
            credentials
          );
          // Check if user credentials are Correct
          if (!email || !password) {
            throw new Error("No input found");
          }

          console.log("Pass 1 checked ");
          //Check if user exists
          const normalizedEmail = email.toLowerCase();
          const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail },
          });

          if (!existingUser) {
            console.log("No user found");
            throw new Error("No user found");
          }

          console.log("Pass 2 Checked");
          console.log(existingUser);
          let passwordMatch = false as boolean;
          //Check if Password is correct
          if (existingUser && existingUser.password) {
            // if user exists and password exists
            passwordMatch = await compare(
              credentials.password as string,
              existingUser.password
            );
          }
          if (!passwordMatch) {
            console.log("Password incorrect");
            throw new Error("Password Incorrect");
          }
          console.log("Pass 3 Checked");
          const user = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
          };
          //
          console.log("User Compiled");
          console.log(user);
          return user;
        } catch (error) {
          console.log("All Failed");
          console.log(error);
          throw new Error("Something went wrong");
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      const dbUser = await prisma.user.findFirst({
        where: { email: token?.email ?? "" },
      });

      if (!dbUser) {
        token.id = user!.id as string;
        // return token;
      } else {
        token.id = dbUser.id;
        token.name = dbUser.name;
        token.email = dbUser.email;
        token.role = dbUser.role;
      }

      return token;
    },

    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
