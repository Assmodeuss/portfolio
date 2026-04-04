"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"

// CSS custom properties set inline on cells (animation timing only)
type CellVars = { "--delay"?: string; "--duration"?: string }
type CellStyle = React.CSSProperties & CellVars

interface ClickedCell {
  row: number
  col: number
}

interface BackgroundRippleEffectProps {
  rows?: number
  cols?: number
  cellSize?: number
}

interface DivGridProps {
  className?: string
  rows?: number
  cols?: number
  cellSize?: number
  borderColor?: string
  fillColor?: string
  clickedCell?: ClickedCell | null
}

export const BackgroundRippleEffect = ({
  cellSize = 56,
}: BackgroundRippleEffectProps) => {
  const [clickedCell, setClickedCell] = useState<ClickedCell | null>(null)
  const [rippleKey, setRippleKey] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const [rows, setRows] = useState(0)
  const [cols, setCols] = useState(0)

  useEffect(() => {
    const update = () => {
      setRows(Math.ceil(window.innerHeight / cellSize))
      setCols(Math.ceil(window.innerWidth / cellSize))
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [cellSize])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const col = Math.floor((e.clientX - rect.left) / cellSize)
      const row = Math.floor((e.clientY - rect.top) / cellSize)
      setClickedCell({ row, col })
      setRippleKey((k) => k + 1)
    }
    window.addEventListener("click", handler)
    return () => window.removeEventListener("click", handler)
  }, [cellSize])

  if (rows === 0 || cols === 0) return null

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full",
        // Design-system tokens (dark-mode only — this site has no light mode)
        "[--cell-border-color:rgba(255,255,255,0.10)] [--cell-fill-color:rgba(255,255,255,0.05)]"
      )}
    >
      {/* overflow-hidden clips the fixed-size grid at viewport edges */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden"
        />
        <DivGrid
          key={`base-${rippleKey}`}
          className="mask-radial-at-top"
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
          clickedCell={clickedCell}
        />
      </div>
    </div>
  )
}

const DivGrid = ({
  className,
  rows = 7,
  cols = 30,
  cellSize = 56,
  borderColor = "#262626",
  fillColor = "#0d0d0d",
  clickedCell = null,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols]
  )

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
  }

  return (
    <div className={cn("relative z-[3]", className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols)
        const colIdx = idx % cols
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0
        const delay    = clickedCell ? Math.max(0, distance * 55) : 0
        const duration = 200 + distance * 80

        const style: CellStyle = clickedCell
          ? { "--delay": `${delay}ms`, "--duration": `${duration}ms` }
          : {}

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] opacity-20 transition-opacity duration-300 ease-out will-change-transform pointer-events-none",
              "hover:opacity-40",
              clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
            )}
            style={{
              backgroundColor: fillColor,
              borderColor: borderColor,
              ...style,
            }}
          />
        )
      })}
    </div>
  )
}
