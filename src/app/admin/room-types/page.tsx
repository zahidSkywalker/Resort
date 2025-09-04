"use client"
import { useEffect, useState } from 'react'

export default function AdminRoomTypesPage() {
  const [items, setItems] = useState<any[]>([])
  const [form, setForm] = useState({ name: '', description: '', basePrice: 0 })

  const load = async () => {
    const res = await fetch('/api/admin/room-types')
    setItems(await res.json())
  }
  useEffect(() => { load() }, [])

  const create = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/admin/room-types', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, images: [] }) })
    setForm({ name: '', description: '', basePrice: 0 })
    load()
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Room Types</h1>
      <form className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3" onSubmit={create}>
        <input placeholder="Name" className="border px-3 py-2 rounded" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Description" className="border px-3 py-2 rounded" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input type="number" placeholder="Base Price" className="border px-3 py-2 rounded" value={form.basePrice} onChange={e => setForm({ ...form, basePrice: Number(e.target.value) })} />
        <button className="bg-brand text-white px-4 py-2 rounded">Create</button>
      </form>
      <ul className="mt-8 divide-y">
        {items.map((it) => (
          <li key={it.id} className="py-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{it.name}</div>
              <div className="text-sm text-gray-600">{it.description}</div>
            </div>
            <div className="text-brand font-semibold">${it.basePrice}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}


