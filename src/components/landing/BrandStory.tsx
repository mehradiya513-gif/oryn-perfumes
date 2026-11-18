'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

/* ————————————————————————————————————————————————————————————————
   BrandStory — Atelier Philosophy & Honest Luxury Manifesto
———————————————————————————————————————————————————————————————— */

export default function BrandStory() {
  return (
    <section id="brand-story" aria-labelledby="brand-story-heading" className="scroll-mt-20 bg-[#0A0A0A] py-20 md:py-32 relative">
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
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[#262626] bg-[#161616] shadow-card">
              <Image
                src="/images/IMG-20260802-WA0019.jpg"
                alt="ORYN perfume bottles and fragrance oils"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 90vw, 48vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent opacity-80"
              />
            </div>

            {/* Floating Luxury Plaque Badge */}
            <div className="absolute -bottom-6 -right-4 md:right-6 rounded-3xl border border-[#C9A84C]/40 bg-[#161616]/95 p-5 shadow-gold backdrop-blur-xl max-w-xs">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A84C] block">
                Our Promise
              </span>
              <p className="mt-1 font-serif text-base font-semibold text-[#F5F2EB]">
                “Everyone deserves a great signature perfume.”
              </p>
              <span className="mt-2 text-[10px] text-[#78716C] block">
                Made in Mumbai · 100% Cruelty-Free
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
            <span className="section-tag mb-4">Our Story</span>
            <h2 id="brand-story-heading" className="font-serif text-3xl font-semibold leading-[1.12] text-[#F5F2EB] md:text-5xl">
              Authentic luxury shouldn&rsquo;t demand <span className="gold-gradient-text italic">a month&rsquo;s rent.</span>
            </h2>

            <div className="mt-6 space-y-5 text-[15px] leading-[1.8] text-[#A8A29E]">
              <p>
                We started ORYN with one simple belief: great perfumes should be worn and enjoyed every day,
                not locked behind glass counters with ₹10,000 price tags.
              </p>
              <p>
                We import our perfume oils directly from France and bottle them in Mumbai. We skip expensive
                celebrity ads, fancy showroom markups, and middleman fees. This allows us to offer you rich,
                long-lasting luxury perfumes at an honest price.
              </p>
            </div>

            {/* Two Pillar Badges */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#262626] bg-[#161616] p-5 shadow-sm">
                <span className="text-[#C9A84C] font-serif text-xl font-bold">20% – 25%</span>
                <h3 className="mt-1 font-semibold text-xs text-[#F5F2EB] uppercase tracking-wider">
                  Pure Perfume Oil
                </h3>
                <p className="mt-1 text-xs text-[#A8A29E]">Long-lasting scent that stays from morning till night.</p>
              </div>

              <div className="rounded-2xl border border-[#262626] bg-[#161616] p-5 shadow-sm">
                <span className="text-[#C9A84C] font-serif text-xl font-bold">Under ₹800</span>
                <h3 className="mt-1 font-semibold text-xs text-[#F5F2EB] uppercase tracking-wider">
                  Honest Pricing
                </h3>
                <p className="mt-1 text-xs text-[#A8A29E]">No middleman markups. Always high quality and affordable.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
