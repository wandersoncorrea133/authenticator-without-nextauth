'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useRef } from 'react'

export default function Home() {
  const email = useRef<HTMLInputElement | null>(null)
  const password = useRef<HTMLInputElement | null>(null)

  const router = useRouter()

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()

    const response = await signIn('credentials', {
      redirect: false,
      email: email.current?.value,
      password: password.current?.value,
    })

    if (response?.error) {
      console.log(response)
      return
    }

    router.replace('/dashboard')
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center h-full w-full max-w-md">
        <h1 className="text-2xl font-bold tracking-widest">SigIn</h1>
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="flex mb-2" htmlFor="user_email">
              E-mail
            </label>
            <input
              className="flex px-4 text-base h-11 rounded-md outline-none text-zinc-900"
              type="email"
              id="user_email"
              placeholder="email"
              ref={email}
            />
          </div>

          <div className="flex flex-col">
            <label className="flex" htmlFor="user_password">
              Password
            </label>
            <input
              className="flex px-4 text-base h-11 rounded-md outline-none text-zinc-900"
              type="password"
              id="user_password"
              placeholder="password"
              ref={password}
            />
          </div>

          <button
            className="flex items-center justify-center h-11 w-full rounded-md bg-violet-600 text-zinc-50 tracking-widest font-bold hover:bg-violet-500"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
