"use client"
import { useState } from 'react'

export default function BookingPage() {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)

  return (
    <main className="container-page py-12">
      <h1 className="text-2xl sm:text-3xl font-semibold">Book Your Stay</h1>
      <form className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium">Check-in</label>
          <input type="date" className="mt-1 w-full border rounded-md px-3 py-2" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </div>
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium">Check-out</label>
          <input type="date" className="mt-1 w-full border rounded-md px-3 py-2" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Adults</label>
          <input type="number" min={1} className="mt-1 w-full border rounded-md px-3 py-2" value={adults} onChange={(e) => setAdults(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-medium">Children</label>
          <input type="number" min={0} className="mt-1 w-full border rounded-md px-3 py-2" value={children} onChange={(e) => setChildren(Number(e.target.value))} />
        </div>
        <div className="lg:col-span-6">
          <button type="submit" className="w-full sm:w-auto bg-brand text-white px-6 py-3 rounded-md hover:bg-brand-dark">
            Search Availability
          </button>
        </div>
      </form>
    </main>
  )
}


