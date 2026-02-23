"use client"

import { useEffect, useState } from "react"

const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: ['star-small', 'star-medium', 'star-large'][Math.floor(Math.random() * 3)],
    delay: Math.random() * 3
  }))
}

export default function Starfield() {
  const [stars, setStars] = useState<any[]>([])

  useEffect(() => {
    setStars(generateStars(200))
  }, [])

  if (stars.length === 0) return null

  return (
    <div className="starfield">
      {stars.map(star => (
        <div
          key={star.id}
          className={`star ${star.size}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
    </div>
  )
}