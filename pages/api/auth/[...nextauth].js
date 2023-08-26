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
        return {
          id: result._id,
          name: result.fullname,
          email: result.email,
        };
      },
    }),
  ],
  secret: process.env.NEXT_SECRET,
});
