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

          console.log(user)

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
      const customToken = token as unknown as any
      if (user) {
        const customUser = user as any
        token.accessToken = customUser.token
        token.refreshToken = customUser.refreshToken
        token.accessTokenExpires = Date.now() + 20 * 1000
      }

      if (Date.now() < customToken.accessTokenExpires) {
        return token
      }

      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      console.log(session, 'asdjaslkj', token)
      session.accessToken = token.accessToken as any
      session.error = token.error as any
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

async function refreshAccessToken(token: any) {
  try {
    const res = await axios.post(
      'http://localhost:3333/token/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${token.refreshToken}`,
        },
      },
    )

    const refreshedTokens = res.data

    return {
      ...token,
      accessToken: refreshedTokens.token,
      accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000,
      refreshToken: refreshedTokens.refreshToken || token.refreshToken,
    }
  } catch (error) {
    console.error('Error refreshing access token:', error)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }
