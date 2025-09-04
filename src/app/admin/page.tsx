import { auth } from '@/auth/config'
import Link from 'next/link'

export default async function AdminPage() {
  const session = await auth()
  const role = session?.user?.role
  if (role !== 'ADMIN') {
    return (
      <main className="container-page py-12">
        <h1 className="text-2xl font-semibold">Unauthorized</h1>
        <p className="mt-2">You must be an admin to access this page.</p>
        <Link className="text-brand underline mt-4 inline-block" href="/">Go Home</Link>
      </main>
    )
  }

  return (
    <main className="container-page py-12">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <ul className="mt-6 list-disc pl-6">
        <li>Manage rooms and room types</li>
        <li>Set rates and availability</li>
        <li>View reservations</li>
      </ul>
    </main>
  )
}


