'use client'

import { useCallback, useState } from 'react'
import { TextScramble } from '@/components/shared/TextScramble'
import { ScrollIndicator } from './ScrollIndicator'

/**
 * Hero text content — name decode + subtitle fade-up.
 * Name decodes via TextScramble 500ms after mount.
 * Subtitle fades up 600ms after name decode completes.
 * Position: absolute, bottom-left, inside the hero container.
 */
export function HeroContent() {
  const [scrambleTrigger, setScrambleTrigger] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)

  // Start scramble after 500ms delay on mount
  const startScramble = useCallback(() => {
    const timer = setTimeout(() => {
      setScrambleTrigger(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Trigger mount
  const mountRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) startScramble()
    },
    [startScramble]
  )

  const handleScrambleComplete = useCallback(() => {
    // Subtitle fades up after a brief pause post-decode
    setTimeout(() => setShowSubtitle(true), 100)
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        bottom: '3rem',
        left: 'var(--margin-desktop)',
        zIndex: 10,
      }}
    >
      {/* Hero name */}
      <h1
        className="text-hero"
        style={{ color: 'var(--foreground)', lineHeight: 0.95 }}
      >
        <TextScramble
          text="PRATYUSH"
          trigger={scrambleTrigger}
          speed={30}
          onComplete={handleScrambleComplete}
        />
      </h1>

      {/* Subtitle — fades up after decode */}
      <p
        className={`text-mono-label hero-subtitle ${showSubtitle ? 'animate' : ''}`}
        style={{ marginTop: '1rem' }}
      >
        design · systems · craft
      </p>

      <ScrollIndicator />
    </div>
  )
}
