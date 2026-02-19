"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type LikedQuote = {
  id: string
  quote: string
  createdAt: string
}

export default function FavoritesClient() {
  const [quotes, setQuotes] = useState<LikedQuote[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch("/api/quotes/favorites")
        const data = await res.json()
        setQuotes(data.quotes || [])
      } catch (error) {
        console.error("Erreur:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  const handleUnlike = async (quoteId: string, quoteText: string) => {
    try {
      const res = await fetch("/api/quotes/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quote: quoteText })
      })

      if (res.ok) {
        setQuotes(quotes.filter(q => q.id !== quoteId))
      }
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#FFE81F]">
        <p className="text-xl">Chargement de vos citations...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 text-[#FFE81F]">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Mes Citations Favorites</h1>

        {quotes.length === 0 ? (
          <div className="text-center space-y-4">
            <p className="text-gray-300">Aucune citation favorite pour le moment.</p>
            <button
              onClick={() => router.push("/motivator")}
              className="px-6 py-3 bg-[#FFE81F] text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Générer des citations
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="bg-cyan-500/20 backdrop-blur-sm p-6 rounded-lg border-2 border-cyan-400"
                style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)' }}
              >
                <p className="text-lg mb-4 text-center">"{quote.quote}"</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {new Date(quote.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleUnlike(quote.id, quote.quote)}
                    className="text-2xl hover:scale-125 transition-transform"
                    title="Unlike"
                  >
                    ❤️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}