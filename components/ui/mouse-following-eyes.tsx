"use client"

import { useEffect, useRef } from "react"

interface MouseFollowingEyesProps {
  scrolled?: boolean
}

export default function MouseFollowingEyes({ scrolled = false }: MouseFollowingEyesProps) {
  const leftEyeRef = useRef<HTMLDivElement>(null)
  const rightEyeRef = useRef<HTMLDivElement>(null)
  const leftPupilRef = useRef<HTMLDivElement>(null)
  const rightPupilRef = useRef<HTMLDivElement>(null)

  const mouseTarget = useRef({ x: 0, y: 0 })
  const leftPos = useRef({ x: 0, y: 0 })
  const rightPos = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(0)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseTarget.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMove)

    const getPupilTarget = (eyeRef: React.RefObject<HTMLDivElement>) => {
      if (!eyeRef.current) return { x: 0, y: 0 }
      const rect = eyeRef.current.getBoundingClientRect()
      const dx = mouseTarget.current.x - (rect.left + rect.width / 2)
      const dy = mouseTarget.current.y - (rect.top + rect.height / 2)

      // deadzone
      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) return { x: 0, y: 0 }

      const angle = Math.atan2(dy, dx)
      const maxMove = 6
      return {
        x: Math.cos(angle) * maxMove,
        y: Math.sin(angle) * maxMove,
      }
    }

    const animate = () => {
      const lerp = 0.15

      const leftTarget = getPupilTarget(leftEyeRef)
      leftPos.current.x += (leftTarget.x - leftPos.current.x) * lerp
      leftPos.current.y += (leftTarget.y - leftPos.current.y) * lerp

      const rightTarget = getPupilTarget(rightEyeRef)
      rightPos.current.x += (rightTarget.x - rightPos.current.x) * lerp
      rightPos.current.y += (rightTarget.y - rightPos.current.y) * lerp

      if (leftPupilRef.current) {
        leftPupilRef.current.style.transform = `translate(${leftPos.current.x}px, ${leftPos.current.y}px)`
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.style.transform = `translate(${rightPos.current.x}px, ${rightPos.current.y}px)`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      className={`flex items-center justify-center gap-2 transition-transform duration-300 ease ${
        scrolled ? "scale-75" : "scale-100"
      }`}
    >
      {/* Left Eye */}
      <div
        ref={leftEyeRef}
        className="h-7 w-10 rounded-full bg-white border-2 border-white/20 flex items-center justify-center overflow-hidden"
      >
        <div ref={leftPupilRef} className="h-3 w-3 rounded-full bg-black" />
      </div>

      {/* Right Eye */}
      <div
        ref={rightEyeRef}
        className="h-7 w-10 rounded-full bg-white border-2 border-white/20 flex items-center justify-center overflow-hidden"
      >
        <div ref={rightPupilRef} className="h-3 w-3 rounded-full bg-black" />
      </div>
    </div>
  )
}
