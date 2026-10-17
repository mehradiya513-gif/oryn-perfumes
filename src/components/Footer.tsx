'use client'

import React from 'react'
import Link from 'next/link'

/* ————————————————————————————————————————————————————————————————
   Footer — Midnight Noir & Champagne Gold Luxury House Signature
———————————————————————————————————————————————————————————————— */

export default function Footer() {
  const exploreLinks = [
    { label: 'Collection', href: '/#bestsellers' },
    { label: 'Fragrance Families', href: '/#categories' },
    { label: 'Bespoke Scent Finder', href: '/#scent-finder' },
    { label: 'Notes Pyramid Guide', href: '/#notes' },
    { label: 'Our Atelier Story', href: '/about' },
    { label: 'Client Reviews', href: '/#reviews' },
  ]

  const careLinks = [
    { label: 'Shipping & Delivery', href: '/shipping' },
    { label: '7-Day Return Policy', href: '/refund' },
    { label: 'Privacy Standards', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Atelier Contact', href: '/contact' },
  ]

  const payments = [
    { label: 'UPI / GPay / PhonePe', mark: 'UPI' },
    { label: 'Cash on Delivery', mark: 'COD' },
    { label: 'RuPay India', mark: 'RuPay' },
    { label: 'Visa Platinum', mark: 'VISA' },
    { label: 'Mastercard World', mark: 'MC' },
  ]

  return (
    <footer className="border-t border-[#1E3A5F] bg-[#0A1424] text-[#EAE6FF] relative z-20">
      <div className="shell pt-16 pb-12 md:pt-20">
        
        {/* Top Brand Banner */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 pb-14 border-b border-[#1E3A5F]">
          
          {/* Brand Identity & Mission (5 Cols) */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A84C]/50 bg-[#C9A84C]/10 text-[#C9A84C] shadow-sm">
                <span className="font-serif text-base font-bold">O</span>
              </div>
              <span className="font-serif text-2xl font-bold uppercase tracking-brand text-[#EAE6FF]">
                Oryn
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-[1.8] text-[#9BAEC8]">
              Accessible Indian haute parfumerie. Pure, long-lasting Extrait concentrations formulated
              with master-blended French oils. Transparent formulation, zero middlemen, nothing above ₹800.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://instagram.com/oryn"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#1E3A5F] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9BAEC8] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://pinterest.com/oryn"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#1E3A5F] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9BAEC8] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              >
                Pinterest
              </a>
              <a
                href="https://wa.me/919000000000"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#1E3A5F] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9BAEC8] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Explore Links (2 Cols) */}
          <nav className="lg:col-span-2" aria-label="Explore Collection">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]">Explore</p>
            <ul className="space-y-3 text-xs text-[#9BAEC8]">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-[#C9A84C]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Client Care Links (2 Cols) */}
          <nav className="lg:col-span-2" aria-label="Client Concierge">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]">Concierge</p>
            <ul className="space-y-3 text-xs text-[#9BAEC8]">
              {careLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-[#C9A84C]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Payments & Assurances (3 Cols) */}
          <div className="lg:col-span-3">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]">Secure Checkout</p>
            <div className="flex flex-wrap gap-2" aria-label="Accepted payment methods">
              {payments.map((p) => (
                <span
                  key={p.label}
                  className="rounded-md border border-[#1E3A5F] bg-[#112240] px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#EAE6FF]"
                  title={p.label}
                >
                  {p.mark}
                </span>
              ))}
            </div>
            <p className="mt-5 text-xs leading-[1.7] text-[#6B7FA3]">
              ✦ Free shipping on orders above ₹499<br />
              ✦ Verified Cash on Delivery pan-India<br />
              ✦ Tamper-proof packaging guarantee
            </p>
          </div>

        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#6B7FA3]">
          <p>&copy; {new Date().getFullYear()} ORYN PARFUMS. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#C9A84C] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#C9A84C] transition-colors">Terms of Service</Link>
            <Link href="/shipping" className="hover:text-[#C9A84C] transition-colors">Shipping &amp; Delivery</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
