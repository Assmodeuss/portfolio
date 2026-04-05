import type { Metadata } from 'next'
import './globals.css'
import { Cursor } from '@/components/ui/inverted-cursor'
import { PageLoader } from '@/components/ui/page-loader'

export const metadata: Metadata = {
  title: 'Pratyush — Design · Systems · Craft',
  description: 'Portfolio of Pratyush — a design student at Shiv Nadar University obsessed with typography, motion, and digital craftsmanship.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/tac5qpv.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Plus+Jakarta+Sans:wght@300;400;600&family=Space+Grotesk:wght@300;500&display=swap"
        />
      </head>
      <body className="bg-background text-on-background font-body selection:bg-primary/30 selection:text-primary no-scrollbar antialiased">
        <PageLoader />
        <Cursor />
        {children}
      </body>
    </html>
  )
}
