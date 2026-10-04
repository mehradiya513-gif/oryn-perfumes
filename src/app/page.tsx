'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import products, { Product } from '@/lib/products'
import { useCart } from '@/context/CartContext'
import Reveal from '@/components/Reveal'

/* ————— Product card — fixed image frame, identical internal structure ————— */
function ProductCard({
  product,
  onOpen,
  onAdd,
  priority = false,
}: {
  product: Product
  onOpen: (p: Product) => void
  onAdd: (p: Product) => void
  priority?: boolean
}) {
  const shortName = product.name.replace(/^Oryn\s/, '')

  return (
    <div className="group flex h-full flex-col">
      {/* Fixed frame — every bottle sits in an identical 4:5 photograph */}
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-beige"
        aria-label={`View ${product.name}`}
      >
        <Image
          src={product.image}
          alt={`${product.name} — eau de parfum bottle`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 380px"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        />
      </button>

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-xl font-semibold text-ink">{shortName}</h3>
          <span className="text-[15px] font-semibold text-ink">₹{product.price}</span>
        </div>
        <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-stone">
          {product.fragrance}
        </p>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={() => onAdd(product)}
            className="inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            Add to bag
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 8h11M9 3.5 13.5 8 9 12.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const { addToCart } = useCart()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const featured = products[5] // Oryn Black Oud — the signature composition

  const scrollToCollection = () => {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })
  }

  /* Close the product dialogue with Escape */
  useEffect(() => {
    if (!selectedProduct) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProduct(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedProduct])

  return (
    <div className="bg-ivory text-ink">
      {/* ═══════════ 1 · HERO — campaign photograph right, copy left ═══════════ */}
      <section className="bg-ivory pt-20">
        <div className="grid lg:min-h-[calc(100svh-5rem)] lg:grid-cols-12">
          {/* Copy — vertically aligned with the photograph */}
          <div className="order-1 flex items-center lg:col-span-5">
            <div className="py-14 md:py-16 lg:py-0 lg:pr-12">
              <p className="section-tag hero-rise hero-rise-1 mb-8">A new fragrance house</p>
              <h1 className="hero-rise hero-rise-2 font-serif text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.9rem]">
                Made to be
                <br />
                <span className="italic">remembered.</span>
              </h1>
              <p className="hero-rise hero-rise-2 mt-7 max-w-md text-[16px] leading-[1.8] text-ink-soft md:text-[17px]">
                Six fragrances, composed slowly and made to last — the first collection from Oryn.
              </p>
              <div className="hero-rise hero-rise-3 mt-10 hidden lg:block">
                <button type="button" onClick={scrollToCollection} className="btn-dark">
                  Discover Oryn
                </button>
              </div>
            </div>
          </div>

          {/* The photograph — the bottle is the focal point */}
          <div className="relative order-2 min-h-[420px] w-full sm:aspect-[4/5] lg:order-2 lg:col-span-7 lg:aspect-auto lg:min-h-full">
            {/* The brand line — one quiet anchor in the frame's empty corner */}
            <span
              aria-hidden="true"
              className="hero-rise hero-rise-1 pointer-events-none absolute left-0 top-16 hidden select-none font-serif text-[8.5rem] font-semibold uppercase leading-none tracking-brand text-ivory/40 lg:block xl:text-[9.5rem]"
            >
              Oryn
            </span>
            <Image
              src="/images/arabian-oud-purple.png"
              alt="ORYN Arabian Oud — eau de parfum bottle"
              priority
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </div>

          {/* Mobile CTA — copy, then image, then the call to action */}
          <div className="order-3 py-12 lg:hidden">
            <button type="button" onClick={scrollToCollection} className="btn-dark">
              Discover Oryn
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════ 2 · INTRODUCING ORYN ═══════════ */}
      <section className="bg-cream">
        <div className="shell py-24 md:py-32">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <p className="section-tag mb-6">Introducing Oryn</p>
              <h2 className="font-serif text-3xl font-semibold leading-[1.18] tracking-[-0.01em] text-ink md:text-[2.6rem] md:leading-[1.16]">
                One honest fragrance says more than{' '}
                <span className="italic">fifty forgettable ones.</span>
              </h2>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-4 lg:col-start-9 lg:flex lg:flex-col lg:justify-end">
              <p className="text-[15.5px] leading-[1.8] text-ink-soft">
                Oryn exists because fragrance had become noise — thousands of launches a year, most
                of them forgotten before the season turns.
              </p>
              <p className="mt-5 text-[15.5px] leading-[1.8] text-ink-soft">
                We make the opposite. A small collection, composed carefully, presented honestly.
                We are new — and we think that is worth something.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 3 · THE LAUNCH COLLECTION ═══════════ */}
      <section id="collection" className="scroll-mt-24 bg-ivory">
        <div className="shell py-24 md:py-32">
          <Reveal className="mb-14 md:mb-20">
            <div className="grid items-end gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <p className="section-tag mb-6">The Launch Collection</p>
                <h2 className="font-serif text-4xl font-semibold leading-[1.1] tracking-[-0.01em] text-ink md:text-5xl">
                  Six fragrances. No more.
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-[15px] leading-[1.8] text-ink-soft">
                  Our entire offering, nothing held back — composed to be lived in, from the first
                  spray to the last trace on the skin.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
            {products.map((product, i) => (
              <Reveal key={product.id} delay={(i % 3) * 90}>
                <ProductCard
                  product={product}
                  onOpen={setSelectedProduct}
                  onAdd={addToCart}
                  priority={i < 3}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 4 · ORYN PHILOSOPHY ═══════════ */}
      <section id="philosophy" className="scroll-mt-24 bg-blush">
        <div className="shell py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <p className="section-tag mb-6">Our Philosophy</p>
              <h2 className="font-serif text-3xl font-semibold leading-[1.15] tracking-[-0.01em] text-ink md:text-[2.6rem]">
                Fewer, better. Nothing that isn&rsquo;t meant to last.
              </h2>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
              <p className="text-[15.5px] leading-[1.8] text-ink-soft">
                Most fragrance is designed for a season and gone by the next. Oryn is built on a
                quieter discipline — fewer fragrances, refined until each one deserves its place.
              </p>

              <div className="mt-10">
                {[
                  {
                    n: 'I',
                    title: 'Quality over quantity',
                    copy: 'Six fragrances, refined until each deserves its place.',
                  },
                  {
                    n: 'II',
                    title: 'Timeless, not seasonal',
                    copy: 'Composed to be worn for years, not one trend cycle.',
                  },
                  {
                    n: 'III',
                    title: 'Fragrance as identity',
                    copy: 'A scent should feel like it belongs to you, not the room.',
                  },
                  {
                    n: 'IV',
                    title: 'Considered design',
                    copy: 'From the composition to the paper it arrives in, nothing is accidental.',
                  },
                ].map((item, i) => (
                  <div
                    key={item.n}
                    className={`flex gap-6 py-6 md:gap-8 ${i === 0 ? 'border-t border-ink/15' : ''} ${
                      i < 3 ? 'border-b border-ink/15' : ''
                    }`}
                  >
                    <span className="w-8 shrink-0 pt-0.5 font-serif text-sm text-gold">{item.n}</span>
                    <div>
                      <h3 className="text-[15px] font-bold tracking-[0.01em] text-ink">{item.title}</h3>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">{item.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 5 · FRAGRANCE & IDENTITY ═══════════ */}
      <section className="bg-ivory">
        <div className="shell py-24 md:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-7">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-beige sm:aspect-[3/2] lg:aspect-[4/5]">
                <Image
                  src="/images/IMG-20260802-WA0019.jpg"
                  alt="A quiet still life from the Oryn studio"
                  fill
                  sizes="(max-width: 1024px) 92vw, 58vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5">
              <p className="section-tag mb-6">Fragrance &amp; Identity</p>
              <h2 className="font-serif text-3xl font-semibold leading-[1.15] tracking-[-0.01em] text-ink md:text-[2.6rem]">
                You remember people <span className="italic">by how they smelled.</span>
              </h2>
              <div className="mt-8 space-y-6 text-[15.5px] leading-[1.8] text-ink-soft">
                <p>
                  Long after a conversation fades, a scent stays. It can return you to a room you
                  left years ago — a particular evening, a particular person, a version of yourself
                  you had almost forgotten.
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

      {/* ═══════════ 6 · FEATURED FRAGRANCE ═══════════ */}
      <section id="signature" className="scroll-mt-24 bg-cream">
        <div className="shell py-24 md:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-beige">
                <Image
                  src={featured.image}
                  alt={`${featured.name} — ${featured.fragrance}`}
                  fill
                  sizes="(max-width: 1024px) 92vw, 58vw"
                  className="object-cover object-[center_35%]"
                />
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5">
              <p className="section-tag mb-6">The Signature</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone">
                {featured.concentration.replace(' concentration)', ')')}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-ink md:text-4xl">
                {featured.name.replace(/^Oryn\s/, '')}
              </h2>
              <p className="mt-6 max-w-md text-[15.5px] leading-[1.8] text-ink-soft">
                Smoked oud, dark spices, incense. The deepest composition in the collection — made
                for evenings that ask for something with weight and intent.
              </p>

              <div className="mt-10 max-w-md border-t border-ink/15">
                {(
                  [
                    ['Top', featured.topNotes],
                    ['Heart', featured.heartNotes],
                    ['Base', featured.baseNotes],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="flex gap-6 border-b border-ink/15 py-4 md:gap-8">
                    <span className="w-14 shrink-0 pt-0.5 text-[10px] font-bold uppercase tracking-[0.25em] text-stone">
                      {label}
                    </span>
                    <span className="text-[14.5px] leading-relaxed text-ink-soft">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-8">
                <span className="font-serif text-[1.6rem] font-semibold text-ink">
                  ₹{featured.price}
                </span>
                <button type="button" onClick={() => addToCart(featured)} className="btn-dark">
                  Add to bag
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 7 · THE BEGINNING OF ORYN ═══════════ */}
      <section className="bg-ivory">
        <div className="shell py-24 md:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <p className="section-tag mb-6">The Beginning of Oryn</p>
              <h2 className="font-serif text-3xl font-semibold leading-[1.15] tracking-[-0.01em] text-ink md:text-[2.6rem]">
                This is where <span className="italic">Oryn begins.</span>
              </h2>
              <p className="mt-8 max-w-md text-[15.5px] leading-[1.8] text-ink-soft">
                No archive, no heritage to lean on — only a clear idea of what fragrance should be,
                and the patience to make it properly. Six fragrances, made carefully, presented
                honestly. That is the whole story, and we intend to keep it that way.
              </p>
              <Link
                href="/about"
                className="mt-10 inline-flex items-center gap-2 border-b border-gold pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:text-gold"
              >
                Read our story
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
              <div className="relative aspect-square w-full overflow-hidden bg-beige">
                <Image
                  src="/images/oryn-plaque.jpg"
                  alt="The Oryn mark"
                  fill
                  sizes="(max-width: 1024px) 92vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.25em] text-stone">
                The Oryn mark, as it appears on every bottle
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 8 · FINAL CALL — the page closes in charcoal ═══════════ */}
      <section className="bg-ink text-ivory">
        <div className="shell py-28 text-center md:py-36">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.015em] text-ivory md:text-[3.5rem]">
              Begin with <span className="italic">one.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[15.5px] leading-[1.8] text-ivory/60">
              Six fragrances. Find the one that becomes yours.
            </p>
            <div className="mt-12">
              <button type="button" onClick={scrollToCollection} className="btn-light">
                Shop the Collection
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ PRODUCT DIALOGUE ═══════════ */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 backdrop-blur-sm animate-fade-in sm:items-center">
          <div className="absolute inset-0" onClick={() => setSelectedProduct(null)} />

          <div className="relative z-10 flex max-h-[92vh] w-full flex-col overflow-y-auto bg-ivory shadow-soft sm:max-h-[86vh] sm:max-w-4xl sm:flex-row">
            <div className="relative aspect-[4/5] bg-beige sm:aspect-auto sm:min-h-[560px] sm:w-1/2">
              <Image
                src={selectedProduct.image}
                alt={`${selectedProduct.name} — eau de parfum`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col p-8 sm:w-1/2 md:p-12">
              <button
                onClick={() => setSelectedProduct(null)}
                className="mb-6 self-end text-stone transition-colors hover:text-ink sm:absolute sm:right-5 sm:top-5"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                {selectedProduct.family} — {selectedProduct.concentration.replace(' concentration)', ')')}
              </p>
              <h2 className="mt-4 font-serif text-3xl font-semibold text-ink md:text-4xl">
                {selectedProduct.name.replace(/^Oryn\s/, '')}
              </h2>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-stone">
                {selectedProduct.fragrance}
              </p>

              <p className="mt-7 text-[15px] leading-[1.8] text-ink-soft">
                {selectedProduct.description}
              </p>

              <div className="mt-8 border-t border-ink/15">
                {(
                  [
                    ['Top', selectedProduct.topNotes],
                    ['Heart', selectedProduct.heartNotes],
                    ['Base', selectedProduct.baseNotes],
                    ['Wears', `${selectedProduct.longevity} — ${selectedProduct.projection}`],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="flex gap-6 border-b border-ink/15 py-3.5">
                    <span className="w-12 shrink-0 pt-0.5 text-[10px] font-bold uppercase tracking-[0.25em] text-stone">
                      {label}
                    </span>
                    <span className="text-[14px] leading-relaxed text-ink-soft">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-8 pt-8">
                <span className="font-serif text-2xl font-semibold text-ink">
                  ₹{selectedProduct.price}
                </span>
                <button
                  type="button"
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
