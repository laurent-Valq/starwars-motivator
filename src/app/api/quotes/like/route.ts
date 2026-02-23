import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour liker une citation" },
        { status: 401 }
      )
    }

    const { quote } = await request.json()

    if (!quote) {
      return NextResponse.json(
        { error: "Citation manquante" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur introuvable" },
        { status: 404 }
      )
    }

    // Vérifier si la quote est déjà likée
    const existingLike = await prisma.likedQuote.findFirst({
      where: {
        userId: user.id,
        quote: quote
      }
    })

    if (existingLike) {
      // Unlike : supprimer le like
      await prisma.likedQuote.delete({
        where: { id: existingLike.id }
      })
      return NextResponse.json({ liked: false })
    } else {
      // Like : ajouter le like
      await prisma.likedQuote.create({
        data: {
          userId: user.id,
          quote: quote
        }
      })
      return NextResponse.json({ liked: true })
    }

  } catch (error) {
    console.error("Erreur lors du like:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}