import { NextResponse } from "next/server";
import prisma from '@/lib/prismadb'

export async function GET(request: Request, { params }: { params: { id: string }}) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id
    },
    select: { id: true, username: true, email: true }
  })

  if(!user) return NextResponse.json({error: "User not found"}, { status: 404 })

  return NextResponse.json(user)
}