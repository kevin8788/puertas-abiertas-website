import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

const ADMINS = [
  {
    id: "1",
    email: "admin@puertasabiertas.org",
    password: "$2a$10$...", // Hash de la contraseña
    name: "Admin",
    role: "admin"
  }
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const admin = ADMINS.find(a => a.email === credentials.email)
        
        if (!admin) {
          return null
        }

        const isValid = await bcrypt.compare(credentials.password, admin.password)
        
        if (!isValid) {
          return null
        }

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role
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