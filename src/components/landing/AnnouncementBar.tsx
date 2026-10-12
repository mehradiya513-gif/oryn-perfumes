'use client'

/* ————————————————————————————————————————————————————————————————
   AnnouncementBar — single quiet line above the header.
———————————————————————————————————————————————————————————————— */

export default function AnnouncementBar() {
  return (
    <div className="bg-charcoal text-center text-ivory" role="note" aria-label="Store announcements">
      <p className="px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.22em] sm:text-[11px]">
        Free shipping above ₹499{' '}
        <span aria-hidden="true" className="mx-2 text-gold">·</span>
        <span className="text-gold">COD available</span>
      </p>
    </div>
  )
}
