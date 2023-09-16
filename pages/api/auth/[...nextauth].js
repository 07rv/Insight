import NextAuth from "next-auth";
import CredientialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect from "@/database/mongodb";
import Users from "@/modal/User";
import { compare, hash } from "bcrypt";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
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
        if (!result.isVerified) {
          throw new Error("User is not verified");
        }
        const user = {
          id: result._id,
          name: result.name,
          email: result.email,
        };
        return user;
      },
    }),
  ],
  secret: process.env.NEXT_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      try {
        dbConnect().catch((error) => {
          error: "Connection Failed...!";
        });
        const result = await Users.findOne({ email: token.email });
        if (token) session.user._id = result._id;
        return session;
      } catch (error) {
        return session;
      }
    },
    async signIn({ user, account, profile }) {
      try {
        dbConnect().catch((error) => {
          error: "Connection Failed...!";
        });
        const result = await Users.findOne({ email: user.email });
        if (!result) {
          const newuser = new Users({
            name: user.name,
            email: user.email,
            profileImg: user.image,
            isVerified: true,
            password: await hash(account.access_token, 12),
            about: "",
          });
          newuser.save();
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },
});
