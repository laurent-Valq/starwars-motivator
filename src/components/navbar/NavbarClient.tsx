"use client"

import { usePathname } from "next/navigation"
import Links from "./links/Links"
import styles from "./navbar.module.css"

export default function NavbarClient({ 
  isAdmin, 
  hiddenRoutes 
}: { 
  isAdmin: boolean
  hiddenRoutes: string[]
}) {
  const pathname = usePathname()

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
      <div>
        <Links isAdmin={isAdmin} /> 
      </div>
    </div>
  )
}