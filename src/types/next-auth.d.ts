/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken: string
    error: any
    user: {
      name: string
      email: string
      accessToken: string
    }
  }
}
