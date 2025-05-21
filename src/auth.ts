import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword, verifyPassword } from "@/utils/password";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/mongoClient";
import { connectToDatabase } from "./lib/mongoose";
import { User } from "./models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: MongoDBAdapter(client),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        await connectToDatabase();

        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        let email = credentials.email as string;

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
          throw new Error("User not found. Please register first.");
        }

        const isMatch = verifyPassword(
          credentials.password as string,
          user.hashedPassword
        );

        if (!isMatch) {
          throw new Error("Invalid password.");
        }

        return { _id: user._id, email: user.email };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      await connectToDatabase();
      const user = await User.findOne({ email: token.email });
      return {
        ...session,
        role: user.role,
      };
    },
    async jwt({ session, token }) {
      await connectToDatabase();
      const user = await User.findOne({ email: token.email });
      return {
        ...token,
        role: user.role,
      };
    },
  },
});
