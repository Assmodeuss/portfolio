'use client'

import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
}

/**
 * IntersectionObserver hook with once: true pattern.
 * Section animations fire once when first scrolled into view.
 * Scrolling back up does NOT re-trigger.
 */
export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.15, rootMargin = '0px' } = options
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          // Once triggered, stop observing (one-shot)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
  }, [threshold, rootMargin])

  return { ref, inView }
}
