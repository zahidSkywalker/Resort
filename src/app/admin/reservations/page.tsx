"use client"
import { useEffect, useState } from 'react'

export default function AdminReservationsPage() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => { (async () => { const r = await fetch('/api/admin/reservations'); setItems(await r.json()) })() }, [])
  return (
    <div>
      <h1 className="text-xl font-semibold">Reservations</h1>
      <div className="mt-6 overflow-auto">
        <table className="min-w-[800px] w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">ID</th>
              <th>Room</th>
              <th>Guest</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-b">
                <td className="py-2">{it.id.slice(0,8)}</td>
                <td>{it.room?.roomNumber}</td>
                <td>{it.user?.email || '-'}</td>
                <td>{new Date(it.checkIn).toLocaleDateString()}</td>
                <td>{new Date(it.checkOut).toLocaleDateString()}</td>
                <td>{it.status}</td>
                <td>{it.currency} {it.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


