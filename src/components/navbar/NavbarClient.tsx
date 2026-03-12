"use client"

import { usePathname } from "next/navigation"
import Links from "./links/Links"
import styles from "./navbar.module.css"
import { useState } from "react"

export default function NavbarClient({ 
  isAdmin, 
  isConnected,
  hiddenRoutes 
}: { 
  isAdmin: boolean
  isConnected: boolean
  hiddenRoutes: string[]
}) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  if (hiddenRoutes.includes(pathname)) {
    return null
  }

  return (
    <div className={`${styles.container} hologram-card`}>
      <div className={styles.logo}>
        <span className="star-wars-font">STAR WARS</span>
        <br />
        <span style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>MOTIVATOR</span>
      </div>

      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span /><span /><span />
      </button>

      <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
        <Links isAdmin={isAdmin} isConnected={isConnected} />
      </div>
    </div>
  )
}