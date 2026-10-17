'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useCart } from '@/context/CartContext'

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    setOrderOpen,
    setStatus,
    customer,
    setAuthPromptOpen,
  } = useCart()
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const drawerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      gsap.fromTo(drawerRef.current, { x: '100%' }, { x: '0%', duration: 0.45, ease: 'power3.out' })
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [cartOpen])

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' })
    gsap.to(drawerRef.current, {
      x: '100%',
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => setCartOpen(false),
    })
  }

  if (!cartOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div ref={overlayRef} onClick={handleClose} className="absolute inset-0 bg-[#0D1B2E]/75 backdrop-blur-md" />

      {/* Panel */}
      <div
        ref={drawerRef}
        className="relative z-10 w-full max-w-md h-full bg-[#0D1B2E] text-[#EAE6FF] border-l border-[#1E3A5F] shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-7 border-b border-[#1E3A5F] bg-[#112240]">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]">Your Selection</p>
            <h2 className="font-serif text-2xl font-semibold text-[#EAE6FF]">Shopping Bag</h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1E3A5F] text-[#6B7FA3] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            aria-label="Close bag"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A84C]/30 bg-[#112240] text-[#C9A84C]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" strokeLinejoin="round" />
                  <path d="M3 6h18M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-serif text-2xl text-[#EAE6FF]">Your bag is empty.</p>
              <p className="text-[#9BAEC8] text-sm font-light max-w-[260px] leading-relaxed">
                Handcrafted extraits are waiting — explore the collection to find your signature.
              </p>
              <button type="button" onClick={handleClose} className="btn-outline !px-7 !py-3">
                Discover Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 items-start rounded-2xl border border-[#1E3A5F] bg-[#0F1E35] p-4 shadow-sm transition-all hover:border-[#C9A84C]/40">
                <div className="relative h-[88px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-[#112240] p-1 border border-[#1E3A5F]">
                  {item.image && (
                    <Image src={item.image} alt={item.name} fill sizes="72px" className="object-contain" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-base font-semibold text-[#EAE6FF] leading-snug">{item.name.replace(/^Oryn\s/, '')}</p>
                  <p className="text-xs font-bold text-[#C9A84C] mt-1">₹{item.price}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-6 w-6 rounded-lg border border-[#1E3A5F] text-xs text-[#9BAEC8] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors flex items-center justify-center"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="text-xs font-semibold w-4 text-center text-[#EAE6FF]">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-6 w-6 rounded-lg border border-[#1E3A5F] text-xs text-[#9BAEC8] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors flex items-center justify-center"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right flex flex-col justify-between self-stretch">
                  <p className="text-sm font-bold text-[#EAE6FF]">₹{item.price * item.quantity}</p>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-[10px] uppercase tracking-[0.18em] text-[#6B7FA3] hover:text-[#C9A84C] transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Footer */}
        {cart.length > 0 && (
          <div className="border-t border-[#1E3A5F] space-y-4 bg-[#112240] px-8 py-7">
            <div className="flex items-center justify-between text-xs text-[#9BAEC8]">
              <span>Express Delivery</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Complimentary</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#1E3A5F] pt-3">
              <span className="font-serif text-lg text-[#EAE6FF]">Grand Total</span>
              <span className="font-serif text-2xl font-bold text-[#EAE6FF]">₹{cartTotal}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                handleClose()
                setTimeout(() => {
                  if (!customer) {
                    setAuthPromptOpen(true)
                  } else {
                    setOrderOpen(true)
                    setStatus('')
                  }
                }, 300)
              }}
              className="btn-gold w-full text-center"
            >
              Proceed to Secure Checkout
            </button>
            <p className="text-[10px] text-center uppercase tracking-wider text-[#6B7FA3]">
              ✦ Verified COD &amp; Instant UPI Accepted
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
