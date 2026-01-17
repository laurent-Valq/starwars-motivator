"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Something went wrong")
      } else {
        // Redirection vers login après création du compte
        router.push("/login?registered=true")
      }
    } catch (error) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-[#FFE81F]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#1e1e56] rounded-lg shadow-xl border-2 border-[#FFE81F]">
        <h1 className="text-4xl font-bold text-center star-wars-font">
          REGISTER
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name (optional)
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-black text-[#FFE81F] border-2 border-[#FFE81F] rounded focus:outline-none focus:ring-2 focus:ring-[#FFE81F]"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-black text-[#FFE81F] border-2 border-[#FFE81F] rounded focus:outline-none focus:ring-2 focus:ring-[#FFE81F]"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 bg-black text-[#FFE81F] border-2 border-[#FFE81F] rounded focus:outline-none focus:ring-2 focus:ring-[#FFE81F]"
              placeholder="••••••••"
            />
            <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FFE81F] text-black font-bold rounded hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-[#FFE81F] hover:underline font-bold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}