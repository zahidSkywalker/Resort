import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { sendReservationConfirmation } from '@/lib/mail'

export async function POST(req: NextRequest) {
  const raw = await req.text()
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  const key = process.env.STRIPE_SECRET_KEY
  if (!secret || !key) return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  const stripe = new Stripe(key, { apiVersion: '2024-06-20' })
  const sig = req.headers.get('stripe-signature') || ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const reservationId = session.metadata?.reservationId
    if (reservationId) {
      const reservation = await prisma.reservation.update({ 
        where: { id: reservationId }, 
        data: { status: 'CONFIRMED' },
        include: { user: true }
      })
      
      // Send confirmation email
      if (reservation.user?.email) {
        await sendReservationConfirmation(
          reservation.user.email,
          reservation.id,
          reservation.checkIn.toISOString(),
          reservation.checkOut.toISOString()
        )
      }
    }
  }

  return NextResponse.json({ received: true })
}


