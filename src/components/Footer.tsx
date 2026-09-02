'use client'

import React, { useEffect, useState } from 'react'

export default function Footer() {
  const [isSeller, setIsSeller] = useState(false)

  useEffect(() => {
    setIsSeller(localStorage.getItem('oryn_seller_logged_in') === 'true')
  }, [])

  return (
    <footer className="border-t border-stone/20 mt-32 py-16 bg-sand/50">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-olive/75 text-xs">
        <div className="flex flex-col items-center sm:items-start gap-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-base tracking-[0.2em] text-olive uppercase">ORYN</span>
            <span className="text-stone/40">|</span>
            <p>&copy; {new Date().getFullYear()} ORYN. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            <a href="/terms" className="hover:text-stone transition">Terms & Conditions</a>
            <a href="/privacy" className="hover:text-stone transition">Privacy Policy</a>
            <a href="/shipping" className="hover:text-stone transition">Shipping Policy</a>
            <a href="/refund" className="hover:text-stone transition">Refund Policy</a>
            <a href="/contact" className="hover:text-stone transition">Contact Us</a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a href="/about" className="hover:text-stone transition">About Our Brand</a>
          {isSeller && (
            <a href="/admin" className="hover:text-stone transition flex items-center gap-1">
              🔑 Seller Portal
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
