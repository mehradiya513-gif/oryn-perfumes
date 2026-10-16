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
      className="relative z-50 border-b border-[#EBDCD7] bg-[#F7EDE9] py-2 text-center text-[#23171B]"
      role="note"
      aria-label="Store announcements"
    >
      <div className="shell flex items-center justify-center gap-3">
        <span className="text-[#C5857B] text-[10px]">✦</span>
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#5C484E] sm:text-[11px] transition-all duration-500">
          {announcements[index]}
        </p>
        <span className="text-[#C5857B] text-[10px]">✦</span>
      </div>
    </div>
  )
}
