import { auth } from "@/auth"
import { redirect } from "next/navigation"
import FavoritesClient from "./FavoritesClient"

export default async function FavoritesPage() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect("/login")
  }

  return <FavoritesClient />
}