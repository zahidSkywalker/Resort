import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeSecret = process.env.STRIPE_SECRET_KEY
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: '2024-06-20' }) : null

export async function POST(req: NextRequest) {
  if (!stripe) return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })

  const body = await req.json()
  const { amount, currency = 'USD', reservationId } = body
  if (!amount || !reservationId) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency,
          product_data: { name: `Reservation ${reservationId}` },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXTAUTH_URL}/booking/success?rid=${reservationId}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/booking/cancel?rid=${reservationId}`,
    metadata: { reservationId },
  })

  return NextResponse.json({ id: session.id, url: session.url })
}


