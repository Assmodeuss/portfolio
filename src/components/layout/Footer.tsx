import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="content-col section-gap">
      <div
        style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {/* Email */}
        <a
          href="mailto:pratyush@example.com"
          className="text-mono-label animated-underline"
          style={{ color: 'var(--foreground)', display: 'inline-block' }}
        >
          pratyush@example.com
        </a>

        {/* Social links */}
        <div
          className="text-mono-label"
          style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}
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
          <span style={{ color: 'var(--ring)' }}>·</span>
          <Link
            href="/about"
            className="nav-link-underline"
            style={{ color: 'var(--muted-foreground)' }}
          >
            About
          </Link>
        </div>

        {/* Copyright */}
        <p
          className="text-mono-label"
          style={{ color: 'var(--ring)', marginTop: '1rem' }}
        >
          © {year} Pratyush — Shiv Nadar University
        </p>
      </div>
    </footer>
  )
}
