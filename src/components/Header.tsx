'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'

const navLinks = [
  { label: 'Shop', href: '/#collection' },
  { label: 'Collection', href: '/#collection' },
  { label: 'Our Story', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const { cart, cartOpen, setCartOpen, customer, setSignUpOpen, logoutCustomer } = useCart()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Quiet ivory over the page once scrolled (or always on inner pages).
  const solid = scrolled || cartOpen || pathname !== '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          solid ? 'border-b border-ink/10 bg-ivory/95 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className="shell relative flex h-20 items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            aria-label="ORYN — home"
            className="font-serif text-[1.35rem] font-semibold uppercase leading-none tracking-brand text-ink"
          >
            Oryn
          </Link>

          {/* Centered navigation — one baseline, generous spacing */}
          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[12px] font-bold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5 md:gap-7">
            {!customer ? (
              <button
                type="button"
                onClick={() => setSignUpOpen(true)}
                className="hidden text-[12px] font-bold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:text-gold sm:inline-block"
              >
                Account
              </button>
            ) : (
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-[12px] font-bold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:text-gold"
                >
                  {customer.name.split(' ')[0]}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full z-50 mt-4 w-56 border border-ink/10 bg-ivory shadow-soft">
                    <div className="border-b border-ink/10 px-5 py-4">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-stone">
                        Signed in as
                      </p>
                      <p className="truncate text-sm text-ink">{customer.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        logoutCustomer()
                        setDropdownOpen(false)
                      }}
                      className="w-full px-5 py-4 text-left text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:text-gold"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Bag */}
            <button
              type="button"
              onClick={() => setCartOpen(!cartOpen)}
              className="relative flex items-center gap-2 text-ink transition-colors duration-300 hover:text-gold"
              aria-label="Shopping bag"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className="hidden text-[12px] font-bold uppercase tracking-[0.18em] sm:inline-block">
                Bag
              </span>
              {cartItemsCount > 0 && (
                <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-ivory">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="text-ink lg:hidden"
              aria-label="Open menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — full screen, ivory, calm */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ivory animate-fade-in lg:hidden">
          <div className="shell flex h-20 items-center justify-between">
            <span className="font-serif text-[1.35rem] font-semibold uppercase leading-none tracking-brand text-ink">
              Oryn
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="text-ink"
              aria-label="Close menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-9 px-8" aria-label="Mobile">
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="hero-rise font-serif text-4xl font-semibold text-ink"
                style={{ animationDelay: `${0.04 + i * 0.07}s` }}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                setSignUpOpen(true)
              }}
              className="hero-rise mt-4 self-start text-[12px] font-bold uppercase tracking-[0.2em] text-ink-soft"
              style={{ animationDelay: '0.3s' }}
            >
              {customer ? `Account — ${customer.name.split(' ')[0]}` : 'Account'}
            </button>
          </nav>
          <p className="shell pb-10 text-[10px] font-bold uppercase tracking-[0.3em] text-stone">
            A new fragrance house
          </p>
        </div>
      )}
    </>
  )
}
