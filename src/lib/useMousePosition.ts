'use client'

import { useEffect, useRef, useState } from 'react'

interface MousePosition {
  x: number
  y: number
}

/**
 * Returns raw mouse position, updated via mousemove.
 * Used by parent components to pass to lerp-based followers.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    let pendingX = 0
    let pendingY = 0

    const onMouseMove = (e: MouseEvent) => {
      pendingX = e.clientX
      pendingY = e.clientY

      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: pendingX, y: pendingY })
      })
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return position
}
