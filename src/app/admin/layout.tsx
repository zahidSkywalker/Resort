export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container-page py-10">
      <nav className="flex gap-6 text-sm mb-8">
        <a href="/admin" className="hover:text-brand">Dashboard</a>
        <a href="/admin/room-types" className="hover:text-brand">Room Types</a>
        <a href="/admin/rooms" className="hover:text-brand">Rooms</a>
        <a href="/admin/reservations" className="hover:text-brand">Reservations</a>
      </nav>
      {children}
    </section>
  )
}


