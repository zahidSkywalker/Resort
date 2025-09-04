import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { checkIn, checkOut, adults = 1, children = 0 } = body
  if (!checkIn || !checkOut) return NextResponse.json({ error: 'Invalid dates' }, { status: 400 })

  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)

  // Find rooms without overlapping reservations
  const availableRooms = await prisma.room.findMany({
    where: {
      reservations: {
        none: {
          OR: [
            { checkIn: { lt: checkOutDate }, checkOut: { gt: checkInDate } },
          ],
        },
      },
    },
    include: { roomType: true },
  })

  return NextResponse.json({ rooms: availableRooms, adults, children })
}


