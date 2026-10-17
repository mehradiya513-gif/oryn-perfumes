'use client'

import { motion } from 'framer-motion'

/* ————————————————————————————————————————————————————————————————
   TrustStrip — Haute Parfumerie Hallmarks & Quality Guarantees
———————————————————————————————————————————————————————————————— */

const items = [
  {
    label: '8–12H Extrait Longevity',
    sub: 'Extrait concentration for long-lasting sillage',
    icon: (
      <path d="M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: 'Grasse French Oils',
    sub: 'Imported artisanal essences blended in Mumbai',
    icon: (
      <path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-4 3-6 5-9Zm-2 9a2 2 0 1 0 4 0" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: 'Cash on Delivery',
    sub: 'Pay at your doorstep across 25,000+ PIN codes',
    icon: (
      <path d="M3 8h16a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Zm0 0 2-3h12l2 3M7 13h3" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: '7-Day Return Guarantee',
    sub: 'Effortless exchanges if not completely captivated',
    icon: (
      <path d="M3 10a7 7 0 0 1 7-7h8l-3-3m3 3-3 3M21 14a7 7 0 0 1-7 7H6l3 3m-3-3 3-3" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
]

export default function TrustStrip() {
  return (
    <section id="trust-strip" aria-label="Why shop with ORYN" className="border-y border-[#1E3A5F] bg-[#0D1B2E] relative z-20">
      <div className="shell py-10 md:py-12">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {items.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-2xl border border-[#1E3A5F] bg-[#0F1E35] p-4 shadow-sm transition-all duration-300 hover:border-[#C9A84C]/40 hover:shadow-card"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#C9A84C]/30 bg-[#112240] text-[#C9A84C] shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  {item.icon}
                </svg>
              </span>
              <div className="min-w-0">
                <h4 className="text-[13px] font-bold text-[#EAE6FF] tracking-wide">{item.label}</h4>
                <p className="mt-0.5 text-[11.5px] leading-snug text-[#9BAEC8]">{item.sub}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
