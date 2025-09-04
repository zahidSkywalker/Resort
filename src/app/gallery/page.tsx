import Image from 'next/image'

export default function GalleryPage() {
  return (
    <main className="container-page py-12">
      <h1 className="text-2xl sm:text-3xl font-semibold">Gallery</h1>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="relative aspect-[4/3]">
            <Image src={`https://images.unsplash.com/photo-1496412705862-e0088f16f791?q=80&w=800&auto=format&fit=crop`} alt="Gallery" fill className="object-cover rounded" />
          </div>
        ))}
      </div>
    </main>
  )
}


