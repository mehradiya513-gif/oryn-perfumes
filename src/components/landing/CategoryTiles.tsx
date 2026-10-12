'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { categories } from '@/lib/products'

/* ————————————————————————————————————————————————————————————————
   CategoryTiles — 3 large tiles on mobile, a 4-across band on
   desktop (the first tile spans double for editorial rhythm).
   Entire tile is one accessible link/button; images lazy-load.
———————————————————————————————————————————————————————————————— */

export default function CategoryTiles() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="categories" aria-labelledby="categories-heading" className="bg-ivory">
      <div className="shell py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-14"
        >
          <p className="section-tag mb-5">Shop by Category</p>
          <h2 id="categories-heading" className="font-serif text-3xl font-semibold leading-[1.1] text-ink md:text-[2.6rem]">
            Made <span className="italic">for you,</span> whoever you are
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              type="button"
              onClick={() => scrollTo('bestsellers')}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`group relative overflow-hidden bg-beige text-left ${
                i === 0 ? 'col-span-2 aspect-[2/1.1] md:col-span-2 md:aspect-auto md:min-h-[340px]' : 'aspect-[3/4] md:min-h-[340px]'
              }`}
              aria-label={`Shop ${cat.name} — ${cat.blurb}`}
            >
              <Image
                src={cat.image}
                alt=""
                fill
                loading="lazy"
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                <h3 className="font-serif text-lg font-semibold text-ivory md:text-2xl">{cat.name}</h3>
                <p className="mt-1 text-[12px] text-ivory/75 md:text-[13px]">{cat.blurb}</p>
                <span className="mt-3 inline-block border-b border-gold pb-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-md:opacity-100">
                  Shop now
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
