import { env } from "@/libs/env.mjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import Email from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: env.NEXT_AUTH_GOOGLE_ID,
      clientSecret: env.NEXT_AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    // ...add more providers here
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!profile?.email?.endsWith("@devarksolutions.com")) {
        return false;
      }
      return true;
    },
  },
};

export default NextAuth(authOptions);
