import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const items = await prisma.reservation.findMany({
    include: { room: true, user: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(items)
}


