'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown } from 'lucide-react'

/**
 * Pulsing scroll indicator at the bottom-center of the hero.
 * Disappears on any scroll (opacity 0, 200ms ease-in).
 */
export function ScrollIndicator() {
  const [hidden, setHidden] = useState(false)
  const hasScrolled = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled.current && window.scrollY > 10) {
        hasScrolled.current = true
        setHidden(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`scroll-indicator ${hidden ? 'hidden' : ''}`}
      style={{
        position: 'absolute',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'var(--ring)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ArrowDown size={16} strokeWidth={1.5} />
    </div>
  )
}
