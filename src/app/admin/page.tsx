import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import AdminDashboard from "./AdminDashboard"

export default async function AdminPage() {
  const session = await auth()

  // Vérifier si l'user est connecté et est admin
  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true, id: true }
  })

  if (user?.role !== "admin") {
    redirect("/") // Redirige vers homepage si pas admin
  }

  // Récupérer les stats
  const totalUsers = await prisma.user.count()
  const totalLikedQuotes = await prisma.likedQuote.count()
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
      _count: {
        select: { likedQuotes: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <AdminDashboard 
      users={users} 
      totalUsers={totalUsers} 
      totalLikedQuotes={totalLikedQuotes}
      currentAdminId={user?.id || ""}
    />
  )
}