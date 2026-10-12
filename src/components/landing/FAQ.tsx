'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'

/* ————————————————————————————————————————————————————————————————
   FAQ — accessible accordion. Real <button> triggers,
   aria-expanded + aria-controls, keyboard operable by default.
———————————————————————————————————————————————————————————————— */

const faqs = [
  {
    q: 'How long do ORYN perfumes last?',
    a: 'Our extra-parfum concentrations last 8–12 hours on skin, and significantly longer on clothes. Longevity varies slightly by scent — woody and amber fragrances like Black Oud sit longest, fresh scents like Shanaya stay closest to the skin.',
  },
  {
    q: 'Are the fragrances authentic and original?',
    a: 'Every ORYN bottle is blended in-house from fine French oils and bottled in Mumbai. Each batch carries a batch code and manufacturing date on the base. We publish full note pyramids for every scent — no hidden reformulations.',
  },
  {
    q: 'How fast is shipping, and is it free?',
    a: 'Orders ship within 24 working hours and reach most Indian metros in 2–4 days (7 days max for remote PIN codes). Shipping is free above ₹499; below that a flat ₹49 applies.',
  },
  {
    q: 'What is your return policy?',
    a: 'Unopened bottles can be returned within 7 days of delivery for a full refund — no questions asked. If a bottle arrives damaged or leaking, we replace it immediately; just send a photo within 48 hours.',
  },
  {
    q: 'Is Cash on Delivery available?',
    a: 'Yes — COD is available across 25,000+ PIN codes at no extra charge. Pay the courier when your parcel arrives. UPI and cards are also accepted at checkout.',
  },
]

function FaqItem({ q, a, isOpen, onToggle, index }: { q: string; a: string; isOpen: boolean; onToggle: () => void; index: number }) {
  const panelId = `faq-panel-${index}`
  const buttonId = `faq-button-${index}`

  return (
    <div className="border-b border-ink/10">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-300 hover:text-gold"
        >
          <span className="text-[15.5px] font-semibold text-ink md:text-[16.5px]">{q}</span>
          <span
            aria-hidden="true"
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
              isOpen ? 'rotate-45 border-gold text-gold' : 'border-ink/20 text-ink'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 5v14m-7-7h14" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-6 text-[14.5px] leading-[1.8] text-ink-soft">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-20 bg-ivory">
      <div className="shell py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="section-tag mb-5">FAQ</p>
            <h2 id="faq-heading" className="font-serif text-3xl font-semibold leading-[1.1] text-ink md:text-[2.6rem]">
              Everything, <span className="italic">answered.</span>
            </h2>
            <p className="mt-5 max-w-sm text-[14.5px] leading-[1.8] text-ink-soft">
              Something else on your mind? WhatsApp us — a real person replies within working
              hours.
            </p>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-8">
            <div className="border-t border-ink/10">
              {faqs.map((faq, i) => (
                <FaqItem
                  key={faq.q}
                  q={faq.q}
                  a={faq.a}
                  index={i}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
