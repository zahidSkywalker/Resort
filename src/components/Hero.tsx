import Image from 'next/image'
import { Button } from './ui/Button'

export function Hero() {
  return (
    <section className="relative h-[70vh] w-full">
      <Image
        src="https://images.unsplash.com/photo-1502920514313-52581002a659?q=80&w=1600&auto=format&fit=crop"
        alt="Resort hero"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white container-page">
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight">Experience Coastal Luxury</h1>
          <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto">
            Premium rooms, fine dining, and breathtaking seaside views.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button href="/booking">Book Now</Button>
            <Button href="#rooms" variant="secondary">Explore Rooms</Button>
          </div>
        </div>
      </div>
    </section>
  )
}


