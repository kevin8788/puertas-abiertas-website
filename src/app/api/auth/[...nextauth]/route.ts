import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import User from "@/config/models/user";
import connectDB from "../../../../config/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }
 
        
        // if (!admin) {
        //   return null
        // }

        await connectDB();
        let user = await User.findOne({ username: credentials.username, isActive: { $ne: false } });
 
        if (!user) {
          return null
        }

   
        const isValid = await bcrypt.compare(credentials.password, user.password); 
        if (!isValid) {
          return null
        }

        return {
          id: user.id,
          username: user.email,
          name: user.name, 
          isAdmin: user.isAdmin,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user } : {token: any, user: any}) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token } : {session: any, token: any}) {
      if (session?.user) {
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }