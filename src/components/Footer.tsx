'use client'

import React, { useEffect, useState } from 'react'

export default function Footer() {
  const [isSeller, setIsSeller] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    setIsSeller(localStorage.getItem('oryn_seller_logged_in') === 'true')
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  const exploreLinks = [
    { label: 'Shop', href: '/#collection' },
    { label: 'Collection', href: '/#collection' },
    { label: 'Our Story', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const careLinks = [
    { label: 'Shipping', href: '/shipping' },
    { label: 'Returns', href: '/refund' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ]

  return (
    <footer className="bg-ink text-ivory">
      <div className="shell pb-10 pt-16 md:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <p className="font-serif text-[1.35rem] font-semibold uppercase leading-none tracking-brand text-ivory">
              Oryn
            </p>
            <p className="mt-6 max-w-sm text-sm leading-[1.8] text-ivory/60">
              A new fragrance house. Six fragrances composed with intention — made to be worn,
              lived in, and remembered.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <a
                href="https://instagram.com/oryn"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-ivory/70 transition-colors duration-300 hover:text-ivory"
              >
                Instagram
              </a>
              <a
                href="https://pinterest.com/oryn"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-ivory/70 transition-colors duration-300 hover:text-ivory"
              >
                Pinterest
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.25em] text-ivory/40">
              Explore
            </p>
            <ul className="space-y-3.5 text-sm text-ivory/70">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors duration-300 hover:text-ivory">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Client care */}
          <div className="md:col-span-2">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.25em] text-ivory/40">
              Client Care
            </p>
            <ul className="space-y-3.5 text-sm text-ivory/70">
              {careLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors duration-300 hover:text-ivory">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.25em] text-ivory/40">
              Newsletter
            </p>
            {subscribed ? (
              <p className="text-sm leading-relaxed text-ivory/70">
                Thank you — you&rsquo;re on the list. First word on new compositions will reach you
                here.
              </p>
            ) : (
              <form onSubmit={handleSubscribe}>
                <p className="mb-4 text-sm leading-[1.8] text-ivory/60">
                  First word on new compositions, twice a year at most.
                </p>
                <div className="flex items-end gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    aria-label="Email address"
                    className="w-full min-w-0 border-0 border-b border-ivory/25 bg-transparent py-2.5 text-sm text-ivory outline-none transition-colors placeholder:text-ivory/35 focus:border-ivory"
                  />
                  <button
                    type="submit"
                    className="shrink-0 border-b border-ivory/40 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:border-ivory"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 text-[10px] font-bold uppercase tracking-[0.22em] text-ivory/35 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Oryn — All rights reserved</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="transition-colors hover:text-ivory/70">
              Privacy
            </a>
            <a href="/terms" className="transition-colors hover:text-ivory/70">
              Terms
            </a>
            <a href="/shipping" className="transition-colors hover:text-ivory/70">
              Shipping &amp; Returns
            </a>
            {isSeller && (
              <a href="/admin" className="transition-colors hover:text-ivory/70">
                Admin
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
