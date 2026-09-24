'use client'

import { useState } from 'react'
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
    <div className="min-h-screen bg-white font-sans text-primary">
      {/* Luxury Editorial Hero Section */}
      <section className="relative w-full h-[95vh] flex items-center justify-center bg-surface overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/IMG-20260802-WA0019.jpg"
            alt="ORYN Perfume Signature Collection"
            fill
            className="object-cover opacity-30 mix-blend-multiply"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-6 block">
            Maison Oryn
          </span>
          <h1 className="text-6xl md:text-8xl font-serif text-primary leading-none mb-8 tracking-tight">
            The Essence of <br />
            <span className="italic text-accent">Authenticity</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            Crafted in small batches with ethically sourced botanicals. 
            Experience a fragrance that uniquely evolves with your skin chemistry.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={scrollToCollection}
              className="btn-primary"
            >
              Explore the Collection
            </button>
            <a 
              href="/about" 
              className="btn-secondary"
            >
              Discover Our Craft
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof / As Featured In */}
      <section className="border-y border-border bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-muted mb-8 font-semibold">Recognized By</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale">
            <h3 className="font-serif text-2xl font-bold">VOGUE</h3>
            <h3 className="font-serif text-2xl font-bold">GQ</h3>
            <h3 className="font-serif text-2xl font-bold tracking-widest">ELLE</h3>
            <h3 className="font-serif text-2xl font-bold">BAZAAR</h3>
          </div>
        </div>
      </section>

      {/* The Artisan Process / Trust Section */}
      <section className="bg-surface py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square md:aspect-[3/4] bg-white p-8 shadow-modern-soft">
            <Image
              src="/images/IMG-20260802-WA0019.jpg"
              alt="ORYN Perfume Bottle Detail"
              fill
              className="object-contain p-12 mix-blend-multiply"
            />
            {/* Minimalist ornamental border */}
            <div className="absolute inset-4 border border-border/50 pointer-events-none"></div>
          </div>
          
          <div className="space-y-8">
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Our Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
              A return to <br />genuine perfumery.
            </h2>
            <p className="text-muted text-lg leading-relaxed font-light">
              We reject the fast-fashion approach to fragrance. Every bottle of ORYN is the result of months of careful maceration, using only raw, unadulterated extracts. 
            </p>
            <ul className="space-y-6 pt-4">
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0"></div>
                <div>
                  <h4 className="font-serif text-xl mb-1 text-primary">100% Cruelty-Free</h4>
                  <p className="text-sm text-muted">Never tested on animals, ethically sourced.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0"></div>
                <div>
                  <h4 className="font-serif text-xl mb-1 text-primary">Small Batch Production</h4>
                  <p className="text-sm text-muted">Ensuring maximum potency and quality control.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0"></div>
                <div>
                  <h4 className="font-serif text-xl mb-1 text-primary">Sustainable Glass</h4>
                  <p className="text-sm text-muted">Heavyweight, recyclable flacons designed to be kept.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Main Collection */}
      <section id="collection" className="mx-auto max-w-7xl px-6 py-32 sm:px-10">
        <div className="text-center mb-20 space-y-4">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">The Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary">Signature Scents</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto font-light">Discover the fragrance that speaks to your soul.</p>
        </div>

        {/* Product Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="product-card-modern group flex flex-col h-full bg-white relative p-6">
              <div 
                className="product-image-container cursor-pointer bg-surface mb-6 relative"
                onClick={() => setSelectedProduct(product)}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="product-image-modern object-contain p-10 mix-blend-multiply"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white text-primary text-[10px] font-bold uppercase tracking-widest px-6 py-3 shadow-modern-soft transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    Discover Notes
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col flex-grow text-center">
                <span className="text-xs text-accent font-medium uppercase tracking-widest mb-3">{product.fragrance}</span>
                <h3 className="font-serif text-2xl text-primary mb-2">{product.name}</h3>
                <p className="text-sm text-muted line-clamp-2 mb-6 flex-grow font-light px-4">{product.description}</p>
                
                <div className="flex flex-col items-center gap-4 mt-auto">
                  <span className="font-serif text-xl text-primary">₹{product.price}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(product)
                    }}
                    className="w-full border border-primary text-primary py-3 text-xs uppercase tracking-widest font-semibold hover:bg-primary hover:text-white transition-colors duration-500"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Testimonials / Trust */}
      <section className="bg-primary text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-8 block">Genuine Reviews</span>
          <h2 className="text-3xl md:text-4xl font-serif mb-12">"I have finally found my signature scent. The quality is unmatched and it lasts all day long."</h2>
          <div className="flex flex-col items-center gap-2">
            <div className="flex text-accent mb-2">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <p className="text-sm uppercase tracking-widest font-semibold">Sarah M.</p>
            <p className="text-xs text-white/50">Verified Buyer</p>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-primary/70 backdrop-blur-md">
          <div 
            className="absolute inset-0" 
            onClick={() => setSelectedProduct(null)}
          ></div>
          <div className="bg-white shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto relative z-10 flex flex-col md:flex-row">
            <button 
              className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center text-primary hover:text-accent transition-colors bg-white rounded-full shadow-modern-soft"
              onClick={() => setSelectedProduct(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div className="md:w-1/2 bg-surface p-12 flex items-center justify-center relative min-h-[400px]">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                fill
                className="object-contain p-16 mix-blend-multiply"
              />
            </div>
            
            <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white">
              <div className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-semibold">
                <span className="text-muted border-b border-border pb-1">
                  {selectedProduct.concentration}
                </span>
                <span className="text-accent border-b border-accent/30 pb-1">
                  {selectedProduct.family}
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-3">{selectedProduct.name}</h2>
              <p className="text-sm uppercase tracking-widest font-semibold text-muted mb-8">{selectedProduct.fragrance}</p>
              
              <p className="text-primary/80 text-base leading-relaxed mb-10 font-light">
                {selectedProduct.description}
              </p>
              
              <div className="space-y-6 mb-12">
                <div className="border-l-2 border-accent pl-4">
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Top Notes</h4>
                  <p className="text-sm text-muted font-light">{selectedProduct.topNotes}</p>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Heart Notes</h4>
                  <p className="text-sm text-muted font-light">{selectedProduct.heartNotes}</p>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Base Notes</h4>
                  <p className="text-sm text-muted font-light">{selectedProduct.baseNotes}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-8 border-t border-border mt-auto">
                <span className="text-3xl font-serif text-primary">₹{selectedProduct.price}</span>
                <button
                  onClick={() => {
                    addToCart(selectedProduct)
                    setSelectedProduct(null)
                  }}
                  className="btn-primary flex-1 w-full"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
