'use client'
import axios from '@/lib/axios'
import { useSession } from 'next-auth/react'

export default function Dashboard() {
  const { data: session } = useSession()

  async function getProfile() {
    console.log(session)
    const response = await axios.get('me', {
      headers: { Authorization: `Bearer ${session?.accessToken}` },
    })

    console.log(response.data, 'sdhfjksdh')
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={getProfile}>getProfile</button>
      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </div>
  )
}
