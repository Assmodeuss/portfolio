import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Not Found',
}

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 'var(--margin-desktop)',
        paddingRight: 'var(--margin-desktop)',
      }}
    >
      <div>
        <p
          className="text-mono-label"
          style={{ color: 'var(--muted-foreground)', marginBottom: '1rem' }}
        >
          404
        </p>
        <h1
          className="text-h1"
          style={{ color: 'var(--foreground)', marginBottom: '1.5rem' }}
        >
          Page not found
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--muted-foreground)',
            maxWidth: '45ch',
            marginBottom: '2rem',
          }}
        >
          This page doesn&apos;t exist — or it did, and it moved.
        </p>
        <Link
          href="/"
          className="text-mono-label animated-underline"
          style={{ color: 'var(--foreground)', display: 'inline-block' }}
        >
          ← Back to home
        </Link>
      </div>
    </main>
  )
}
