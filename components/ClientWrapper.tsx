"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { LoaderProvider, useLoader } from "@/context/loader-context"
import Loader from "@/components/ui/Loader"
import type React from "react"

function LoaderOverlay() {
  const { loading, setLoading } = useLoader()
  const pathname = usePathname()

  useEffect(() => {
    setLoading(false)
  }, [pathname])

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-background flex items-center justify-center transition-opacity duration-500 ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <Loader />
    </div>
  )
}

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LoaderProvider>
      <LoaderOverlay />
      {children}
    </LoaderProvider>
  )
}
