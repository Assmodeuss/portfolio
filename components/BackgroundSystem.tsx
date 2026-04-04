'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'

// ─── Gradient layer ─────────────────────────────────────────────────────────
// Dynamic import with ssr:false — ShaderGradientCanvas creates a WebGL context
// which cannot run on the server.
const GradientLayer = dynamic(() => import('./GradientLayer'), { ssr: false })

// ─── Background Boxes (Aceternity-style) ────────────────────────────────────
// Faithful port of Aceternity's Background Boxes adapted to:
//   • No framer-motion (banned) — proximity driven via RAF + lerp
//   • Design system colors (accent-violet, not rainbow)
//   • Canvas rendering — zero DOM node overhead vs the original 15 000 divs
//
// Visual language mirrors the original:
//   - Subtle grid lines always present (very low opacity)
//   - Individual cells illuminate when cursor comes near
//   - Smooth lerp interpolation, no instant snapping

const CELL  = 72          // px — box size, close to Aceternity's 64px default
const LERP  = 0.08        // within spec 0.05–0.12
const RAD   = 220         // hover influence radius (px)
const CLICK_RAD = 360     // click burst radius — wider than hover
// Active cell: accent-violet fill at this max alpha
const MAX_FILL_ALPHA   = 0.15
// Resting grid lines: drawn once, always visible
const GRID_LINE_ALPHA  = 0.04

interface Cell {
  x:      number  // top-left
  y:      number
  cx:     number  // center
  cy:     number
  energy: number  // 0–1, lerped
}

function BackgroundBoxes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cellsRef  = useRef<Cell[]>([])
  const mouseRef  = useRef({ x: -9999, y: -9999 })
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    // Under reduced-motion: render static grid lines only, no interaction
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const build = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight

      const cols  = Math.ceil(canvas.width  / CELL) + 1
      const rows  = Math.ceil(canvas.height / CELL) + 1
      const cells: Cell[] = []

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({
            x:  c * CELL,
            y:  r * CELL,
            cx: c * CELL + CELL / 2,
            cy: r * CELL + CELL / 2,
            energy: 0,
          })
        }
      }
      cellsRef.current = cells
    }

    // Draw the resting grid lines (called once, and again on resize)
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = `rgba(141,125,202,${GRID_LINE_ALPHA})`
      ctx.lineWidth   = 0.5

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += CELL) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += CELL) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    build()

    if (reduced) {
      // Static fallback: grid only, no interaction
      drawGrid()
      const onResize = () => { build(); drawGrid() }
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }

    // ── Interactive loop ─────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    // Click burst — immediate energy spike on all tiles within CLICK_RAD.
    // The lerp loop naturally decays them back; no extra animation needed.
    const onClick = (e: MouseEvent) => {
      const { clientX: cx, clientY: cy } = e
      const cells = cellsRef.current
      for (let i = 0; i < cells.length; i++) {
        const c   = cells[i]
        const dx  = c.cx - cx
        const dy  = c.cy - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < CLICK_RAD) {
          const burst = 1 - dist / CLICK_RAD
          if (burst > c.energy) c.energy = burst
        }
      }
    }

    const onResize = () => { build() }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('click',     onClick)
    window.addEventListener('resize',    onResize)

    const loop = () => {
      const { x: mx, y: my } = mouseRef.current
      const cells = cellsRef.current
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      // 1. Draw static grid lines first (base layer)
      ctx.strokeStyle = `rgba(141,125,202,${GRID_LINE_ALPHA})`
      ctx.lineWidth   = 0.5
      for (let x = 0; x <= w; x += CELL) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
      }
      for (let y = 0; y <= h; y += CELL) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
      }

      // 2. Draw illuminated cells on top
      for (let i = 0; i < cells.length; i++) {
        const c   = cells[i]
        const dx  = c.cx - mx
        const dy  = c.cy - my
        const dist    = Math.sqrt(dx * dx + dy * dy)
        const target  = dist < RAD ? 1 - dist / RAD : 0

        c.energy += (target - c.energy) * LERP

        if (c.energy > 0.004) {
          const alpha = c.energy * MAX_FILL_ALPHA
          ctx.fillStyle = `rgba(141,125,202,${alpha.toFixed(4)})`
          // +1 inset so fill sits inside the grid lines
          ctx.fillRect(c.x + 1, c.y + 1, CELL - 2, CELL - 2)
        }
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click',     onClick)
      window.removeEventListener('resize',    onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      aria-hidden="true"
    />
  )
}

// ─── Background system ──────────────────────────────────────────────────────
// Fixed, full-screen, -z-10 so all page content sits above it naturally.
//
// z-index stack inside the wrapper (DOM order, no explicit z-index needed):
//   [0] GradientLayer  — ShaderGradient / WebGL canvas (base)
//   [1] BackgroundBoxes — interactive tile canvas (above gradient)
export default function BackgroundSystem() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10"
      aria-hidden="true"
    >
      {/* Layer 1 — Gradient */}
      <div className="absolute inset-0">
        <GradientLayer />
      </div>

      {/* Layer 2 — Reactive tile grid (Aceternity Background Boxes) */}
      <div className="absolute inset-0">
        <BackgroundBoxes />
      </div>
    </div>
  )
}
