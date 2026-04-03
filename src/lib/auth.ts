import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import pool from "./neon";

// Auth Configuration
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    // NextAuth Sign In Callback
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const { email, name, image } = user;
        if (!email) return false;

        const parts = name ? name.split(" ") : [];
        const fname = parts[0] || "";
        const lname = parts.slice(1).join(" ") || "";
        const uname = email.split("@")[0] || "";

        try {
          const res = await pool.query('SELECT * FROM "user" WHERE gmail = $1', [email]);
          
          if (res.rows.length === 0) {
            await pool.query(
              `INSERT INTO "user" (
                gmail, fname, lname, uname, img_url
              ) VALUES (
                $1, $2, $3, $4, $5
              )`,
              [email, fname, lname, uname, image]
            );
          }
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }
      return true;
    },
    // NextAuth JWT Callback
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    // NextAuth Session Callback
    async session({ session, token }) {
      if (session.user && token.email) {
        try {
          const res = await pool.query('SELECT * FROM "user" WHERE gmail = $1', [token.email]);
          if (res.rows.length > 0) {
            const dbUser = res.rows[0];
            Object.assign(session.user, dbUser);
          }
        } catch (error) {
          console.error(error);
        }
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
};
