'use client'

import React, { useEffect, useState } from 'react'

export default function Footer() {
  const [isSeller, setIsSeller] = useState(false)

  useEffect(() => {
    setIsSeller(localStorage.getItem('oryn_seller_logged_in') === 'true')
  }, [])

  return (
    <footer className="bg-sand border-t border-olive/10 pt-16 pb-10 mt-auto">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          <div className="md:col-span-2">
            <h2 className="text-xl font-serif font-bold text-olive tracking-[0.35em] uppercase mb-5">ORYN</h2>
            <p className="text-stone text-sm max-w-md leading-relaxed">
              Sustainable fragrances crafted in small batches — designed to be worn for years, not seasons.
            </p>
          </div>
          <div>
            <h3 className="mono-tag text-[10px] font-semibold text-olive mb-5">Explore</h3>
            <ul className="space-y-3 text-sm text-stone">
              <li><a href="/" className="hover:text-accent transition-colors">Shop</a></li>
              <li><a href="/about" className="hover:text-accent transition-colors">Our Story</a></li>
              <li><a href="/about#contact" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mono-tag text-[10px] font-semibold text-olive mb-5">Legal</h3>
            <ul className="space-y-3 text-sm text-stone">
              <li><a href="/terms" className="hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="/refund" className="hover:text-accent transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-olive/10 mono-tag text-[10px] text-stone">
          <p>&copy; {new Date().getFullYear()} ORYN. All rights reserved.</p>
          {isSeller && (
            <a href="/admin" className="hover:text-accent transition-colors flex items-center gap-2 mt-4 md:mt-0 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              Admin Portal
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
