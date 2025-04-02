import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const contents = await prisma.content.findMany()
  return NextResponse.json(contents)
}

export async function POST(req: Request) {
  const data = await req.json()
  const created = await prisma.content.create({ data })
  return NextResponse.json(created)
}