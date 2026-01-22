"use client"

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import styles from "./links/navLink/navLink.module.css"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/")
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className={styles.container}
    >
      Logout
    </button>
  )
}