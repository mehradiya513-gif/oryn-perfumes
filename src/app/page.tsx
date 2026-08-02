'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import products, { Product } from '@/lib/products'
import posts from '@/lib/posts'
import { useCart } from '@/context/CartContext'

export default function HomePage() {
  const { addToCart } = useCart()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isSeller, setIsSeller] = useState(false)

  useEffect(() => {
    setIsSeller(localStorage.getItem('oryn_seller_logged_in') === 'true')
  }, [])
  
  const heroRef = useRef<HTMLDivElement | null>(null)
  const collectionRef = useRef<HTMLDivElement | null>(null)
  const detailRef = useRef<HTMLDivElement | null>(null)

  // Scroll and select product
  const selectProductAndScroll = (product: Product) => {
    setSelectedProduct(product)
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      gsap.fromTo(
        detailRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }
      )
    }, 100)
  }

  const scrollToCollection = () => {
    collectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Entrance animations on mount
  useEffect(() => {
    if (!heroRef.current) return

    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' }
    )

    gsap.fromTo(
      '.product-card',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.0, stagger: 0.12, ease: 'power2.out', delay: 0.2 }
    )
  }, [])

  return (
    <div className="min-h-screen bg-transparent pb-32 text-olive">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        
        {/* Asymmetrical Editorial Hero Section */}
        <section
          ref={heroRef}
          className="mb-32 grid gap-16 rounded-wabi-1 border border-stone/20 bg-sand/65 p-8 md:p-14 lg:grid-cols-12 lg:items-center shadow-soft"
        >
          {/* Hero Context */}
          <div className="space-y-8 lg:col-span-7">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sand border border-stone/35">
                <span className="text-xs">✨</span>
                <p className="mono-tag text-[9px] font-bold text-stone">Sustainably Matured</p>
              </div>
              
              <h1 className="font-serif text-6xl sm:text-8xl font-bold text-olive tracking-wider uppercase leading-none">
                ORYN
              </h1>
              
              <h2 className="font-serif italic text-xl sm:text-3xl text-stone font-light tracking-wide">
                embracing tranquility & slow formulation
              </h2>
              
              <p className="text-sm leading-relaxed text-olive/80 max-w-xl font-sans pt-2">
                A botanical sanctuary born from a quiet observation: fashion had turned into something fleeting. 
                Instead of chasing synthetic trends, we nurture signature fragrances that settle organically on your skin. 
                ORYN celebrates the quiet beauty of natural raw ingredients, batch-matured and sourced ethically.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center pt-2">
              <button
                type="button"
                onClick={scrollToCollection}
                className="rounded-full bg-olive text-oatmeal px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-mono font-bold transition hover:bg-stone hover:-translate-y-0.5 active:translate-y-0 duration-300 shadow-xs"
              >
                Explore Collection
              </button>
              <a 
                href="/about" 
                className="rounded-full border border-stone/40 text-olive bg-sand/40 px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-mono font-bold text-center transition hover:bg-olive hover:text-oatmeal hover:-translate-y-0.5 active:translate-y-0 duration-300"
              >
                Our Heritage
              </a>
            </div>
          </div>

          {/* Hero Logo Panel */}
          <div className="lg:col-span-5 h-80 sm:h-96 relative flex items-center justify-center">
            <Image
              src="/images/IMG-20260802-WA0019.jpg"
              alt="ORYN Perfume"
              width={500}
              height={500}
              className="relative z-10 w-[78%] max-w-[350px] h-auto object-contain drop-shadow-xl transition-transform duration-700 hover:scale-105 rounded-3xl"
            />
          </div>
        </section>

        {/* Product Collection Section */}
        <section ref={collectionRef} className="mb-32">
          <div className="mb-20 space-y-4 max-w-2xl text-center sm:text-left">
            <span className="mono-tag text-[9px] font-bold text-stone">
              Signature Scents
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-olive tracking-wide">
              The Sensory Registry
            </h2>
            <p className="text-xs sm:text-sm text-olive/75 leading-relaxed">
              Discover our carefully curated registry of organic, slow-aged fragrances. Each scent matures with your body chemistry, leaving a close, personal trail.
            </p>
          </div>

          {/* Spotlight Detailed Product Section */}
          {selectedProduct && (
            <div
              ref={detailRef}
              className="mb-24 rounded-wabi-2 border border-stone/25 bg-sand/70 p-6 sm:p-10 md:p-14 shadow-soft relative overflow-hidden transition-all duration-500"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute right-6 top-6 z-10 h-10 w-10 rounded-full border border-stone/30 bg-sand text-olive/70 hover:text-olive hover:border-stone transition flex items-center justify-center font-bold text-sm shadow-xs"
                title="Close spotlight"
              >
                ✕
              </button>

              <div className="grid gap-12 lg:grid-cols-12 relative z-0">
                {/* Product Image Panel */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className={`relative w-full aspect-square rounded-wabi-1 overflow-hidden bg-sand border border-stone/20 p-8 flex items-center justify-center`}>
                    <div className="relative w-4/5 h-4/5">
                      <Image
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        fill
                        className="object-contain filter saturate-[0.8] soft-focus-img"
                        sizes="(max-width: 1024px) 80vw, 40vw"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Product Details Panel */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-5">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-stone/10 border border-stone/30 text-[9px] font-mono tracking-widest uppercase text-olive">
                        Scent Spotlight
                      </span>
                      <span className="text-[10px] text-olive/80 bg-sand border border-stone/20 rounded-full px-3 py-1 font-mono uppercase tracking-wide">
                        {selectedProduct.concentration}
                      </span>
                      <span className="text-[10px] text-stone bg-sand border border-stone/20 rounded-full px-3 py-1 font-medium italic">
                        {selectedProduct.family} Family
                      </span>
                    </div>

                    {/* Title & Price */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-stone/25 pb-4">
                      <div>
                        <h3 className="font-serif text-3xl sm:text-4xl font-light text-olive tracking-wide">
                          {selectedProduct.name}
                        </h3>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-stone mt-1">
                          {selectedProduct.fragrance}
                        </p>
                      </div>
                      <span className="text-3xl font-light text-olive font-serif shrink-0">
                        ₹{selectedProduct.price}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-olive/75 leading-relaxed font-sans border-l-2 border-stone pl-4 py-1">
                      {selectedProduct.description}
                    </p>

                    {/* Olfactory Notes (Pyramid) */}
                    <div className="space-y-3 pt-2">
                      <h4 className="mono-tag text-[9px] font-bold text-stone">The Olfactory Journey</h4>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-stone/20 bg-sand/50 p-4 space-y-1">
                          <span className="text-xs font-bold text-olive block">🍋 Top Notes</span>
                          <p className="text-[11px] text-olive/85 leading-relaxed mt-1">
                            {selectedProduct.topNotes}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-stone/20 bg-sand/50 p-4 space-y-1">
                          <span className="text-xs font-bold text-olive block">🌸 Heart Notes</span>
                          <p className="text-[11px] text-olive/85 leading-relaxed mt-1">
                            {selectedProduct.heartNotes}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-stone/20 bg-sand/50 p-4 space-y-1">
                          <span className="text-xs font-bold text-olive block">🪵 Base Notes</span>
                          <p className="text-[11px] text-olive/85 leading-relaxed mt-1">
                            {selectedProduct.baseNotes}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Scent Properties */}
                    <div className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] text-olive/70 pt-3 border-t border-stone/20 font-mono">
                      <div>
                        <span className="font-semibold text-olive/80">⏳ Longevity: </span>
                        {selectedProduct.longevity}
                      </div>
                      <div>
                        <span className="font-semibold text-olive/80">💨 Projection: </span>
                        {selectedProduct.projection}
                      </div>
                      <div>
                        <span className="font-semibold text-olive/80">✨ Occasion: </span>
                        {selectedProduct.occasion}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => addToCart(selectedProduct)}
                      className="flex-1 rounded-full bg-olive text-oatmeal px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest font-mono transition hover:bg-stone flex items-center justify-center gap-2 shadow-xs"
                    >
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(null)}
                      className="rounded-full border border-stone/30 bg-sand text-olive/70 px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest font-mono transition hover:bg-stone/15 hover:text-olive"
                    >
                      Close Spotlight
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                onClick={() => selectProductAndScroll(product)}
                className={`product-card group rounded-wabi-1 border overflow-hidden transition-all duration-500 cursor-pointer hover:shadow-soft hover:-translate-y-1 ${
                  selectedProduct?.id === product.id
                    ? 'border-stone bg-sand shadow-subtle ring-1 ring-stone/15'
                    : 'border-stone/20 bg-sand/55 hover:border-stone/45 hover:bg-sand shadow-xs'
                }`}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-sand/40 border-b border-stone/10 p-10 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain filter saturate-[0.8] soft-focus-img"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>
                
                {/* Context */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <p className="text-[9px] uppercase tracking-[0.2em] font-mono font-bold text-stone">{product.fragrance}</p>
                    <h3 className="font-serif text-lg font-normal tracking-wide text-olive group-hover:text-stone transition duration-300">{product.name}</h3>
                  </div>
                  <p className="text-xs text-olive/85 leading-relaxed line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-stone/15">
                    <span className="text-base font-normal text-olive font-serif">₹{product.price}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        addToCart(product)
                      }}
                      className="rounded-full bg-olive text-oatmeal px-5 py-2 text-[9px] font-bold uppercase tracking-widest font-mono transition hover:bg-stone hover:text-oatmeal shadow-xs"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Brand Values / Luxury Accents */}
        <section className="mb-32 grid gap-12 rounded-wabi-2 bg-sand/65 p-10 sm:p-14 text-olive lg:grid-cols-3 shadow-soft border border-stone/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-stone/5 rounded-full blur-3xl pointer-events-none" />
          {[
            { icon: '🌱', title: 'Sustainable Harvests', desc: 'Zero-waste botanical harvesting and ethically sourced natural ingredients from local cooperatives.' },
            { icon: '⏳', title: 'Slow Chemistry', desc: 'Rejecting seasonal fast-fashion. Formulated for longevity to settle comfortably for years.' },
            { icon: '🪵', title: 'Organic Texture', desc: 'Raw, durable crystal container designs made to be kept, refilled, and cherished.' },
          ].map((item, idx) => (
            <div key={idx} className="space-y-3 z-0">
              <div className="text-3xl text-stone">{item.icon}</div>
              <h3 className="font-serif text-xl font-normal tracking-wide text-olive">{item.title}</h3>
              <p className="text-olive/80 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Blog & Stories Spotlight */}
        <section className="mb-12">
          <div className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 text-center sm:text-left">
            <div className="space-y-3">
              <span className="mono-tag text-[9px] font-bold text-stone">
                Chronicles of patience
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-olive tracking-wide">
                The Botanical Blog
              </h2>
              <p className="max-w-xl text-xs sm:text-sm text-olive/75 leading-relaxed">
                Explore the stories, ecological choices, and design processes that make our fragrances cherished signatures.
              </p>
            </div>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-stone/25 bg-sand px-6 py-3 text-xs font-bold uppercase tracking-wider font-mono text-olive hover:text-stone hover:border-stone transition shadow-xs self-center sm:self-end"
            >
              Explore all stories <span className="text-lg">→</span>
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="group rounded-wabi-3 border border-stone/25 bg-sand/60 overflow-hidden transition-all duration-500 hover:shadow-subtle hover:border-stone/40 hover:bg-sand flex flex-col h-full"
              >
                <a href={`/blog/${post.slug}`} className="flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden bg-sand border-b border-stone/20">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover filter saturate-[0.8] soft-focus-img"
                    />
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[9px] text-stone font-bold font-mono uppercase tracking-wider">
                        <span className="text-olive">{post.category}</span>
                        <span>{post.date}</span>
                      </div>
                      <h3 className="font-serif text-lg font-normal tracking-wide text-olive group-hover:text-stone transition leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-olive/80 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-stone/15 mt-auto text-xs font-semibold text-olive/80">
                      <div className="flex items-center gap-2 text-stone font-mono text-[9px]">
                        <span>{post.author.avatar}</span>
                        <span className="ml-1">{post.author.name}</span>
                      </div>
                      <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200 text-stone">
                        Read <span className="text-sm">→</span>
                      </span>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-stone/20 mt-32 py-16 bg-sand/50">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-olive/75 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-serif text-base tracking-[0.2em] text-olive uppercase">ORYN</span>
            <span className="text-stone/40">|</span>
            <p>&copy; 2026 ORYN. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="/about" className="hover:text-stone transition">About Our Brand</a>
            <a href="/blog" className="hover:text-stone transition">Olfactory Blog</a>
            {isSeller && (
              <a href="/admin" className="hover:text-stone transition flex items-center gap-1">
                🔑 Seller Portal
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}
