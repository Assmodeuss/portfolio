'use client'

import { useEffect, useRef, useState } from 'react'
import { lerp } from './lerp'

/**
 * Smoothly interpolates a 2D value toward a target using requestAnimationFrame.
 * Used for cursor-tracking elements (project hover image).
 * Factor 0.15 = fast follow, 0.05 = slow dreamlike follow.
 */
export function useLerpValue(
  targetX: number,
  targetY: number,
  factor: number = 0.15
): { x: number; y: number } {
  const [smoothed, setSmoothed] = useState({ x: targetX, y: targetY })
  const current = useRef({ x: targetX, y: targetY })
  const rafRef = useRef<number>(0)
  const target = useRef({ x: targetX, y: targetY })

  useEffect(() => {
    target.current = { x: targetX, y: targetY }
  }, [targetX, targetY])

  useEffect(() => {
    const animate = () => {
      const dx = target.current.x - current.current.x
      const dy = target.current.y - current.current.y

      // Stop updating if close enough to avoid unnecessary renders
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }

      current.current.x = lerp(current.current.x, target.current.x, factor)
      current.current.y = lerp(current.current.y, target.current.y, factor)

      setSmoothed({ x: current.current.x, y: current.current.y })
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [factor])

  return smoothed
}
