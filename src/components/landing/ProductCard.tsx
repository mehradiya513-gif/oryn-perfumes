'use client'

import { useState } from 'react'
import Image from 'next/image'
import { type Product, formatINR, discountPct } from '@/lib/products'
import { useCart } from '@/context/CartContext'

/* ————————————————————————————————————————————————————————————————
   ProductCard — Haute Parfumerie Glass Card with Instant Add to Bag
———————————————————————————————————————————————————————————————— */

export default function ProductCard({
  product,
  priority = false,
  stickyId,
}: {
  product: Product
  priority?: boolean
  compact?: boolean
  stickyId?: string
}) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const discount = discountPct(product.price, product.mrp)

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#1E3A5F] bg-[#0F1E35] p-4 shadow-sm transition-all duration-500 hover:border-[#C9A84C] hover:shadow-card hover:-translate-y-1.5"
      data-sticky-product={stickyId}
    >
      {/* Image Showcase Frame */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#112240] via-[#0D1B2E] to-[#0F1E35] p-4">
        
        {/* Subtle radial aura behind bottle */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-radial-gradient from-[#C9A84C]/20 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Hover Crossfade Secondary Image */}
        {product.imageHover && (
          <Image
            src={product.imageHover}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
            className="object-contain p-2 opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
          />
        )}

        {/* Primary Image */}
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
          className={`object-contain p-2 drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] transition-all duration-700 ease-out group-hover:scale-105 ${
            product.imageHover ? 'group-hover:opacity-0' : ''
          }`}
        />

        {/* Floating Top Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          {discount > 0 && (
            <span className="rounded-md bg-gradient-to-r from-[#C9A84C] via-[#E8D5A3] to-[#C9A84C] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#0D1B2E] shadow-sm">
              {discount}% off
            </span>
          )}
          {product.bestseller && (
            <span className="rounded-md border border-[#C9A84C]/40 bg-[#0D1B2E]/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#C9A84C] backdrop-blur-sm shadow-sm">
              Bestseller
            </span>
          )}
        </div>

        {/* Longevity badge */}
        <span className="absolute bottom-2.5 right-2.5 z-10 rounded-md border border-[#1E3A5F] bg-[#0D1B2E]/85 px-2 py-0.5 text-[9px] font-semibold text-[#9BAEC8] backdrop-blur-sm">
          {product.longevity}
        </span>
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col pt-4">
        {/* Family tag */}
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
          <span>{product.family}</span>
          <span>{product.category}</span>
        </div>

        {/* Title */}
        <h3 className="mt-1.5 font-serif text-xl font-semibold text-[#EAE6FF] transition-colors duration-300 group-hover:text-[#C9A84C]">
          {product.name}
        </h3>

        {/* Tagline Notes preview */}
        <p className="mt-1 text-xs text-[#9BAEC8] line-clamp-1">
          {product.tagline}
        </p>

        {/* Price & Savings */}
        <div className="mt-3 flex items-baseline gap-2.5">
          <span className="text-lg font-bold text-[#EAE6FF]">{formatINR(product.price)}</span>
          <span className="text-xs text-[#6B7FA3] line-through">
            {formatINR(product.mrp)}
          </span>
          <span className="text-[10px] font-semibold text-[#C9A84C]">
            Save {formatINR(product.mrp - product.price)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAdd}
          disabled={added}
          aria-label={`Add ${product.name} to cart`}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
            added
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'border border-[#C9A84C]/50 bg-[#112240] text-[#C9A84C] hover:border-[#C9A84C] hover:bg-gradient-to-r hover:from-[#C9A84C] hover:via-[#E8D5A3] hover:to-[#C9A84C] hover:text-[#0D1B2E] hover:shadow-gold-sm active:scale-[0.98]'
          }`}
        >
          {added ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Added to Bag</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" strokeLinejoin="round" />
                <path d="M3 6h18M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
              </svg>
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>
    </article>
  )
}
