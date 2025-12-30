import { connectMongo } from "@/lib/mongoose";
import * as userService from "@/modules/user/service";
import bcrypt from "bcryptjs";
import { type AuthOptions, type SessionStrategy } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;

        try {
          await connectMongo();
          const user = await userService.findByEmail(email);

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            user.passwordHash
          );

          if (!passwordsMatch) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            roles: user.roles,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({ token, user }) {
      // When the user signs in, the `user` object from the `authorize` function is passed here.
      // We are adding the user's `id` and `roles` to the token.
      if (user) {
        token.id = user.id;
        token.roles = user.roles;
      }
      return token;
    },
    async session({ session, token }) {
      // The `session` callback receives the `token` from the `jwt` callback.
      // We are adding the `id` and `roles` from the token to the `session.user` object.
      if (session.user) {
        session.user.id = token.id;
        session.user.roles = token.roles;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
