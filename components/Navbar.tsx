"use client"

import { useState, useEffect } from "react"

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
      className={`fixed z-[100] transition-all duration-300 ease-in-out ${
        scrolled
          ? "top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[720px] rounded-full backdrop-blur-md bg-black/20 border border-white/10"
          : "top-0 left-0 right-0 h-16 bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center max-w-[720px] mx-auto px-6 w-full h-full py-3">
        {/* 19.4:1 ✓ */}
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
