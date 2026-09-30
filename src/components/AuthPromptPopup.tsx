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
        className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
        style={{ animation: 'fadeIn 0.3s ease' }}
      />

      <div
        ref={popupRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-prompt-title"
        className="relative z-10 w-full max-w-sm bg-ivory text-ink p-8 md:p-10 shadow-2xl"
      >
        <button
          onClick={() => setAuthPromptOpen(false)}
          aria-label="Close"
          className="absolute top-5 right-5 text-stone hover:text-ink transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <p className="font-serif text-xl font-medium tracking-brand uppercase text-ink mb-6">Oryn</p>
          <h2 id="auth-prompt-title" className="font-serif text-2xl leading-snug mb-3">
            One more detail
          </h2>
          <p className="text-sm font-light text-ink-soft leading-relaxed max-w-[260px] mx-auto">
            Sign in or create an account to complete your order.
          </p>
        </div>

        <div className="space-y-3">
          <button onClick={openSignUp} className="btn-dark w-full">
            Create an account
          </button>
          <button onClick={openLogin} className="btn-outline w-full">
            Sign in
          </button>
        </div>

        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.25em] text-stone">
          Complimentary shipping on every order
        </p>
      </div>
    </div>
  )
}
