import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          console.log(" Login attempt for:", credentials?.phone);

          if (!credentials?.phone || !credentials?.password) {
            console.log(" Missing credentials");
            return null;
          }

          
          await connectDB();
          console.log(" Database connected");

         
          const user = await User.findOne({ phone: credentials.phone });
          if (!user) {
            console.log(" User not found");
            return null;
          }

          console.log(" User found:", user.name);

       
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            console.log(" Invalid password");
            return null;
          }

          console.log(" Login successful!");

         
          return {
            id: user._id.toString(),
            name: user.name,
            phone: user.phone,
            email: user.email,
          };
        } catch (error) {
          console.error(" Auth error:", error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.phone = user.phone;
        token.email = user.email;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.phone = token.phone;
        session.user.email = token.email;
      }
      return session;
    },
  },
});

export const { GET, POST } = handlers;