'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

interface NavProps {
  onContactClick: () => void
}

/**
 * Navigation bar with scroll-responsive compression.
 * Default: full-width transparent, 64px tall.
 * Scrolled (>100px): centered blurred pill, 48px tall, max-width 480px.
 * Mobile: always in compact pill state, fixed to bottom.
 */
export function Nav({ onContactClick }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 100)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const isCompact = scrolled || isMobile

  const linkStyle = (href: string): React.CSSProperties => ({
    color: pathname === href ? 'var(--foreground)' : 'var(--muted-foreground)',
    transition: 'color 200ms var(--ease-out)',
  })

  if (isCompact) {
    return (
      <header
        style={{
          position: 'fixed',
          ...(isMobile
            ? { bottom: '12px', top: 'auto' }
            : { top: '12px' }),
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          height: isMobile ? '44px' : 'var(--nav-height-compact)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          padding: isMobile ? '0 1rem' : '0 1.5rem',
          backgroundColor: 'color-mix(in srgb, var(--secondary) 80%, transparent)',
          backdropFilter: 'blur(12px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(12px) saturate(1.2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          transition: 'all 300ms var(--ease-out)',
          whiteSpace: 'nowrap',
        }}
      >
        <Link
          href="/"
          className="text-mono-nav"
          style={linkStyle('/')}
        >
          pratyush
        </Link>
        <span style={{ color: 'var(--ring)', fontSize: '0.75rem' }}>·</span>
        <Link
          href="/#work"
          className="text-mono-nav nav-link-underline"
          style={{ color: 'var(--muted-foreground)' }}
        >
          Work
        </Link>
        <span style={{ color: 'var(--ring)', fontSize: '0.75rem' }}>·</span>
        <Link
          href="/about"
          className="text-mono-nav nav-link-underline"
          style={linkStyle('/about')}
        >
          About
        </Link>
        <span style={{ color: 'var(--ring)', fontSize: '0.75rem' }}>·</span>
        <button
          onClick={onContactClick}
          className="text-mono-nav nav-link-underline"
          style={{
            color: 'var(--muted-foreground)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            font: 'inherit',
            letterSpacing: 'inherit',
          }}
        >
          Contact
        </button>
      </header>
    )
  }

  // Default (top of page, desktop)
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--margin-desktop)',
        background: 'transparent',
        transition: 'all 300ms var(--ease-out)',
      }}
    >
      <Link
        href="/"
        className="text-mono-nav"
        style={linkStyle('/')}
      >
        pratyush
      </Link>

      <nav aria-label="Site navigation">
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            listStyle: 'none',
          }}
        >
          <li>
            <Link
              href="/#work"
              className="text-mono-nav nav-link-underline"
              style={{ color: 'var(--muted-foreground)', transition: 'color 200ms var(--ease-out)' }}
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-mono-nav nav-link-underline"
              style={linkStyle('/about')}
            >
              About
            </Link>
          </li>
          <li>
            <button
              onClick={onContactClick}
              className="text-mono-nav nav-link-underline"
              style={{
                color: 'var(--muted-foreground)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                font: 'inherit',
                letterSpacing: 'inherit',
                transition: 'color 200ms var(--ease-out)',
              }}
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
