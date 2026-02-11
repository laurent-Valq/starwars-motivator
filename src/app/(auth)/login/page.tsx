"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        // Vérifier si le compte est désactivé
        const checkDeactivated = await fetch("/api/auth/check-active", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email })
        })
        
        const data = await checkDeactivated.json()
        
        if (!data.isActive) {
          setError(
            "🇬🇧 Your account has been deactivated.\n" +
            "To reactivate it, send an email to admin@starwars-motivator.com with subject: REACTIVATE\n\n" +
            "🇫🇷 Votre compte a été désactivé.\n" +
            "Pour le réactiver, envoyez un email à admin@starwars-motivator.com avec l'objet : REACTIVATE"
          )
        } else {
          setError("Email ou mot de passe invalide | Invalid email or password")
        }
      } else {
        router.push("/")
        router.refresh()
      }

    } catch (error) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-[#FACC15]">
      <div className="w-full max-w-md p-8 space-y-6 bg-cyan-500/20 backdrop-blur-sm rounded-lg shadow-2xl border-2 border-cyan-400" style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)' }}>
        <h1 className="text-4xl font-bold text-center">
          LOGIN
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              style={{
                WebkitBoxShadow: '0 0 0 1000px black inset',
                WebkitTextFillColor: '#FACC15'
              }}
              className="w-full px-4 py-2 bg-black text-[#FACC15] border-2 border-[#FACC15] rounded focus:outline-none focus:ring-2 focus:ring-[#FACC15] [&:-webkit-autofill]:!bg-black [&:-webkit-autofill]:!text-[#FACC15] [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_black]"
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
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FACC15] text-black font-bold rounded hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#FACC15] hover:underline font-bold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}