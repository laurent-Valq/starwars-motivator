import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import NavbarClient from "./NavbarClient"

const hiddenRoutes = ["/motivator"]

export default async function Navbar() {
  const session = await auth()
  
  let isAdmin = false
  let isConnected = false   


  if (session?.user?.email) {
    isConnected = true
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true }
    })
    
    isAdmin = user?.role === "admin"
  }

  return <NavbarClient isAdmin={isAdmin} isConnected={isConnected} hiddenRoutes={hiddenRoutes} />
}