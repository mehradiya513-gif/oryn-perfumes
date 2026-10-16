'use client'

import { motion } from 'framer-motion'

/* ————————————————————————————————————————————————————————————————
   WhatsAppFloat — Concierge Floating Direct Line
———————————————————————————————————————————————————————————————— */

const WHATSAPP_NUMBER = '919000000000'

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi ORYN! I would like concierge help selecting a fragrance.')}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Concierge on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.4, duration: 0.5 }}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full border border-gold/40 bg-[#0E0E14]/90 p-1.5 pr-4 text-pearl shadow-card backdrop-blur-xl transition-all duration-300 hover:border-gold hover:shadow-gold-sm md:bottom-6 md:right-6"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
        <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.5c1.8.9 3.7 1.4 5.8 1.4h.1c6.5 0 11.9-5.4 11.9-12S22.5 3 16 3Zm0 22.1c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.6.9.9-4.5-.3-.4c-1-1.6-1.6-3.5-1.6-5.4C4.7 9.4 9.8 4.3 16 4.3S27.3 9.4 27.3 15.6 22.2 25.1 16 25.1Zm5.9-8.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6-.1-.2-.7-1.8-1-2.5-.3-.6-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.4c.2.2 2.3 3.6 5.6 5 .8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.6.3-.8.3-1.4.2-1.6-.1-.1-.3-.2-.6-.4Z" />
        </svg>
      </div>
      <div className="hidden sm:flex flex-col text-left">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gold">Concierge</span>
        <span className="text-xs font-semibold text-pearl leading-none">Instant Help</span>
      </div>
    </motion.a>
  )
}
