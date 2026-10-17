'use client'

import React, { useEffect, useRef } from 'react'
import { useCart } from '@/context/CartContext'

export default function AuthPromptPopup() {
  const { authPromptOpen, setAuthPromptOpen, setSignUpOpen } = useCart()
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && authPromptOpen) setAuthPromptOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [authPromptOpen, setAuthPromptOpen])

  useEffect(() => {
    if (authPromptOpen && popupRef.current) {
      popupRef.current.style.opacity = '0'
      popupRef.current.style.transform = 'translateY(20px)'
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (popupRef.current) {
            popupRef.current.style.transition =
              'opacity 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1)'
            popupRef.current.style.opacity = '1'
            popupRef.current.style.transform = 'translateY(0)'
          }
        })
      })
    }
  }, [authPromptOpen])

  if (!authPromptOpen) return null

  const openSignUp = () => {
    setAuthPromptOpen(false)
    setTimeout(() => setSignUpOpen(true), 80)
  }

  const openLogin = () => {
    setAuthPromptOpen(false)
    sessionStorage.setItem('oryn_auth_mode', 'login')
    setTimeout(() => setSignUpOpen(true), 80)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        onClick={() => setAuthPromptOpen(false)}
        className="absolute inset-0 bg-[#070D17]/75 backdrop-blur-md"
        style={{ animation: 'fadeIn 0.3s ease' }}
      />

      <div
        ref={popupRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-prompt-title"
        className="relative z-10 w-full max-w-sm rounded-3xl border border-[#1E3A5F] bg-[#0D1B2E] p-8 md:p-10 shadow-card text-[#EAE6FF]"
      >
        {/* Ambient gold glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/15 blur-[60px]"
        />

        <button
          onClick={() => setAuthPromptOpen(false)}
          aria-label="Close"
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-[#1E3A5F] text-[#6B7FA3] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="relative z-10 text-center mb-8">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A84C]/40 bg-gradient-to-b from-[#C9A84C]/20 to-transparent text-[#C9A84C] mb-4 mx-auto">
            <span className="font-serif text-base font-bold">O</span>
          </div>
          <h2 id="auth-prompt-title" className="font-serif text-2xl font-semibold leading-snug mb-2 text-[#EAE6FF]">
            Welcome to the Atelier
          </h2>
          <p className="text-xs font-light text-[#9BAEC8] leading-relaxed max-w-[260px] mx-auto">
            Sign in or create an account to finalize your allocation and track your order.
          </p>
        </div>

        <div className="relative z-10 space-y-3">
          <button onClick={openSignUp} className="btn-gold w-full text-center">
            Create an Account
          </button>
          <button onClick={openLogin} className="btn-outline w-full text-center">
            Sign In
          </button>
        </div>

        <p className="relative z-10 mt-6 text-center text-[10px] uppercase tracking-[0.25em] text-[#6B7FA3]">
          ✦ Complimentary express delivery above ₹499
        </p>
      </div>
    </div>
  )
}
