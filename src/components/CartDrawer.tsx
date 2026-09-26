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
        className="absolute inset-0 bg-olive/40 backdrop-blur-sm"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className="relative z-10 w-full max-w-md h-full bg-white text-olive shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-olive/10">
          <div className="space-y-1">
            <span className="mono-tag text-[10px] text-stone font-semibold uppercase">Your selection</span>
            <h2 className="font-serif text-3xl font-normal tracking-wide text-olive">Oryn Cart</h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full border border-olive/15 bg-sand hover:border-accent p-2 text-olive transition-all duration-300 flex items-center justify-center h-10 w-10"
            aria-label="Close cart"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
              <span className="text-5xl text-olive/15">⚜️</span>
              <p className="font-serif text-stone text-xl">Your cart is currently empty.</p>
              <p className="text-stone text-sm max-w-[250px] leading-relaxed">
                Add an ORYN signature fragrance to experience tranquil luxury.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-4 rounded-full border border-olive/25 bg-transparent hover:border-accent hover:text-accent px-8 py-3 mono-tag text-[10px] font-bold text-olive transition duration-300"
              >
                Discover scents
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 rounded-modern bg-sand/70 border border-olive/10 p-4 hover:border-accent/40 transition duration-500 group"
              >
                {/* Product Image Thumbnail */}
                <div className="relative h-20 w-20 bg-white rounded-modern overflow-hidden border border-olive/10 shrink-0 p-2 flex items-center justify-center">
                  {item.image ? (
                    <div className="relative w-full h-full">
                      <Image
                         src={item.image}
                         alt={item.name}
                         fill
                         className="object-contain transition duration-500 group-hover:scale-110"
                         sizes="80px"
                      />
                    </div>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-xl bg-white text-stone">
                      ⚜️
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-lg tracking-wide truncate text-olive">{item.name}</p>
                  <p className="text-sm text-stone mt-1">₹{item.price} each</p>

                  {/* Quantity adjustment */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-6 w-6 rounded-modern bg-white border border-olive/15 flex items-center justify-center text-sm text-stone hover:text-olive hover:border-olive/40 transition"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium w-6 text-center text-olive">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-6 w-6 rounded-modern bg-white border border-olive/15 flex items-center justify-center text-sm text-stone hover:text-olive hover:border-olive/40 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price and Remove */}
                <div className="text-right flex flex-col justify-between h-20 shrink-0 pl-2">
                  <p className="text-base font-medium text-olive">₹{item.price * item.quantity}</p>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-[10px] text-stone hover:text-red-700 transition tracking-widest uppercase font-semibold"
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
          <div className="border-t border-olive/10 bg-sand p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-stone">
                <span>Shipping</span>
                <span className="text-olive font-medium mono-tag text-[10px]">Complimentary</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg text-olive">Estimated Total</span>
                <span className="text-3xl font-serif text-olive">₹{cartTotal}</span>
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
              className="w-full rounded-modern bg-olive text-oatmeal py-4 mono-tag text-[11px] font-bold uppercase transition-all duration-500 hover:bg-accent"
            >
              Proceed to checkout
            </button>

            <p className="text-[10px] text-center text-stone tracking-wide">
              Order securely processed with free global priority shipping.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
