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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        const user = await User.findById(token.id);
        session.user._id = user._id;
        session.user.name = user.name;
        session.user.surname = user.surname;
        session.user.phone = user.phone;
        session.user.username = user.username;
        session.user.password = user.password;
        session.user.role = user.role;
        session.user.total_points = user.total_points;
        session.user.total_sets_won = user.total_sets_won;
        session.user.total_games_won = user.total_games_won;
        session.user.total_games_lost = user.total_games_lost;
      }

      return session;
    },
  },
  session: {
    //strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};