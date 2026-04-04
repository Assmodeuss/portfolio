"use client"

import React, { useMemo, useRef, useState } from "react"
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
  onCellClick?: (row: number, col: number) => void
  interactive?: boolean
}

export const BackgroundRippleEffect = ({
  rows = 8,
  cols = 27,
  cellSize = 56,
}: BackgroundRippleEffectProps) => {
  const [clickedCell, setClickedCell] = useState<ClickedCell | null>(null)
  const [rippleKey, setRippleKey] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full",
        // Design-system tokens (dark-mode only — this site has no light mode)
        "[--cell-border-color:#262626] [--cell-fill-color:#0d0d0d] [--cell-shadow-color:#1a1a1a]"
      )}
    >
      {/* overflow-hidden clips the fixed-size grid at viewport edges */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden"
        />
        <DivGrid
          key={`base-${rippleKey}`}
          className="mask-radial-at-top opacity-60"
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
          clickedCell={clickedCell}
          onCellClick={(row, col) => {
            setClickedCell({ row, col })
            setRippleKey((k) => k + 1)
          }}
          interactive
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
  onCellClick = () => {},
  interactive = true,
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
    marginInline: "auto",
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
              "cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform",
              "hover:opacity-80 dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]",
              clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
              !interactive && "pointer-events-none"
            )}
            style={{
              backgroundColor: fillColor,
              borderColor: borderColor,
              ...style,
            }}
            onClick={
              interactive ? () => onCellClick(rowIdx, colIdx) : undefined
            }
          />
        )
      })}
    </div>
  )
}
