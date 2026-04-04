'use client'

import { useEffect, useRef } from 'react'
import { ShaderGradient } from '@shadergradient/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Tile grid constants
const TILE_SIZE = 50      // px — cell size
const RADIUS = 180        // px — cursor influence radius
const MAX_OPACITY = 0.12  // maximum tile fill opacity when cursor is on top
const LERP = 0.08         // smoothing factor (0.05–0.12 per spec)
const THRESHOLD = 0.002   // skip draw below this opacity

// Accent violet from design tokens: #8d7dca
const TILE_R = 141
const TILE_G = 125
const TILE_B = 202

// Rest-state grid line color
const GRID_LINE = 'rgba(255,255,255,0.015)'

export function BackgroundSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let cols = 0
    let rows = 0
    let opacities: Float32Array = new Float32Array(0)

    // ── Grid initialisation ───────────────────────────────────────────────
    function initGrid() {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas!.width = w
      canvas!.height = h
      cols = Math.ceil(w / TILE_SIZE)
      rows = Math.ceil(h / TILE_SIZE)
      opacities = new Float32Array(cols * rows) // initialized to 0
    }

    initGrid()

    // ── Mouse tracking (ref only — zero re-renders) ───────────────────────
    function onMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    // Reset cursor position when mouse leaves the window
    function onMouseLeave() {
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    // ── Resize handler ────────────────────────────────────────────────────
    function onResize() {
      initGrid()
    }

    window.addEventListener('resize', onResize)

    // ── RAF loop ──────────────────────────────────────────────────────────
    function draw() {
      rafRef.current = requestAnimationFrame(draw)

      const w = canvas!.width
      const h = canvas!.height
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      ctx!.clearRect(0, 0, w, h)

      // Draw static grid lines first (base layer, always visible at very low opacity)
      ctx!.strokeStyle = GRID_LINE
      ctx!.lineWidth = 1
      ctx!.beginPath()
      for (let c = 0; c <= cols; c++) {
        const x = c * TILE_SIZE
        ctx!.moveTo(x, 0)
        ctx!.lineTo(x, h)
      }
      for (let r = 0; r <= rows; r++) {
        const y = r * TILE_SIZE
        ctx!.moveTo(0, y)
        ctx!.lineTo(w, y)
      }
      ctx!.stroke()

      // Update and draw activated tiles
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c
          const cx = (c + 0.5) * TILE_SIZE
          const cy = (r + 0.5) * TILE_SIZE

          const dx = cx - mx
          const dy = cy - my
          const dist = Math.sqrt(dx * dx + dy * dy)

          const target = Math.max(0, 1 - dist / RADIUS) * MAX_OPACITY

          // Lerp current opacity toward target
          opacities[i] += (target - opacities[i]) * LERP

          if (opacities[i] > THRESHOLD) {
            ctx!.fillStyle = `rgba(${TILE_R},${TILE_G},${TILE_B},${opacities[i].toFixed(4)})`
            ctx!.fillRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE)
          }
        }
      }
    }

    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [reducedMotion])

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      aria-hidden="true"
    >
      {/* Layer 1 — Gradient (z-0) */}
      <div className="absolute inset-0 z-0">
        {reducedMotion ? (
          // Static fallback: solid dark background
          <div className="absolute inset-0 bg-[#0a0a0a]" />
        ) : (
          <ShaderGradient
            animate="on"
            axesHelper="off"
            bgColor1="#000000"
            bgColor2="#000000"
            brightness={1.8}
            cAzimuthAngle={180}
            cDistance={2.59}
            cPolarAngle={80}
            cameraZoom={9.1}
            color1="#606080"
            color2="#8d7dca"
            color3="#212121"
            destination="onCanvas"
            embedMode="off"
            envPreset="city"
            format="gif"
            fov={45}
            frameRate={10}
            gizmoHelper="hide"
            grain="on"
            lightType="3d"
            pixelDensity={1}
            positionX={0}
            positionY={0}
            positionZ={0}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0}
            rotationX={50}
            rotationY={0}
            rotationZ={-60}
            shader="defaults"
            type="waterPlane"
            uAmplitude={0}
            uDensity={1.5}
            uFrequency={0}
            uSpeed={0.3}
            uStrength={1.5}
            uTime={8}
            wireframe={false}
            zoomOut={false}
          />
        )}
      </div>

      {/* Layer 2 — Reactive tile grid (z-10) */}
      {!reducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10"
        />
      )}
    </div>
  )
}
