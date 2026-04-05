'use client'

import { useEffect, useState } from 'react'

export function HamsterLoader() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      const removeTimer = setTimeout(() => setVisible(false), 600)
      return () => clearTimeout(removeTimer)
    }, 1800)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      className="hamster-loader-overlay"
      style={{ opacity: fadeOut ? 0 : 1 }}
      aria-hidden="true"
    >
      <div
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        className="wheel-and-hamster"
      >
        <div className="wheel" />
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear" />
              <div className="hamster__eye" />
              <div className="hamster__nose" />
            </div>
            <div className="hamster__limb hamster__limb--fr" />
            <div className="hamster__limb hamster__limb--fl" />
            <div className="hamster__limb hamster__limb--br" />
            <div className="hamster__limb hamster__limb--bl" />
            <div className="hamster__tail" />
          </div>
        </div>
        <div className="spoke" />
      </div>
    </div>
  )
}
