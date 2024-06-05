/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '@/lib/axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'
import { parse } from 'cookie'

type NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse,
) => NextAuthOptions

export const nextAuthOptions: NextAuthOptionsCallback = (req, res) => {
  return {
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

            const apiCookies: any = response.headers['set-cookie']

            console.log(apiCookies)

            if (apiCookies && apiCookies.length > 0) {
              apiCookies.forEach((cookie: any) => {
                const parsedCookie = parse(cookie)
                const [cookieName, cookieValue] =
                  Object.entries(parsedCookie)[0]

                cookies().set({
                  name: cookieName,
                  value: cookieValue,
                  httpOnly: true,
                  maxAge: parseInt(parsedCookie['Max-Age']),
                  path: parsedCookie.path,
                  sameSite: 'strict',
                  expires: new Date(parsedCookie.expires),
                  secure: true,
                })
              })
            }

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
}

export const GET = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res))
}

export const POST = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res))
}
