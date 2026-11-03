'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products as allProducts } from '@/lib/products'
import ProductCard from './ProductCard'

/* ————————————————————————————————————————————————————————————————
   Bestsellers & Collection Showcase with Interactive Category Tabs
———————————————————————————————————————————————————————————————— */

const filterCategories = ['All Fragrances', 'For Him', 'For Her', 'Unisex'] as const

export default function Bestsellers() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Fragrances')

  const filtered = selectedCategory === 'All Fragrances'
    ? allProducts
    : allProducts.filter((p) => p.category === selectedCategory)

  return (
    <section id="bestsellers" aria-labelledby="bestsellers-heading" className="scroll-mt-20 bg-[#0A0A0A] py-20 md:py-28 relative">
      <div className="shell">
        {/* Section Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:mb-12">
          <div>
            <span className="section-tag mb-4">Master Formulation</span>
            <h2 id="bestsellers-heading" className="font-serif text-3xl font-semibold leading-[1.1] text-[#F5F2EB] md:text-5xl">
              The Signature <span className="gold-gradient-text italic">Collection</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-[1.8] text-[#A8A29E]">
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
                    ? 'border border-[#C9A84C] bg-[#121212] text-[#C9A84C] shadow-sm'
                    : 'border border-[#262626] bg-[#161616] text-[#78716C] hover:border-[#C9A84C]/40 hover:text-[#F5F2EB]'
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
      </div>
    </section>
  )
}
