'use client'

import Script from 'next/script'
import { useEffect, useRef } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'shader-gradient': { [key: string]: unknown }
    }
  }
}

// ─── Tile grid constants ───────────────────────────────────────────────────
const TILE_SIZE = 80          // px — grid cell size
const MAX_OPACITY = 0.06      // tile fill at full activation (very subtle)
const RADIUS = 200            // px — cursor influence radius
const LERP = 0.08             // smooth factor, within spec 0.05–0.12

interface Tile {
  x: number   // top-left corner
  y: number
  cx: number  // center (used for distance calc)
  cy: number
  energy: number  // current animated value 0–1
}

// ─── Tile grid ─────────────────────────────────────────────────────────────
function TileGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tilesRef  = useRef<Tile[]>([])
  const mouseRef  = useRef({ x: -9999, y: -9999 })
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    // Respect prefers-reduced-motion — no interaction at all
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Build or rebuild the tile grid to match current viewport
    const buildGrid = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight

      const cols  = Math.ceil(window.innerWidth  / TILE_SIZE)
      const rows  = Math.ceil(window.innerHeight / TILE_SIZE)
      const tiles: Tile[] = []

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          tiles.push({
            x:      c * TILE_SIZE,
            y:      r * TILE_SIZE,
            cx:     c * TILE_SIZE + TILE_SIZE / 2,
            cy:     r * TILE_SIZE + TILE_SIZE / 2,
            energy: 0,
          })
        }
      }
      tilesRef.current = tiles
    }

    buildGrid()

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const onResize = () => buildGrid()

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize',    onResize)

    // ── RAF animation loop ──────────────────────────────────────────────
    const loop = () => {
      const { x: mx, y: my } = mouseRef.current
      const tiles = tilesRef.current

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < tiles.length; i++) {
        const t = tiles[i]
        const dx = t.cx - mx
        const dy = t.cy - my
        const dist   = Math.sqrt(dx * dx + dy * dy)
        const target = dist < RADIUS ? 1 - dist / RADIUS : 0

        // Lerp toward target — no snapping
        t.energy += (target - t.energy) * LERP

        if (t.energy > 0.005) {
          const alpha = t.energy * MAX_OPACITY
          // 1px gap between tiles; fill with accent-violet at low alpha
          ctx.fillStyle = `rgba(141,125,202,${alpha.toFixed(4)})`
          ctx.fillRect(t.x + 1, t.y + 1, TILE_SIZE - 2, TILE_SIZE - 2)
        }
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize',    onResize)
    }
  }, [])

  // Canvas is always in the DOM to avoid hydration mismatch;
  // the loop just never starts under reduced-motion.
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      aria-hidden="true"
    />
  )
}

// ─── Background system ──────────────────────────────────────────────────────
// Layer stack (inside wrapper at -z-10):
//   [0] shader-gradient  — fills container via globals.css rule
//   [1] TileGrid canvas  — drawn on top in DOM order
//
// Content above this sits at z-auto (normal flow) or explicit z-index values,
// both of which appear above a fixed element at z-index: -10.
export default function BackgroundSystem() {
  return (
    <>
      {/* ShaderGradient web component runtime — loaded after hydration */}
      <Script
        src="https://unpkg.com/@shadergradient/react@1.1.2/dist/index.js"
        strategy="afterInteractive"
      />

      {/* Fixed full-screen background — behind all page content */}
      <div className="fixed inset-0 pointer-events-none -z-10" aria-hidden="true">

        {/* ── Layer 1: Gradient (base) ─────────────────────────────────── */}
        <div className="absolute inset-0">
          <shader-gradient
            animate="on"
            axeshelper="off"
            bgcolor1="#000000"
            bgcolor2="#000000"
            brightness="1.8"
            cazimuthangle="180"
            cdistance="2.59"
            cpolarangle="80"
            camerazoom="9.1"
            color1="#606080"
            color2="#8d7dca"
            color3="#212121"
            destination="onCanvas"
            embedmode="off"
            envpreset="city"
            format="gif"
            fov="45"
            framerate="10"
            gizmohelper="hide"
            grain="on"
            lighttype="3d"
            pixeldensity="1"
            positionx="0"
            positiony="0"
            positionz="0"
            range="disabled"
            rangeend="40"
            rangestart="0"
            reflection="0"
            rotationx="50"
            rotationy="0"
            rotationz="-60"
            shader="defaults"
            type="waterPlane"
            uamplitude="0"
            udensity="1.5"
            ufrequency="0"
            uspeed="0.3"
            ustrength="1.5"
            utime="8"
            wireframe="false"
            zoomout="false"
          />
        </div>

        {/* ── Layer 2: Reactive tile grid (interaction) ────────────────── */}
        <div className="absolute inset-0">
          <TileGrid />
        </div>

      </div>
    </>
  )
}
