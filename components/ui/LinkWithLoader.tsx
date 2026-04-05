"use client"

import { useLoader } from "@/context/loader-context"
import { useRouter } from "next/navigation"
import type React from "react"

type Props = {
  href: string
  children: React.ReactNode
  className?: string
  [key: string]: unknown
}

export default function LinkWithLoader({ href, children, className, ...rest }: Props) {
  const { setLoading } = useLoader()
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setLoading(true)
    router.push(href)
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
