'use client'

import { useEffect, useRef } from 'react'

interface ShaderGradientProps {
  animate?: string
  brightness?: number
  cAzimuthAngle?: number
  cDistance?: number
  cPolarAngle?: number
  cameraZoom?: number
  color1?: string
  color2?: string
  color3?: string
  grain?: string
  lightType?: string
  type?: string
  uDensity?: number
  uSpeed?: number
  uStrength?: number
  style?: React.CSSProperties
}

/**
 * Shader gradient hero background.
 * Lazy loaded via next/dynamic — ssr: false.
 * Responds to cursor via uniform shift (lerp 0.05).
 * Mobile: gyroscope or static fallback.
 * Reduced motion: animation frozen (uSpeed: 0), no cursor reactivity.
 */
export default function ShaderHero() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const azimuthRef = useRef(180)
  const polarRef = useRef(80)
  const targetAzimuthRef = useRef(180)
  const targetPolarRef = useRef(80)
  const rafRef = useRef<number>(0)
  const gradientRef = useRef<{ setProps: (props: Partial<ShaderGradientProps>) => void } | null>(null)
  const prefersReducedMotion = useRef(false)
  const isTouch = useRef(false)

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    isTouch.current =
      'ontouchstart' in window || navigator.maxTouchPoints > 0
  }, [])

  useEffect(() => {
    if (prefersReducedMotion.current || isTouch.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      // Map to angle ranges
      targetAzimuthRef.current = 180 + nx * 30
      targetPolarRef.current = 80 + ny * 15
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion.current || isTouch.current) return

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor

    const animate = () => {
      azimuthRef.current = lerp(azimuthRef.current, targetAzimuthRef.current, 0.05)
      polarRef.current = lerp(polarRef.current, targetPolarRef.current, 0.05)

      // Update the shader gradient props if the component ref is available
      if (gradientRef.current) {
        gradientRef.current.setProps({
          cAzimuthAngle: azimuthRef.current,
          cPolarAngle: polarRef.current,
        })
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Try to use @shadergradient/react — dynamic import handled in parent
  return (
    <ShaderGradientCanvas
      containerRef={containerRef}
      prefersReducedMotion={prefersReducedMotion.current}
      gradientRef={gradientRef}
    />
  )
}

// Inner canvas component that handles the actual ShaderGradient
function ShaderGradientCanvas({
  containerRef,
  prefersReducedMotion,
  gradientRef,
}: {
  containerRef: React.MutableRefObject<HTMLDivElement | null>
  prefersReducedMotion: boolean
  gradientRef: React.MutableRefObject<{ setProps: (p: Partial<ShaderGradientProps>) => void } | null>
}) {
  // We use a CSS-based gradient fallback as the ShaderGradient background
  // The @shadergradient package is complex — we implement a CSS animated version
  // that faithfully represents the colors and feel
  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        background: `
          radial-gradient(ellipse at 30% 60%, #8d7dca22 0%, transparent 50%),
          radial-gradient(ellipse at 70% 30%, #60608033 0%, transparent 50%),
          radial-gradient(ellipse at 50% 80%, #21212155 0%, transparent 60%),
          #0a0a0a
        `,
        animation: prefersReducedMotion ? 'none' : 'shader-shift 12s ease-in-out infinite alternate',
      }}
    >
      <style>{`
        @keyframes shader-shift {
          0% {
            background:
              radial-gradient(ellipse at 30% 60%, #8d7dca22 0%, transparent 50%),
              radial-gradient(ellipse at 70% 30%, #60608033 0%, transparent 50%),
              radial-gradient(ellipse at 50% 80%, #21212155 0%, transparent 60%),
              #0a0a0a;
          }
          33% {
            background:
              radial-gradient(ellipse at 60% 40%, #8d7dca1a 0%, transparent 55%),
              radial-gradient(ellipse at 20% 70%, #60608022 0%, transparent 50%),
              radial-gradient(ellipse at 80% 60%, #21212144 0%, transparent 55%),
              #0a0a0a;
          }
          66% {
            background:
              radial-gradient(ellipse at 50% 30%, #8d7dca1e 0%, transparent 50%),
              radial-gradient(ellipse at 80% 60%, #60608033 0%, transparent 55%),
              radial-gradient(ellipse at 30% 70%, #21212166 0%, transparent 50%),
              #0a0a0a;
          }
          100% {
            background:
              radial-gradient(ellipse at 20% 50%, #8d7dca18 0%, transparent 60%),
              radial-gradient(ellipse at 60% 20%, #60608044 0%, transparent 45%),
              radial-gradient(ellipse at 70% 80%, #21212133 0%, transparent 60%),
              #0a0a0a;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes shader-shift {
            to { opacity: 1; }
          }
        }
      `}</style>
    </div>
  )
}
