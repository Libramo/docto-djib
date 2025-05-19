import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/db";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { addHours, addMinutes } from "date-fns";

export const { auth, handlers, signOut, signIn } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET!,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1000,
  },
  pages: {
    signIn: "/login",
    signOut: "/",
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
            throw { error: "No user found", status: 401 };
          }

          console.log("Pass 2 Checked");
          console.log(existingUser);
          let passwordMatch: boolean = false;
          //Check if Password is correct
          if (existingUser && existingUser.password) {
            // if user exists and password exists
            passwordMatch = await compare(
              credentials.password as string,
              existingUser.password as string
            );
          }
          if (!passwordMatch) {
            console.log("Password incorrect");
            throw { error: "Password Incorrect", status: 401 };
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
          console.log("aLL Failed");
          console.log(error);
          throw { error: "Something went wrong", status: 401 };
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

      const expireDate = addMinutes(new Date(), 1); // expires in 1 hour
      token.exp = Math.floor(expireDate.getTime() / 1000); // must be in seconds

      return token;
    },

    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.image = token.picture;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
