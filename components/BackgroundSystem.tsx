'use client'

import dynamic from 'next/dynamic'
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'

// Dynamic import with ssr:false — ShaderGradientCanvas creates a WebGL context
// which cannot run on the server.
const GradientLayer = dynamic(() => import('./GradientLayer'), { ssr: false })

// ─── Background system ──────────────────────────────────────────────────────
// Fixed, full-screen, -z-10 — behind all page content.
//
// pointer-events-none is on the gradient layer only.
// The tile grid (BackgroundRippleEffect) needs pointer-events-auto so that
// hover and click states fire. Content at higher z-index intercepts its own
// events first; the grid only receives events on uncovered background areas.
//
// Layer stack (DOM order → visual order):
//   [0] GradientLayer      — ShaderGradient / WebGL canvas (base)
//   [1] BackgroundRippleEffect — Aceternity tile grid (interactive, above gradient)
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

      {/* Layer 2 — Reactive tile grid */}
      {/* rows/cols sized to cover 1920×1080 at cellSize=56:
          37 cols × 56 = 2072px, 22 rows × 56 = 1232px */}
      <BackgroundRippleEffect rows={22} cols={37} cellSize={56} />
    </div>
  )
}
