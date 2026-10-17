'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products as allProducts } from '@/lib/products'
import ProductCard from './ProductCard'

/* ————————————————————————————————————————————————————————————————
   Bestsellers & Collection Showcase with Interactive Category Tabs
———————————————————————————————————————————————————————————————— */

const filterCategories = ['All Fragrances', 'For Him', 'For Her', 'Unisex', 'Gift Sets'] as const

export default function Bestsellers() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Fragrances')

  const filtered = selectedCategory === 'All Fragrances'
    ? allProducts
    : allProducts.filter((p) => p.category === selectedCategory)

  return (
    <section id="bestsellers" aria-labelledby="bestsellers-heading" className="scroll-mt-20 bg-[#0D1B2E] py-20 md:py-28 relative">
      <div className="shell">
        {/* Section Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:mb-12">
          <div>
            <span className="section-tag mb-4">Master Formulation</span>
            <h2 id="bestsellers-heading" className="font-serif text-3xl font-semibold leading-[1.1] text-[#EAE6FF] md:text-5xl">
              The Signature <span className="gold-gradient-text italic">Collection</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-[1.8] text-[#9BAEC8]">
            Crafted without compromises. Long-wearing extrait formulas composed in small batches, always under ₹800.
          </p>
        </div>

        {/* Interactive Category Filter Pills */}
        <div className="mb-10 flex flex-wrap items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none" role="tablist">
          {filterCategories.map((category) => {
            const isActive = selectedCategory === category
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`relative rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive
                    ? 'border border-[#C9A84C] bg-[#112240] text-[#C9A84C] shadow-sm'
                    : 'border border-[#1E3A5F] bg-[#0F1E35] text-[#6B7FA3] hover:border-[#C9A84C]/40 hover:text-[#EAE6FF]'
                }`}
              >
                {category}
                {isActive && (
                  <motion.span
                    layoutId="activeFilterPill"
                    className="absolute -bottom-1 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-[#C9A84C]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence>
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ProductCard product={product} priority={i < 2} stickyId={product.id} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom guarantee strip */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-[#1E3A5F] bg-[#0F1E35] px-6 py-4 text-center shadow-sm">
          <span className="text-xs font-semibold text-[#EAE6FF]">
            ✦ Complimentary Shipping on all orders above ₹499
          </span>
          <span className="hidden text-[#C9A84C] md:inline">·</span>
          <span className="text-xs font-semibold text-[#EAE6FF]">
            ✦ Settle via Cash on Delivery or Instant UPI
          </span>
          <span className="hidden text-[#C9A84C] md:inline">·</span>
          <span className="text-xs font-semibold text-[#EAE6FF]">
            ✦ 100% Satisfaction or Effortless 7-Day Exchange
          </span>
        </div>
      </div>
    </section>
  )
}
