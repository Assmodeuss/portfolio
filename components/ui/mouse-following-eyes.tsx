"use client"

import { useState, useEffect, useRef } from "react"

export default function MouseFollowingEyes() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const leftEyeRef = useRef<HTMLDivElement>(null)
  const rightEyeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  const getPupilPosition = (eyeRef: React.RefObject<HTMLDivElement>) => {
    if (!eyeRef.current) return { x: 0, y: 0 }

    const rect = eyeRef.current.getBoundingClientRect()
    const eyeCenterX = rect.left + rect.width / 2
    const eyeCenterY = rect.top + rect.height / 2

    const dx = mousePos.x - eyeCenterX
    const dy = mousePos.y - eyeCenterY
    const angle = Math.atan2(dy, dx)
    const maxMove = 6

    return {
      x: Math.cos(angle) * maxMove,
      y: Math.sin(angle) * maxMove,
    }
  }

  const leftPupil = getPupilPosition(leftEyeRef)
  const rightPupil = getPupilPosition(rightEyeRef)

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Left Eye */}
      <div
        ref={leftEyeRef}
        className="h-10 w-10 rounded-full bg-white flex items-center justify-center"
      >
        <div
          className="h-4 w-4 rounded-full bg-black"
          style={{
            transform: `translate(${leftPupil.x}px, ${leftPupil.y}px)`,
          }}
        />
      </div>

      {/* Right Eye */}
      <div
        ref={rightEyeRef}
        className="h-10 w-10 rounded-full bg-white flex items-center justify-center"
      >
        <div
          className="h-4 w-4 rounded-full bg-black"
          style={{
            transform: `translate(${rightPupil.x}px, ${rightPupil.y}px)`,
          }}
        />
      </div>
    </div>
  )
}
