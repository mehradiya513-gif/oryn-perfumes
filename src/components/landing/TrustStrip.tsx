'use client'

import { motion } from 'framer-motion'

/* ————————————————————————————————————————————————————————————————
   TrustStrip — 4 quiet promises, one row, icon + label.
———————————————————————————————————————————————————————————————— */

const items = [
  {
    label: 'Long-lasting',
    sub: '8–12 hour wear',
    icon: (
      <path d="M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: 'Premium Ingredients',
    sub: 'Fine French oils',
    icon: (
      <path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-4 3-6 5-9Zm-2 9a2 2 0 1 0 4 0" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: 'Cash on Delivery',
    sub: 'Pay when it arrives',
    icon: (
      <path d="M3 8h16a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Zm0 0 2-3h12l2 3M7 13h3" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: 'Easy Returns',
    sub: '7-day, no questions',
    icon: (
      <path d="M3 10a7 7 0 0 1 7-7h8l-3-3m3 3-3 3M21 14a7 7 0 0 1-7 7H6l3 3m-3-3 3-3" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
]

export default function TrustStrip() {
  return (
    <section id="trust-strip" aria-label="Why shop with ORYN" className="border-b border-ink/10 bg-ivory">
      <ul className="shell grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4 md:py-12">
        {items.map((item, i) => (
          <motion.li
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="flex items-center gap-3.5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                {item.icon}
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-semibold text-ink">{item.label}</span>
              <span className="block truncate text-[12px] text-ink-soft">{item.sub}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
