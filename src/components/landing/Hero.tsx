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
    accent: '#C5857B',
    notes: ['Damask Rose', 'Deep Oud', 'Warm Amber'],
    vibe: 'Warm, magnetic & regal',
  },
  {
    product: products.find((p) => p.id === 'oryn-strawberry') || products[1],
    accent: '#D79F97',
    notes: ['Wild Berries', 'Sun Strawberry', 'Bourbon Vanilla'],
    vibe: 'Playful, sweet & addictive',
  },
  {
    product: products.find((p) => p.id === 'oryn-black-oud') || products[5],
    accent: '#9A5850',
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
      className="relative min-h-[92vh] w-full overflow-hidden bg-[#FAF6F5] py-12 md:py-16 lg:py-24"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 h-[550px] w-[550px] rounded-full bg-[#E8B8B0]/25 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-10 h-[480px] w-[480px] rounded-full bg-[#F5EBE6] blur-[140px]"
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
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#C5857B]/35 bg-[#F7EDE9] px-4 py-1.5 shadow-sm"
            >
              <span className="text-[#A86359] text-xs">✦</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#A86359]">
                Haute Parfumerie · Bombay &amp; Grasse
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-[#23171B] sm:text-5xl md:text-6xl lg:text-[4.2rem]"
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
              className="mt-6 max-w-xl text-[16px] leading-[1.8] text-[#5C484E] sm:text-[17.5px]"
            >
              Blended slowly from rare French essences and bottled in Mumbai. High-concentration
              extraits with 8–12 hour sillage, honest prices, and zero middleman markup. Always under ₹800.
            </motion.p>

            {/* Key Value Badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28 }}
              className="mt-7 flex flex-wrap items-center gap-2.5 text-xs text-[#5C484E]"
            >
              <span className="rounded-lg border border-[#EBDCD7] bg-white/80 px-3.5 py-1.5 font-medium shadow-sm">
                ✧ 100% Extrait Concentration
              </span>
              <span className="rounded-lg border border-[#EBDCD7] bg-white/80 px-3.5 py-1.5 font-medium shadow-sm">
                ✧ Under ₹800 Honest Luxury
              </span>
              <span className="rounded-lg border border-[#EBDCD7] bg-white/80 px-3.5 py-1.5 font-medium shadow-sm">
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
              className="mt-10 flex items-center gap-6 border-t border-[#EBDCD7] pt-6"
            >
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-[#C5857B] text-xs">★</span>
                ))}
                <span className="ml-1.5 text-xs font-bold text-[#23171B]">4.9 / 5</span>
              </div>
              <span className="h-3 w-px bg-[#EBDCD7]" />
              <p className="text-xs text-[#8D767C]">
                Adored by <strong className="text-[#23171B] font-semibold">14,000+ fragrance connoisseurs</strong> across India
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
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[#EBDCD7] bg-gradient-to-b from-white via-[#FCF8F7] to-[#F7EDE9] p-6 shadow-card backdrop-blur-md">
                
                {/* Radial Rose Spotlight Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-radial-gradient from-[#E8B8B0]/30 via-transparent to-transparent opacity-80"
                />

                {/* Badge on Card */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="rounded-full border border-[#C5857B]/35 bg-[#F7EDE9] px-3.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#A86359]">
                    Signature Extrait
                  </span>
                  <span className="text-xs font-bold text-[#A86359]">
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
                        className="object-contain drop-shadow-[0_20px_35px_rgba(168,99,89,0.25)]"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Notes Tags Overlay */}
                <div className="relative z-10 rounded-2xl border border-[#EBDCD7] bg-white/90 p-4 shadow-sm backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-[#23171B]">
                        {activeScent.product.name}
                      </h3>
                      <p className="text-[11px] text-[#8D767C] mt-0.5">{activeScent.vibe}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToCart(activeScent.product)}
                      className="rounded-xl bg-gradient-to-r from-[#D79F97] via-[#C5857B] to-[#A86359] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-sm transition-all duration-300 hover:brightness-105 active:scale-95"
                    >
                      Add +
                    </button>
                  </div>

                  {/* Note Chips */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {activeScent.notes.map((note) => (
                      <span
                        key={note}
                        className="rounded-md border border-[#EBDCD7] bg-[#F7EDE9] px-2.5 py-0.5 text-[10px] font-medium text-[#A86359]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Scent Switcher Tabs */}
              <div className="mt-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-[#EBDCD7] bg-white/80 p-1.5 shadow-sm">
                {heroScents.map((item, idx) => (
                  <button
                    key={item.product.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-[11px] font-semibold transition-all duration-300 ${
                      idx === activeIndex
                        ? 'bg-[#F7EDE9] text-[#A86359] border border-[#C5857B]/40 shadow-sm'
                        : 'text-[#8D767C] hover:text-[#23171B]'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        idx === activeIndex ? 'bg-[#C5857B] animate-pulse' : 'bg-[#DFCBC5]'
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
