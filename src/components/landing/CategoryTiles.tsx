'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { categories } from '@/lib/products'

/* ————————————————————————————————————————————————————————————————
   CategoryTiles — Luxury Olfactory Category Portals
———————————————————————————————————————————————————————————————— */

export default function CategoryTiles() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="categories" aria-labelledby="categories-heading" className="bg-[#0D1B2E] py-20 md:py-28 relative">
      <div className="shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="section-tag mb-4">Curated Families</span>
            <h2 id="categories-heading" className="font-serif text-3xl font-semibold leading-[1.1] text-[#EAE6FF] md:text-5xl">
              Explore by <span className="gold-gradient-text italic">Olfactory Mood</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.8] text-[#9BAEC8]">
            Each formulation is built around master-grade botanical essences and fine resins, created to evolve distinctively on your skin.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              type="button"
              onClick={() => scrollTo('bestsellers')}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-3xl border border-[#1E3A5F] bg-[#0F1E35] p-5 text-left transition-all duration-500 hover:border-[#C9A84C] hover:shadow-card"
              aria-label={`Shop ${cat.name} — ${cat.blurb}`}
            >
              {/* Product Category Photograph */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-95"
              />
              
              {/* Scrim */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E] via-[#0D1B2E]/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-85"
              />

              {/* Gold Ambient Corner Accent */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#C9A84C]/15 blur-xl transition-all duration-500 group-hover:bg-[#C9A84C]/35"
              />

              {/* Copy */}
              <div className="relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A84C]">
                  Category 0{i + 1}
                </span>
                <h3 className="mt-1 font-serif text-xl font-semibold text-white sm:text-2xl group-hover:text-[#F0D98F] transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1.5 text-xs text-[#CBD5E8]/85 line-clamp-2">{cat.blurb}</p>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] transition-all duration-300 group-hover:translate-x-1">
                  <span>Explore scents</span>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
