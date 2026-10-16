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
      <div ref={overlayRef} onClick={handleClose} className="absolute inset-0 bg-[#23171B]/60 backdrop-blur-md" />

      {/* Panel */}
      <div
        ref={drawerRef}
        className="relative z-10 w-full max-w-md h-full bg-[#FAF6F5] text-[#23171B] border-l border-[#EBDCD7] shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-7 border-b border-[#EBDCD7] bg-gradient-to-r from-[#F7EDE9] to-[#FAF6F5]">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#A86359]">Your Selection</p>
            <h2 className="font-serif text-2xl font-semibold text-[#23171B]">Shopping Bag</h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EBDCD7] text-[#8D767C] hover:border-[#C5857B] hover:text-[#A86359] transition-colors"
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
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C5857B]/30 bg-[#F7EDE9] text-[#C5857B]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" strokeLinejoin="round" />
                  <path d="M3 6h18M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-serif text-2xl text-[#23171B]">Your bag is empty.</p>
              <p className="text-[#5C484E] text-sm font-light max-w-[260px] leading-relaxed">
                Handcrafted extraits are waiting — explore the collection to find your signature.
              </p>
              <button type="button" onClick={handleClose} className="btn-outline !px-7 !py-3">
                Discover Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 items-start rounded-2xl border border-[#EBDCD7] bg-white p-4 shadow-sm transition-all hover:border-[#C5857B]/40">
                <div className="relative h-[88px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-[#FAF6F5] to-[#F7EDE9] p-1 border border-[#EBDCD7]">
                  {item.image && (
                    <Image src={item.image} alt={item.name} fill sizes="72px" className="object-contain" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-base font-semibold text-[#23171B] leading-snug">{item.name.replace(/^Oryn\s/, '')}</p>
                  <p className="text-xs font-bold text-[#C5857B] mt-1">₹{item.price}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-6 w-6 rounded-lg border border-[#EBDCD7] text-xs text-[#5C484E] hover:border-[#C5857B] hover:text-[#A86359] transition-colors flex items-center justify-center"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="text-xs font-semibold w-4 text-center text-[#23171B]">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-6 w-6 rounded-lg border border-[#EBDCD7] text-xs text-[#5C484E] hover:border-[#C5857B] hover:text-[#A86359] transition-colors flex items-center justify-center"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right flex flex-col justify-between self-stretch">
                  <p className="text-sm font-bold text-[#23171B]">₹{item.price * item.quantity}</p>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-[10px] uppercase tracking-[0.18em] text-[#8D767C] hover:text-[#A86359] transition-colors"
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
          <div className="border-t border-[#EBDCD7] space-y-4 bg-gradient-to-b from-[#F7EDE9] to-[#FAF6F5] px-8 py-7">
            <div className="flex items-center justify-between text-xs text-[#5C484E]">
              <span>Express Delivery</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A86359]">Complimentary</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#EBDCD7] pt-3">
              <span className="font-serif text-lg text-[#23171B]">Grand Total</span>
              <span className="font-serif text-2xl font-bold text-[#23171B]">₹{cartTotal}</span>
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
            <p className="text-[10px] text-center uppercase tracking-wider text-[#8D767C]">
              ✦ Verified COD &amp; Instant UPI Accepted
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
