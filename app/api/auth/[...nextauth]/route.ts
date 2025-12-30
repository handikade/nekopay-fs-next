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
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
