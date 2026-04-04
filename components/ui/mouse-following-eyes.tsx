"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"

interface MouseFollowingEyesProps {
  scrolled?: boolean
}

const MouseFollowingEyes: React.FC<MouseFollowingEyesProps> = ({ scrolled = false }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const eye1Ref = useRef<HTMLDivElement>(null)
  const eye2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <div
      className={`flex items-center justify-center gap-2 transition-transform duration-300 ease ${
        scrolled ? "scale-75" : "scale-100"
      }`}
    >
      <Eye
        mouseX={mousePos.x}
        mouseY={mousePos.y}
        selfRef={eye1Ref as React.RefObject<HTMLDivElement>}
        otherRef={eye2Ref as React.RefObject<HTMLDivElement>}
      />
      <Eye
        mouseX={mousePos.x}
        mouseY={mousePos.y}
        selfRef={eye2Ref as React.RefObject<HTMLDivElement>}
        otherRef={eye1Ref as React.RefObject<HTMLDivElement>}
      />
    </div>
  )
}

interface EyeProps {
  mouseX: number
  mouseY: number
  selfRef: React.RefObject<HTMLDivElement>
  otherRef: React.RefObject<HTMLDivElement>
}

const Eye: React.FC<EyeProps> = ({ mouseX, mouseY, selfRef, otherRef }) => {
  const pupilRef = useRef<HTMLDivElement>(null)
  const [center, setCenter] = useState({ x: 0, y: 0 })

  const updateCenter = () => {
    if (!selfRef.current) return
    const rect = selfRef.current.getBoundingClientRect()
    setCenter({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
  }

  useEffect(() => {
    updateCenter()
    window.addEventListener("resize", updateCenter)
    return () => window.removeEventListener("resize", updateCenter)
  }, [])

  useEffect(() => {
    updateCenter()

    const isInside = (ref: React.RefObject<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return false
      return mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom
    }

    if (isInside(selfRef) || isInside(otherRef)) return

    const dx = mouseX - center.x
    const dy = mouseY - center.y
    const angle = Math.atan2(dy, dx)

    const maxMove = 6
    const pupilX = Math.cos(angle) * maxMove
    const pupilY = Math.sin(angle) * maxMove

    if (pupilRef.current) {
      pupilRef.current.style.transform = `translate(${pupilX}px, ${pupilY}px)`
    }
  }, [mouseX, mouseY])

  return (
    <div
      ref={selfRef}
      className="relative bg-white border-2 border-white/20 flex-shrink-0 flex items-center justify-center"
      style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%' }}
    >
      <div
        ref={pupilRef}
        className="absolute bg-black rounded-full h-3 w-3 transition-all duration-75"
      >
        <div className="w-1 h-1 bg-white rounded-full absolute bottom-0.5 right-0.5" />
      </div>
    </div>
  )
}

export default MouseFollowingEyes
