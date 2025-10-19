import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text", placeholder: "Enter phone number" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("🟢 Credentials received:", credentials);

          // Check for missing fields
          if (!credentials?.phone || !credentials?.password) {
            throw new Error("Phone and password are required");
          }

          // Connect to DB
          await connectDB();

          // Find user by phone
          const user = await User.findOne({ phone: credentials.phone });
          if (!user) {
            throw new Error("User not found");
          }

          // Compare password
          const isMatch = await bcrypt.compare(credentials.password, user.password);
          if (!isMatch) {
            throw new Error("Invalid password");
          }

          // Return user data to NextAuth
          return {
            id: user._id.toString(),
            name: user.name,
            phone: user.phone,
          };
        } catch (err) {
          console.error("❌ Authorize error:", err);
          throw new Error(err.message || "Login failed");
        }
      },
    }),
  ],

  pages: {
    signIn: "/signin",
    error: "/signin",
  },

  session: {
    strategy: "jwt",
  },

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
