'use client'

import { useRef, useState, useEffect } from 'react'
import type { Product } from '@/lib/products'
import { bestsellers } from '@/lib/products'
import ProductCard from './ProductCard'

/* ————————————————————————————————————————————————————————————————
   Bestsellers — swipe carousel on mobile (scroll-snap), 4-col grid
   on desktop. Dots reflect the active snap position on small
   screens; on keyboard, cards stay tabbable in either layout.
———————————————————————————————————————————————————————————————— */

export default function Bestsellers({ products = bestsellers }: { products?: Product[] }) {
  const trackRef = useRef<HTMLUListElement | null>(null)
  const [active, setActive] = useState(0)

  /* Track the visible snap point while swiping (mobile only visual) */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const cardWidth = track.scrollWidth / products.length
      setActive(Math.min(products.length - 1, Math.round(track.scrollLeft / cardWidth)))
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [products.length])

  return (
    <section id="bestsellers" aria-labelledby="bestsellers-heading" className="scroll-mt-20 bg-cream">
      <div className="shell py-20 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <div>
            <p className="section-tag mb-5">Bestsellers</p>
            <h2 id="bestsellers-heading" className="font-serif text-3xl font-semibold leading-[1.1] text-ink md:text-[2.6rem]">
              Most <span className="italic">re-ordered,</span> quietly
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-[14px] leading-[1.7] text-ink-soft md:block">
            Every fragrance under ₹800. Free shipping above ₹499, COD available.
          </p>
        </div>

        {/* Mobile: horizontal snap carousel. Desktop: 4-col grid. */}
        <ul
          ref={trackRef}
          className="free-scroll -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4"
          aria-label="Bestselling products"
        >
          {products.map((product, i) => (
            <li
              key={product.id}
              className="w-[72vw] shrink-0 snap-start sm:w-[46vw] md:w-auto"
            >
              <ProductCard product={product} priority={i < 2} stickyId={product.id} />
            </li>
          ))}
        </ul>

        {/* Dots — mobile only */}
        <div className="mt-5 flex justify-center gap-2 md:hidden" aria-hidden="true">
          {products.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-5 bg-ink' : 'w-1.5 bg-ink/25'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
