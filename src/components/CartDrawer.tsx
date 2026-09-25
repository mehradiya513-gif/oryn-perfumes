'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useCart } from '@/context/CartContext'

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQuantity, removeFromCart, cartTotal, setOrderOpen, setStatus, customer, setAuthPromptOpen } = useCart()
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const drawerRef = useRef<HTMLDivElement | null>(null)

  // Toggle body overflow
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden'
      // GSAP animate open
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      gsap.fromTo(drawerRef.current, { x: '100%' }, { x: '0%', duration: 0.4, ease: 'power3.out' })
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
      {/* Backdrop overlay */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className="relative z-10 w-full max-w-md h-full bg-surface text-text shadow-2xl border-l border-white/10 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/5 bg-primary/50">
          <div className="space-y-1">
            <span className="text-[10px] font-sans tracking-[0.3em] text-text-muted font-bold uppercase">Your selection</span>
            <h2 className="font-serif text-3xl font-normal tracking-wide text-text">Oryn Cart</h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full border border-white/10 bg-surface-light hover:border-accent p-2 text-text transition-all duration-300 flex items-center justify-center h-10 w-10"
            aria-label="Close cart"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
              <span className="text-5xl text-white/10">⚜️</span>
              <p className="font-serif text-text-muted text-xl">Your cart is currently empty.</p>
              <p className="text-text-muted text-sm max-w-[250px] leading-relaxed font-light">
                Add an ORYN signature fragrance to experience tranquil luxury.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-4 rounded-full border border-white/20 bg-transparent hover:border-accent hover:text-accent px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-text transition duration-300"
              >
                Discover scents
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 rounded-sm bg-surface-light border border-white/5 p-4 hover:border-accent/30 transition duration-500 group shadow-luxury-soft"
              >
                {/* Product Image Thumbnail */}
                <div className="relative h-20 w-20 bg-primary/50 rounded-sm overflow-hidden border border-white/5 shrink-0 p-2 flex items-center justify-center">
                  {item.image ? (
                    <div className="relative w-full h-full">
                      <Image
                         src={item.image}
                         alt={item.name}
                         fill
                         className="object-contain filter transition duration-500 group-hover:scale-110 drop-shadow-xl"
                         sizes="80px"
                      />
                    </div>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-xl bg-primary text-text-muted">
                      ⚜️
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-lg tracking-wide truncate text-text">{item.name}</p>
                  <p className="text-sm text-text-muted font-light mt-1">₹{item.price} each</p>
                  
                  {/* Quantity adjustment */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-6 w-6 rounded-sm bg-surface border border-white/10 flex items-center justify-center text-sm font-light text-text-muted hover:text-text hover:border-white/30 transition"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium w-6 text-center text-text">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-6 w-6 rounded-sm bg-surface border border-white/10 flex items-center justify-center text-sm font-light text-text-muted hover:text-text hover:border-white/30 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price and Remove */}
                <div className="text-right flex flex-col justify-between h-20 shrink-0 pl-2">
                  <p className="text-base font-medium text-text">₹{item.price * item.quantity}</p>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-[10px] text-text-muted hover:text-red-400 transition tracking-widest uppercase font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}


        </div>

        {/* Footer actions */}
        {cart.length > 0 && (
          <div className="border-t border-white/10 bg-surface-light p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-text-muted">
                <span>Shipping</span>
                <span className="text-text font-medium uppercase tracking-[0.2em] text-[10px]">Complimentary</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg text-text">Estimated Total</span>
                <span className="text-3xl font-serif text-text">₹{cartTotal}</span>
              </div>
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
              className="w-full rounded-sm bg-accent text-primary py-4 text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-500 hover:bg-accent-hover shadow-glow"
            >
              Proceed to checkout
            </button>

            <p className="text-[10px] text-center text-text-muted font-light tracking-wide">
              Order securely processed with free global priority shipping.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
