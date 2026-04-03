'use client'

import { createPortal } from 'react-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

interface ContactDrawerProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Bottom sheet contact drawer.
 * Opens with ease-drawer (400ms), closes with ease-in (250ms).
 * Traps focus, prevents body scroll, accessible role="dialog".
 */
export function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const [mounted, setMounted] = useState(false)
  const [closing, setClosing] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const firstFocusRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<Element | null>(null)

  // Hydration guard — portal needs document
  useEffect(() => {
    setMounted(true)
  }, [])

  // Store trigger element to return focus on close
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement
      // Focus first element in drawer
      setTimeout(() => firstFocusRef.current?.focus(), 50)
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      // Return focus to trigger
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus()
      }
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      onClose()
    }, 250)
  }, [onClose])

  // Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose])

  // Focus trap
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return

    const drawer = drawerRef.current
    const focusable = drawer.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [isOpen])

  if (!mounted || (!isOpen && !closing)) return null

  const drawerOpen = isOpen && !closing

  const content = (
    <>
      {/* Overlay */}
      <div
        className={`contact-overlay ${drawerOpen ? 'open' : 'closing'}`}
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 60,
          backgroundColor: 'rgba(10,10,10,0.5)',
        }}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Contact"
        className={`contact-drawer ${drawerOpen ? 'open' : 'closing'}`}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 61,
          maxHeight: '60vh',
          overflow: 'auto',
          backgroundColor: 'color-mix(in srgb, var(--secondary) 95%, transparent)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid var(--border)',
          borderRadius: 'var(--radius) var(--radius) 0 0',
          padding: '3rem var(--margin-desktop)',
        }}
      >
        {/* Close button */}
        <button
          ref={firstFocusRef}
          onClick={handleClose}
          aria-label="Close contact drawer"
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: 'var(--margin-desktop)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--muted-foreground)',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 200ms var(--ease-out)',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--foreground)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--muted-foreground)'
          }}
        >
          <X size={16} strokeWidth={1.5} />
        </button>

        {/* Heading */}
        <h2
          className="text-h2"
          style={{ color: 'var(--foreground)', marginBottom: '1.5rem' }}
        >
          Let&apos;s work together
        </h2>

        {/* Email */}
        <a
          href="mailto:pratyush@example.com"
          className="animated-underline"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
            color: 'var(--foreground)',
            marginBottom: '1.5rem',
          }}
        >
          pratyush@example.com
        </a>

        {/* Social links */}
        <div
          className="text-mono-label"
          style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '2rem' }}
        >
          <a
            href="https://linkedin.com/in/pratyush"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-underline"
            style={{ color: 'var(--muted-foreground)' }}
          >
            LinkedIn
          </a>
          <span style={{ color: 'var(--ring)' }}>·</span>
          <a
            href="https://github.com/pratyush"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-underline"
            style={{ color: 'var(--muted-foreground)' }}
          >
            GitHub
          </a>
          <span style={{ color: 'var(--ring)' }}>·</span>
          <a
            href="https://dribbble.com/pratyush"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-underline"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Dribbble
          </a>
        </div>

        {/* Optional contact form */}
        <ContactForm />
      </div>
    </>
  )

  return createPortal(content, document.body)
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <p className="text-mono-label" style={{ color: 'var(--accent-violet)' }}>
        Message sent — I&apos;ll be in touch.
      </p>
    )
  }

  const inputStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    maxWidth: '480px',
    backgroundColor: 'var(--input)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '0.75rem 1rem',
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    color: 'var(--foreground)',
    outline: 'none',
    transition: 'border-color 200ms var(--ease-out)',
    marginBottom: '0.75rem',
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '480px' }}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={inputStyle}
        onFocus={(e) => (e.target.style.borderColor = 'var(--ring)')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={4}
        style={{ ...inputStyle, resize: 'vertical' }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--ring)')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-foreground)',
          border: 'none',
          borderRadius: 'var(--radius)',
          padding: '0.75rem 1.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: status === 'sending' ? 'wait' : 'pointer',
          opacity: status === 'sending' ? 0.7 : 1,
          transition: 'opacity 200ms var(--ease-out)',
        }}
      >
        {status === 'sending' ? 'Sending...' : 'Send'}
      </button>
      {status === 'error' && (
        <p
          className="text-mono-label"
          style={{ color: 'var(--destructive)', marginTop: '0.5rem' }}
        >
          Something went wrong. Email me directly.
        </p>
      )}
    </form>
  )
}
