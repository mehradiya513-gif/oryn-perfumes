'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { AnimatePresence, motion } from 'framer-motion'

/* ————————————————————————————————————————————————————————————————
   Floating Glass Luxury Header — Midnight Noir & Champagne Gold
———————————————————————————————————————————————————————————————— */

const navLinks = [
  { label: 'Collection', href: '/#bestsellers' },
  { label: 'Categories', href: '/#categories' },
  { label: 'Scent Finder', href: '/#scent-finder' },
  { label: 'Notes Pyramid', href: '/#notes' },
  { label: 'Our Story', href: '/about' },
  { label: 'Reviews', href: '/#reviews' },
]

export default function Header() {
  const { cart, setCartOpen, customer, setSignUpOpen, logoutCustomer } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
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
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${
          scrolled
            ? 'border-b border-[#1E3A5F] bg-[#0D1B2E]/92 backdrop-blur-xl shadow-soft'
            : 'border-b border-[#1E3A5F]/60 bg-[#0D1B2E]/80 backdrop-blur-md'
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 transition-all duration-500 md:px-10 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          {/* Brand Wordmark & Monogram */}
          <Link
            href="/"
            aria-label="ORYN — Haute Parfumerie"
            className="group flex items-center gap-3.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A84C]/40 bg-gradient-to-b from-[#C9A84C]/20 to-transparent text-[#C9A84C] transition-all duration-300 group-hover:border-[#C9A84C] group-hover:shadow-gold-sm">
              <span className="font-serif text-sm font-semibold tracking-wider">O</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-[1.3rem] font-bold uppercase leading-none tracking-brand text-[#EAE6FF] group-hover:text-[#C9A84C] transition-colors duration-300">
                Oryn
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/80 mt-0.5">
                Parfums · Bombay
              </span>
            </div>
          </Link>

          {/* Centered Navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group relative text-[11px] font-bold uppercase tracking-[0.22em] text-[#9BAEC8] transition-colors duration-300 hover:text-[#EAE6FF] py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#C9A84C] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions: Search, Account, Bag */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-expanded={searchOpen}
              aria-label="Search fragrances"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#9BAEC8] transition-all duration-300 hover:border hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" strokeLinecap="round" />
              </svg>
            </button>

            {/* Account dropdown */}
            {!customer ? (
              <button
                type="button"
                onClick={() => setSignUpOpen(true)}
                className="hidden text-[11px] font-bold uppercase tracking-[0.2em] text-[#9BAEC8] transition-colors duration-300 hover:text-[#C9A84C] sm:inline-block"
              >
                Sign In
              </button>
            ) : (
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] transition-colors duration-300 hover:text-[#EAE6FF]"
                >
                  <span className="h-2 w-2 rounded-full bg-[#C9A84C] animate-pulse" />
                  {customer.name.split(' ')[0]}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full z-50 mt-3 w-56 border border-[#1E3A5F] bg-[#0F1E35] p-2 shadow-card rounded-xl">
                    <div className="border-b border-[#1E3A5F] px-4 py-3">
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#6B7FA3]">
                        Signed in as
                      </p>
                      <p className="truncate text-xs text-[#EAE6FF] mt-0.5 font-medium">{customer.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        logoutCustomer()
                        setDropdownOpen(false)
                      }}
                      className="w-full px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-[#9BAEC8] hover:text-[#C9A84C] transition-colors"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Shopping Bag Button */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2.5 rounded-full border border-[#1E3A5F] bg-[#112240] px-4 py-2 text-[#EAE6FF] transition-all duration-300 hover:border-[#C9A84C] hover:bg-[#152642] hover:shadow-gold-sm"
              aria-label={`Open shopping bag — ${cartCount} items`}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="text-[#C9A84C]" aria-hidden="true">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" strokeLinejoin="round" />
                <path d="M3 6h18M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
              </svg>
              <span className="hidden text-[11px] font-bold uppercase tracking-[0.18em] sm:inline-block text-[#9BAEC8]">
                Bag
              </span>
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-r from-[#C9A84C] via-[#E8D5A3] to-[#C9A84C] px-1.5 text-[10px] font-extrabold text-[#0D1B2E] shadow-sm">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1E3A5F] text-[#EAE6FF] lg:hidden hover:border-[#C9A84C] hover:text-[#C9A84C]"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Inline Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-[#1E3A5F] bg-[#0D1B2E]/98 backdrop-blur-2xl"
            >
              <form
                className="mx-auto flex w-full max-w-[1280px] items-center gap-3 px-6 py-4 md:px-10"
                onSubmit={(e) => e.preventDefault()}
                role="search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-[#C9A84C]" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" strokeLinecap="round" />
                </svg>
                <label className="sr-only" htmlFor="header-search">Search fragrances</label>
                <input
                  id="header-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by notes or scent name — try “oud”, “vanilla”, “rose”…"
                  className="w-full bg-transparent py-1.5 text-[15px] text-[#EAE6FF] outline-none placeholder:text-[#6B7FA3] focus:placeholder:text-[#9BAEC8]"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] hover:text-[#EAE6FF] transition-colors"
                >
                  Close
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#0D1B2E]/98 backdrop-blur-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-20 items-center justify-between px-6 border-b border-[#1E3A5F]">
              <span className="font-serif text-[1.3rem] font-bold uppercase tracking-brand text-[#EAE6FF]">
                Oryn
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A84C]/40 text-[#EAE6FF] hover:text-[#C9A84C]"
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-7 px-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-3xl font-semibold text-[#EAE6FF] transition-colors hover:text-[#C9A84C]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-6 border-t border-[#1E3A5F]">
                {!customer ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false)
                      setSignUpOpen(true)
                    }}
                    className="btn-gold w-full text-center"
                  >
                    Sign In to Account
                  </button>
                ) : (
                  <p className="text-xs text-[#9BAEC8]">
                    Signed in as <span className="text-[#C9A84C] font-semibold">{customer.name}</span>
                  </p>
                )}
              </div>
            </nav>
            <p className="px-8 pb-10 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]">
              Free express shipping above ₹499 · COD available pan-India
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
