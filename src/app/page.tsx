'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import products, { Product } from '@/lib/products'
import { useCart } from '@/context/CartContext'

/* Reveal-on-scroll: gentle fade/translate, no parallax, no gimmicks */
function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add('is-visible'), delay)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

/* Editorial product photo tile: the real photograph, uncropped, on its own paper */
function ProductPhoto({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden">
      <Image
        src={product.image}
        alt={`${product.name} — eau de parfum bottle`}
        fill
        priority={priority}
        sizes="(max-width: 640px) 86vw, (max-width: 1024px) 44vw, 30vw"
        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
      />
    </div>
  )
}

export default function HomePage() {
  const { addToCart } = useCart()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const scrollToCollection = () => {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })
  }

  const featured = products[5] // Oryn Black Oud — the deepest composition

  return (
    <div className="bg-ivory text-ink">
      {/* ═══════════════ HERO — faded bottle backdrop, brand plate ═══════════════ */}
      <section className="relative bg-[#241a11] overflow-hidden">
        {/* The bottle photograph, faded into the ground as a full-bleed backdrop */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/black-oud-dark.png"
            alt=""
            priority
            fill
            sizes="100vw"
            className="object-cover opacity-75 brightness-[1.9] saturate-[1.15]"
          />
          {/* Warm amber cast + a soft scrim on the copy side only */}
          <div className="absolute inset-0 bg-[#8a5a24]/10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#241a11]/85 via-[#241a11]/30 to-transparent" />
          <div className="lg:hidden absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#241a11]/80 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1400px] grid lg:grid-cols-2 lg:min-h-[100svh]">
          {/* Copy — left, on warm near-black */}
          <div className="order-2 lg:order-1 flex items-center px-6 md:px-10 pt-14 pb-20 lg:py-0 lg:pl-10 xl:pl-16">
            <div className="max-w-3xl">
              <p className="hero-rise hero-rise-1 text-[10px] uppercase tracking-[0.35em] text-ivory/50 mb-8">
                A new fragrance house — Est. MMXXVI
              </p>
              <h1 className="hero-rise hero-rise-2 font-serif text-[2.75rem] sm:text-5xl lg:text-[2.9rem] xl:text-[3.8rem] leading-[1.12] text-ivory mb-8">
                The scent you wear
                <br />
                becomes part of
                <br />
                <span className="italic font-normal">your story.</span>
              </h1>
              <p className="hero-rise hero-rise-2 text-ivory/60 text-base md:text-lg font-light leading-relaxed max-w-md mb-10">
                Six fragrances, composed with patience and restraint. Nothing more, nothing less.
              </p>
              <div className="hero-rise hero-rise-3">
                <button onClick={scrollToCollection} className="btn-light">
                  Discover Oryn
                </button>
              </div>
            </div>
          </div>

          {/* The brand plate — where the bottle stood */}
          <div className="order-1 lg:order-2 relative flex items-center justify-center min-h-[64svh] lg:min-h-full px-6 py-16 lg:py-24">
            <div className="hero-rise hero-rise-2 relative w-60 sm:w-72 lg:w-[21rem] aspect-[4/5] border border-gold/40 p-2">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src="/images/oryn-brand-plate.png"
                  alt="ORYN — brand emblem"
                  fill
                  priority
                  sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ INTRODUCING ORYN ═══════════════ */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-3xl px-6 py-28 md:py-40 text-center">
          <Reveal>
            <p className="section-tag">Oryn</p>
            <h2 className="font-serif text-3xl md:text-[2.75rem] leading-[1.25] mb-10">
              A new fragrance house, built on a simple belief —
              <span className="italic"> that one honest fragrance says more than fifty forgettable ones.</span>
            </h2>
            <p className="text-ink-soft font-light leading-relaxed text-base md:text-lg max-w-xl mx-auto">
              Oryn exists because we believed fragrance had become noise. Ours is a quieter
              argument: fewer fragrances, composed carefully, presented honestly. We are new —
              and we think that is worth something. Every bottle we make carries the care of a
              house with something to prove.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ LAUNCH COLLECTION ═══════════════ */}
      <section id="collection" className="bg-ivory-deep border-y border-ink/10 scroll-mt-16">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32">
          <Reveal className="text-center mb-16 md:mb-24">
            <p className="section-tag">The First Collection</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Six fragrances. No more.</h2>
            <p className="text-ink-soft font-light max-w-xl mx-auto">
              Our entire offering, composed to be lived in — from first spray to last trace on the skin.
            </p>
          </Reveal>

          {/* Editorial staggered grid — photos breathe, no card boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-16 md:gap-y-24">
            {products.map((product, i) => (
              <Reveal key={product.id} delay={(i % 3) * 90}>
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="group block w-full text-left cursor-pointer"
                >
                  <ProductPhoto product={product} />
                  <div className="pt-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-serif text-xl md:text-2xl group-hover:text-gold transition-colors duration-500">
                        {product.name.replace(/^Oryn\s/, '')}
                      </h3>
                      <span className="text-sm font-light text-ink-soft whitespace-nowrap">
                        ₹{product.price}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[10px] uppercase tracking-[0.25em] text-stone">
                      {product.fragrance}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ORYN PHILOSOPHY ═══════════════ */}
      <section id="philosophy" className="bg-ivory scroll-mt-16">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Sticky text column */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <Reveal>
                <p className="section-tag">Philosophy</p>
                <h2 className="font-serif text-4xl md:text-[2.9rem] leading-[1.15] mb-8">
                  Fewer, better.
                  <br />
                  <span className="italic">Nothing that isn&rsquo;t meant to last.</span>
                </h2>
                <p className="text-ink-soft font-light leading-relaxed max-w-md">
                  The fragrance industry releases thousands of launches a year, most of them
                  forgotten before the season turns. We choose the opposite discipline: a small
                  collection, refined until each fragrance deserves its place.
                </p>
              </Reveal>
            </div>

            {/* Numbered principles — typographic, not cards */}
            <div className="lg:col-span-7">
              {[
                {
                  n: 'I',
                  title: 'Quality over quantity',
                  copy: 'One collection, refined to its essentials. We would rather perfect six fragrances than ship sixty.',
                },
                {
                  n: 'II',
                  title: 'Timeless, not seasonal',
                  copy: 'These compositions were not designed to chase a trend cycle. They are meant to be worn for years, not months.',
                },
                {
                  n: 'III',
                  title: 'Fragrance as identity',
                  copy: 'A scent should feel like it belongs to you — close, personal, unmistakably yours rather than loudly everywhere.',
                },
                {
                  n: 'IV',
                  title: 'Thoughtful, considered design',
                  copy: 'From the composition in the bottle to the paper around it, every detail is deliberate. Nothing is decoration for its own sake.',
                },
              ].map((item, i) => (
                <Reveal key={item.n} delay={i * 60}>
                  <div className="flex gap-8 md:gap-12 py-9 md:py-11 border-t border-ink/15 last:border-b">
                    <span className="font-serif text-sm text-gold pt-1.5 w-8 shrink-0">{item.n}</span>
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl mb-3">{item.title}</h3>
                      <p className="text-ink-soft font-light leading-relaxed max-w-lg">{item.copy}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FRAGRANCE AS IDENTITY ═══════════════ */}
      <section id="identity" className="relative bg-ink text-ivory overflow-hidden scroll-mt-16">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-28 md:py-40">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Photo tile: the real Arabian Oud photograph, full-bleed on its studio ground */}
            <Reveal>
              <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 overflow-hidden">
                <Image
                  src="/images/arabian-oud-purple.png"
                  alt="Oryn Arabian Oud bottle in deep violet glass"
                  fill
                  sizes="(max-width: 1024px) 86vw, 42vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="section-tag">Identity</p>
              <h2 className="font-serif text-4xl md:text-[2.9rem] leading-[1.15] mb-8">
                You remember people
                <br />
                <span className="italic">by how they smelled.</span>
              </h2>
              <div className="space-y-6 text-ivory/70 font-light leading-relaxed max-w-md">
                <p>
                  Long after a conversation fades, a scent stays. Someone&rsquo;s perfume can
                  return you to a room you left years ago — a particular evening, a particular
                  person, a version of yourself you had almost forgotten.
                </p>
                <p>
                  That is why we compose slowly. A fragrance is not a product you finish; it is
                  something that becomes yours. Choose it the way you would choose a signature —
                  carefully, and once.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED / SIGNATURE FRAGRANCE ═══════════════ */}
      <section id="signature" className="bg-sand scroll-mt-16">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32">
          <Reveal className="mb-14 md:mb-20">
            <p className="section-tag">The Signature</p>
            <h2 className="font-serif text-4xl md:text-5xl">Black Oud</h2>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal className="lg:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={`${featured.name} — ${featured.fragrance}`}
                  fill
                  sizes="(max-width: 1024px) 92vw, 58vw"
                  className="object-cover object-[center_30%]"
                />
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-5">
                {featured.concentration}
              </p>
              <p className="font-light text-ink-soft leading-relaxed mb-10 max-w-md">
                Smoked oud, dark spices, incense. The deepest composition in the collection —
                composed for evenings that ask for something with weight and intent.
              </p>

              {/* Notes — typographic table, no boxes */}
              <div className="border-t border-ink/15 mb-10 max-w-md">
                {[
                  ['Top', featured.topNotes],
                  ['Heart', featured.heartNotes],
                  ['Base', featured.baseNotes],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-8 py-4 border-b border-ink/15">
                    <span className="w-14 shrink-0 text-[10px] uppercase tracking-[0.25em] text-stone pt-1">
                      {label}
                    </span>
                    <span className="text-sm font-light text-ink-soft">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-8">
                <span className="font-serif text-2xl">₹{featured.price}</span>
                <button onClick={() => setSelectedProduct(featured)} className="btn-dark">
                  Explore the fragrance
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ THE BEGINNING OF ORYN ═══════════════ */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <Reveal>
              <p className="section-tag">The Beginning</p>
              <h2 className="font-serif text-4xl md:text-[2.9rem] leading-[1.15] mb-8">
                Every house starts
                <br />
                <span className="italic">somewhere.</span>
              </h2>
              <p className="text-ink-soft font-light leading-relaxed max-w-md">
                This is where Oryn begins — no archive, no history, nothing behind us but the
                intention to make something worth keeping. What we can offer you today is small:
                six fragrances, made carefully, presented honestly.
              </p>
              <Link href="/about" className="inline-block mt-8 text-[11px] uppercase tracking-wide2 text-ink border-b border-gold pb-1 hover:text-gold transition-colors duration-300">
                Read our story
              </Link>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative aspect-[16/10] lg:mt-16 overflow-hidden">
                <Image
                  src="/images/strawberry-red.png"
                  alt="An Oryn fragrance on its studio plinth"
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-stone">
                From the first Oryn studio sitting
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ DISCOVER THE COLLECTION — CLOSER ═══════════════ */}
      <section className="bg-ivory">
        <div className="border-t border-ink/15">
          <div className="mx-auto max-w-3xl px-6 py-28 md:py-40 text-center">
            <Reveal>
              <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] mb-6">
                Begin with <span className="italic">one.</span>
              </h2>
              <p className="text-ink-soft font-light leading-relaxed max-w-md mx-auto mb-12">
                Six fragrances. Find the one that becomes yours.
              </p>
              <Link href="#collection" className="btn-dark">
                Shop the collection
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ PRODUCT DIALOGUE ═══════════════ */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/60 backdrop-blur-sm animate-fade-in">
          <div className="absolute inset-0" onClick={() => setSelectedProduct(null)} />

          <div className="relative z-10 bg-ivory w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[86vh] overflow-y-auto flex flex-col sm:flex-row shadow-2xl">
            {/* Photograph */}
            <div className="relative sm:w-1/2 aspect-[4/5] sm:aspect-auto sm:min-h-[560px] bg-sand">
              <Image
                src={selectedProduct.image}
                alt={`${selectedProduct.name} — eau de parfum`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="sm:w-1/2 p-8 md:p-12 flex flex-col">
              <button
                onClick={() => setSelectedProduct(null)}
                className="self-end text-stone hover:text-ink transition-colors mb-6 sm:absolute sm:top-5 sm:right-5"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-4">
                {selectedProduct.family} — {selectedProduct.concentration}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl mb-3">
                {selectedProduct.name.replace(/^Oryn\s/, '')}
              </h2>
              <p className="text-[10px] uppercase tracking-[0.25em] text-stone mb-8">
                {selectedProduct.fragrance}
              </p>

              <p className="text-ink-soft font-light leading-relaxed mb-10">
                {selectedProduct.description}
              </p>

              {/* Notes */}
              <div className="border-t border-ink/15 mb-10">
                {[
                  ['Top', selectedProduct.topNotes],
                  ['Heart', selectedProduct.heartNotes],
                  ['Base', selectedProduct.baseNotes],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-6 py-3.5 border-b border-ink/15">
                    <span className="w-12 shrink-0 text-[10px] uppercase tracking-[0.25em] text-stone pt-0.5">
                      {label}
                    </span>
                    <span className="text-sm font-light text-ink-soft">{value}</span>
                  </div>
                ))}
                <div className="flex gap-6 py-3.5 border-b border-ink/15">
                  <span className="w-12 shrink-0 text-[10px] uppercase tracking-[0.25em] text-stone pt-0.5">
                    Wears
                  </span>
                  <span className="text-sm font-light text-ink-soft">
                    {selectedProduct.longevity} — {selectedProduct.projection}
                  </span>
                </div>
              </div>

              <div className="mt-auto flex items-center gap-8 pt-4">
                <span className="font-serif text-2xl">₹{selectedProduct.price}</span>
                <button
                  onClick={() => {
                    addToCart(selectedProduct)
                    setSelectedProduct(null)
                  }}
                  className="btn-dark flex-1"
                >
                  Add to bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
