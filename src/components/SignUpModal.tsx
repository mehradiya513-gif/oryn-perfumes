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

  // Open in login mode when requested from the auth prompt
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
    'Singapore',
  ]

  const handleClose = () => {
    setSignUpOpen(false)
    setStatus('')
  }

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedEmail = email.trim().toLowerCase()
    const trimmedPass = password.trim()

    // Guard against seller credentials
    if (trimmedEmail === 'seller' || trimmedEmail === 'seller@oryn.com') {
      setStatus('This credential belongs to a Seller Account. Please log in through the Seller Portal.')
      return
    }

    // Load registered customers
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
      if (!name.trim() || !email.trim() || !password.trim() || !phone.trim() || !address.trim()) {
        setStatus('Please fill in all required fields.')
        return
      }

      const exists = customersList.find((c: any) => c.email.toLowerCase() === trimmedEmail)
      if (exists) {
        setStatus('This email is already registered. Please sign in.')
        return
      }

      const newCustomer = {
        name: name.trim(),
        email: trimmedEmail,
        password: trimmedPass,
        phone: phone.trim(),
        address: address.trim(),
        country: country,
      }

      customersList.push(newCustomer)
      localStorage.setItem('oryn_customers', JSON.stringify(customersList))

      loginCustomer({
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone,
        address: newCustomer.address,
        country: newCustomer.country,
      })

      setName('')
      setEmail('')
      setPassword('')
      setPhone('')
      setAddress('')
      setCountry('India')

      setSignUpOpen(false)
      setStatus('Account created. Welcome to ORYN.')
    } else {
      if (!email || !password) {
        setStatus('Please enter both email and password.')
        return
      }

      const foundUser = customersList.find((c: any) => c.email.toLowerCase() === trimmedEmail)

      if (!foundUser) {
        setStatus('No account found with this email. Please create one.')
        return
      }

      if (foundUser.password !== trimmedPass) {
        setStatus('Incorrect password. Please try again.')
        return
      }

      loginCustomer({
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        address: foundUser.address,
        country: foundUser.country,
      })

      setEmail('')
      setPassword('')

      setSignUpOpen(false)
      setStatus('Welcome back to ORYN.')
    }
  }

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

  const inputClass =
    'w-full bg-transparent border-0 border-b border-ink/25 focus:border-ink outline-none py-2.5 text-sm text-ink placeholder:text-stone/60 transition-colors'
  const labelClass = 'block text-[10px] uppercase tracking-[0.2em] text-stone mb-2'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
      />

      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto bg-ivory text-ink p-8 md:p-12 shadow-2xl animate-fade-in"
      >
        <div className="flex items-start justify-between border-b border-ink/15 pb-6 mb-8">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">Customer account</p>
            <h2 className="font-serif text-3xl">{isSignUp ? 'Join Oryn' : 'Welcome back'}</h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-stone hover:text-ink transition-colors mt-1"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {status && !status.includes('added to cart') && (
          <p className="mb-8 text-sm text-ink-soft border-l-2 border-gold pl-4">{status}</p>
        )}

        <form onSubmit={handleAuthSubmit} className="space-y-7">
          {isSignUp && (
            <label className="block">
              <span className={labelClass}>Full name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={inputClass}
                required={isSignUp}
              />
            </label>
          )}

          <div className="grid sm:grid-cols-2 gap-7">
            <label className="block">
              <span className={labelClass}>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
                required
              />
            </label>
            <label className="block">
              <span className={labelClass}>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputClass}
                required
              />
            </label>
          </div>

          {isSignUp && (
            <>
              <div className="grid sm:grid-cols-2 gap-7">
                <label className="block">
                  <span className={labelClass}>Phone</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91"
                    className={inputClass}
                    required={isSignUp}
                  />
                </label>
                <label className="block">
                  <span className={labelClass}>Country</span>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className={labelClass}>Delivery address</span>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, apartment, city, postal code"
                  className={inputClass}
                  required={isSignUp}
                />
              </label>
            </>
          )}

          <button type="submit" className="btn-dark w-full mt-2">
            {isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs font-light text-stone">
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false)
                  setStatus('')
                }}
                className="text-ink underline underline-offset-4 hover:text-gold transition-colors"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              New to Oryn?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true)
                  setStatus('')
                }}
                className="text-ink underline underline-offset-4 hover:text-gold transition-colors"
              >
                Create an account
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
