'use client'

import { useEffect, useRef } from 'react'

// Ripple interaction layer
// ─────────────────────────────────────────────────────────────────────────────
// z-stack: above BackgroundSystem (-z-10), below content (z-10)
// pointer-events: none — never blocks clicks or hover states
// No React state used — ripple elements are created/removed via DOM directly
//
// FIX (was broken):
//   Old bug: gradient rgba(...,0.07) × animation opacity 0.09 = ~0.006 effective
//   opacity → completely invisible. blur(24px) made it worse.
//   Fix: gradient color at full saturation, element opacity alone controls fade.
// ─────────────────────────────────────────────────────────────────────────────

const RIPPLE_SIZE = 560          // px diameter
const RIPPLE_DURATION = 900      // ms
const MOUSEMOVE_THROTTLE = 32    // ms between mousemove ripples (was 160 — too slow)

export default function BackgroundRipple() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lastMoveTime = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function spawnRipple(x: number, y: number) {
      if (!container) return

      const el = document.createElement('div')
      el.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${RIPPLE_SIZE}px;
        height: ${RIPPLE_SIZE}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(141, 125, 202, 0.4) 0%, transparent 70%);
        filter: blur(12px);
        animation: bg-ripple ${RIPPLE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        pointer-events: none;
        will-change: transform, opacity;
      `
      container.appendChild(el)
      el.addEventListener('animationend', () => el.remove(), { once: true })
    }

    function onMouseMove(e: MouseEvent) {
      const now = Date.now()
      if (now - lastMoveTime.current < MOUSEMOVE_THROTTLE) return
      lastMoveTime.current = now
      spawnRipple(e.clientX, e.clientY)
    }

    function onClick(e: MouseEvent) {
      spawnRipple(e.clientX, e.clientY)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('click', onClick, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes bg-ripple {
          0%   { transform: translate(-50%, -50%) scale(0.1); opacity: 0.3; }
          100% { transform: translate(-50%, -50%) scale(1);   opacity: 0;   }
        }
      `}</style>
      <div
        ref={containerRef}
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />
    </>
  )
}
