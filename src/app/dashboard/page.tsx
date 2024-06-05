'use client'
import useAxiosAuth from '@/lib/hook/useAxiosAuth'
import { useSession } from 'next-auth/react'

export default function Dashboard() {
  const { data: session } = useSession()
  const axiosAuth = useAxiosAuth()

  async function getProfile() {
    console.log(session)
    const response = await axiosAuth.get('/me')

    console.log(response?.data, 'sdhfjksdh')
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={getProfile}>getProfile</button>
      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </div>
  )
}
