'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface ScrollFadeBannerProps {
  src: string
}

export function ScrollFadeBanner({ src }: ScrollFadeBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    function handleScroll() {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const fadeDistance = (rect.height || 1) * 0.65
      const scrolledPast = -rect.top
      const t = Math.min(Math.max(scrolledPast / fadeDistance, 0), 1)
      const nextOpacity = Math.pow(1 - t, 1.25)
      setOpacity(nextOpacity)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="w-full aspect-[3/4] rounded-3xl bg-[#f4f4f5] border border-[#e4e4e7] shadow-md overflow-hidden">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover object-top rounded-3xl"
        style={{ opacity, willChange: 'opacity' }}
      />
    </div>
  )
}
