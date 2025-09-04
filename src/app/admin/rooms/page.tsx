"use client"
import { useEffect, useState } from 'react'

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<any[]>([])
  const [roomTypes, setRoomTypes] = useState<any[]>([])
  const [form, setForm] = useState({ roomNumber: '', roomTypeId: '' })

  const load = async () => {
    const [r, t] = await Promise.all([
      fetch('/api/admin/rooms').then(r => r.json()),
      fetch('/api/admin/room-types').then(r => r.json()),
    ])
    setRooms(r)
    setRoomTypes(t)
  }
  useEffect(() => { load() }, [])

  const create = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/admin/rooms', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setForm({ roomNumber: '', roomTypeId: '' })
    load()
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Rooms</h1>
      <form className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3" onSubmit={create}>
        <input placeholder="Room Number" className="border px-3 py-2 rounded" value={form.roomNumber} onChange={e => setForm({ ...form, roomNumber: e.target.value })} />
        <select className="border px-3 py-2 rounded" value={form.roomTypeId} onChange={e => setForm({ ...form, roomTypeId: e.target.value })}>
          <option value="">Select Room Type</option>
          {roomTypes.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <button className="bg-brand text-white px-4 py-2 rounded">Create</button>
      </form>
      <ul className="mt-8 divide-y">
        {rooms.map((it) => (
          <li key={it.id} className="py-3 flex items-center justify-between">
            <div>
              <div className="font-medium">Room {it.roomNumber}</div>
              <div className="text-sm text-gray-600">{it.roomType?.name}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}


