'use client'

import { motion } from 'framer-motion'

/* ————————————————————————————————————————————————————————————————
   WhatsAppFloat — persistent bottom-right order button.
   Replace WHATSAPP_NUMBER with the store's real number.
———————————————————————————————————————————————————————————————— */

const WHATSAPP_NUMBER = '919000000000' // ← replace with the real number

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi ORYN! I would like to order a perfume.')}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Order on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.4, duration: 0.5 }}
      className="fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft transition-transform duration-300 hover:scale-105 md:bottom-6 md:right-6"
      style={{ width: 52, height: 52 }}
    >
      {/* WhatsApp glyph (official path) */}
      <svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.5c1.8.9 3.7 1.4 5.8 1.4h.1c6.5 0 11.9-5.4 11.9-12S22.5 3 16 3Zm0 22.1c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.6.9.9-4.5-.3-.4c-1-1.6-1.6-3.5-1.6-5.4C4.7 9.4 9.8 4.3 16 4.3S27.3 9.4 27.3 15.6 22.2 25.1 16 25.1Zm5.9-8.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6-.1-.2-.7-1.8-1-2.5-.3-.6-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.4c.2.2 2.3 3.6 5.6 5 .8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.6.3-.8.3-1.4.2-1.6-.1-.1-.3-.2-.6-.4Z" />
      </svg>
    </motion.a>
  )
}
