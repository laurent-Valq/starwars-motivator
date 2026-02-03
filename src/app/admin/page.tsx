import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function AdminPage() {
  const session = await auth()

  // Vérifier si l'user est connecté et est admin
  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true }
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
    <div className="min-h-screen p-8 text-[#FFE81F]">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-cyan-500/20 backdrop-blur-sm p-6 rounded-lg border-2 border-cyan-400" style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)' }}>
            <h3 className="text-xl font-bold mb-2">Total Users</h3>
            <p className="text-4xl">{totalUsers}</p>
          </div>

          <div className="bg-cyan-500/20 backdrop-blur-sm p-6 rounded-lg border-2 border-cyan-400" style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)' }}>
            <h3 className="text-xl font-bold mb-2">Total Liked Quotes</h3>
            <p className="text-4xl">{totalLikedQuotes}</p>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-cyan-500/20 backdrop-blur-sm p-6 rounded-lg border-2 border-cyan-400" style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)' }}>
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cyan-400">
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Role</th>
                  <th className="text-left p-2">Status</th> 
                  <th className="text-left p-2">Liked Quotes</th>
                  <th className="text-left p-2">Created</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-cyan-400/30">
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.name || '-'}</td>
                    <td className="p-2">
                      <span className={user.role === 'admin' ? 'text-red-400 font-bold' : ''}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className={user.isActive ? 'text-green-400' : 'text-red-400 font-bold'}>
                        {user.isActive ? 'Active' : 'Deactivated'}
                      </span>
                    </td>
                    <td className="p-2">{user._count.likedQuotes}</td>
                    <td className="p-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}