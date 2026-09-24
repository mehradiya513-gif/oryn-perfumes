'use client'

import React, { useEffect, useState } from 'react'

export default function Footer() {
  const [isSeller, setIsSeller] = useState(false)

  useEffect(() => {
    setIsSeller(localStorage.getItem('oryn_seller_logged_in') === 'true')
  }, [])

  return (
    <footer className="bg-surface border-t border-border pt-16 pb-8 mt-auto">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-serif font-bold text-primary tracking-tighter mb-4">ORYN</h2>
            <p className="text-muted text-sm max-w-md leading-relaxed">
              Experience the pinnacle of sustainable luxury. Our fragrances are expertly crafted to provide a long-lasting, sophisticated scent that becomes your unique signature.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-primary mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="/" className="hover:text-accent transition-colors">Shop</a></li>
              <li><a href="/about" className="hover:text-accent transition-colors">Our Story</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-primary mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="/terms" className="hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="/refund" className="hover:text-accent transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50 text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} ORYN. All rights reserved.</p>
          {isSeller && (
            <a href="/admin" className="hover:text-primary transition-colors flex items-center gap-2 mt-4 md:mt-0 font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              Admin Portal
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
