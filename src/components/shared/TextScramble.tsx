'use client'

import { useCallback, useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*'

interface TextScrambleProps {
  text: string
  trigger: boolean
  speed?: number
  className?: string
  onComplete?: () => void
}

/**
 * Decryption-style text scramble animation.
 * Characters resolve left-to-right progressively.
 * Spaces are never scrambled.
 * Reduced motion: skips scramble, renders final text with opacity fade.
 */
export function TextScramble({
  text,
  trigger,
  speed = 30,
  className = '',
  onComplete,
}: TextScrambleProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const frameRef = useRef<number>(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
  }, [])

  const renderFrame = useCallback(
    (frame: number, totalFrames: number) => {
      const el = containerRef.current
      if (!el) return

      const resolvedCount = Math.floor((frame / totalFrames) * text.length)

      el.innerHTML = text
        .split('')
        .map((char, i) => {
          if (char === ' ') {
            return '<span class="resolved"> </span>'
          }
          if (i < resolvedCount) {
            return `<span class="resolved">${char}</span>`
          }
          const random = CHARS[Math.floor(Math.random() * CHARS.length)]
          return `<span class="scrambling" aria-hidden="true">${random}</span>`
        })
        .join('')
    },
    [text]
  )

  useEffect(() => {
    if (!trigger) return

    const el = containerRef.current
    if (!el) return

    // Reduced motion: skip scramble, just show final text
    if (prefersReducedMotion.current) {
      el.style.opacity = '1'
      el.textContent = text
      onComplete?.()
      return
    }

    const totalFrames = text.length * 3
    frameRef.current = 0

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      frameRef.current += 1
      renderFrame(frameRef.current, totalFrames)

      if (frameRef.current >= totalFrames) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        // Render final resolved state
        if (el) {
          el.innerHTML = text
            .split('')
            .map((char) => `<span class="resolved">${char}</span>`)
            .join('')
        }
        onComplete?.()
      }
    }, speed)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [trigger, text, speed, renderFrame, onComplete])

  return (
    <span
      ref={containerRef}
      className={className}
      aria-label={text}
      style={{ display: 'inline-block' }}
    >
      {text}
    </span>
  )
}
