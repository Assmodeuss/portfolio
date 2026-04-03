/**
 * FLIP animation utility — First, Last, Invert, Play.
 * Uses WAAPI (element.animate()) for dynamic start/end values.
 * Progressive enhancement with View Transitions API where available.
 */

export interface FlipRect {
  top: number
  left: number
  width: number
  height: number
}

const STORAGE_KEY = 'flip-rect'

export function storeFlipRect(rect: FlipRect): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(rect))
  } catch {
    // sessionStorage unavailable — FLIP will gracefully degrade
  }
}

export function getFlipRect(): FlipRect | null {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    // One-shot: remove immediately after reading
    sessionStorage.removeItem(STORAGE_KEY)
    return JSON.parse(stored) as FlipRect
  } catch {
    return null
  }
}

/**
 * Plays FLIP animation: element animates from fromRect to its current position.
 * The element must already be in its final (Last) position before calling this.
 */
export function playFlip(element: HTMLElement, fromRect: FlipRect): Animation {
  const toRect = element.getBoundingClientRect()

  const dX = fromRect.left - toRect.left
  const dY = fromRect.top - toRect.top
  const sX = fromRect.width / toRect.width
  const sY = fromRect.height / toRect.height

  return element.animate(
    [
      {
        transform: `translate(${dX}px, ${dY}px) scale(${sX}, ${sY})`,
        borderRadius: '0.625rem',
        transformOrigin: 'top left',
      },
      {
        transform: 'translate(0, 0) scale(1, 1)',
        borderRadius: '0',
        transformOrigin: 'top left',
      },
    ],
    {
      duration: 500,
      easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
      fill: 'forwards',
    }
  )
}

/**
 * Checks if View Transitions API is available.
 * Used for progressive enhancement.
 */
export function supportsViewTransitions(): boolean {
  return typeof document !== 'undefined' && 'startViewTransition' in document
}
