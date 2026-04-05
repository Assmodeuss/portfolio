"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Component as Loader3 } from "@/components/ui/loader-3"
import { LoaderContext } from "@/context/loader-context"

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const isMounted = useRef(false)

  // Hide loader after initial page assets have loaded
  useEffect(() => {
    const hide = () => setTimeout(() => setLoading(false), 600)
    if (document.readyState === "complete") {
      hide()
    } else {
      window.addEventListener("load", hide, { once: true })
    }
  }, [])

  // Hide loader once the new route has finished rendering
  useEffect(() => {
    if (isMounted.current) {
      const timer = setTimeout(() => setLoading(false), 400)
      return () => clearTimeout(timer)
    }
    isMounted.current = true
  }, [pathname])

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      <div
        aria-hidden="true"
        style={
          {
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--background)",
            opacity: loading ? 1 : 0,
            pointerEvents: loading ? "auto" : "none",
            transition: "opacity 0.45s ease",
            "--clr": "#ffffff",
          } as React.CSSProperties
        }
      >
        <Loader3 />
      </div>
      {children}
    </LoaderContext.Provider>
  )
}
