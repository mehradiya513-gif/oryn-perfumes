'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

/* ————————————————————————————————————————————————————————————————
   Hero — full-screen cinematic photograph, headline, two CTAs,
   subtle scroll indicator. Mobile-first: copy overlays the photo
   from 390px up, with an ink gradient scrim for AA contrast.
———————————————————————————————————————————————————————————————— */

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section aria-label="ORYN — luxury perfumes under ₹800" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-charcoal">
      {/* Background photograph */}
      <Image
        src="/images/arabian-oud-purple.png"
        alt="ORYN Arabian Oud perfume bottle photographed at dusk"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_30%]"
      />

      {/* Scrim: keeps headline contrast at AA over the photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-charcoal/20"
      />
      <div aria-hidden="true" className="grain-dark absolute inset-0" />

      {/* Copy */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 md:px-10 md:pb-20 lg:pb-16">
        <div className="mx-auto w-full max-w-[1240px]">
          <motion.p
            custom={0}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mb-5 block text-[11px] font-bold uppercase tracking-[0.3em] text-gold"
          >
            A new fragrance house
          </motion.p>

          <motion.h1
            custom={1}
            variants={rise}
            initial="hidden"
            animate="show"
            className="max-w-2xl font-serif text-[2.6rem] font-semibold leading-[1.06] text-ivory sm:text-5xl lg:text-6xl"
          >
            Luxury You Can <span className="italic">Actually</span> Wear
          </motion.h1>

          <motion.p
            custom={2}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-5 max-w-md text-base leading-[1.8] text-ivory/85 sm:text-[17px]"
          >
            Premium fragrances under ₹800 — composed slowly, made to last.
          </motion.p>

          <motion.div
            custom={3}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-wrap gap-4"
          >
            <button type="button" onClick={() => scrollTo('bestsellers')} className="btn-light">
              Shop Now
            </button>
            <button type="button" onClick={() => scrollTo('scent-finder')} className="btn-outline border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink">
              Find Your Scent
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollTo('trust-strip')}
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-ivory/70 transition-colors hover:text-ivory"
      >
        <span aria-hidden="true" className="block animate-bounce">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 4v16m0 0-6-6m6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </motion.button>
    </section>
  )
}
