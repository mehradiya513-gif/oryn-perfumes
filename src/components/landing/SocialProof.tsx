'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

/* ————————————————————————————————————————————————————————————————
   SocialProof — Verified Customer Reviews & Community Gallery
———————————————————————————————————————————————————————————————— */

const reviews = [
  {
    name: 'Ananya S.',
    city: 'Mumbai',
    scent: 'Love Affair',
    stars: 5,
    text: 'Ordered Love Affair for daily wear — 10 hours later I can still smell warm marshmallow and vanilla. At ₹550, the quality is truly amazing.',
  },
  {
    name: 'Rohan M.',
    city: 'New Delhi',
    scent: 'Sultan',
    stars: 5,
    text: 'Sultan gets me compliments every time I wear it to meetings or dinner. Friends cannot believe it costs under ₹800.',
  },
  {
    name: 'Priya K.',
    city: 'Bengaluru',
    scent: 'Scarlet Kiss',
    stars: 5,
    text: 'Scarlet Kiss has the most beautiful strawberry and vanilla dry down. Beautiful luxury feel from the box to the bottle.',
  },
  {
    name: 'Vikram J.',
    city: 'Pune',
    scent: 'Vodka Ice',
    stars: 5,
    text: 'Vodka Ice is my favorite scent now. Ultra fresh, crisp, and easily lasts through my whole 12-hour workday. Fast delivery made it easy.',
  },
]

const ugc = [
  { src: '/images/vodka-ice.png', alt: 'ORYN Vodka Ice luxury flacon', name: 'Vodka Ice' },
  { src: '/images/scarlet-kiss.png', alt: 'ORYN Scarlet Kiss luxury flacon', name: 'Scarlet Kiss' },
  { src: '/images/sultan.png', alt: 'ORYN Sultan royal purple flacon', name: 'Sultan' },
  { src: '/images/love-affair.png', alt: 'ORYN Love Affair soft pink flacon', name: 'Love Affair' },
  { src: '/images/venom.png', alt: 'ORYN Venom emerald green flacon', name: 'Venom' },
  { src: '/images/bloom-gold.png', alt: 'ORYN Discovery Duo gift set', name: 'Discovery Duo' },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width="14" height="14" viewBox="0 0 24 24" fill={n <= count ? '#C9A84C' : 'none'} stroke="#C9A84C" strokeWidth="1.5">
          <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1L12 2Z" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  )
}

export default function SocialProof() {
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-20 bg-[#0A0A0A] py-20 md:py-28 relative">
      <div className="shell">
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="section-tag mb-4">Customer Reviews</span>
            <h2 id="reviews-heading" className="font-serif text-3xl font-semibold leading-[1.1] text-[#F5F2EB] md:text-5xl">
              Loved &amp; <span className="gold-gradient-text italic">Re-ordered</span> Across India
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-[#C9A84C]/30 bg-[#121212] px-5 py-2.5 shadow-sm">
            <Stars count={5} />
            <span className="text-xs font-bold text-[#F5F2EB]">4.9 · 2,400+ Happy Customers</span>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex h-full flex-col rounded-3xl border border-[#262626] bg-[#161616] p-6 shadow-sm transition-all duration-300 hover:border-[#C9A84C] hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <Stars count={review.stars} />
                <span className="text-[10px] font-semibold text-[#C9A84C] uppercase tracking-wider">
                  Verified Buyer
                </span>
              </div>

              <p className="mt-4 flex-1 text-sm leading-[1.8] text-[#A8A29E] italic">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="mt-6 border-t border-[#262626] pt-4">
                <p className="text-xs font-bold text-[#F5F2EB] uppercase tracking-wider">
                  {review.name} <span className="font-normal text-[#78716C]">· {review.city}</span>
                </p>
                <p className="text-[11px] font-medium text-[#C9A84C] mt-0.5">
                  Favorite: {review.scent}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* UGC Community Gallery */}
        <div className="mt-16 pt-12 border-t border-[#262626]">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]">
              #WearORYN on Instagram
            </span>
            <span className="text-xs text-[#78716C]">Tagged by 8,000+ creators on Instagram</span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {ugc.map((item) => (
              <div
                key={item.src}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-[#262626] bg-[#161616] shadow-sm"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-80"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-[11px] font-bold text-white">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
