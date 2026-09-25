'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import products, { Product } from '@/lib/products'
import { useCart } from '@/context/CartContext'

export default function HomePage() {
  const { addToCart } = useCart()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToCollection = () => {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-primary font-outfit text-text selection:bg-accent selection:text-primary">
      {/* Luxury Editorial Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/IMG-20260802-WA0019.jpg"
            alt="ORYN Perfume Signature Collection"
            fill
            className="object-cover opacity-20 scale-105 animate-[pulse-slow_8s_ease-in-out_infinite_alternate]"
            priority
          />
          {/* Dark luxury gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-primary"></div>
          {/* Radial glow around center */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,164,124,0.05)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center animate-fade-in-up">
          <div className="glass-panel px-8 py-3 mb-10 rounded-full inline-flex items-center gap-3 border border-accent/20">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
              The Genesis Collection
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif text-text leading-[1.1] mb-8 tracking-tight drop-shadow-2xl">
            Timeless Elegance,<br />
            <span className="italic text-accent font-light">Bottled.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            Oryn replaces fast fashion with sustainable, legacy-defining fragrances. 
            Crafted meticulously in small batches to be valued for years, not just seasons.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
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
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent"></div>
        </div>
      </section>

      {/* Social Proof / As Featured In */}
      <section className="border-y border-border/30 bg-surface/50 py-16 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-text-muted mb-10 font-medium">Anticipated By</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-28 opacity-40 transition-opacity hover:opacity-100 duration-700">
            <h3 className="font-serif text-2xl lg:text-3xl font-bold tracking-wider text-text">VOGUE</h3>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold tracking-wider text-text">GQ</h3>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold tracking-[0.4em] text-text">ELLE</h3>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold tracking-wider text-text">BAZAAR</h3>
          </div>
        </div>
      </section>

      {/* The Artisan Process / Trust Section */}
      <section className="bg-primary py-32 px-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-surface-light rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="relative aspect-square md:aspect-[4/5] glass-panel p-4 md:p-8 rounded-sm group">
            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 mix-blend-overlay"></div>
            <Image
              src="/images/IMG-20260802-WA0019.jpg"
              alt="ORYN Perfume Bottle Detail"
              fill
              className="object-contain p-12 transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Minimalist ornamental border */}
            <div className="absolute inset-6 border border-accent/20 pointer-events-none z-20"></div>
          </div>
          
          <div className="space-y-10">
            <div className="inline-block border-b border-accent pb-2">
              <span className="text-accent text-xs font-medium tracking-[0.3em] uppercase">Our Philosophy</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-text leading-[1.1]">
              Redefining <br /><span className="text-text-muted italic">Modern Luxury.</span>
            </h2>
            <p className="text-text-muted text-lg leading-relaxed font-light">
              We reject the fast-fashion approach to fragrance. Oryn represents a paradigm shift—an exclusive debut of sustainable, pure extracts designed for the discerning few. Every bottle is a testament to patience, art, and timelessness.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8 pt-6">
              <div className="glass-panel p-6 border-l-2 border-l-accent hover:bg-surface transition-colors">
                <h4 className="font-serif text-xl mb-2 text-text">Pure Extracts</h4>
                <p className="text-sm text-text-muted font-light leading-relaxed">Unadulterated raw materials sourced with absolute integrity and care.</p>
              </div>
              <div className="glass-panel p-6 border-l-2 border-l-accent hover:bg-surface transition-colors">
                <h4 className="font-serif text-xl mb-2 text-text">Legacy Flacons</h4>
                <p className="text-sm text-text-muted font-light leading-relaxed">Heavyweight, sculptural glass intended to be kept for a lifetime.</p>
              </div>
              <div className="glass-panel p-6 border-l-2 border-l-accent hover:bg-surface transition-colors">
                <h4 className="font-serif text-xl mb-2 text-text">Small Batch</h4>
                <p className="text-sm text-text-muted font-light leading-relaxed">Micro-productions ensuring unmatched quality and exclusivity.</p>
              </div>
              <div className="glass-panel p-6 border-l-2 border-l-accent hover:bg-surface transition-colors">
                <h4 className="font-serif text-xl mb-2 text-text">Cruelty-Free</h4>
                <p className="text-sm text-text-muted font-light leading-relaxed">A strictly ethical approach, never tested on animals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Collection */}
      <section id="collection" className="bg-surface relative py-32 px-6">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">The Inaugural Portfolio</span>
            <h2 className="text-5xl md:text-6xl font-serif text-text">Signature Scents</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto font-light">Experience the debut collection. Fragrances that evoke emotion, memory, and profound beauty.</p>
          </div>

          {/* Product Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div key={product.id} className="product-card-modern group flex flex-col h-full relative cursor-pointer" onClick={() => setSelectedProduct(product)}>
                <div className="product-image-container mb-0 relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="product-image-modern p-12"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Overlay gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                  
                  {/* Floating Action */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]">
                    <span className="bg-primary/90 text-accent border border-accent/30 text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-glow">
                      View Details
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-6 text-left z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[10px] text-accent font-semibold uppercase tracking-[0.2em] mb-2 block">{product.fragrance}</span>
                    <h3 className="font-serif text-3xl text-text mb-1 drop-shadow-md">{product.name}</h3>
                    <span className="font-serif text-xl text-text-muted">₹{product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials / Trust */}
      <section className="relative py-32 px-6 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/IMG-20260802-WA0019.jpg')] bg-cover bg-center bg-fixed mix-blend-luminosity grayscale"></div>
        <div className="absolute inset-0 bg-primary/90"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center glass-panel p-12 md:p-20 rounded-xl border border-white/5">
          <svg className="w-12 h-12 mx-auto text-accent mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/></svg>
          <h2 className="text-3xl md:text-5xl font-serif mb-12 text-text leading-tight drop-shadow-lg">"A revelation in modern perfumery. Oryn doesn't just scent the skin; it elevates the aura. A true masterpiece."</h2>
          <div className="flex flex-col items-center gap-3">
            <div className="flex text-accent mb-2 drop-shadow-glow">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <p className="text-sm uppercase tracking-[0.3em] font-medium text-text">Isabella R.</p>
            <p className="text-xs text-text-muted tracking-widest uppercase">Verified Collector</p>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl transition-all duration-500 animate-in fade-in">
          <div 
            className="absolute inset-0" 
            onClick={() => setSelectedProduct(null)}
          ></div>
          
          <div className="bg-surface w-full max-w-6xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col md:flex-row border border-white/10 shadow-2xl rounded-sm">
            <button 
              className="absolute top-6 right-6 z-20 w-12 h-12 flex items-center justify-center text-text-muted hover:text-accent transition-colors bg-surface-light/50 backdrop-blur-sm rounded-full border border-white/5 hover:border-accent/30"
              onClick={() => setSelectedProduct(null)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div className="md:w-1/2 bg-surface-light p-12 flex items-center justify-center relative min-h-[40vh] md:min-h-full border-r border-white/5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,164,124,0.08)_0%,transparent_70%)]"></div>
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                fill
                className="object-contain p-16 drop-shadow-2xl z-10"
              />
            </div>
            
            <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-surface">
              <div className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-semibold">
                <span className="text-text-muted border-b border-border/50 pb-1">
                  {selectedProduct.concentration}
                </span>
                <span className="text-accent border-b border-accent/50 pb-1">
                  {selectedProduct.family}
                </span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-serif text-text mb-4">{selectedProduct.name}</h2>
              <p className="text-sm uppercase tracking-[0.3em] font-medium text-accent mb-10">{selectedProduct.fragrance}</p>
              
              <p className="text-text-muted text-base leading-relaxed mb-12 font-light">
                {selectedProduct.description}
              </p>
              
              <div className="space-y-6 mb-14 bg-surface-light/50 p-8 rounded-sm border border-white/5">
                <div className="flex gap-4">
                  <div className="w-[1px] bg-accent/50"></div>
                  <div>
                    <h4 className="text-[10px] font-semibold text-text uppercase tracking-[0.2em] mb-1">Top Notes</h4>
                    <p className="text-sm text-text-muted font-light">{selectedProduct.topNotes}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-[1px] bg-accent/50"></div>
                  <div>
                    <h4 className="text-[10px] font-semibold text-text uppercase tracking-[0.2em] mb-1">Heart Notes</h4>
                    <p className="text-sm text-text-muted font-light">{selectedProduct.heartNotes}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-[1px] bg-accent/50"></div>
                  <div>
                    <h4 className="text-[10px] font-semibold text-text uppercase tracking-[0.2em] mb-1">Base Notes</h4>
                    <p className="text-sm text-text-muted font-light">{selectedProduct.baseNotes}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-8 pt-8 border-t border-white/5 mt-auto">
                <span className="text-4xl font-serif text-text">₹{selectedProduct.price}</span>
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

