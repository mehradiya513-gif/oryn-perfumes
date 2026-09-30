'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useCart } from '@/context/CartContext'
import { countries } from '@/lib/countries'

const upiApps = [
  { id: 'gpay', name: 'Google Pay' },
  { id: 'phonepe', name: 'PhonePe' },
  { id: 'paytm', name: 'Paytm' },
  { id: 'bhim', name: 'BHIM UPI' },
  { id: 'amazonpay', name: 'Amazon Pay' },
  { id: 'cred', name: 'CRED Pay' },
  { id: 'mobikwik', name: 'Mobikwik' },
  { id: 'other', name: 'Other UPI ID' },
]

export default function CheckoutModal() {
  const {
    cart,
    orderOpen,
    setOrderOpen,
    cartTotal,
    clearCart,
    setOrderSuccess,
    orderSuccess,
    updateQuantity,
    customer,
    freebies,
    setAuthPromptOpen,
  } = useCart()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('United States')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [showUpiModal, setShowUpiModal] = useState(false)
  const [selectedUpiApp, setSelectedUpiApp] = useState<string | null>(null)
  const [upiId, setUpiId] = useState('')
  const [upiStep, setUpiStep] = useState<'select' | 'processing'>('select')
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState('')

  const overlayRef = useRef<HTMLDivElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (orderOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.45, delay: 0.05, ease: 'power3.out' },
      )
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [orderOpen])

  useEffect(() => {
    if (orderOpen && customer) {
      setName(customer.name || '')
      setEmail(customer.email || '')
      setPhone(customer.phone || '')
      setAddress(customer.address || '')
      setCountry(customer.country || 'United States')
    }
  }, [orderOpen, customer])

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' })
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 24,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setOrderOpen(false)
        setOrderSuccess(null)
        setStatus('')
        setShowUpiModal(false)
      },
    })
  }

  const submitOrder = async (finalPaymentMethod: string) => {
    setSubmitting(true)
    setStatus('')

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          country,
          paymentMethod: finalPaymentMethod,
          total: cartTotal,
          items: cart.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        }),
      })

      const data = await response.json()
      if (response.ok && data.order) {
        setOrderSuccess(data.order)
        clearCart()
        setName('')
        setEmail('')
        setPhone('')
        setAddress('')
      } else {
        setStatus(data.error || 'Failed to place order.')
      }
    } catch {
      setStatus('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customer) {
      setAuthPromptOpen(true)
      return
    }

    if (paymentMethod === 'upi') {
      setShowUpiModal(true)
      setUpiStep('select')
      setSelectedUpiApp(null)
      setUpiId('')
      setStatus('')
    } else {
      await submitOrder('cod')
    }
  }

  if (!orderOpen) return null

  const inputClass =
    'w-full bg-transparent border-0 border-b border-ink/25 focus:border-ink outline-none py-2.5 text-sm text-ink placeholder:text-stone/60 transition-colors'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div ref={overlayRef} onClick={handleClose} className="absolute inset-0 bg-ink/55 backdrop-blur-sm" />

      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-ivory text-ink shadow-2xl"
      >
        {orderSuccess ? (
          /* ————— Confirmation ————— */
          <div className="text-center py-14 px-8 space-y-8 max-w-xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Confirmed</p>
            <h2 className="font-serif text-3xl md:text-4xl">Thank you.</h2>
            <p className="text-ink-soft font-light leading-relaxed max-w-md mx-auto">
              Your order has been placed, and a confirmation has been sent to your email. Your
              fragrance is being prepared with care.
            </p>
            <div className="inline-block border border-ink/20 px-6 py-2.5 text-[10px] uppercase tracking-[0.25em] text-ink-soft">
              Order reference #{orderSuccess.id}
            </div>

            <div className="text-left border-t border-ink/15 pt-8 space-y-4 text-sm font-light">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-stone mb-1">Recipient</p>
                  <p>{orderSuccess.name}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-stone mb-1">Phone</p>
                  <p>{orderSuccess.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-stone mb-1">Delivering to</p>
                  <p className="whitespace-pre-wrap">
                    {orderSuccess.address}, {orderSuccess.country}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-stone mb-1">Payment</p>
                  <p>
                    {orderSuccess.paymentMethod === 'cod'
                      ? 'Cash on Delivery'
                      : orderSuccess.paymentMethod === 'upi'
                        ? 'Pay by any UPI'
                        : orderSuccess.paymentMethod}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-stone mb-1">Placed on</p>
                  <p>{orderSuccess.created}</p>
                </div>
              </div>
            </div>

            <button type="button" onClick={handleClose} className="btn-dark w-full">
              Continue exploring
            </button>
          </div>
        ) : (
          /* ————— Checkout ————— */
          <div className="p-8 md:p-12">
            <div className="flex items-start justify-between border-b border-ink/15 pb-6 mb-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">Secure checkout</p>
                <h2 className="font-serif text-3xl">Complete your order</h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="text-stone hover:text-ink transition-colors mt-1"
                aria-label="Close checkout"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Shipping */}
              <div className="space-y-7">
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone">Shipping information</p>

                <label className="block">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-stone mb-2">Full name</span>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputClass} />
                </label>

                <div className="grid sm:grid-cols-2 gap-6">
                  <label className="block">
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-stone mb-2">Email</span>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} />
                  </label>
                  <label className="block">
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-stone mb-2">Phone</span>
                    <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91" className={inputClass} />
                  </label>
                </div>

                <label className="block">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-stone mb-2">Country</span>
                  <select value={country} onChange={(e) => setCountry(e.target.value)} className={`${inputClass} cursor-pointer`}>
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-stone mb-2">Address</span>
                  <textarea
                    required
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, apartment, city, state, ZIP"
                    className={`${inputClass} resize-none`}
                  />
                </label>

                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-stone mb-4">Payment</span>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'cod', label: 'Cash on Delivery' },
                      { id: 'upi', label: 'Pay by any UPI' },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`border px-4 py-3.5 text-xs cursor-pointer transition-colors duration-300 flex items-center gap-3 ${
                          paymentMethod === method.id
                            ? 'border-ink text-ink'
                            : 'border-ink/20 text-ink-soft hover:border-ink/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="checkoutPaymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          className="sr-only"
                        />
                        <span
                          className={`h-2 w-2 rounded-full border transition-colors ${
                            paymentMethod === method.id ? 'bg-gold border-gold' : 'border-stone'
                          }`}
                        />
                        {method.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="flex flex-col">
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone mb-6">Order summary</p>

                <div className="space-y-5 flex-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{item.name.replace(/^Oryn\s/, '')}</p>
                        <p className="text-xs font-light text-stone mt-0.5">₹{item.price} each</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-6 w-6 border border-ink/20 text-xs hover:border-ink transition-colors flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="text-xs w-4 text-center font-light">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-6 w-6 border border-ink/20 text-xs hover:border-ink transition-colors flex items-center justify-center"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm w-16 text-right font-light">₹{item.price * item.quantity}</p>
                    </div>
                  ))}

                  {freebies.map((gift) => (
                    <div key={gift.id} className="flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{gift.name}</p>
                        <p className="text-xs font-light text-stone mt-0.5 line-clamp-1">{gift.description}</p>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gold">With our compliments</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-ink/15 mt-8 pt-6 space-y-3">
                  <div className="flex items-center justify-between text-sm font-light text-ink-soft">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-light text-ink-soft">
                    <span>Shipping</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gold">Complimentary</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-ink/15">
                    <span className="font-serif text-lg">Total</span>
                    <span className="font-serif text-2xl">₹{cartTotal}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-dark w-full mt-4 disabled:opacity-50"
                  >
                    {submitting ? 'Placing order…' : 'Place order'}
                  </button>

                  {status && (
                    <p className="text-xs text-ink-soft border-l-2 border-gold pl-4 pt-1">{status}</p>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ————— UPI selector ————— */}
        {showUpiModal && (
          <div className="absolute inset-0 z-40 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-ivory w-full max-w-md p-8 md:p-10 space-y-8 shadow-2xl relative text-ink my-auto">
              <button
                type="button"
                onClick={() => setShowUpiModal(false)}
                className="absolute top-5 right-5 text-stone hover:text-ink transition-colors"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              {upiStep === 'select' ? (
                <>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">Secure UPI checkout</p>
                    <h3 className="font-serif text-2xl mb-1">Select your UPI app</h3>
                    <p className="text-sm font-light text-ink-soft">
                      To pay ₹{cartTotal}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {upiApps.map((app) => (
                      <button
                        type="button"
                        key={app.id}
                        onClick={() => {
                          setSelectedUpiApp(app.id)
                          if (app.id !== 'other') setUpiId('')
                        }}
                        className={`border px-4 py-3.5 text-xs text-left transition-colors duration-300 ${
                          selectedUpiApp === app.id
                            ? 'border-ink text-ink'
                            : 'border-ink/20 text-ink-soft hover:border-ink/40'
                        }`}
                      >
                        {app.name}
                      </button>
                    ))}
                  </div>

                  {selectedUpiApp === 'other' && (
                    <label className="block">
                      <span className="block text-[10px] uppercase tracking-[0.2em] text-stone mb-2">UPI ID</span>
                      <input
                        type="text"
                        placeholder="name@bank"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className={inputClass}
                      />
                    </label>
                  )}

                  <button
                    type="button"
                    disabled={submitting || !selectedUpiApp || (selectedUpiApp === 'other' && !upiId.includes('@'))}
                    onClick={async () => {
                      setUpiStep('processing')
                      setTimeout(async () => {
                        const appName = upiApps.find((a) => a.id === selectedUpiApp)?.name || 'UPI'
                        const methodLabel = selectedUpiApp === 'other' ? `UPI (${upiId})` : `UPI - ${appName}`
                        await submitOrder(methodLabel)
                      }, 2500)
                    }}
                    className="btn-dark w-full disabled:opacity-50"
                  >
                    Pay ₹{cartTotal}
                  </button>
                </>
              ) : (
                <div className="py-10 text-center space-y-5">
                  <div className="h-10 w-10 mx-auto border-2 border-ink/15 border-t-gold rounded-full animate-spin" />
                  <h4 className="font-serif text-xl">Authorizing</h4>
                  <p className="text-sm font-light text-ink-soft max-w-xs mx-auto leading-relaxed">
                    Connecting to{' '}
                    {upiApps.find((a) => a.id === selectedUpiApp)?.name || 'UPI'}. Please approve
                    the payment request on your device.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
