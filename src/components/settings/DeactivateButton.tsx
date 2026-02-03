"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function DeactivateButton() {
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDeactivate = async () => {
    setLoading(true)
    
    try {
      const res = await fetch("/api/user/deactivate", {
        method: "POST"
      })

      if (res.ok) {
        // Déconnecter l'utilisateur
        await signOut({ redirect: false })
        router.push("/")
        router.refresh()
      } else {
        alert("Erreur lors de la désactivation")
      }
    } catch (error) {
      console.error(error)
      alert("Erreur lors de la désactivation")
    } finally {
      setLoading(false)
    }
  }

  if (!showConfirm) {
    return (
      <button
        onClick={() => setShowConfirm(true)}
        className="px-6 py-3 bg-red-500/80 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors border-2 border-red-700"
      >
        Deactivate Account
      </button>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-red-400 font-bold">
        ⚠️ Are you sure? This action will deactivate your account.
      </p>
      <div className="flex gap-4">
        <button
          onClick={handleDeactivate}
          disabled={loading}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Deactivating..." : "Yes, Deactivate"}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={loading}
          className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}