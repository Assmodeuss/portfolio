'use client'

import { useState, useEffect } from 'react'

interface Loader3Props {
  loading?: boolean
}

export default function Loader3({ loading = true }: Loader3Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <style>{`
        .loader-3 {
          --clr: hsl(var(--primary) / 0.9);
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .loader-3 .box {
          width: 14px;
          height: 14px;
          background: var(--clr);
          opacity: 0.8;
          filter: brightness(0.9);
          box-shadow: 0 0 20px hsl(var(--primary) / 0.1);
          animation: loader3-bounce 1.4s ease-in-out infinite;
        }

        .loader-3 .box:nth-child(1) { animation-delay: 0s; }
        .loader-3 .box:nth-child(2) { animation-delay: 0.2s; }
        .loader-3 .box:nth-child(3) { animation-delay: 0.4s; }
        .loader-3 .box:nth-child(4) { animation-delay: 0.6s; }
        .loader-3 .box:nth-child(5) { animation-delay: 0.8s; }

        @keyframes loader3-bounce {
          0%, 80%, 100% {
            transform: scale(0) rotate(45deg);
            opacity: 0.2;
          }
          40% {
            transform: scale(1) rotate(45deg);
            opacity: 0.8;
          }
        }
      `}</style>

      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-700 ${
          loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="loader-3">
          <div className="box" />
          <div className="box" />
          <div className="box" />
          <div className="box" />
          <div className="box" />
        </div>
      </div>
    </>
  )
}
