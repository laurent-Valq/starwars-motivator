"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  email: string
  name: string | null
  role: string
  isActive: boolean
  createdAt: Date
  _count: {
    likedQuotes: number
  }
}

export default function AdminDashboard({ 
  users, 
  totalUsers, 
  totalLikedQuotes, 
  currentAdminId 
}: { 
  users: User[]
  totalUsers: number
  totalLikedQuotes: number
  currentAdminId: string
}) {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleReactivate = async (userId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir réactiver ce compte ?")) return
    
    setLoading(userId)
    try {
      const res = await fetch("/api/admin/reactivate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
      })

      if (res.ok) {
        router.refresh()
      } else {
        alert("Erreur lors de la réactivation")
      }
    } catch (error) {
      console.error(error)
      alert("Erreur lors de la réactivation")
    } finally {
      setLoading(null)
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm("⚠️ ATTENTION : Cette action est DÉFINITIVE. Supprimer ce compte ?")) return
    
    setLoading(userId)
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
      })

      const data = await res.json()

      if (res.ok) {
        router.refresh()
      } else {
        alert(data.error || "Erreur lors de la suppression")
      }
    } catch (error) {
      console.error(error)
      alert("Erreur lors de la suppression")
    } finally {
      setLoading(null)
    }
  }

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
                  <th className="text-left p-2">Actions</th>
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
                    <td className="p-2">
                      <div className="flex gap-2">
                        {!user.isActive && (
                          <button
                            onClick={() => handleReactivate(user.id)}
                            disabled={loading === user.id}
                            className="px-3 py-1 bg-green-500/80 text-white text-sm rounded hover:bg-green-600 transition-colors disabled:opacity-50"
                          >
                            {loading === user.id ? "..." : "Reactivate"}
                          </button>
                        )}
                        {user.id !== currentAdminId && (
                          <button
                            onClick={() => handleDelete(user.id)}
                            disabled={loading === user.id}
                            className="px-3 py-1 bg-red-500/80 text-white text-sm rounded hover:bg-red-600 transition-colors disabled:opacity-50"
                          >
                            {loading === user.id ? "..." : "Delete"}
                          </button>
                        )}
                      </div>
                    </td>
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