'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useCart } from '@/context/CartContext'

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQuantity, removeFromCart, cartTotal, setOrderOpen, setStatus } = useCart()
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
        className="absolute inset-0 bg-black/45 backdrop-blur-md"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className="relative z-10 w-full max-w-md h-full bg-oatmeal text-olive shadow-2xl border-l border-stone/20 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-stone/20">
          <div className="space-y-1">
            <span className="text-[9px] font-mono tracking-[0.2em] text-stone font-bold uppercase">Your selection</span>
            <h2 className="font-serif text-2xl font-bold tracking-wide text-olive">Olfactory Cart</h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full border border-stone/30 bg-sand hover:bg-stone/10 p-2 text-olive transition-all duration-300 flex items-center justify-center h-8 w-8"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 sm:px-8 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
              <span className="text-4xl text-stone/50">⚜️</span>
              <p className="font-serif text-olive/80 text-lg">Your cart is currently empty.</p>
              <p className="text-stone/75 text-xs max-w-[200px] leading-relaxed">
                Add an ORYN signature fragrance to experience tranquil luxury.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full border border-stone/30 bg-sand hover:bg-stone/15 px-6 py-2 text-[9px] font-bold uppercase tracking-wider text-olive transition duration-300"
              >
                Discover scents
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-3xl bg-sand/60 border border-stone/15 p-4 hover:border-stone/30 transition duration-300 group shadow-xs"
              >
                {/* Product Image Thumbnail */}
                <div className="relative h-16 w-16 bg-sand rounded-2xl overflow-hidden border border-stone/20 shrink-0 p-2 flex items-center justify-center">
                  {item.image ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain filter saturate-[0.8] transition duration-300 group-hover:scale-105"
                        sizes="64px"
                      />
                    </div>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-xl bg-sand text-stone">
                      ⚜️
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-sm font-semibold tracking-wide truncate text-olive">{item.name}</p>
                  <p className="text-xs text-stone font-medium mt-0.5">₹{item.price} each</p>
                  
                  {/* Quantity adjustment */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-5 w-5 rounded-md bg-sand border border-stone/35 flex items-center justify-center text-xs font-bold text-olive/70 hover:text-olive hover:border-stone transition"
                    >
                      -
                    </button>
                    <span className="text-xs font-semibold w-5 text-center text-olive/90">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-5 w-5 rounded-md bg-sand border border-stone/35 flex items-center justify-center text-xs font-bold text-olive/70 hover:text-olive hover:border-stone transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price and Remove */}
                <div className="text-right flex flex-col justify-between h-16 shrink-0 pl-2">
                  <p className="text-sm font-bold text-olive">₹{item.price * item.quantity}</p>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-[9px] text-stone hover:text-red-700 transition underline underline-offset-4"
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
          <div className="border-t border-stone/20 bg-sand/40 p-6 sm:p-8 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-olive/60">
                <span>Shipping</span>
                <span className="text-stone font-semibold uppercase tracking-wider text-[9px]">Complimentary</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-serif text-base text-olive/80">Estimated Total</span>
                <span className="text-2xl font-bold text-olive">₹{cartTotal}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                handleClose()
                setTimeout(() => {
                  setOrderOpen(true)
                  setStatus('')
                }, 300)
              }}
              className="w-full rounded-full bg-olive text-oatmeal py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-stone hover:text-oatmeal shadow-md active:scale-[0.99]"
            >
              Proceed to checkout
            </button>

            <p className="text-[9px] text-center text-stone/80 italic font-mono">
              Order securely processed with free global priority shipping.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
