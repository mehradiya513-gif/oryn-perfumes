'use client'

import { useState, useEffect } from 'react'

/* ————————————————————————————————————————————————————————————————
   AnnouncementBar — Luxury Gold Shimmer Ticker
———————————————————————————————————————————————————————————————— */

const announcements = [
  'COMPLIMENTARY EXPRESS SHIPPING ABOVE ₹499',
  'CASH ON DELIVERY AVAILABLE PAN-INDIA',
  '100% PURE EXTRAIT DE PARFUM UNDER ₹800',
  '7-DAY EFFORTLESS RETURNS & EXCHANGES',
]

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="relative z-50 border-b border-[#1E3A5F] bg-[#112240] py-2 text-center text-[#EAE6FF]"
      role="note"
      aria-label="Store announcements"
    >
      <div className="shell flex items-center justify-center gap-3">
        <span className="text-[#C9A84C] text-[10px]">✦</span>
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#9BAEC8] sm:text-[11px] transition-all duration-500">
          {announcements[index]}
        </p>
        <span className="text-[#C9A84C] text-[10px]">✦</span>
      </div>
    </div>
  )
}
