'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { Project } from '@/lib/projects'
import { useLerpValue } from '@/lib/useLerpValue'

interface ProjectHoverImageProps {
  projects: Project[]
  hoveredIndex: number | null
  mouseX: number
  mouseY: number
}

/**
 * Cursor-following project thumbnail.
 * Follows mouse with lerp factor 0.15 (fast, snappy).
 * Only renders on pointer-capable devices (not touch).
 * Reduced motion: no lerp, direct position.
 */
export function ProjectHoverImage({
  projects,
  hoveredIndex,
  mouseX,
  mouseY,
}: ProjectHoverImageProps) {
  const [isPointerDevice, setIsPointerDevice] = useState(false)
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    // Only show on devices that have a fine pointer (mouse/trackpad)
    setIsPointerDevice(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  const factor = prefersReducedMotion.current ? 1 : 0.15
  const smoothed = useLerpValue(mouseX, mouseY, factor)

  if (!isPointerDevice) return null

  const isVisible = hoveredIndex !== null

  return (
    <div
      aria-hidden="true"
      className={`project-hover-image ${isVisible ? 'visible' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        width: '280px',
        height: '180px',
        transform: `translate3d(${smoothed.x + 20}px, ${smoothed.y - 100}px, 0)`,
        pointerEvents: 'none',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'linear-gradient(to top, rgba(10,10,10,0.2), transparent)',
        }}
      />

      {projects.map((project, i) => (
        <div
          key={project.slug}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: hoveredIndex === i ? 1 : 0,
            transform: `scale(${hoveredIndex === i ? 1 : 1.1})`,
            filter: hoveredIndex === i ? 'none' : 'blur(10px)',
            transition:
              'opacity 500ms var(--ease-out), transform 500ms var(--ease-out), filter 500ms var(--ease-out)',
          }}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="280px"
            style={{ objectFit: 'cover' }}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  )
}
