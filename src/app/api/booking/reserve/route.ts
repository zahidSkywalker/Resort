import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendReservationEmail } from '@/lib/mail'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { roomId, checkIn, checkOut, adults, children, totalAmount, currency = 'USD', userId } = body

  if (!roomId || !checkIn || !checkOut || !totalAmount) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const reservation = await prisma.reservation.create({
    data: {
      roomId,
      userId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      adults,
      children,
      totalAmount,
      currency,
      status: 'PENDING'
    },
  })

  if (userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (user?.email) {
      await sendReservationEmail(
        user.email,
        'Reservation Received',
        `Your reservation ${reservation.id} has been received. We'll notify you upon confirmation.`
      )
    }
  }

  return NextResponse.json({ reservation })
}


