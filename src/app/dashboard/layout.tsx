import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { Header } from '@/components/Header'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <>
      <Header />
      {children}
    </>
  )
}
