import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import DeactivateButton from "@/components/settings/DeactivateButton"

export default async function SettingsPage() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect("/login")
  }

  // ← vérification
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true }
  })

  const isAdmin = user?.role === "admin"

  return (
    <div className="min-h-screen flex items-center justify-center text-[#FFE81F] px-4">
      <div className="max-w-2xl w-full space-y-8">
        
        <h1 className="text-4xl font-bold text-center">Account Settings</h1>

        <div className="bg-cyan-500/20 backdrop-blur-sm p-8 rounded-lg border-2 border-cyan-400" 
             style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)' }}>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Profile Information</h2>
              <p className="text-gray-300">Email: {session.user.email}</p>
              {session.user.name && (
                <p className="text-gray-300">Name: {session.user.name}</p>
              )}
            </div>

            <hr className="border-cyan-400/30" />
              
            {/* ← Afficher seulement si PAS admin */}
            {!isAdmin && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-red-400">Danger Zone</h2>
                <p className="text-gray-300 mb-4">
                  Deactivating your account will prevent you from logging in. 
                  Your data will be preserved and you can ask an admin to reactivate your account.
                </p>
                <DeactivateButton />
              </div>
            )}

            {/* ← Message pour admin */}
            {isAdmin && (
              <div>
                <p className="text-cyan-400 font-semibold">
                  ⚠️ Administrators cannot deactivate their own accounts for security reasons.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}