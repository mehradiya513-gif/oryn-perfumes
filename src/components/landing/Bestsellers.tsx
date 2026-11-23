'use client'

import { motion } from 'framer-motion'
import { products as allProducts } from '@/lib/products'
import ProductCard from './ProductCard'

/* ————————————————————————————————————————————————————————————————
   Bestsellers & Collection Showcase — All 100% Unisex Luxury Extraits
———————————————————————————————————————————————————————————————— */

export default function Bestsellers() {
  return (
    <section id="bestsellers" aria-labelledby="bestsellers-heading" className="scroll-mt-20 bg-[#0A0A0A] py-20 md:py-28 relative">
      <div className="shell">
        {/* Section Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:mb-12">
          <div>
            <span className="section-tag mb-4">100% Unisex Collection</span>
            <h2 id="bestsellers-heading" className="font-serif text-3xl font-semibold leading-[1.1] text-[#F5F2EB] md:text-5xl">
              The Signature <span className="gold-gradient-text italic">Collection</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-[1.8] text-[#A8A29E]">
            Every perfume is crafted for everyone — long-lasting luxury extraits made in small batches, always under ₹800.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {allProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <ProductCard product={product} priority={i < 2} stickyId={product.id} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
