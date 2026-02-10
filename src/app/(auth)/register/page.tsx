"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { validateEmail, validatePassword } from "@/lib/validation"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const emailValidation = validateEmail(email)
  if (!emailValidation.valid) {
    setError(emailValidation.error!)
    setLoading(false)
    return
  }

  const passwordValidation = validatePassword(password)
  if (!passwordValidation.valid) {
    setError(passwordValidation.error!)
    setLoading(false)
    return
  }

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
      <div className="w-full max-w-md p-8 space-y-6 bg-cyan-500/20 backdrop-blur-sm rounded-lg shadow-2xl border-2 border-cyan-400" style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)' }}>
        <h1 className="text-4xl font-bold text-center">
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
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}  
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-black text-[#FFE81F] border-2 border-[#FFE81F] rounded focus:outline-none focus:ring-2 focus:ring-[#FFE81F]"
                placeholder="••••••••"
              />
              {/* ← bouton toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FFE81F] hover:text-yellow-300"
              >
                {showPassword ? "🌕" : "🌑"} 
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre | Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
            </p>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FFE81F] text-black font-bold rounded hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black"
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