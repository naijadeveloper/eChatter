import NextAuth, { DefaultSession } from "next-auth"
import { AdapterUser } from "next-auth/adapters";
import { User } from "next-auth";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's id, verification status and theme setting. */
      id: string | null | undefined;
      verified: boolean | null | undefined;
      theme: string | null | undefined;
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    theme?: string,
    verified?: boolean,
  };
}