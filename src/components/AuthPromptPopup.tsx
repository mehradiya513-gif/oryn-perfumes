'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

export default function AuthPromptPopup() {
  const { authPromptOpen, setAuthPromptOpen, setSignUpOpen } = useCart()
  const overlayRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && authPromptOpen) setAuthPromptOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [authPromptOpen, setAuthPromptOpen])

  // Animate in
  useEffect(() => {
    if (authPromptOpen && popupRef.current) {
      popupRef.current.style.opacity = '0'
      popupRef.current.style.transform = 'translateY(24px) scale(0.97)'
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (popupRef.current) {
            popupRef.current.style.transition =
              'opacity 0.38s cubic-bezier(0.22,1,0.36,1), transform 0.38s cubic-bezier(0.22,1,0.36,1)'
            popupRef.current.style.opacity = '1'
            popupRef.current.style.transform = 'translateY(0) scale(1)'
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
    // We'll open the SignUpModal in login mode — we share state via a trick:
    // set a flag in sessionStorage so SignUpModal can start in login mode
    sessionStorage.setItem('oryn_auth_mode', 'login')
    setTimeout(() => setSignUpOpen(true), 80)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={() => setAuthPromptOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        style={{ animation: 'fadeIn 0.3s ease' }}
      />

      {/* Popup Card */}
      <div
        ref={popupRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-prompt-title"
        className="relative z-10 w-full max-w-sm rounded-[2rem] bg-[#FDFBF9] border border-[#D2B4A4]/30 shadow-2xl overflow-hidden"
      >
        {/* Decorative top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#D2B4A4] via-[#3D302B] to-[#D2B4A4]" />

        {/* Content */}
        <div className="px-8 pt-8 pb-7">
          {/* Close button */}
          <button
            onClick={() => setAuthPromptOpen(false)}
            aria-label="Close"
            className="absolute top-5 right-5 w-8 h-8 rounded-full border border-[#D2B4A4]/40 bg-[#F5EBE6] flex items-center justify-center text-[#3D302B]/60 hover:text-[#3D302B] hover:bg-[#D2B4A4]/20 transition-all duration-200 text-sm font-bold"
          >
            ✕
          </button>


          {/* ORYN Logo + heading */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="mb-4 flex items-center justify-center">
              <Image
                src="/images/IMG-20260802-WA0019.jpg"
                alt="ORYN Logo"
                width={130}
                height={65}
                className="object-contain mix-blend-multiply brightness-[1.05] contrast-[1.1] saturate-[.85]"
                style={{ clipPath: 'inset(15% 15% 22% 15%)' }}
              />
            </div>
            <h2
              id="auth-prompt-title"
              className="font-serif text-2xl font-semibold text-[#3D302B] leading-snug mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Sign in to checkout
            </h2>
            <p className="text-sm text-[#3D302B]/60 leading-relaxed max-w-[260px]">
              Create an account or log in to proceed to checkout and complete your order.
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[#D2B4A4]/30" />
            <span className="text-[10px] font-mono text-[#D2B4A4] uppercase tracking-widest">
              Choose
            </span>
            <div className="flex-1 h-px bg-[#D2B4A4]/30" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3">
            {/* Sign Up */}
            <button
              id="auth-prompt-signup-btn"
              onClick={openSignUp}
              className="group w-full rounded-full bg-[#3D302B] text-[#FDFBF9] py-3.5 text-xs font-bold uppercase tracking-[0.22em] transition-all duration-300 hover:bg-[#5c4a42] hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              Create an account
            </button>

            {/* Log In */}
            <button
              id="auth-prompt-login-btn"
              onClick={openLogin}
              className="group w-full rounded-full border border-[#3D302B]/30 bg-transparent text-[#3D302B] py-3.5 text-xs font-bold uppercase tracking-[0.22em] transition-all duration-300 hover:bg-[#3D302B] hover:text-[#FDFBF9] hover:border-[#3D302B] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              Log into your account
            </button>
          </div>

          {/* Footer note */}
          <p className="mt-5 text-center text-[10px] text-[#3D302B]/40 font-mono leading-relaxed">
            Free shipping on all ORYN orders · Secure checkout
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
