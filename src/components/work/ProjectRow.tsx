'use client'

import Link from 'next/link'
import { useCallback, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/projects'
import { TextScramble } from '@/components/shared/TextScramble'
import { AnimatedUnderline } from '@/components/shared/AnimatedUnderline'
import { storeFlipRect } from '@/lib/flip'

interface ProjectRowProps {
  project: Project
  index: number
  isLast: boolean
  onHoverChange: (index: number | null, x: number, y: number) => void
}

/**
 * Individual project list row.
 * Hover: bg glow, title scramble, arrow slide-in, image appears.
 * Click: store flip rect before navigation.
 */
export function ProjectRow({
  project,
  index,
  isLast,
  onHoverChange,
}: ProjectRowProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [scrambleTrigger, setScrambleTrigger] = useState(false)
  const rowRef = useRef<HTMLAnchorElement>(null)

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      setIsHovered(true)
      setScrambleTrigger(true)
      onHoverChange(index, e.clientX, e.clientY)
    },
    [index, onHoverChange]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isHovered) {
        onHoverChange(index, e.clientX, e.clientY)
      }
    },
    [index, isHovered, onHoverChange]
  )

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setScrambleTrigger(false)
    onHoverChange(null, 0, 0)
  }, [onHoverChange])

  const handleClick = useCallback(() => {
    const el = rowRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    storeFlipRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    })
  }, [])

  return (
    <Link
      ref={rowRef}
      href={`/work/${project.slug}`}
      className="project-row"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        display: 'block',
        position: 'relative',
        padding: '20px 0',
        borderTop: '1px solid var(--border)',
        borderBottom: isLast ? '1px solid var(--border)' : 'none',
        textDecoration: 'none',
      }}
    >
      {/* Hover background */}
      <div
        className="project-row-bg"
        style={{
          position: 'absolute',
          inset: 0,
          marginInline: '-1rem',
          paddingInline: '1rem',
          backgroundColor: 'var(--accent-violet-subtle)',
          borderRadius: 'var(--radius)',
          zIndex: 0,
        }}
      />

      {/* Row content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '2rem',
        }}
      >
        {/* Left: title + description */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.375rem',
            }}
          >
            <AnimatedUnderline active={isHovered}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: 'var(--foreground)',
                  lineHeight: 1.3,
                }}
              >
                <TextScramble
                  text={project.title.toUpperCase()}
                  trigger={scrambleTrigger}
                  speed={30}
                />
              </span>
            </AnimatedUnderline>

            {/* Arrow icon — slides in on hover */}
            <span className="project-arrow" style={{ color: 'var(--muted-foreground)', flexShrink: 0 }}>
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </span>
          </div>

          <p
            className="text-body-sm"
            style={{
              color: isHovered ? 'rgba(250,250,250,0.7)' : 'var(--muted-foreground)',
              transition: 'color 300ms var(--ease-out)',
              maxWidth: '55ch',
            }}
          >
            {project.description}
          </p>

          {/* Categories */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginTop: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            {project.categories.map((cat) => (
              <span key={cat} className="text-mono-label" style={{ color: 'var(--ring)' }}>
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Right: year */}
        <div style={{ flexShrink: 0, paddingTop: '0.125rem' }}>
          <span
            className="text-mono-label"
            style={{
              color: isHovered ? 'rgba(250,250,250,0.6)' : 'var(--muted-foreground)',
              transition: 'color 300ms var(--ease-out)',
            }}
          >
            {project.year}
          </span>
        </div>
      </div>
    </Link>
  )
}
