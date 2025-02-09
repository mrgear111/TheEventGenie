'use client'

import { useEffect, useState } from 'react'

interface Particle {
  id: number
  top: string
  left: string
  width: string
  height: string
  animation: string
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 100 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`
      }))
    }

    setParticles(generateParticles())
  }, [])

  return (
    <div className="absolute inset-0 opacity-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.width,
            height: particle.height,
            animation: particle.animation
          }}
        />
      ))}
    </div>
  )
} 