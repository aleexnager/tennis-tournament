import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { emailOrUsername, password } = credentials;

        try {
          await connectDB();
          const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
          });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;

        } catch (error) {
          console.log("error: ", error);
        }
      },
    }),
  ],
  callbacks: {
    async session(session, user) {
      session.user.surname = user.surname;
      session.user.phone = user.phone;
      session.user.username = user.username;
      session.user.password = user.password;

      return session;
    }
  },
  session: {
    //strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};