import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const rooms = await prisma.room.findMany({ include: { roomType: true }, orderBy: { roomNumber: 'asc' } })
  return NextResponse.json(rooms)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { roomNumber, roomTypeId } = body
  if (!roomNumber || !roomTypeId) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const created = await prisma.room.create({ data: { roomNumber, roomTypeId } })
  return NextResponse.json(created, { status: 201 })
}


