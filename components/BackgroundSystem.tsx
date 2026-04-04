'use client'

import dynamic from 'next/dynamic'

// Dynamic import with ssr:false — ShaderGradientCanvas creates a WebGL context
// which cannot run on the server.
const GradientLayer = dynamic(() => import('./GradientLayer'), { ssr: false })

// ─── Background system ──────────────────────────────────────────────────────
// Fixed, full-screen, -z-10 — behind all page content.
//
// Layer stack (DOM order → visual order):
//   [0] GradientLayer  — ShaderGradient / WebGL canvas (base)
//   [1] Dark overlay   — bg-black/50 scrim for readability
export default function BackgroundSystem() {
  return (
    <div
      className="fixed inset-0 -z-10"
      aria-hidden="true"
    >
      {/* Layer 1 — Gradient (purely visual, no events) */}
      <div className="absolute inset-0 pointer-events-none">
        <GradientLayer />
      </div>

      {/* Layer 2 — Dark overlay (reduces gradient intensity, improves readability) */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />
    </div>
  )
}
