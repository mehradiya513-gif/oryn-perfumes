'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const pathname = usePathname()
  const { cart, cartOpen, setCartOpen, customer, setSignUpOpen, logoutCustomer } = useCart()
  const [dropdownOpen, setDropdownOpen] = React.useState(false)

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ]

  return (
    <header className="fixed top-0 w-full z-40 bg-primary/85 backdrop-blur-md border-b border-olive/10 transition-all duration-300">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="/" className="text-xl font-serif font-bold text-olive tracking-[0.35em] uppercase">
            ORYN
          </a>
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <a
                key={link.label}
                href={link.href}
                className={`mono-tag text-[10px] font-medium transition-colors hover:text-accent ${
                  isActive ? 'text-olive' : 'text-stone'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Actions Buttons */}
        <div className="flex items-center gap-6">
          {/* Customer Signup / Profile Dropdown */}
          {!customer ? (
            <button
              type="button"
              onClick={() => setSignUpOpen(true)}
              className="mono-tag text-[10px] font-medium text-olive hover:text-accent transition-colors"
            >
              Sign In
            </button>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 mono-tag text-[10px] font-medium text-olive hover:text-accent transition-colors"
              >
                <span>{customer.name}</span>
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-4 w-56 rounded-modern border border-olive/10 bg-white shadow-luxury-soft z-50 overflow-hidden">
                  <div className="px-4 py-4 bg-sand border-b border-olive/10">
                    <p className="mono-tag text-[9px] font-semibold text-stone mb-1">Signed in as</p>
                    <p className="text-sm font-medium text-olive truncate">{customer.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logoutCustomer()
                      setDropdownOpen(false)
                    }}
                    className="w-full text-left px-4 py-4 mono-tag text-[10px] text-red-700 hover:bg-sand transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Cart Trigger Button */}
          <button
            type="button"
            onClick={() => setCartOpen(!cartOpen)}
            className="relative p-2 text-olive hover:text-accent transition-colors flex items-center justify-center"
            aria-label="Shopping Cart"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
              />
            </svg>
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
