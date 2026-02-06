import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function HomePage() {
  const session = await auth()
  
  let isAdmin = false
  let userName = null
  
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { name: true, role: true }
    })
    userName = user?.name
    isAdmin = user?.role === "admin"
  }

  // Si connecté
  if (session?.user?.email) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#FFE81F] px-4">
        <div className="max-w-3xl text-center space-y-8">
          
          {/* Welcome Message */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            {userName ? `Welcome, ${userName}!` : "Welcome, young Padawan!"}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-black" style={{ textShadow: '0 0 4px #FFE81F' }}>
            Can you hear the Force?
          </p>

          {/* Primary CTA */}
          <div>
            <Link 
              href="/motivator"
              className="inline-block px-8 py-4 bg-[#FFE81F] text-black font-bold text-xl rounded-lg hover:bg-yellow-300 transition-colors border-2 border-black"
            >
              Go to Motivator
            </Link>
          </div>

          {/* Admin Dashboard Link (only for admin) */}
          {isAdmin && (
            <div className="pt-4">
              <Link 
                href="/admin"
                className="inline-block px-6 py-3 bg-cyan-500/20 backdrop-blur-sm text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/30 transition-colors border-2 border-cyan-400"
                style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}
              >
                Admin Dashboard
              </Link>
            </div>
          )}

        </div>
      </div>
    )
  }

  // Si déconnecté (homepage originale)
  return (
    <div className="min-h-screen flex items-center justify-center text-[#FFE81F] px-4">
      <div className="max-w-3xl text-center space-y-8">
        
        {/* Main Title */}
        <h1 className="text-5xl md:text-6xl font-bold star-wars-font leading-tight">
          Get Your Daily Motivation from a Galaxy Far, Far Away
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-black" style={{ textShadow: '0 0 4px #FFE81F' }}>
          Generate inspiring Star Wars quotes powered by AI
        </p>

        {/* Primary CTA */}
        <div>
          <Link 
            href="/motivator"
            className="inline-block px-8 py-4 bg-[#FFE81F] text-black font-bold text-xl rounded-lg hover:bg-yellow-300 transition-colors border-2 border-black"
          >
            Start Your Journey
          </Link>
        </div>

        {/* Secondary CTA */}
        <div className="pt-8 space-y-4">
          <p className="text-lg text-[#FFE81F]">
            Want to save your favorite quotes?
          </p>
          <Link 
            href="/register"
            className="inline-block px-6 py-3 bg-cyan-500/20 backdrop-blur-sm text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/30 transition-colors border-2 border-cyan-400"
            style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}
          >
            Create Account
          </Link>
        </div>

      </div>
    </div>
  )
}