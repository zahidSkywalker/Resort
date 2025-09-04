import Image from 'next/image'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/ui/Section'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function HomePage() {
  return (
    <main>
      <Hero />

      <Section id="rooms" title="Featured Rooms" subtitle="Ocean views, private balconies, and premium amenities.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map((i) => (
            <Card key={i}>
              <div className="relative h-56">
                <Image src={`https://images.unsplash.com/photo-1505691723518-36a5ac3b2d48?q=80&w=1200&auto=format&fit=crop`} alt={`Room ${i}`} fill className="object-cover" />
              </div>
              <CardBody>
                <h3 className="text-lg font-medium">Deluxe King Room</h3>
                <p className="mt-1 text-sm text-gray-600">Ocean view, balcony, breakfast included</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-brand font-semibold">$180/night</span>
                  <Button href="/booking" variant="ghost">Book</Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="py-16 bg-gray-50" title="Dining & Experiences" subtitle="Enjoy curated dining, rooftop lounges, and signature experiences to make your stay memorable.">
        <div />
      </Section>
    </main>
  )
}


