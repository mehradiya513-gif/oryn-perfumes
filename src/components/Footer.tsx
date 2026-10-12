'use client'

import React, { useEffect } from 'react'

/* ————————————————————————————————————————————————————————————————
   Footer — charcoal ground, anchor links back to the landing
   sections, payment marks, and policy links.
———————————————————————————————————————————————————————————————— */

export default function Footer() {
  useEffect(() => {
    /* no-op hook kept for future seller-state hydration */
  }, [])

  const exploreLinks = [
    { label: 'Shop', href: '/#bestsellers' },
    { label: 'Bestsellers', href: '/#bestsellers' },
    { label: 'Categories', href: '/#categories' },
    { label: 'Scent Finder', href: '/#scent-finder' },
    { label: 'Our Story', href: '/#brand-story' },
    { label: 'Reviews', href: '/#reviews' },
  ]

  const careLinks = [
    { label: 'Shipping', href: '/shipping' },
    { label: 'Returns', href: '/refund' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Contact', href: '/contact' },
  ]

  const payments = [
    { label: 'UPI', mark: 'UPI' },
    { label: 'Visa', mark: 'VISA' },
    { label: 'Mastercard', mark: 'MC' },
    { label: 'RuPay', mark: 'RuPay' },
    { label: 'Cash on Delivery', mark: 'COD' },
  ]

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto w-full max-w-[1240px] px-6 pb-10 pt-16 md:px-10 md:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <p className="font-serif text-[1.35rem] font-semibold uppercase leading-none tracking-brand text-ivory">
              Oryn
            </p>
            <p className="mt-6 max-w-sm text-sm leading-[1.8] text-ivory/60">
              Accessible Indian luxury. A small collection of premium fragrances — honest
              ingredients, honest pricing, nothing above ₹800.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <a
                href="https://instagram.com/oryn"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-ivory/70 transition-colors duration-300 hover:text-gold"
              >
                Instagram
              </a>
              <a
                href="https://pinterest.com/oryn"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-ivory/70 transition-colors duration-300 hover:text-gold"
              >
                Pinterest
              </a>
            </div>
          </div>

          {/* Explore */}
          <nav className="md:col-span-2" aria-label="Explore">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.25em] text-ivory/40">Explore</p>
            <ul className="space-y-3.5 text-sm text-ivory/70">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors duration-300 hover:text-ivory">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Client care */}
          <nav className="md:col-span-2" aria-label="Client care">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.25em] text-ivory/40">Client Care</p>
            <ul className="space-y-3.5 text-sm text-ivory/70">
              {careLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors duration-300 hover:text-ivory">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Payments */}
          <div className="md:col-span-3">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.25em] text-ivory/40">We Accept</p>
            <ul className="flex flex-wrap gap-2.5" aria-label="Accepted payment methods">
              {payments.map((p) => (
                <li
                  key={p.label}
                  className="border border-ivory/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-ivory/70"
                  title={p.label}
                >
                  {p.mark}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[12px] leading-[1.7] text-ivory/50">
              Free shipping above ₹499 · COD available across 25,000+ PIN codes.
            </p>
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 text-[10px] font-bold uppercase tracking-[0.22em] text-ivory/35 md:flex-row">
          <p>&copy; {new Date().getFullYear()} ORYN — All rights reserved</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="transition-colors hover:text-ivory/70">Privacy</a>
            <a href="/terms" className="transition-colors hover:text-ivory/70">Terms</a>
            <a href="/shipping" className="transition-colors hover:text-ivory/70">Shipping &amp; Returns</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
