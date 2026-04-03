'use client'

import { useState } from 'react'
import { Nav } from '@/components/layout/Nav'
import { ContactDrawer } from '@/components/contact/ContactDrawer'

/**
 * Client wrapper for Nav + ContactDrawer.
 * Manages shared contact drawer state at the layout level.
 */
export function NavWrapper() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <Nav onContactClick={() => setDrawerOpen(true)} />
      <ContactDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
