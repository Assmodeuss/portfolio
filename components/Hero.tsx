'use client'

import { useRef, useEffect } from 'react'

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const mouseXRef = useRef(0)
  const mouseYRef = useRef(0)
  const currentWeightRef = useRef(200)
  const currentItalRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX
      mouseYRef.current = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      const target = 200 + (mouseXRef.current / window.innerWidth) * 700
      const clamped = Math.min(900, Math.max(200, target))
      currentWeightRef.current += (clamped - currentWeightRef.current) * 0.1

      const targetItal = Math.max(0, Math.min(1, mouseYRef.current / window.innerHeight)) * 0.8
      currentItalRef.current += (targetItal - currentItalRef.current) * 0.08

      if (headingRef.current) {
        headingRef.current.style.fontVariationSettings = `"wght" ${currentWeightRef.current.toFixed(2)}, "ital" ${currentItalRef.current.toFixed(4)}, "slnt" ${(-currentItalRef.current * 10).toFixed(4)}`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center">
      <h1
        ref={headingRef}
        data-cursor="active"
        className="text-[clamp(4rem,10vw,10rem)] text-center leading-none text-foreground"
        style={{
          fontFamily: '"bodoni-moda-variable", serif',
          whiteSpace: 'nowrap',
          willChange: 'font-variation-settings',
        }}
      >
        PRATYUSH
      </h1>
      <div className="mt-6">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[#8d7dca]">
          design · systems · craft
        </span>
      </div>
      <div className="absolute bottom-12 flex flex-col items-center animate-pulse-soft">
        <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-ring mb-2">Scroll</span>
        <span className="material-symbols-outlined text-[#8d7dca] text-sm">expand_more</span>
      </div>
    </div>
  )
}
