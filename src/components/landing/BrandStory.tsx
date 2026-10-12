'use client'

import Image from 'next/image'
import Reveal from './Reveal'

/* ————————————————————————————————————————————————————————————————
   BrandStory — split layout: still-life image left, copy right.
   Short emotional pitch for accessible luxury.
———————————————————————————————————————————————————————————————— */

export default function BrandStory() {
  return (
    <section id="brand-story" aria-labelledby="brand-story-heading" className="scroll-mt-20 bg-ivory">
      <div className="shell grid items-center gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-beige sm:aspect-[3/2] lg:aspect-[4/5]">
            <Image
              src="/images/IMG-20260802-WA0019.jpg"
              alt="A quiet still life from the ORYN studio — bottles, linen, and late-afternoon light"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 92vw, 48vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
          <p className="section-tag mb-5">Our Story</p>
          <h2 id="brand-story-heading" className="font-serif text-3xl font-semibold leading-[1.12] text-ink md:text-[2.6rem]">
            Real luxury shouldn&rsquo;t cost <span className="italic">a month&rsquo;s rent.</span>
          </h2>
          <div className="mt-7 space-y-5 text-[15.5px] leading-[1.8] text-ink-soft">
            <p>
              We started ORYN with a simple frustration: the fragrances we loved sat behind glass
              counters and four-digit price tags. A good perfume became something you saved for —
              or worse, faked.
            </p>
            <p>
              So we built the opposite. A small collection, composed slowly with fine French oils
              and Indian inspiration, priced honestly — nothing above ₹800, ever. No celebrity
              campaigns to pay for. Just the fragrance.
            </p>
          </div>
          <p className="mt-8 border-l-2 border-gold pl-5 font-serif text-lg italic text-ink">
            &ldquo;Everyone deserves a signature scent.&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  )
}
