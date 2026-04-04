"use client"

import { useState, useEffect } from "react"
import MouseFollowingEyes from "@/components/ui/mouse-following-eyes"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed z-[100] transition-all duration-300 ease left-1/2 -translate-x-1/2 ${
        scrolled
          ? "top-6 w-[720px] rounded-full backdrop-blur-md bg-black/20"
          : "top-0 w-full bg-transparent"
      }`}
    >
      {/* Border overlay — fades in separately to prevent stroke flash during transition */}
      <div
        className={`absolute inset-0 rounded-full border border-white/10 pointer-events-none transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Eyes — absolute to <nav>, fully independent of flex layout */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <MouseFollowingEyes scrolled={scrolled} />
      </div>

      <div className={`relative flex justify-between items-center w-full ${scrolled ? "px-6 py-3" : "px-[5.5rem] pt-6 pb-3"}`}>
        <div className="font-mono font-bold text-foreground tracking-widest text-sm">PRATYUSH</div>
        <div className="flex gap-6 items-center">
          <div className="hidden md:flex gap-8">
            {/* Active link — accent-violet 5.2:1 ✓ */}
            <a data-cursor="active" className="text-[#8d7dca] font-bold font-label tracking-tighter uppercase text-xs" href="#">Work</a>
            {/* Inactive links — muted-foreground 9.1:1 ✓ */}
            <a data-cursor="active" className="text-muted-foreground hover:text-[#8d7dca] transition-colors duration-300 font-label tracking-tighter uppercase text-xs" href="#">About</a>
            <a data-cursor="active" className="text-muted-foreground hover:text-[#8d7dca] transition-colors duration-300 font-label tracking-tighter uppercase text-xs" href="#">Studio</a>
            <a data-cursor="active" className="text-muted-foreground hover:text-[#8d7dca] transition-colors duration-300 font-label tracking-tighter uppercase text-xs" href="#">Lab</a>
          </div>
          <button data-cursor="active" className="text-[#8d7dca] font-label tracking-tighter uppercase text-xs scale-95 transition-transform duration-200">Contact</button>
        </div>
      </div>
    </nav>
  )
}
