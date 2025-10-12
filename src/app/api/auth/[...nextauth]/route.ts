import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import User from "@/config/models/user"
import connectDB from "../../../../config/db"

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

        await connectDB()
        
        const user = await User.findOne({ 
          username: credentials.username, 
          isActive: { $ne: false } 
        })
 

        if (!user) {
          return null
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)
        
        if (!isValid) {
          return null
        }
 
        const userData = {
          id: user._id.toString(), 
          username: user.username,
          name: user.name,
          isAdmin: user.isAdmin === true
        }
 

        return userData
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
     
      
      if (user) {
        token.id = user.id
        token.email = user.email
        token.username = user.username
        token.name = user.name
        token.isAdmin = user.isAdmin  
      }
      
      if (trigger === 'update' && session) {
        token = { ...token, ...session }
      }
       
      
      return token
    },
    
    async session({ session, token }) { 
      
      if (session?.user) {
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.name = token.name as string
        session.user.isAdmin = token.isAdmin as boolean
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