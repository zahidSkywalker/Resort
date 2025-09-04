const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@example.com'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'admin1234'

  const passwordHash = await bcrypt.hash(adminPassword, 10)
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, role: 'ADMIN', name: 'Admin' },
    create: { email: adminEmail, passwordHash, role: 'ADMIN', name: 'Admin' },
  })

  const deluxe = await prisma.roomType.upsert({
    where: { id: 'seed-deluxe' },
    update: {},
    create: {
      id: 'seed-deluxe',
      name: 'Deluxe King',
      description: 'Ocean view, balcony, breakfast included',
      basePrice: 18000,
      images: 'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d48?q=80&w=1200&auto=format&fit=crop',
    },
  })

  const suite = await prisma.roomType.upsert({
    where: { id: 'seed-suite' },
    update: {},
    create: {
      id: 'seed-suite',
      name: 'Premium Suite',
      description: 'Spacious suite with living area and panoramic views',
      basePrice: 28000,
      images: 'https://images.unsplash.com/photo-1502920514313-52581002a659?q=80&w=1200&auto=format&fit=crop',
    },
  })

  await prisma.room.upsert({
    where: { roomNumber: '101' },
    update: {},
    create: { roomNumber: '101', roomTypeId: deluxe.id },
  })
  await prisma.room.upsert({
    where: { roomNumber: '102' },
    update: {},
    create: { roomNumber: '102', roomTypeId: deluxe.id },
  })
  await prisma.room.upsert({
    where: { roomNumber: '201' },
    update: {},
    create: { roomNumber: '201', roomTypeId: suite.id },
  })

  console.log('Seed completed. Admin:', admin.email)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})


