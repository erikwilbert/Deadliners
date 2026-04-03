import type { DefaultSession } from "next-auth";

import type { User as DbUser } from "@/types/user";

type SessionDbUser = Pick<
  DbUser,
  "id" | "gmail" | "fname" | "lname" | "uname" | "img_url" | "prodi" | "accent"
>;

declare module "next-auth" {
  interface Session {
    user: NonNullable<DefaultSession["user"]> & SessionDbUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email?: string;
    id?: string;
  }
}

export {};
