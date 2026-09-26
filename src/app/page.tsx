'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import products, { Product } from '@/lib/products'
import { useCart } from '@/context/CartContext'

export default function HomePage() {
  const { addToCart } = useCart()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const scrollToCollection = () => {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-primary font-outfit text-olive selection:bg-accent selection:text-oatmeal">

      {/* Editorial Hero */}
      <section className="relative w-full min-h-screen flex items-center justify-center bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/IMG-20260802-WA0019.jpg"
            alt="ORYN Perfume Signature Collection"
            fill
            className="object-cover opacity-[0.08]"
            priority
          />
          {/* Soft light wash so any photo melts into the paper background */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/70 to-primary"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,137,104,0.10)_0%,transparent_55%)]"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center pt-28 pb-24 animate-fade-in-up">
          <div className="mb-10 inline-flex items-center gap-4">
            <span className="w-10 h-px bg-accent/50"></span>
            <span className="mono-tag text-[10px] font-semibold text-accent uppercase">
              The Genesis Collection
            </span>
            <span className="w-10 h-px bg-accent/50"></span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif text-olive leading-[1.05] mb-8 tracking-tight">
            Timeless Elegance,<br />
            <span className="italic font-light text-accent">Bottled.</span>
          </h1>

          <p className="text-lg md:text-xl text-stone max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            Oryn replaces fast fashion with sustainable, legacy-defining fragrances.
            Crafted meticulously in small batches to be valued for years, not just seasons.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToCollection}
              className="btn-primary group"
            >
              Explore the Collection
              <svg className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
            <a
              href="/about"
              className="btn-secondary"
            >
              Discover Our Craft
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="mono-tag text-[9px] uppercase text-stone">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent"></div>
        </div>
      </section>

      {/* As Featured In */}
      <section className="border-y border-olive/10 bg-white py-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="mono-tag text-[10px] text-stone mb-8">Anticipated By</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50">
            <h3 className="font-serif text-2xl lg:text-3xl font-bold tracking-wider text-olive">VOGUE</h3>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold tracking-wider text-olive">GQ</h3>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold tracking-[0.4em] text-olive">ELLE</h3>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold tracking-wider text-olive">BAZAAR</h3>
          </div>
        </div>
      </section>

      {/* Philosophy — editorial split section */}
      <section className="bg-primary py-28 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative aspect-[4/5] bg-sand border border-olive/10 p-6 md:p-10 group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,137,104,0.10)_0%,transparent_70%)]"></div>
            <Image
              src="/images/IMG-20260802-WA0019.jpg"
              alt="ORYN Perfume Bottle Detail"
              fill
              className="object-contain p-14 transition-transform duration-1000 group-hover:scale-[1.03]"
            />
            {/* Inner hairline frame */}
            <div className="absolute inset-4 border border-accent/30 pointer-events-none"></div>
            {/* Offset shadow block */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-surface-light -z-10"></div>
          </div>

          <div className="space-y-10">
            <div className="space-y-5">
              <span className="mono-tag text-[10px] font-semibold text-accent uppercase block">Our Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-serif text-olive leading-[1.1]">
                Redefining <br /><span className="italic font-light text-stone">Modern Luxury.</span>
              </h2>
              <p className="text-stone text-lg leading-relaxed font-light">
                We reject the fast-fashion approach to fragrance. Oryn represents a paradigm shift — an exclusive debut of sustainable, pure extracts designed for the discerning few. Every bottle is a testament to patience, art, and timelessness.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8 pt-2">
              {[
                { title: 'Pure Extracts', copy: 'Unadulterated raw materials sourced with absolute integrity and care.' },
                { title: 'Legacy Flacons', copy: 'Heavyweight, sculptural glass intended to be kept for a lifetime.' },
                { title: 'Small Batch', copy: 'Micro-productions ensuring unmatched quality and exclusivity.' },
                { title: 'Cruelty-Free', copy: 'A strictly ethical approach, never tested on animals.' },
              ].map((item) => (
                <div key={item.title} className="border-t border-olive/15 pt-4">
                  <h4 className="font-serif text-lg text-olive mb-1.5">{item.title}</h4>
                  <p className="text-sm text-stone leading-relaxed">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collection */}
      <section id="collection" className="bg-sand border-y border-olive/10 py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-5">
            <span className="mono-tag text-[10px] font-semibold text-accent uppercase block">The Inaugural Portfolio</span>
            <h2 className="text-5xl md:text-6xl font-serif text-olive">Signature Scents</h2>
            <p className="text-stone text-lg max-w-2xl mx-auto font-light">Experience the debut collection. Fragrances that evoke emotion, memory, and profound beauty.</p>
          </div>

          {/* Product Grid — editorial cards with captions beneath */}
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <button
                key={product.id}
                className="group text-left cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="product-card-modern">
                  <div className="product-image-container">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="product-image-modern p-14"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="bg-white/90 text-olive border border-olive/20 mono-tag text-[10px] font-bold uppercase px-8 py-4 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500 shadow-luxury-soft">
                        View Details
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-5 pb-1 border-b border-transparent group-hover:border-olive/15 transition-all duration-500">
                  <span className="mono-tag text-[10px] text-accent font-semibold uppercase block mb-1.5">{product.fragrance}</span>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-2xl text-olive">{product.name}</h3>
                    <span className="font-serif text-lg text-stone">₹{product.price}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="relative py-28 px-6 bg-primary overflow-hidden">
        <div className="max-w-3xl mx-auto text-center border-y border-olive/15 py-16 md:py-20 px-2">
          <svg className="w-10 h-10 mx-auto text-accent mb-8 opacity-60" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/></svg>
          <h2 className="text-3xl md:text-4xl font-serif mb-12 text-olive leading-snug italic font-light">&ldquo;A revelation in modern perfumery. Oryn doesn&rsquo;t just scent the skin; it elevates the aura. A true masterpiece.&rdquo;</h2>
          <div className="flex flex-col items-center gap-2">
            <div className="flex text-accent mb-2 text-sm tracking-[0.5em]">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <p className="mono-tag text-xs font-semibold text-olive uppercase">Isabella R.</p>
            <p className="mono-tag text-[10px] text-stone uppercase">Verified Collector</p>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-olive/50 backdrop-blur-md">
          <div
            className="absolute inset-0"
            onClick={() => setSelectedProduct(null)}
          ></div>

          <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col md:flex-row shadow-2xl">
            <button
              className="absolute top-5 right-5 z-20 w-11 h-11 flex items-center justify-center text-stone hover:text-olive transition-colors bg-sand rounded-full border border-olive/10 hover:border-accent/40"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="md:w-1/2 bg-sand p-12 flex items-center justify-center relative min-h-[40vh] md:min-h-full border-r border-olive/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,137,104,0.12)_0%,transparent_70%)]"></div>
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                fill
                className="object-contain p-16 z-10"
              />
            </div>

            <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white">
              <div className="mb-8 flex items-center gap-6 mono-tag text-[10px] uppercase font-semibold">
                <span className="text-stone border-b border-olive/20 pb-1">
                  {selectedProduct.concentration}
                </span>
                <span className="text-accent border-b border-accent/40 pb-1">
                  {selectedProduct.family}
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-serif text-olive mb-4">{selectedProduct.name}</h2>
              <p className="mono-tag text-xs font-medium text-accent uppercase mb-10">{selectedProduct.fragrance}</p>

              <p className="text-stone text-base leading-relaxed mb-12">
                {selectedProduct.description}
              </p>

              <div className="space-y-5 mb-14 bg-sand/70 border border-olive/10 p-8">
                {[
                  { label: 'Top Notes', value: selectedProduct.topNotes },
                  { label: 'Heart Notes', value: selectedProduct.heartNotes },
                  { label: 'Base Notes', value: selectedProduct.baseNotes },
                ].map((note) => (
                  <div key={note.label} className="flex gap-4">
                    <div className="w-px bg-accent/40"></div>
                    <div>
                      <h4 className="mono-tag text-[10px] font-semibold text-olive uppercase mb-1">{note.label}</h4>
                      <p className="text-sm text-stone">{note.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-8 pt-8 border-t border-olive/10 mt-auto">
                <span className="text-4xl font-serif text-olive">₹{selectedProduct.price}</span>
                <button
                  onClick={() => {
                    addToCart(selectedProduct)
                    setSelectedProduct(null)
                  }}
                  className="btn-primary flex-1 w-full h-16 text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
