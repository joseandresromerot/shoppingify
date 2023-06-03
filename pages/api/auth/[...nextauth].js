import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import conn from "@/lib/db";
import { verifyPassword } from "@/lib/auth";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  providers: [
    Credentials({
      async authorize(credentials) {

        const userResult = await conn.query(
          "SELECT * FROM appuser WHERE username = $1",
          [credentials.username]
        );

        const users = userResult.rows;

        if (users.length === 0) {
          throw new Error("User is not registered");
        }

        const user = users[0];

        const isValid = await verifyPassword(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Enter a valid username and password");
        }

        return {
          id: user.id,
          username: user.username,
          fullname: user.fullname
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});