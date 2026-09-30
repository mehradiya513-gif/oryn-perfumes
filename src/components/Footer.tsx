'use client'

import React, { useEffect, useState } from 'react'

export default function Footer() {
  const [isSeller, setIsSeller] = useState(false)

  useEffect(() => {
    setIsSeller(localStorage.getItem('oryn_seller_logged_in') === 'true')
  }, [])

  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="md:col-span-6">
            <p className="font-serif text-2xl font-medium tracking-brand uppercase mb-6">Oryn</p>
            <p className="text-ivory/60 text-sm leading-relaxed max-w-sm font-light">
              A new fragrance house. Six fragrances composed with intention —
              made to be worn, lived in, and remembered.
            </p>
          </div>

          {/* Explore */}
          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-wide2 text-gold mb-6">Explore</p>
            <ul className="space-y-3.5 text-sm font-light text-ivory/70">
              <li><a href="/#collection" className="hover:text-ivory transition-colors">The Collection</a></li>
              <li><a href="/about" className="hover:text-ivory transition-colors">Our Story</a></li>
              <li><a href="/contact" className="hover:text-ivory transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Care */}
          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-wide2 text-gold mb-6">Client Care</p>
            <ul className="space-y-3.5 text-sm font-light text-ivory/70">
              <li><a href="/shipping" className="hover:text-ivory transition-colors">Shipping</a></li>
              <li><a href="/refund" className="hover:text-ivory transition-colors">Refunds</a></li>
              <li><a href="/privacy" className="hover:text-ivory transition-colors">Privacy</a></li>
              <li><a href="/terms" className="hover:text-ivory transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-ivory/10 text-[10px] uppercase tracking-[0.25em] text-ivory/40">
          <p>&copy; {new Date().getFullYear()} Oryn — All rights reserved</p>
          {isSeller && (
            <a href="/admin" className="hover:text-gold transition-colors uppercase tracking-[0.25em]">
              Admin
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
