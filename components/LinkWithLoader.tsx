"use client"

import { useLoader } from "@/context/loader-context"
import { useRouter } from "next/navigation"

interface LinkWithLoaderProps {
  href: string
  children: React.ReactNode
  className?: string
  [key: string]: unknown
}

export default function LinkWithLoader({
  href,
  children,
  className,
  ...props
}: LinkWithLoaderProps) {
  const { setLoading } = useLoader()
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // FORCE loader BEFORE navigation
    setLoading(true)

    // allow React to paint loader first
    requestAnimationFrame(() => {
      router.push(href)
    })
  }

  return (
    <a onClick={handleClick} href={href} className={className} {...props}>
      {children}
    </a>
  )
}
