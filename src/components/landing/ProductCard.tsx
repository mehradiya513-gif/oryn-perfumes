'use client'

import Image from 'next/image'
import { type Product, formatINR, discountPct } from '@/lib/products'
import { useCart } from '@/context/CartContext'

/* ————————————————————————————————————————————————————————————————
   ProductCard — the reusable card for Bestsellers and offers.
   Fixed 4:5 image frame, hover image swap, add-to-cart from context.
———————————————————————————————————————————————————————————————— */

export default function ProductCard({
  product,
  priority = false,
  compact = false,
  stickyId,
}: {
  product: Product
  priority?: boolean
  /** Slightly tighter typography for dense grids (Gift sets row, etc.) */
  compact?: boolean
  /** Marks this card for the mobile sticky add-to-cart observer */
  stickyId?: string
}) {
  const { addToCart } = useCart()
  const discount = discountPct(product.price, product.mrp)

  return (
    <article
      className="group flex h-full flex-col"
      data-sticky-product={stickyId}
    >
      {/* Image frame: fixed aspect, swap image on hover with a crossfade */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-beige">
        {product.imageHover && (
          <Image
            src={product.imageHover}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 300px"
            className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          />
        )}
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 300px"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-0"
        />

        {discount > 0 && (
          <span className="absolute left-3 top-3 bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
            {discount}% off
          </span>
        )}
      </div>

      {/* Details */}
      <div className={`flex flex-1 flex-col ${compact ? 'pt-4' : 'pt-5'}`}>
        <h3 className="font-serif text-xl font-semibold text-ink">{product.name}</h3>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
          {product.tagline}
        </p>

        <div className="mt-3 flex items-baseline gap-2.5">
          <span className="text-[15px] font-semibold text-ink">{formatINR(product.price)}</span>
          <span className="text-[13px] text-ink-soft line-through decoration-ink/40">
            {formatINR(product.mrp)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product)}
          aria-label={`Add ${product.name} to cart`}
          className="mt-4 inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:border-gold hover:text-gold"
        >
          Add to cart
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M2 8h11M9 3.5 13.5 8 9 12.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </article>
  )
}
