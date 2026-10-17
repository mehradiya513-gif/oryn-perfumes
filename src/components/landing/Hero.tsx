'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { products, formatINR } from '@/lib/products'

/* ————————————————————————————————————————————————————————————————
   Modern Interactive Editorial Hero — Split-Screen with Live Bottle Stage
———————————————————————————————————————————————————————————————— */

const heroScents = [
  {
    product: products.find((p) => p.id === 'oryn-arabian-oud') || products[0],
    accent: '#C9A84C',
    notes: ['Damask Rose', 'Deep Oud', 'Warm Amber'],
    vibe: 'Warm, magnetic & regal',
  },
  {
    product: products.find((p) => p.id === 'oryn-strawberry') || products[1],
    accent: '#E8D5A3',
    notes: ['Wild Berries', 'Sun Strawberry', 'Bourbon Vanilla'],
    vibe: 'Playful, sweet & addictive',
  },
  {
    product: products.find((p) => p.id === 'oryn-black-oud') || products[5],
    accent: '#9E7A2C',
    notes: ['Black Spices', 'Smoky Birch', 'Dark Leather'],
    vibe: 'Deep, smoky & commanding',
  },
]

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeScent = heroScents[activeIndex]
  const { addToCart } = useCart()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      aria-label="ORYN — luxury perfumes under ₹800"
      className="relative min-h-[92vh] w-full overflow-hidden bg-[#0D1B2E] py-12 md:py-16 lg:py-24"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 h-[550px] w-[550px] rounded-full bg-[#C9A84C]/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-10 h-[480px] w-[480px] rounded-full bg-[#1E3A5F]/30 blur-[140px]"
      />
      <div aria-hidden="true" className="grain absolute inset-0 opacity-20 pointer-events-none" />

      <div className="shell relative z-10 flex min-h-[78vh] flex-col justify-center">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          
          {/* ————— LEFT COLUMN: Modern Editorial Narrative ————— */}
          <div className="lg:col-span-7">
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#C9A84C]/35 bg-[#112240] px-4 py-1.5 shadow-sm"
            >
              <span className="text-[#C9A84C] text-xs">✦</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]">
                Haute Parfumerie · Bombay &amp; Grasse
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-[#EAE6FF] sm:text-5xl md:text-6xl lg:text-[4.2rem]"
            >
              Sensual Luxury You Can{' '}
              <span className="gold-gradient-text block font-light italic">
                Actually Wear.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-xl text-[16px] leading-[1.8] text-[#9BAEC8] sm:text-[17.5px]"
            >
              Blended slowly from rare French essences and bottled in Mumbai. High-concentration
              extraits with 8–12 hour sillage, honest prices, and zero middleman markup. Always under ₹800.
            </motion.p>

            {/* Key Value Badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28 }}
              className="mt-7 flex flex-wrap items-center gap-2.5 text-xs text-[#9BAEC8]"
            >
              <span className="rounded-lg border border-[#1E3A5F] bg-[#0F1E35]/80 px-3.5 py-1.5 font-medium shadow-sm">
                ✧ 100% Extrait Concentration
              </span>
              <span className="rounded-lg border border-[#1E3A5F] bg-[#0F1E35]/80 px-3.5 py-1.5 font-medium shadow-sm">
                ✧ Under ₹800 Honest Luxury
              </span>
              <span className="rounded-lg border border-[#1E3A5F] bg-[#0F1E35]/80 px-3.5 py-1.5 font-medium shadow-sm">
                ✧ Complimentary Express &amp; COD
              </span>
            </motion.div>

            {/* Call To Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={() => scrollTo('bestsellers')}
                className="btn-gold"
              >
                Explore Collection
              </button>
              <button
                type="button"
                onClick={() => scrollTo('scent-finder')}
                className="btn-outline"
              >
                Take Scent Quiz
              </button>
            </motion.div>

            {/* Trust Quote / Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-10 flex items-center gap-6 border-t border-[#1E3A5F] pt-6"
            >
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-[#C9A84C] text-xs">★</span>
                ))}
                <span className="ml-1.5 text-xs font-bold text-[#EAE6FF]">4.9 / 5</span>
              </div>
              <span className="h-3 w-px bg-[#1E3A5F]" />
              <p className="text-xs text-[#6B7FA3]">
                Adored by <strong className="text-[#EAE6FF] font-semibold">14,000+ fragrance connoisseurs</strong> across India
              </p>
            </motion.div>
          </div>

          {/* ————— RIGHT COLUMN: Spotlight Editorial Bottle Stage ————— */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative mx-auto flex max-w-[440px] flex-col items-center"
            >
              {/* Bottle Aura Frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[#1E3A5F] bg-gradient-to-b from-[#0F1E35] via-[#112240] to-[#0D1B2E] p-6 shadow-card backdrop-blur-md">
                
                {/* Radial Gold Spotlight Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-radial-gradient from-[#C9A84C]/15 via-transparent to-transparent opacity-80"
                />

                {/* Badge on Card */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="rounded-full border border-[#C9A84C]/35 bg-[#112240] px-3.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
                    Signature Extrait
                  </span>
                  <span className="text-xs font-bold text-[#C9A84C]">
                    {formatINR(activeScent.product.price)}
                  </span>
                </div>

                {/* Animated Bottle Display */}
                <div className="relative my-4 flex h-[280px] w-full items-center justify-center sm:h-[320px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeScent.product.id}
                      initial={{ opacity: 0, y: 15, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.94 }}
                      transition={{ duration: 0.45 }}
                      className="relative h-full w-full"
                    >
                      <Image
                        src={activeScent.product.image}
                        alt={activeScent.product.imageAlt}
                        fill
                        priority
                        sizes="(max-width: 640px) 80vw, 380px"
                        className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Notes Tags Overlay */}
                <div className="relative z-10 rounded-2xl border border-[#1E3A5F] bg-[#0F1E35]/90 p-4 shadow-sm backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-[#EAE6FF]">
                        {activeScent.product.name}
                      </h3>
                      <p className="text-[11px] text-[#6B7FA3] mt-0.5">{activeScent.vibe}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToCart(activeScent.product)}
                      className="rounded-xl bg-gradient-to-r from-[#C9A84C] via-[#E8D5A3] to-[#C9A84C] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0D1B2E] shadow-sm transition-all duration-300 hover:brightness-105 active:scale-95"
                    >
                      Add +
                    </button>
                  </div>

                  {/* Note Chips */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {activeScent.notes.map((note) => (
                      <span
                        key={note}
                        className="rounded-md border border-[#1E3A5F] bg-[#112240] px-2.5 py-0.5 text-[10px] font-medium text-[#C9A84C]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Scent Switcher Tabs */}
              <div className="mt-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-[#1E3A5F] bg-[#0F1E35]/80 p-1.5 shadow-sm">
                {heroScents.map((item, idx) => (
                  <button
                    key={item.product.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-[11px] font-semibold transition-all duration-300 ${
                      idx === activeIndex
                        ? 'bg-[#112240] text-[#C9A84C] border border-[#C9A84C]/40 shadow-sm'
                        : 'text-[#6B7FA3] hover:text-[#EAE6FF]'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        idx === activeIndex ? 'bg-[#C9A84C] animate-pulse' : 'bg-[#1E3A5F]'
                      }`}
                    />
                    <span className="truncate">{item.product.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
