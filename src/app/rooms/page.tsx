import Image from 'next/image'

export default function RoomsPage() {
  return (
    <main className="container-page py-12">
      <h1 className="text-2xl sm:text-3xl font-semibold">Rooms & Suites</h1>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} className="rounded-lg overflow-hidden border">
            <div className="relative h-48">
              <Image src="https://images.unsplash.com/photo-1505691723518-36a5ac3b2d48?q=80&w=1200&auto=format&fit=crop" alt="Room" fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium">Premium Sea View</h3>
              <p className="mt-1 text-sm text-gray-600">King bed, balcony, breakfast</p>
              <p className="mt-3 text-brand font-semibold">$220/night</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}


