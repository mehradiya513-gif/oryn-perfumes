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
    <div className="min-h-screen bg-white">
      {/* Modern Split Hero Section */}
      <section className="relative w-full h-[90vh] md:h-screen flex flex-col md:flex-row bg-surface overflow-hidden pt-20 md:pt-0">
        <div className="flex-1 flex items-center justify-center p-8 md:p-16 lg:p-24 z-10">
          <div className="max-w-xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-full text-xs font-semibold tracking-wide text-muted uppercase">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              New Collection
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary leading-[1.1]">
              Discover Your <br />
              <span className="text-accent">Signature</span> Scent
            </h1>
            
            <p className="text-lg text-muted max-w-md leading-relaxed">
              Elevate your daily ritual with our premium, sustainably crafted fragrances. Designed for the modern individual who values quality and elegance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={scrollToCollection}
                className="btn-primary py-4 px-8 text-base"
              >
                Shop Collection
              </button>
              <a 
                href="/about" 
                className="btn-secondary py-4 px-8 text-base"
              >
                Our Story
              </a>
            </div>
          </div>
        </div>
        <div className="flex-1 relative h-64 md:h-full bg-white">
          <Image
            src="/images/IMG-20260802-WA0019.jpg"
            alt="ORYN Perfume"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-surface to-transparent md:w-1/3"></div>
        </div>
      </section>

      {/* Brand Features Bar */}
      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
          <div className="flex flex-col items-center gap-3 md:px-8 py-4 md:py-0">
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 className="text-lg font-semibold text-primary">Ethically Sourced</h3>
            <p className="text-sm text-muted">Premium ingredients from sustainable global partners.</p>
          </div>
          <div className="flex flex-col items-center gap-3 md:px-8 py-4 md:py-0">
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 className="text-lg font-semibold text-primary">Long Lasting</h3>
            <p className="text-sm text-muted">Expertly formulated for 12+ hours of projection.</p>
          </div>
          <div className="flex flex-col items-center gap-3 md:px-8 py-4 md:py-0">
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            <h3 className="text-lg font-semibold text-primary">Premium Packaging</h3>
            <p className="text-sm text-muted">Minimalist glass bottles designed to be displayed.</p>
          </div>
        </div>
      </section>

      {/* Main Collection */}
      <section id="collection" className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">The Collection</h2>
            <p className="text-muted text-lg">Curated fragrances for every occasion.</p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="product-card-modern group flex flex-col h-full bg-white relative">
              <div 
                className="product-image-container cursor-pointer p-8 bg-surface/50"
                onClick={() => setSelectedProduct(product)}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="product-image-modern object-contain p-6 mix-blend-multiply"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {/* Quick view overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white text-primary text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Quick View
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-primary truncate pr-4">{product.name}</h3>
                  <span className="font-semibold text-primary">₹{product.price}</span>
                </div>
                <p className="text-sm text-accent font-medium mb-3">{product.fragrance}</p>
                <p className="text-sm text-muted line-clamp-2 mb-6 flex-grow">{product.description}</p>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    addToCart(product)
                  }}
                  className="w-full bg-primary text-white py-3 rounded-modern font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm">
          <div 
            className="absolute inset-0" 
            onClick={() => setSelectedProduct(null)}
          ></div>
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative z-10 flex flex-col md:flex-row">
            <button 
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-surface text-primary hover:bg-border transition-colors"
              onClick={() => setSelectedProduct(null)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div className="md:w-1/2 bg-surface p-8 flex items-center justify-center relative min-h-[300px]">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                fill
                className="object-contain p-12 mix-blend-multiply"
              />
            </div>
            
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
              <div className="mb-2 flex items-center gap-2">
                <span className="px-2.5 py-1 bg-surface border border-border text-xs font-semibold rounded-full text-muted uppercase tracking-wider">
                  {selectedProduct.concentration}
                </span>
                <span className="px-2.5 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full uppercase tracking-wider">
                  {selectedProduct.family}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-primary mb-1">{selectedProduct.name}</h2>
              <p className="text-lg font-medium text-accent mb-4">{selectedProduct.fragrance}</p>
              
              <p className="text-muted text-base leading-relaxed mb-6">
                {selectedProduct.description}
              </p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Top Notes</h4>
                  <p className="text-sm text-muted">{selectedProduct.topNotes}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Heart Notes</h4>
                  <p className="text-sm text-muted">{selectedProduct.heartNotes}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Base Notes</h4>
                  <p className="text-sm text-muted">{selectedProduct.baseNotes}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                <span className="text-2xl font-bold text-primary">₹{selectedProduct.price}</span>
                <button
                  onClick={() => {
                    addToCart(selectedProduct)
                    setSelectedProduct(null)
                  }}
                  className="btn-primary px-8"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter / CTA Section */}
      <section className="bg-surface py-24 px-6 mt-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-primary">Join the Insider List</h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Subscribe to receive updates on new launches, exclusive offers, and the art of fragrance layering.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-modern border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
              required
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
