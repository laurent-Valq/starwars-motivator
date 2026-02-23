import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email manquant" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { isActive: true }
    })

    if (!user) {
      // User n'existe pas
      return NextResponse.json({ isActive: true }) // On ne révèle pas que le compte n'existe pas
    }

    return NextResponse.json({ isActive: user.isActive })

  } catch (error) {
    console.error("Erreur lors de la vérification:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}