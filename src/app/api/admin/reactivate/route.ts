import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const session = await auth()

    // Vérifier si connecté
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }

    // Vérifier si admin
    const admin = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true }
    })

    if (admin?.role !== "admin") {
      return NextResponse.json(
        { error: "Accès refusé - Admin uniquement" },
        { status: 403 }
      )
    }

    // Récupérer l'userId depuis le body
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: "userId manquant" },
        { status: 400 }
      )
    }

    // Réactiver le compte
    await prisma.user.update({
      where: { id: userId },
      data: { isActive: true }
    })

    return NextResponse.json({ 
      success: true,
      message: "Compte réactivé avec succès" 
    })

  } catch (error) {
    console.error("Erreur lors de la réactivation:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}