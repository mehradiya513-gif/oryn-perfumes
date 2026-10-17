'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* ————————————————————————————————————————————————————————————————
   FAQ — Concierge & Client Clarifications
———————————————————————————————————————————————————————————————— */

const faqs = [
  {
    q: 'How long do ORYN extraits endure on skin and attire?',
    a: 'Our fragrances are formulated at high Extrait de Parfum concentrations (up to 25% pure essential oils). On bare pulse points, they reliably project for 8–12 hours, and often linger across linen, collars, and outerwear for 24+ hours.',
  },
  {
    q: 'Where are the fragrance oils formulated and bottled?',
    a: 'Our fine aromatic essences and absolute oils are blended in Grasse, France, under master perfumer standards, then matured and bottled in small artisanal batches in Mumbai, India. Every flacon carries an authenticated batch code.',
  },
  {
    q: 'What are the delivery timelines and shipping charges?',
    a: 'Orders are dispatched within 24 business hours. Express transit typically completes within 2–4 business days for major Indian metropolitan areas. Shipping is complimentary on all orders exceeding ₹499.',
  },
  {
    q: 'What is the return and exchange procedure?',
    a: 'We offer an unconditional 7-day return policy on unopened flacons. Should any item arrive compromised or leaking during courier transit, we dispatch an immediate complimentary replacement upon receipt of a parcel photograph.',
  },
  {
    q: 'Is Cash on Delivery supported across all locations?',
    a: 'Yes. Cash on Delivery is supported across 25,000+ PIN codes with zero additional fee. You are welcome to inspect the tamper-proof delivery seal and pay the courier agent upon arrival.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-20 bg-[#0D1B2E] py-20 md:py-28 relative">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Header (Left 4 Cols) */}
          <div className="lg:col-span-4">
            <span className="section-tag mb-4">Concierge Desk</span>
            <h2 id="faq-heading" className="font-serif text-3xl font-semibold leading-[1.15] text-[#EAE6FF] md:text-5xl">
              Clarity &amp; Answers, <span className="gold-gradient-text italic">Unveiled.</span>
            </h2>
            <p className="mt-5 text-sm leading-[1.8] text-[#9BAEC8]">
              Have a custom fragrance query or corporate gifting inquiry? Our perfumery concierge is directly accessible via WhatsApp during working hours.
            </p>
            <div className="mt-8">
              <a
                href="https://wa.me/919000000000?text=Hi%20ORYN!%20I%20have%20a%20question%20regarding%20fragrances."
                target="_blank"
                rel="noreferrer"
                className="btn-outline !py-3 !px-6 inline-flex"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Accordion (Right 8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-3.5">
            {faqs.map((faq, i) => {
              const isOpen = open === i
              return (
                <div
                  key={faq.q}
                  className={`rounded-3xl border transition-all duration-300 ${
                    isOpen
                      ? 'border-[#C9A84C] bg-[#0F1E35] shadow-card'
                      : 'border-[#1E3A5F] bg-[#0F1E35]/70 hover:border-[#C9A84C]/40 hover:bg-[#0F1E35]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 p-6 text-left transition-colors"
                  >
                    <span className="font-serif text-base font-semibold text-[#EAE6FF] md:text-lg">
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
                        isOpen
                          ? 'border-[#C9A84C] bg-[#112240] text-[#C9A84C] rotate-45'
                          : 'border-[#1E3A5F] text-[#6B7FA3]'
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14m-7-7h14" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden px-6 pb-6 text-sm leading-[1.8] text-[#9BAEC8] border-t border-[#1E3A5F] pt-4"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
