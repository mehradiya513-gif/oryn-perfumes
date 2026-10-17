'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { type Product, bestsellers, formatINR } from '@/lib/products'
import { useCart } from '@/context/CartContext'

/* ————————————————————————————————————————————————————————————————
   StickyAddToCart — Mobile Floating Quick Add Bar
———————————————————————————————————————————————————————————————— */

export default function StickyAddToCart() {
  const { addToCart, cartOpen, orderOpen } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [added, setAdded] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.stickyProduct
          const found = bestsellers.find((p) => p.id === id)
          if (entry.isIntersecting && found) {
            setProduct(found)
          } else if (!entry.isIntersecting && found && found.id === product?.id) {
            setProduct((current) => (current?.id === found.id ? null : current))
          }
        }
      },
      { threshold: 0.4 },
    )

    const section = document.getElementById('bestsellers')
    section?.querySelectorAll<HTMLElement>('[data-sticky-product]').forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [product?.id])

  const handleAdd = (p: Product) => {
    addToCart(p)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  const show = !!product && !cartOpen && !orderOpen

  return (
    <AnimatePresence>
      {show && product && (
        <motion.div
          initial={reduceMotion ? false : { y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-[#C9A84C]/25 bg-[#0D1B2E]/95 backdrop-blur-xl md:hidden shadow-card"
          role="complementary"
          aria-label="Quick add to cart"
        >
          <div className="flex items-center justify-between gap-4 px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="flex min-w-0 items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt="" aria-hidden="true" className="h-10 w-9 shrink-0 rounded-lg object-contain bg-[#112240] p-1 border border-[#1E3A5F]" />
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-pearl">{product.name}</p>
                <p className="text-xs font-bold text-gold">{formatINR(product.price)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleAdd(product)}
              className="shrink-0 rounded-lg bg-gold px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-obsidian shadow-sm hover:brightness-110 active:scale-95"
            >
              {added ? 'Added ✓' : 'Add to Bag'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
