'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

/* ————————————————————————————————————————————————————————————————
   Modern Interactive Editorial Hero — Split-Screen with Live Bottle Stage
———————————————————————————————————————————————————————————————— */

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      aria-label="ORYN — luxury perfumes under ₹800"
      className="relative min-h-[92vh] w-full overflow-hidden bg-[#0A0A0A] py-12 md:py-16 lg:py-24"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 h-[550px] w-[550px] rounded-full bg-[#C9A84C]/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-10 h-[480px] w-[480px] rounded-full bg-[#262626]/30 blur-[140px]"
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
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#C9A84C]/35 bg-[#121212] px-4 py-1.5 shadow-sm"
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
              className="font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-[#F5F2EB] sm:text-5xl md:text-6xl lg:text-[4.2rem]"
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
              className="mt-6 max-w-xl text-[16px] leading-[1.8] text-[#A8A29E] sm:text-[17.5px]"
            >
              Blended slowly from rare French essences and bottled in Mumbai. High-concentration
              extraits with 8–12 hour sillage, honest prices, and zero middleman markup. Always under ₹800.
            </motion.p>

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
              className="mt-10 flex items-center gap-6 border-t border-[#262626] pt-6"
            >
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-[#C9A84C] text-xs">★</span>
                ))}
                <span className="ml-1.5 text-xs font-bold text-[#F5F2EB]">4.9 / 5</span>
              </div>
              <span className="h-3 w-px bg-[#262626]" />
              <p className="text-xs text-[#78716C]">
                Adored by <strong className="text-[#F5F2EB] font-semibold">14,000+ fragrance connoisseurs</strong> across India
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
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[#262626] bg-gradient-to-b from-[#161616] via-[#121212] to-[#0A0A0A] p-6 shadow-card backdrop-blur-md">
                
                {/* Radial Gold Spotlight Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-radial-gradient from-[#C9A84C]/15 via-transparent to-transparent opacity-80"
                />

                {/* Brand Logo Display replacing bottle image */}
                <div className="relative my-4 flex h-[280px] w-full items-center justify-center sm:h-[320px]">
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45 }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src="/images/oryn-gold-logo-transparent.png"
                      alt="ORYN Haute Parfumerie"
                      fill
                      priority
                      sizes="(max-width: 640px) 80vw, 380px"
                      className="object-contain p-4 drop-shadow-[0_20px_40px_rgba(201,168,76,0.45)]"
                    />
                  </motion.div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
