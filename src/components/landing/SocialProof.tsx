'use client'

import Image from 'next/image'
import Reveal from './Reveal'

/* ————————————————————————————————————————————————————————————————
   SocialProof — customer reviews with star ratings, plus an
   Instagram-style UGC grid. Review/UGC content lives here in the
   component; move to a data file once volume grows.
———————————————————————————————————————————————————————————————— */

const reviews = [
  {
    name: 'Ananya S.',
    city: 'Mumbai',
    stars: 5,
    text: 'Ordered Passport for daily office wear — 10 hours later my kurta still smells of vanilla. At ₹450 this is unreal value.',
  },
  {
    name: 'Rohan M.',
    city: 'Delhi',
    stars: 5,
    text: 'Arabian Oud gets compliments every single time I wear it out. People refuse to believe it costs less than ₹800.',
  },
  {
    name: 'Priya K.',
    city: 'Bengaluru',
    stars: 4,
    text: 'Bought the Discovery Duo as a gift and ended up ordering a full bottle for myself the next week. Beautiful packaging.',
  },
  {
    name: 'Vikram J.',
    city: 'Pune',
    stars: 5,
    text: 'Black Oud is my winter signature now. Deep, smoky, and it lasts my whole shift. COD made trying it risk-free.',
  },
]

const ugc = [
  { src: '/images/strawberry-red.png', alt: 'ORYN Wild Strawberry bottle on a dressing table' },
  { src: '/images/arabian-oud-purple.png', alt: 'ORYN Arabian Oud held against evening light' },
  { src: '/images/passport-pink.png', alt: 'ORYN Passport pack shot on pink silk' },
  { src: '/images/shanaya-green.png', alt: 'ORYN Shanaya with green tea leaves' },
  { src: '/images/gucci-flora-blue.png', alt: 'ORYN Flora beside fresh peonies' },
  { src: '/images/black-oud-dark.png', alt: 'ORYN Black Oud on a dark moody backdrop' },
]

function Stars({ count, label }: { count: number; label: string }) {
  return (
    <span className="flex items-center gap-1" role="img" aria-label={label}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1L12 2Z"
            fill={n <= count ? '#C8A45D' : 'none'}
            stroke="#C8A45D"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  )
}

export default function SocialProof() {
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-20 bg-ivory">
      <div className="shell py-20 md:py-28">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div>
            <p className="section-tag mb-5">Reviews</p>
            <h2 id="reviews-heading" className="font-serif text-3xl font-semibold leading-[1.1] text-ink md:text-[2.6rem]">
              Worn & <span className="italic">re-ordered</span> across India
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Stars count={5} label="Rated 4.9 out of 5" />
            <span className="text-[13px] text-ink-soft">4.9 · 2,300+ orders</span>
          </div>
        </Reveal>

        {/* Review cards */}
        <ul className="grid gap-4 pb-16 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {reviews.map((review, i) => (
            <Reveal key={review.name} delay={i * 80} className="h-full">
              <li className="flex h-full flex-col border border-ink/10 bg-cream p-6">
                <Stars count={review.stars} label={`${review.stars} out of 5 stars`} />
                <p className="mt-4 flex-1 text-[14.5px] leading-[1.75] text-ink-soft">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.18em] text-ink">
                  {review.name} <span className="font-medium normal-case tracking-normal text-ink-soft">· {review.city}</span>
                </p>
              </li>
            </Reveal>
          ))}
        </ul>

        {/* UGC grid */}
        <Reveal>
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-ink-soft">
            #WearORYN — from the community
          </p>
          <ul className="grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
            {ugc.map((item) => (
              <li key={item.src} className="group relative aspect-square overflow-hidden bg-beige">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
