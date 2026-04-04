"use client"

import { useState, useEffect } from "react"
import MouseFollowingEyes from "@/components/ui/mouse-following-eyes"

export default function EyesOverlay() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`fixed left-0 right-0 z-[99] pointer-events-none flex items-center justify-center transition-all duration-300 ease ${
        scrolled ? "top-6 h-[42px]" : "top-0 h-[54px]"
      }`}
    >
      <MouseFollowingEyes scrolled={scrolled} />
    </div>
  )
}
