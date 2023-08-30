import NextAuth from "next-auth";
import CredientialsProvider from "next-auth/providers/credentials";

import dbConnect from "@/database/mongodb";
import Users from "@/modal/User";
import { compare } from "bcrypt";

export default NextAuth({
  providers: [
    CredientialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        dbConnect().catch((error) => {
          error: "Connection Failed...!";
        });

        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new Error("No user Found with Email Please Sign Up...!");
        }
        const checkPassword = await compare(
          credentials.password,
          result.password
        );
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Username or Password doesn't match");
        }
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        return user;
      },
    }),
  ],
  secret: process.env.NEXT_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token) session.user._id = token.sub;
      return session;
    },
  },
});
