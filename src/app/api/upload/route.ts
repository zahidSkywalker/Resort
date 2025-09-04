import { NextRequest, NextResponse } from 'next/server'
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  secure: true,
})

export async function POST(req: NextRequest) {
  if (!process.env.CLOUDINARY_URL) return NextResponse.json({ error: 'Cloudinary not configured' }, { status: 500 })
  const { image } = await req.json()
  if (!image) return NextResponse.json({ error: 'Missing image' }, { status: 400 })
  const res = await cloudinary.v2.uploader.upload(image, { folder: 'resort' })
  return NextResponse.json({ url: res.secure_url })
}


