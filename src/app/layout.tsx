import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Grain } from '@/components/layout/Grain'
import { NavWrapper } from './NavWrapper'

/**
 * Font strategy: system fonts as base, custom fonts loaded via CSS @font-face
 * when self-hosted files are available in /public/fonts/.
 * The CSS token --font-display, --font-body, --font-mono cascade to system fallbacks.
 *
 * To add PP Neue Montreal / Satoshi / Switzer / JetBrains Mono:
 * Place font files in /public/fonts/ and add @font-face rules to tokens.css.
 * See visual-system-guide.md §2.1 for font stack details.
 */

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pratyush.design'
  ),
  title: {
    default: 'Pratyush — Design Portfolio',
    template: '%s — Pratyush',
  },
  description:
    'Design portfolio of Pratyush — UX, visual design, typography, branding, and spatial design.',
  keywords: ['design', 'portfolio', 'UX', 'visual design', 'branding', 'typography'],
  authors: [{ name: 'Pratyush' }],
  creator: 'Pratyush',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Pratyush — Design Portfolio',
    title: 'Pratyush — Design Portfolio',
    description:
      'Design portfolio of Pratyush — UX, visual design, typography, branding, and spatial design.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pratyush — Design Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pratyush — Design Portfolio',
    description:
      'Design portfolio of Pratyush — UX, visual design, typography, branding, and spatial design.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <NavWrapper />
        {children}
        <Grain />
      </body>
    </html>
  )
}
