import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }

    const admin = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, role: true }
    })

    if (admin?.role !== "admin") {
      return NextResponse.json(
        { error: "Accès refusé - Admin uniquement" },
        { status: 403 }
      )
    }

    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: "userId manquant" },
        { status: 400 }
      )
    }

    if (admin.id === userId) {
      return NextResponse.json(
        { error: "Vous ne pouvez pas supprimer votre propre compte" },
        { status: 400 }
      )
    }

    // Supprimer le compte
    await prisma.user.delete({
      where: { id: userId }
    })

    return NextResponse.json({ 
      success: true,
      message: "Compte supprimé avec succès" 
    })

  } catch (error) {
    console.error("Erreur lors de la suppression:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}