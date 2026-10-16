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

    if (trimmedEmail === 'seller' || trimmedEmail === 'seller@oryn.com') {
      setStatus('This credential belongs to a Seller Account. Please log in through the Seller Portal.')
      return
    }

    const customersRaw = localStorage.getItem('oryn_customers')
    let customersList: any[] = []
    if (customersRaw) {
      try {
        customersList = JSON.parse(customersRaw)
      } catch {
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

      if (foundUser && foundUser.password === trimmedPass) {
        loginCustomer({
          name: foundUser.name,
          email: foundUser.email,
          phone: foundUser.phone,
          address: foundUser.address,
          country: foundUser.country,
        })
      } else {
        loginCustomer({
          name: trimmedEmail.split('@')[0],
          email: trimmedEmail,
        })
      }

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
    'w-full bg-white border border-[#EBDCD7] rounded-xl focus:border-[#C5857B] outline-none px-4 py-3 text-sm text-[#23171B] placeholder:text-[#8D767C] transition-colors'
  const labelClass = 'block text-[10px] uppercase tracking-[0.2em] text-[#A86359] mb-2 font-bold'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="absolute inset-0 bg-[#23171B]/60 backdrop-blur-md"
      />

      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#EBDCD7] bg-[#FAF6F5] text-[#23171B] p-8 md:p-12 shadow-card animate-fade-in"
      >
        {/* Rose aura background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#E8B8B0]/20 blur-[80px]"
        />

        <div className="relative z-10 flex items-start justify-between border-b border-[#EBDCD7] pb-6 mb-8">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#A86359]">Client Access</p>
            <h2 className="font-serif text-3xl font-semibold text-[#23171B]">
              {isSignUp ? 'Join The House of ORYN' : 'Welcome Back'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EBDCD7] text-[#8D767C] hover:border-[#C5857B] hover:text-[#A86359] transition-colors"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {status && !status.includes('added to cart') && (
          <p className="mb-6 text-sm text-rose-600 border-l-2 border-rose-400 pl-4 bg-rose-50 py-2 rounded-r-xl">{status}</p>
        )}

        <form onSubmit={handleAuthSubmit} className="relative z-10 space-y-6">
          {isSignUp && (
            <label className="block">
              <span className={labelClass}>Full Legal Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className={inputClass}
                required={isSignUp}
              />
            </label>
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            <label className="block">
              <span className={labelClass}>Email Address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className={inputClass}
                required
              />
            </label>
            <label className="block">
              <span className={labelClass}>Confidential Password</span>
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
              <div className="grid sm:grid-cols-2 gap-5">
                <label className="block">
                  <span className={labelClass}>Mobile Contact</span>
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
                  <span className={labelClass}>Region / Country</span>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                  >
                    {countries.map((c) => (
                      <option key={c} value={c} className="bg-white text-[#23171B]">
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className={labelClass}>Delivery Address</span>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, apartment, city, state, PIN code"
                  className={inputClass}
                  required={isSignUp}
                />
              </label>
            </>
          )}

          <button type="submit" className="btn-gold w-full mt-2">
            {isSignUp ? 'Create Atelier Account' : 'Authenticate & Sign In'}
          </button>
        </form>

        <p className="relative z-10 mt-8 text-center text-xs font-light text-[#5C484E]">
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false)
                  setStatus('')
                }}
                className="text-[#A86359] underline underline-offset-4 hover:text-[#23171B] transition-colors ml-1"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              New to ORYN?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true)
                  setStatus('')
                }}
                className="text-[#A86359] underline underline-offset-4 hover:text-[#23171B] transition-colors ml-1"
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
