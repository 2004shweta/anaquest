import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      admin?: boolean;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    admin?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    admin?: boolean;
  }
} 