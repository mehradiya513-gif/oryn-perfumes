'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { cart, cartOpen, setCartOpen, customer, setSignUpOpen, logoutCustomer } = useCart()
  const [dropdownOpen, setDropdownOpen] = React.useState(false)

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ]

  return (
    <header className="fixed top-0 w-full z-40 bg-primary/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="/" className="text-2xl font-serif font-bold text-text tracking-[0.2em] uppercase">
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
                className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:text-accent ${
                  isActive ? 'text-text' : 'text-text-muted'
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
              className="text-xs uppercase tracking-[0.2em] font-medium text-text hover:text-accent transition-colors"
            >
              Sign In
            </button>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-text hover:text-accent transition-colors"
              >
                <span>{customer.name}</span>
                <svg
                  className={`h-4 w-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-4 w-56 rounded-sm border border-white/10 bg-surface shadow-2xl z-50 overflow-hidden backdrop-blur-md">
                  <div className="px-4 py-4 bg-surface-light border-b border-white/5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-text-muted mb-1">Signed in as</p>
                    <p className="text-sm font-medium text-text truncate">{customer.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logoutCustomer()
                      setDropdownOpen(false)
                    }}
                    className="w-full text-left px-4 py-4 text-xs uppercase tracking-[0.2em] text-red-400 hover:bg-white/5 transition-colors"
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
            className="relative p-2 text-text hover:text-accent transition-colors flex items-center justify-center"
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
              <span className="absolute top-0 right-0 bg-accent text-primary text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-glow">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
