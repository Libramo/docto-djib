import NextAuth from "next-auth";
import {
  Availability,
  UserRole,
  User as PrismaModelUser,
} from "@prisma/client";
import type { User } from "next-auth";
import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    name?: string | null;
    email?: string | null;
    image?: string;
    exp?: number;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: PrismaModelUser & {
      user: User;
    };
  }
}
