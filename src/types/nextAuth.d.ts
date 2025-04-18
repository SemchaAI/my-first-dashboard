// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import type { Role } from "@prisma/client";

declare module "next-auth" {
  // export interface DefaultSession {
  //   user?: {
  //     name?: string | null
  //     email?: string | null
  //     image?: string | null
  //   }
  //   expires: ISODateString
  // }
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
      avatar: string | null;
      username: string;
    };
  }

  interface User extends DefaultUser {
    id: string;
    role: Role;
    avatar: string | null;
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: Role;
    avatar: string | null;
    username: string;
  }
}
