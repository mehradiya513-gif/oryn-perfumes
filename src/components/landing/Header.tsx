'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { AnimatePresence, motion } from 'framer-motion'

/* ————————————————————————————————————————————————————————————————
   Header — announcement bar sits above; this bar is transparent
   over the hero and turns solid charcoal once scrolled. Shrinks
   slightly on scroll. Anchors link to landing sections.
———————————————————————————————————————————————————————————————— */

const navLinks = [
  { label: 'Shop', href: '/#bestsellers' },
  { label: 'Bestsellers', href: '/#bestsellers' },
  { label: 'Our Story', href: '/#brand-story' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const { cart, setCartOpen } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'border-b border-ivory/10 bg-charcoal/95 backdrop-blur-sm'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 transition-all duration-500 md:px-10 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          {/* Wordmark */}
          <Link
            href="/"
            aria-label="ORYN — home"
            className="font-serif text-[1.3rem] font-semibold uppercase leading-none tracking-brand text-ivory"
          >
            Oryn
          </Link>

          {/* Centered nav */}
          <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-ivory/85 transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-expanded={searchOpen}
              aria-label="Search products"
              className="text-ivory/85 transition-colors hover:text-gold"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" strokeLinecap="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative text-ivory/85 transition-colors hover:text-gold"
              aria-label={`Open cart — ${cartCount} item${cartCount === 1 ? '' : 's'}`}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" strokeLinejoin="round" />
                <path d="M3 6h18M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-2.5 -top-2 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="text-ivory lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Inline search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-ivory/10 bg-charcoal/95"
            >
              <form
                className="mx-auto flex w-full max-w-[1240px] items-center gap-3 px-6 py-3 md:px-10"
                onSubmit={(e) => e.preventDefault()}
                role="search"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-ivory/50" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" strokeLinecap="round" />
                </svg>
                <label className="sr-only" htmlFor="header-search">Search fragrances</label>
                <input
                  id="header-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search fragrances — try “oud”"
                  className="w-full bg-transparent py-1.5 text-[14px] text-ivory outline-none placeholder:text-ivory/40"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-[11px] font-bold uppercase tracking-[0.18em] text-ivory/60 hover:text-ivory"
                >
                  Close
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-charcoal lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-20 items-center justify-between px-6">
              <span className="font-serif text-[1.3rem] font-semibold uppercase tracking-brand text-ivory">Oryn</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-ivory"
                aria-label="Close menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-7 px-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-4xl font-semibold text-ivory transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="px-8 pb-10 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
              Free shipping above ₹499 · COD available
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
