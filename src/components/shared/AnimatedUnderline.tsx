import type { ReactNode } from 'react'

interface AnimatedUnderlineProps {
  children: ReactNode
  className?: string
  active?: boolean
  color?: 'violet' | 'foreground'
}

/**
 * Left-to-right underline reveal on hover.
 * Uses CSS ::after pseudo-element scaled from scaleX(0) to scaleX(1).
 * Two variants: violet (for links) and foreground (for nav).
 */
export function AnimatedUnderline({
  children,
  className = '',
  active = false,
  color = 'violet',
}: AnimatedUnderlineProps) {
  const cls =
    color === 'violet' ? 'animated-underline' : 'nav-link-underline'

  return (
    <span className={`${cls} ${active ? 'active' : ''} ${className}`}>
      {children}
    </span>
  )
}
