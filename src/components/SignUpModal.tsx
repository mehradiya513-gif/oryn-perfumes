'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useCart } from '@/context/CartContext'

export default function SignUpModal() {
  const { signUpOpen, setSignUpOpen, loginCustomer, status, setStatus } = useCart()

  const [isSignUp, setIsSignUp] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('India')

  const modalRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Check if opened in login mode from AuthPromptPopup
  useEffect(() => {
    if (signUpOpen) {
      const mode = sessionStorage.getItem('oryn_auth_mode')
      if (mode === 'login') {
        setIsSignUp(false)
        sessionStorage.removeItem('oryn_auth_mode')
      } else {
        setIsSignUp(true)
      }
    }
  }, [signUpOpen])

  const countries = [
    'India',
    'United States',
    'United Kingdom',
    'Canada',
    'France',
    'Australia',
    'United Arab Emirates',
    'Singapore'
  ]

  const handleClose = () => {
    setSignUpOpen(false)
    setStatus('')
  }

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedEmail = email.trim().toLowerCase()
    const trimmedPass = password.trim()

    // 1. Guard against seller credentials
    if (trimmedEmail === 'seller' || trimmedEmail === 'seller@oryn.com') {
      setStatus('This credential belongs to a Seller Account. Please log in through the Seller Portal.')
      return
    }

    // Load registered customers database
    const customersRaw = localStorage.getItem('oryn_customers')
    let customersList: any[] = []
    if (customersRaw) {
      try {
        customersList = JSON.parse(customersRaw)
      } catch (err) {
        customersList = []
      }
    }

    if (isSignUp) {
      // --- SIGN UP FLOW ---
      if (!name || !email || !password) {
        setStatus('Please fill in all required fields.')
        return
      }

      // Check if email already registered
      const exists = customersList.find((c: any) => c.email.toLowerCase() === trimmedEmail)
      if (exists) {
        setStatus('This email is already registered. Please switch to Sign In.')
        return
      }

      // Save customer to list
      const newCustomer = {
        name: name.trim(),
        email: trimmedEmail,
        password: trimmedPass,
        phone: phone ? phone.trim() : undefined,
        address: address ? address.trim() : undefined,
        country: country,
      }

      customersList.push(newCustomer)
      localStorage.setItem('oryn_customers', JSON.stringify(customersList))

      // Log customer in
      loginCustomer({
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone,
        address: newCustomer.address,
        country: newCustomer.country,
      })

      // Reset inputs
      setName('')
      setEmail('')
      setPassword('')
      setPhone('')
      setAddress('')
      setCountry('India')

      setSignUpOpen(false)
      setStatus('Account created successfully! Welcome to ORYN.')
    } else {
      // --- SIGN IN FLOW ---
      if (!email || !password) {
        setStatus('Please enter both email and password.')
        return
      }

      // Find user
      const foundUser = customersList.find(
        (c: any) => c.email.toLowerCase() === trimmedEmail
      )

      if (!foundUser) {
        setStatus('No customer account found with this email. Please sign up.')
        return
      }

      if (foundUser.password !== trimmedPass) {
        setStatus('Incorrect password. Please try again.')
        return
      }

      // Log customer in
      loginCustomer({
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        address: foundUser.address,
        country: foundUser.country,
      })

      // Reset inputs
      setEmail('')
      setPassword('')

      setSignUpOpen(false)
      setStatus('Welcome back to ORYN!')
    }
  }

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && signUpOpen) {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [signUpOpen])

  if (!signUpOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="absolute inset-0 bg-black/45 backdrop-blur-md"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] border border-stone/20 bg-oatmeal p-6 sm:p-10 shadow-2xl text-olive scrollbar-thin scrollbar-thumb-stone/30"
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-stone/20 pb-5">
          <div>
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] font-bold text-stone block mb-1">
              Customer Account
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-wide text-olive">
              {isSignUp ? 'Join ORYN' : 'Sign In to ORYN'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full border border-stone/30 bg-sand p-2.5 text-olive/80 transition hover:bg-stone/10 hover:text-olive shadow-xs h-9 w-9 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Informative Notice */}
        <div className="mb-6 rounded-2xl bg-sand/40 border border-stone/15 p-4 text-xs text-olive/90 leading-relaxed font-serif">
          ✨ <strong>{isSignUp ? 'Create an account to start shopping' : 'Welcome back to your slow luxury fragrance sanctuary.'}</strong> Enjoy complimentary shipping on all orders.
        </div>

        {/* Status Messages */}
        {status && !status.includes('added to cart') && (
          <div className="mb-5 rounded-xl border border-stone/25 bg-sand/75 px-4 py-3 text-xs font-medium text-center text-amber-900">
            {status}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-5">
          {isSignUp && (
            <div className="grid grid-cols-1 gap-4">
              <label className="block text-xs font-medium text-olive/80">
                Full Name *
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="mt-2 w-full rounded-xl border border-stone/30 bg-sand/65 px-4 py-3 text-sm text-olive placeholder:text-stone/50 outline-none transition focus:border-olive focus:ring-4 focus:ring-stone/10"
                  required={isSignUp}
                />
              </label>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-xs font-medium text-olive/80">
              Email Address *
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-2 w-full rounded-xl border border-stone/30 bg-sand/65 px-4 py-3 text-sm text-olive placeholder:text-stone/50 outline-none transition focus:border-olive focus:ring-4 focus:ring-stone/10"
                required
              />
            </label>

            <label className="block text-xs font-medium text-olive/80">
              Password *
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full rounded-xl border border-stone/30 bg-sand/65 px-4 py-3 text-sm text-olive placeholder:text-stone/50 outline-none transition focus:border-olive focus:ring-4 focus:ring-stone/10"
                required
              />
            </label>
          </div>

          {isSignUp && (
            <>
              <div className="grid grid-cols-1 gap-4">
                <label className="block text-xs font-medium text-olive/80">
                  Phone Number (Optional)
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="mt-2 w-full rounded-xl border border-stone/30 bg-sand/65 px-4 py-3 text-sm text-olive placeholder:text-stone/50 outline-none transition focus:border-olive focus:ring-4 focus:ring-stone/10"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className="block text-xs font-medium text-olive/80 sm:col-span-1">
                    Country
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-stone/30 bg-sand/65 px-4 py-3 text-sm text-olive outline-none transition focus:border-olive focus:ring-4 focus:ring-stone/10 cursor-pointer"
                    >
                      {countries.map((c) => (
                        <option key={c} value={c} className="bg-oatmeal text-olive">
                          {c}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block text-xs font-medium text-olive/80 sm:col-span-2">
                    Detailed Delivery Address (Optional)
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street, Apartment, City, Postal Code"
                      className="mt-2 w-full rounded-xl border border-stone/30 bg-sand/65 px-4 py-3 text-sm text-olive placeholder:text-stone/50 outline-none transition focus:border-olive focus:ring-4 focus:ring-stone/10"
                    />
                  </label>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full mt-4 rounded-full bg-olive text-oatmeal hover:bg-stone hover:text-oatmeal py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-md flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            {isSignUp ? 'Create Account & Shop' : 'Sign In'}
          </button>
        </form>

        {/* Form Toggle Switch */}
        <div className="mt-6 text-center text-xs text-stone">
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false)
                  setStatus('')
                }}
                className="font-bold text-olive underline hover:text-stone transition"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true)
                  setStatus('')
                }}
                className="font-bold text-olive underline hover:text-stone transition"
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
