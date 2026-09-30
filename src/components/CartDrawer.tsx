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
      <div ref={overlayRef} onClick={handleClose} className="absolute inset-0 bg-ink/50 backdrop-blur-sm" />

      {/* Panel */}
      <div
        ref={drawerRef}
        className="relative z-10 w-full max-w-md h-full bg-ivory text-ink shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-7 border-b border-ink/15">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-1">Your selection</p>
            <h2 className="font-serif text-2xl">Bag</h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-stone hover:text-ink transition-colors"
            aria-label="Close bag"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <p className="font-serif text-xl">Your bag is empty.</p>
              <p className="text-ink-soft text-sm font-light max-w-[240px] leading-relaxed">
                Six fragrances are waiting — perhaps one of them is yours.
              </p>
              <button type="button" onClick={handleClose} className="btn-outline mt-2 !px-8 !py-3">
                Discover Oryn
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-5 items-start border-b border-ink/10 pb-8">
                <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-sand">
                  {item.image && (
                    <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-lg leading-snug">{item.name.replace(/^Oryn\s/, '')}</p>
                  <p className="text-xs font-light text-stone mt-1">₹{item.price}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-7 w-7 border border-ink/20 text-sm text-ink-soft hover:border-ink hover:text-ink transition-colors flex items-center justify-center"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="text-sm font-light w-4 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-7 w-7 border border-ink/20 text-sm text-ink-soft hover:border-ink hover:text-ink transition-colors flex items-center justify-center"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right flex flex-col justify-between self-stretch">
                  <p className="text-sm font-light">₹{item.price * item.quantity}</p>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-[10px] uppercase tracking-[0.2em] text-stone hover:text-ink transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {cart.length > 0 && (
          <div className="border-t border-ink/15 px-8 py-7 space-y-5 bg-ivory-deep">
            <div className="flex items-center justify-between text-sm font-light text-ink-soft">
              <span>Shipping</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold">Complimentary</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg">Total</span>
              <span className="font-serif text-2xl">₹{cartTotal}</span>
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
              className="btn-dark w-full"
            >
              Proceed to checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
