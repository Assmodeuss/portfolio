"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Loader3 } from "@/components/ui/loader-3"

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

  // Show loader when an internal link is clicked (before navigation starts)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a")
      if (!anchor) return
      const href = anchor.getAttribute("href")
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("http") ||
        href.startsWith("//") ||
        anchor.target === "_blank"
      ) return
      setLoading(true)
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
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
    <>
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
            // Always show white boxes regardless of colour-scheme
            "--clr": "#ffffff",
          } as React.CSSProperties
        }
      >
        <Loader3 />
      </div>
      {children}
    </>
  )
}
