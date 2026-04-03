'use client'

import { useCallback, useState } from 'react'
import type { Project } from '@/lib/projects'
import { ProjectRow } from './ProjectRow'
import { ProjectHoverImage } from './ProjectHoverImage'

interface ProjectListProps {
  projects: Project[]
}

/**
 * Typographic project list with cursor-following hover image.
 * Manages hover state and mouse position at this level.
 */
export function ProjectList({ projects }: ProjectListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleHoverChange = useCallback(
    (index: number | null, x: number, y: number) => {
      setHoveredIndex(index)
      if (x !== 0 || y !== 0) {
        setMousePos({ x, y })
      }
    },
    []
  )

  return (
    <div>
      {projects.map((project, i) => (
        <ProjectRow
          key={project.slug}
          project={project}
          index={i}
          isLast={i === projects.length - 1}
          onHoverChange={handleHoverChange}
        />
      ))}

      <ProjectHoverImage
        projects={projects}
        hoveredIndex={hoveredIndex}
        mouseX={mousePos.x}
        mouseY={mousePos.y}
      />
    </div>
  )
}
