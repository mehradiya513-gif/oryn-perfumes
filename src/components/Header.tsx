'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const pathname = usePathname()
  const { cart, cartOpen, setCartOpen, customer, setSignUpOpen, logoutCustomer } = useCart()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const onHome = pathname === '/'
  // Transparent over the homepage hero; quiet ivory once scrolled or on inner pages.
  const transparent = onHome && !scrolled && !cartOpen

  const inkText = transparent ? 'text-ivory' : 'text-ink'
  const mutedText = transparent ? 'text-ivory/70' : 'text-stone'

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

  const navLinks = [
    { 
      label: 'The Collection', 
      href: '/#collection', 
      desktopClass: 'font-serif font-bold italic text-xl',
      mobileClass: 'font-serif font-bold italic text-4xl'
    },
    { 
      label: 'Our Story', 
      href: '/about', 
      desktopClass: 'font-sans font-bold uppercase tracking-widest text-sm',
      mobileClass: 'font-sans font-bold uppercase tracking-widest text-2xl'
    },
    { 
      label: 'Contact', 
      href: '/contact', 
      desktopClass: 'font-serif font-bold border-2 border-current px-4 py-1 hover:text-gold transition-colors',
      mobileClass: 'font-serif font-bold text-3xl border-2 border-current px-6 py-2'
    },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
          transparent ? 'bg-transparent' : 'bg-ivory/95 backdrop-blur-sm border-b border-ink/10'
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-5 flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className={`font-serif text-xl md:text-2xl font-medium tracking-brand uppercase ${inkText} transition-colors duration-700`}
          >
            Oryn
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`${link.desktopClass} ${inkText} transition-colors duration-300 hover:text-gold`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            {!customer ? (
              <button
                type="button"
                onClick={() => setSignUpOpen(true)}
                className={`hidden sm:inline-block text-sm font-bold uppercase tracking-wide ${inkText} hover:text-gold transition-colors duration-300`}
              >
                Account
              </button>
            ) : (
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`text-sm font-bold uppercase tracking-wide ${inkText} hover:text-gold transition-colors duration-300`}
                >
                  {customer.name.split(' ')[0]}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-5 w-56 bg-ivory border border-ink/15 shadow-xl z-50">
                    <div className="px-5 py-4 border-b border-ink/10">
                      <p className="text-[9px] uppercase tracking-wide2 text-stone mb-1">Signed in as</p>
                      <p className="text-sm text-ink truncate">{customer.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        logoutCustomer()
                        setDropdownOpen(false)
                      }}
                      className="w-full text-left px-5 py-4 text-[10px] uppercase tracking-wide2 text-ink hover:text-gold transition-colors"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Cart */}
            <button
              type="button"
              onClick={() => setCartOpen(!cartOpen)}
              className={`relative flex items-center gap-1.5 ${inkText} hover:text-gold transition-colors duration-300`}
              aria-label="Shopping bag"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className="text-sm font-bold uppercase tracking-wide hidden sm:inline-block">Bag</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-2.5 text-[10px] font-bold text-ivory bg-gold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={`md:hidden ${inkText} transition-colors duration-300`}
              aria-label="Open menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — full-screen editorial */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-ivory flex flex-col animate-fade-in md:hidden">
          <div className="flex items-center justify-between px-6 py-5">
            <span className="font-serif text-xl font-medium tracking-brand uppercase text-ink">Oryn</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="text-ink"
              aria-label="Close menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center gap-10 px-6">
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`${link.mobileClass} text-ink hero-rise`}
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
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
              className="text-[10px] uppercase tracking-wide2 text-stone mt-4"
            >
              {customer ? `Account — ${customer.name.split(' ')[0]}` : 'Account'}
            </button>
          </nav>
          <p className="text-center text-[9px] uppercase tracking-[0.3em] text-stone pb-10">
            A new fragrance house
          </p>
        </div>
      )}
    </>
  )
}
