'use client'

import { useEffect, useRef } from 'react'

/* Gentle fade-and-rise on scroll. One shared primitive for the whole site —
   no parallax, no gimmicks. Honors prefers-reduced-motion via globals.css. */
export default function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => el.classList.add('is-visible'), delay)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}
