/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '@/lib/axios'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        try {
          const response = await axios.post('/sessions', {
            email: credentials?.email,
            password: credentials?.password,
          })

          const {
            data: { user },
          } = response

          if (user) {
            return user
          }

          return null
        } catch (error) {
          console.error('Error in authorize:', error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user)

      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token.user as any

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }
