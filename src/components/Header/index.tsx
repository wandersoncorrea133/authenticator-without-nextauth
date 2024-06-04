import Link from 'next/link'

export function Header() {
  return (
    <header className="flex items-center h-16 bg-zinc-300">
      <div className="flex items-center gap-8 w-full px-8">
        <div className="flex items-center h-full">
          <a
            className="text-zinc-950 flex items-center text-2xl font-bold tracking-wide"
            href="#"
          >
            Logo
          </a>
        </div>
        <nav>
          <ul className="flex items-center gap-5">
            <li className="text-zinc-950">
              <Link href={'/'}>Home</Link>
            </li>
            <li className="text-zinc-950">
              <Link href={'/dashboard'}>Dashboard</Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center ml-auto">
          <button className="flex items-center bg-orange-700 text-zinc-50 tracking-wider px-9 py-1 rounded-md hover:bg-orange-600">
            SignOut
          </button>
        </div>
      </div>
    </header>
  )
}
