'use client'

import { useSession } from 'next-auth/react'
import axios from '../axios'

export const useRefreshToken = () => {
  const { data: session } = useSession()

  const refreshToken = async () => {
    const res = await axios.post('/token/refresh')

    if (session) {
      session.user.token = res.data.user.token
    }
  }

  return refreshToken
}
