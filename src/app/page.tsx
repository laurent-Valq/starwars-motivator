import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-[#FFE81F] px-4">
      <div className="max-w-3xl text-center space-y-8">
        
        {/* Main Title */}
        <h1 className="text-5xl md:text-6xl font-bold star-wars-font leading-tight">
          Get Your Daily Motivation from a Galaxy Far, Far Away
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-[#FFE81F]" style={{ textShadow: '0 0 4px #FFE81F' }}>
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
          <p className="text-xl md:text-1xl text-[#FFE81F]" style={{ textShadow: '0 0 4px #FFE81F' }}>
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