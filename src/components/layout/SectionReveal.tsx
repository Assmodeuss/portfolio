'use client'

import { useRef, type ReactNode } from 'react'
import { useInView } from '@/lib/useInView'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  threshold?: number
  as?: 'section' | 'div' | 'article' | 'footer'
  style?: React.CSSProperties
  id?: string
}

/**
 * Scroll-triggered clip-path reveal wrapper.
 * Fires once per session via IntersectionObserver with once:true pattern.
 * CSS handles the actual animation — JS only toggles the class.
 */
export function SectionReveal({
  children,
  className = '',
  delay = 0,
  threshold = 0.15,
  as: Tag = 'section',
  style,
  id,
}: SectionRevealProps) {
  const { ref, inView } = useInView({ threshold })

  const combinedStyle: React.CSSProperties = {
    ...(delay > 0 ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : {}),
    ...style,
  }

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement & HTMLDivElement & HTMLElement>}
      id={id}
      className={`section-reveal ${inView ? 'visible' : ''} ${className}`}
      style={Object.keys(combinedStyle).length > 0 ? combinedStyle : undefined}
    >
      {children}
    </Tag>
  )
}
