'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

/* ————————————————————————————————————————————————————————————————
   BrandStory — Atelier Philosophy & Honest Luxury Manifesto
———————————————————————————————————————————————————————————————— */

export default function BrandStory() {
  return (
    <section id="brand-story" aria-labelledby="brand-story-heading" className="scroll-mt-20 bg-[#0D1B2E] py-20 md:py-32 relative">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Atelier Visual Display (Left 6 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[#1E3A5F] bg-[#0F1E35] shadow-card">
              <Image
                src="/images/IMG-20260802-WA0019.jpg"
                alt="The ORYN atelier still life with perfume flacons, fine oils, and amber light"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 90vw, 48vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/70 via-transparent to-transparent opacity-80"
              />
            </div>

            {/* Floating Luxury Plaque Badge */}
            <div className="absolute -bottom-6 -right-4 md:right-6 rounded-3xl border border-[#C9A84C]/40 bg-[#0F1E35]/95 p-5 shadow-gold backdrop-blur-xl max-w-xs">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A84C] block">
                Atelier Guarantee
              </span>
              <p className="mt-1 font-serif text-base font-semibold text-[#EAE6FF]">
                “Every individual deserves a signature extrait.”
              </p>
              <span className="mt-2 text-[10px] text-[#6B7FA3] block">
                Formulated in Mumbai · Certified Cruelty-Free
              </span>
            </div>
          </motion.div>

          {/* Narrative Copy (Right 6 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <span className="section-tag mb-4">Our Manifesto</span>
            <h2 id="brand-story-heading" className="font-serif text-3xl font-semibold leading-[1.12] text-[#EAE6FF] md:text-5xl">
              Authentic luxury shouldn&rsquo;t demand <span className="gold-gradient-text italic">a month&rsquo;s rent.</span>
            </h2>

            <div className="mt-6 space-y-5 text-[15px] leading-[1.8] text-[#9BAEC8]">
              <p>
                We established ORYN with an unyielding principle: the world’s most transcendent scents
                belong on your skin, not locked behind boutique glass counters bearing 5-digit price tags.
              </p>
              <p>
                By working directly with master oil blenders in Grasse, France, and bottling in Mumbai,
                we cut away celebrity branding fees, lavish department store markups, and excessive packaging.
                The outcome is an uncompromising, high-tenacity Extrait de Parfum made for real life.
              </p>
            </div>

            {/* Two Pillar Badges */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#1E3A5F] bg-[#0F1E35] p-5 shadow-sm">
                <span className="text-[#C9A84C] font-serif text-xl font-bold">20% – 25%</span>
                <h3 className="mt-1 font-semibold text-xs text-[#EAE6FF] uppercase tracking-wider">
                  Pure Oil Extrait
                </h3>
                <p className="mt-1 text-xs text-[#9BAEC8]">Remarkable sillage that stays from dawn to midnight.</p>
              </div>

              <div className="rounded-2xl border border-[#1E3A5F] bg-[#0F1E35] p-5 shadow-sm">
                <span className="text-[#C9A84C] font-serif text-xl font-bold">Under ₹800</span>
                <h3 className="mt-1 font-semibold text-xs text-[#EAE6FF] uppercase tracking-wider">
                  Honest Luxury
                </h3>
                <p className="mt-1 text-xs text-[#9BAEC8]">Zero luxury tax, zero middleman fees. Always affordable.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
