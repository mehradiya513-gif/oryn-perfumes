'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* ————————————————————————————————————————————————————————————————
   FAQ — Questions & Answers
———————————————————————————————————————————————————————————————— */

const faqs = [
  {
    q: 'How long does the perfume scent last?',
    a: 'Our perfumes are made with high perfume oil concentration (up to 25%). They easily last 8–12 hours on skin, and often more than 24 hours on clothes.',
  },
  {
    q: 'Are all ORYN perfumes unisex?',
    a: 'Yes, every perfume in our collection is 100% unisex. We craft balanced blends with fine ingredients that smell fresh, bold, and luxurious on everyone.',
  },
  {
    q: 'How long does delivery take, and is shipping free?',
    a: 'Orders are shipped within 24 hours. Delivery usually takes 2–4 business days across India. Shipping is completely free on all orders above ₹499.',
  },
  {
    q: 'What if my perfume bottle arrives damaged or leaking?',
    a: 'If your bottle arrives damaged or leaking during shipping, simply send us a photo on WhatsApp within 48 hours of delivery. We will send you a free replacement right away.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-20 bg-[#0A0A0A] py-20 md:py-28 relative">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Header (Left 4 Cols) */}
          <div className="lg:col-span-4">
            <span className="section-tag mb-4">Help &amp; FAQ</span>
            <h2 id="faq-heading" className="font-serif text-3xl font-semibold leading-[1.15] text-[#F5F2EB] md:text-5xl">
              Frequently Asked <span className="gold-gradient-text italic">Questions</span>
            </h2>
            <p className="mt-5 text-sm leading-[1.8] text-[#A8A29E]">
              Have a question about our perfumes or need help choosing? Message our team directly on WhatsApp anytime.
            </p>
            <div className="mt-8">
              <a
                href="https://wa.me/919877976038?text=Hi%20ORYN!%20I%20have%20a%20question%20regarding%20fragrances."
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
                      ? 'border-[#C9A84C] bg-[#161616] shadow-card'
                      : 'border-[#262626] bg-[#161616]/70 hover:border-[#C9A84C]/40 hover:bg-[#161616]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 p-6 text-left transition-colors"
                  >
                    <span className="font-serif text-base font-semibold text-[#F5F2EB] md:text-lg">
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
                        isOpen
                          ? 'border-[#C9A84C] bg-[#121212] text-[#C9A84C] rotate-45'
                          : 'border-[#262626] text-[#78716C]'
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
                        className="overflow-hidden px-6 pb-6 text-sm leading-[1.8] text-[#A8A29E] border-t border-[#262626] pt-4"
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
