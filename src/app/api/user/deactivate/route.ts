import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }

    // Désactiver le compte
    await prisma.user.update({
      where: { email: session.user.email },
      data: { isActive: false }
    })

    return NextResponse.json({ 
      success: true,
      message: "Compte désactivé avec succès" 
    })

  } catch (error) {
    console.error("Erreur lors de la désactivation:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}