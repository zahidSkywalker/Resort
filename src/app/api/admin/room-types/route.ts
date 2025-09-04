import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const items = await prisma.roomType.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, description, basePrice, images = [] } = body
  if (!name || !description || typeof basePrice !== 'number') {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }
  const created = await prisma.roomType.create({ data: { name, description, basePrice, images } })
  return NextResponse.json(created, { status: 201 })
}


