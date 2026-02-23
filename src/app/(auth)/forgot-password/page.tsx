import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-[#FFE81F] px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-cyan-500/20 backdrop-blur-sm rounded-lg shadow-2xl border-2 border-cyan-400" style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)' }}>
        <h1 className="text-4xl font-bold text-center">
          FORGOT PASSWORD
        </h1>

        <div className="space-y-4 text-center">
          <p className="text-gray-300">
            🚧 Feature Coming Soon
          </p>
          
          <div className="bg-black/30 p-4 rounded-lg border border-cyan-400/30">
            <p className="text-sm mb-2">
              🇬🇧 <strong>Temporary solution:</strong>
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Contact an admin at <strong>admin@starwars-motivator.com</strong> to reset your password.
            </p>
            
            <p className="text-sm mb-2">
              🇫🇷 <strong>Solution temporaire :</strong>
            </p>
            <p className="text-xs text-gray-400">
              Contactez un admin à <strong>admin@starwars-motivator.com</strong> pour réinitialiser votre mot de passe.
            </p>
          </div>

          <div className="pt-4">
            <Link 
              href="/login"
              className="text-[#FFE81F] hover:underline font-bold"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}