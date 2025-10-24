import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.phone || !credentials?.password) return null;

          await connectDB();

          const user = await User.findOne({ phone: credentials.phone });
          if (!user) return null;

          const isMatch = await bcrypt.compare(credentials.password, user.password);
          if (!isMatch) return null;

          return {
            id: user._id.toString(),
            name: user.name,
            phone: user.phone,
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null; // prevent 500
        }
      },
    }),
  ],

  pages: {
    signIn: "/signin",
    error: "/signin",
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.phone = token.phone;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
