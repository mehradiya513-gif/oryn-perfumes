'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { type Product, bestsellers, formatINR } from '@/lib/products'
import { useCart } from '@/context/CartContext'

/* ————————————————————————————————————————————————————————————————
   StickyAddToCart — mobile-only bar that slides up while a
   bestseller carousel item is in view. Hidden while the cart
   drawer or checkout modal is open.
———————————————————————————————————————————————————————————————— */

export default function StickyAddToCart() {
  const { addToCart, cartOpen, orderOpen } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    /* Observe each carousel item flagged with data-sticky-product;
       the last one to enter the viewport wins. */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.stickyProduct
          const found = bestsellers.find((p) => p.id === id)
          if (entry.isIntersecting && found) {
            setProduct(found)
          } else if (!entry.isIntersecting && found && found.id === product?.id) {
            /* Clear only the product whose card just left the viewport */
            setProduct((current) => (current?.id === found.id ? null : current))
          }
        }
      },
      { threshold: 0.4 },
    )

    const section = document.getElementById('bestsellers')
    section?.querySelectorAll<HTMLElement>('[data-sticky-product]').forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [product?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const show = !!product && !cartOpen && !orderOpen

  return (
    <AnimatePresence>
      {show && product && (
        <motion.div
          initial={reduceMotion ? false : { y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-ivory/95 backdrop-blur md:hidden"
          role="complementary"
          aria-label="Quick add to cart"
        >
          <div className="flex items-center justify-between gap-4 px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="flex min-w-0 items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- tiny swatch, avoid extra Image workload */}
              <img src={product.image} alt="" aria-hidden="true" className="h-10 w-8 shrink-0 rounded-sm object-cover" />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-ink">{product.name}</p>
                <p className="text-[13px] text-ink-soft">{formatINR(product.price)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="shrink-0 bg-ink px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-ivory"
            >
              Add to cart
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
