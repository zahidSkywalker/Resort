import Link from 'next/link'

export function Navbar() {
  return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 sticky top-0 z-50">
      <div className="container-page flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-semibold text-brand">Resort</Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/rooms" className="hover:text-brand">Rooms</Link>
          <Link href="/dining" className="hover:text-brand">Dining</Link>
          <Link href="/offers" className="hover:text-brand">Offers</Link>
          <Link href="/gallery" className="hover:text-brand">Gallery</Link>
          <Link href="/contact" className="hover:text-brand">Contact</Link>
          <Link href="/booking" className="bg-brand text-white px-4 py-2 rounded-md hover:bg-brand-dark">Book</Link>
        </nav>
      </div>
    </header>
  )
}


