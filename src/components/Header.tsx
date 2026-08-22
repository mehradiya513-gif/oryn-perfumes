'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { cart, cartOpen, setCartOpen, customer, setSignUpOpen, logoutCustomer } = useCart()
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [isSeller, setIsSeller] = React.useState(false)

  React.useEffect(() => {
    setIsSeller(localStorage.getItem('oryn_seller_logged_in') === 'true')
  }, [])

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone/25 bg-oatmeal/90 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-6 py-4 sm:px-10 flex items-center justify-between">


        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative text-[11px] uppercase tracking-[0.15em] transition-all duration-300 hover:text-stone ${
                  isActive 
                    ? 'text-olive font-bold' 
                    : 'text-olive/75 font-medium'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-[1px] w-4 bg-stone" />
                )}
              </a>
            )
          })}
        </nav>

        {/* Actions Buttons */}
        <div className="flex items-center gap-4">
          {/* Customer Signup / Profile Dropdown */}
          {!customer ? (
            <button
              type="button"
              onClick={() => setSignUpOpen(true)}
              className="rounded-full border border-stone/30 bg-sand text-olive px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-medium transition hover:bg-stone/10 hover:border-olive/40 flex items-center gap-1.5 shadow-xs"
            >
              Sign Up
            </button>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="rounded-full border border-stone/30 bg-sand text-olive px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-medium transition hover:bg-stone/10 hover:border-olive/40 flex items-center gap-2 shadow-xs"
              >
                <span>⚜️ {customer.name}</span>
                <svg
                  className={`h-3 w-3 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-stone/20 bg-oatmeal p-2 shadow-xl z-50">
                  <div className="px-4 py-2 border-b border-stone/10 mb-1">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-stone font-bold">Email</p>
                    <p className="text-[11px] text-olive font-medium truncate">{customer.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logoutCustomer()
                      setDropdownOpen(false)
                    }}
                    className="w-full text-left rounded-xl px-4 py-2 text-xs text-red-700 hover:bg-red-50 hover:text-red-800 transition"
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
            className="relative rounded-full border border-stone/30 bg-sand p-2.5 text-olive transition hover:bg-stone/10 hover:border-olive/40 flex items-center justify-center shadow-xs"
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
              <span className="absolute -top-1.5 -right-1.5 bg-olive text-oatmeal text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  )
}
