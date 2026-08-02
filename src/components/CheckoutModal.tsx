'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useCart } from '@/context/CartContext'
import { countries } from '@/lib/countries'

const upiApps = [
  { id: 'gpay', name: 'Google Pay', icon: '🤖' },
  { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
  { id: 'paytm', name: 'Paytm', icon: '🔵' },
  { id: 'bhim', name: 'BHIM UPI', icon: '🇮🇳' },
  { id: 'amazonpay', name: 'Amazon Pay', icon: '🟠' },
  { id: 'cred', name: 'CRED Pay', icon: '🖤' },
  { id: 'mobikwik', name: 'Mobikwik', icon: '⚡' },
  { id: 'other', name: 'Other UPI ID', icon: '✍️' },
]

export default function CheckoutModal() {
  const { cart, orderOpen, setOrderOpen, cartTotal, clearCart, setOrderSuccess, orderSuccess, updateQuantity, customer, freebies, setAuthPromptOpen } = useCart()

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
  const [acknowledgedFreebie, setAcknowledgedFreebie] = useState(false)

  const overlayRef = useRef<HTMLDivElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)

  // Toggle body scroll and animate
  useEffect(() => {
    if (orderOpen) {
      setAcknowledgedFreebie(false)
      document.body.style.overflow = 'hidden'
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, delay: 0.05, ease: 'power3.out' },
      )
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [orderOpen])

  // Pre-fill shipping info for logged-in customer
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
      scale: 0.95,
      y: 20,
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
        // Reset inputs
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="absolute inset-0 bg-black/45 backdrop-blur-md"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] border border-stone/20 bg-oatmeal p-6 sm:p-10 shadow-2xl text-olive scrollbar-thin scrollbar-thumb-stone/30"
      >
        {/* Order Success View */}
        {orderSuccess ? (
          <div className="text-center py-6 space-y-6 max-w-xl mx-auto">
            <div className="mx-auto h-16 w-16 rounded-full bg-emerald-50 border border-emerald-400 flex items-center justify-center text-emerald-800 text-3xl font-light">
              ✓
            </div>
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.25em] font-mono font-bold uppercase text-stone">Confirmed</span>
              <h2 className="font-serif text-3xl font-bold tracking-wide text-olive">Order Placed Successfully</h2>
              <p className="text-xs text-olive/80 max-w-md mx-auto leading-relaxed">
                Thank you for choosing ORYN. A confirmation receipt has been sent to your email. Your luxury fragrance experience is underway.
              </p>
              <div className="inline-block mt-3 px-4 py-1.5 rounded-full border border-stone/25 bg-sand text-xs font-semibold text-olive tracking-widest uppercase">
                Order Reference #{orderSuccess.id}
              </div>
            </div>

            {/* Receipt Summary */}
            <div className="rounded-2xl border border-stone/20 bg-sand/65 p-5 text-left text-xs space-y-4">
              <h3 className="text-[9px] font-mono font-bold uppercase tracking-wider text-stone border-b border-stone/10 pb-2">Delivery Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-stone/85">Recipient</p>
                  <p className="font-semibold text-olive mt-0.5">{orderSuccess.name}</p>
                </div>
                <div>
                  <p className="text-stone/85">Phone</p>
                  <p className="font-semibold text-olive mt-0.5">{orderSuccess.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-stone/85">Destination Address</p>
                  <p className="font-semibold text-olive mt-0.5 whitespace-pre-wrap">{orderSuccess.address}, {orderSuccess.country}</p>
                </div>
                <div>
                  <p className="text-stone/85">Payment Gateway</p>
                  <p className="font-semibold text-olive mt-0.5">
                    {orderSuccess.paymentMethod === 'cod' ? 'Cash on Delivery' : orderSuccess.paymentMethod === 'upi' ? 'Pay by any UPI' : orderSuccess.paymentMethod}
                  </p>
                </div>
                <div>
                  <p className="text-stone/85">Placed On</p>
                  <p className="font-semibold text-olive mt-0.5">{orderSuccess.created}</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full rounded-full bg-olive text-oatmeal py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-stone hover:text-oatmeal shadow-md"
            >
              Continue exploring
            </button>
          </div>
        ) : (
          /* Normal Checkout View */
          <div>
            {/* Header */}
            <div className="mb-8 flex items-center justify-between border-b border-stone/20 pb-5">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] font-bold text-stone block mb-1">Secure Checkout</span>
                <h2 className="font-serif text-3xl font-bold tracking-wide text-olive">Complete Your Order</h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full border border-stone/30 bg-sand p-2.5 text-olive/80 transition hover:bg-stone/10 hover:text-olive shadow-xs h-9 w-9 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Content Form */}
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Form Input Side */}
              <div className="space-y-5">
                <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone mb-2">Shipping Information</h3>
                
                <label className="block text-xs font-medium text-olive/80">
                  Full Name
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="mt-2 w-full rounded-xl border border-stone/30 bg-sand/65 px-4 py-3 text-sm text-olive placeholder:text-stone/50 outline-none transition focus:border-olive focus:ring-4 focus:ring-stone/10"
                    required
                  />
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block text-xs font-medium text-olive/80">
                    Email Address
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="mt-2 w-full rounded-xl border border-stone/30 bg-sand/65 px-4 py-3 text-sm text-olive placeholder:text-stone/50 outline-none transition focus:border-olive focus:ring-4 focus:ring-stone/10"
                      required
                    />
                  </label>

                  <label className="block text-xs font-medium text-olive/80">
                    Phone Number
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="mt-2 w-full rounded-xl border border-stone/30 bg-sand/65 px-4 py-3 text-sm text-olive placeholder:text-stone/50 outline-none transition focus:border-olive focus:ring-4 focus:ring-stone/10"
                      required
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <label className="block text-xs font-medium text-olive/80">
                    Country
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-stone/30 bg-sand/65 px-4 py-3 text-sm text-olive outline-none transition focus:border-olive focus:ring-4 focus:ring-stone/10 cursor-pointer"
                    >
                      {countries.map((c) => (
                        <option key={c} value={c} className="bg-oatmeal text-olive">
                          {c}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="block text-xs font-medium text-olive/80">
                  Detailed Address
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street Address, App/Suite, City, State, ZIP Code"
                    rows={3}
                    className="mt-2 w-full rounded-xl border border-stone/30 bg-sand/65 px-4 py-3 text-sm text-olive placeholder:text-stone/50 outline-none transition focus:border-olive focus:ring-4 focus:ring-stone/10 resize-none"
                    required
                  />
                </label>

                {/* Payment Selection */}
                <div className="pt-2">
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-stone mb-3">Select Payment Method</span>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
                      { id: 'upi', label: 'Pay by any UPI', icon: '📱' }
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition select-none ${
                          paymentMethod === method.id
                            ? 'border-olive bg-sand text-olive font-bold'
                            : 'border-stone/20 hover:border-stone/40 bg-sand/35 text-olive/70'
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
                        <span className="text-xl">{method.icon}</span>
                        <span className="text-xs">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary & Checkout Button Side */}
              <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-stone/25 pt-8 md:pt-0 md:pl-10 text-olive">
                <div className="space-y-5">
                  <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone">Order Summary</h3>
                  <div className="max-h-[220px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-stone/30">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-sand/45 border border-stone/20"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-olive truncate">{item.name}</p>
                          <p className="text-xs text-stone font-medium">₹{item.price} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-6 w-6 rounded-md bg-sand border border-stone/30 hover:border-stone text-olive/80 hover:text-olive flex items-center justify-center text-xs font-bold transition"
                          >
                            -
                          </button>
                          <span className="text-xs font-semibold w-5 text-center text-olive/90">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-6 w-6 rounded-md bg-sand border border-stone/30 hover:border-stone text-olive/80 hover:text-olive flex items-center justify-center text-xs font-bold transition"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right min-w-[60px]">
                          <p className="text-sm font-bold text-olive">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}

                    {freebies.map((gift) => (
                      <div
                        key={gift.id}
                        className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-stone/5 border border-stone/20"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-olive truncate">{gift.name}</p>
                          <p className="text-xs text-stone/70 font-medium line-clamp-1">{gift.description}</p>
                        </div>
                        <div className="text-right min-w-[60px] pr-2">
                          <span className="text-xs font-mono font-bold uppercase text-stone">Free</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-stone/25 mt-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-olive/75">
                    <span>Subtotal</span>
                    <span className="font-semibold text-olive">₹{cartTotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-olive/75">
                    <span>Shipping</span>
                    <span className="text-stone font-semibold uppercase tracking-wider text-[10px]">Complimentary</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-stone/25">
                    <span className="font-serif text-base text-olive/85">Total Price</span>
                    <span className="text-3xl font-extrabold text-olive">₹{cartTotal}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-5 rounded-full bg-olive text-oatmeal hover:bg-stone hover:text-oatmeal disabled:bg-stone/20 disabled:text-olive/40 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-md flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    {submitting ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-olive border-t-transparent" />
                    ) : (
                      <>
                        <span>🔒</span> Place Order
                      </>
                    )}
                  </button>
                  {status ? (
                    <p className="text-xs font-semibold text-red-800 bg-red-50 border border-red-200 rounded-lg p-2.5 text-center mt-2.5">
                      ⚠️ {status}
                    </p>
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        )}

        {/* UPI Application Selector Popup */}
        {showUpiModal && (
          <div className="absolute inset-0 z-40 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 rounded-[2rem] overflow-y-auto">
            <div className="bg-oatmeal border border-stone/20 rounded-[2rem] w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl relative text-olive">
              <button
                type="button"
                onClick={() => setShowUpiModal(false)}
                className="absolute top-4 right-4 rounded-full border border-stone/30 bg-sand hover:bg-stone/10 p-2 text-olive transition h-8 w-8 flex items-center justify-center text-xs"
              >
                ✕
              </button>

              {upiStep === 'select' ? (
                <div className="space-y-6">
                  <div className="text-center space-y-1">
                    <span className="text-[9px] tracking-[0.25em] font-mono font-bold uppercase text-stone">Secure UPI Checkout</span>
                    <h3 className="font-serif text-2xl font-bold tracking-wide text-olive">Select UPI App</h3>
                    <p className="text-[11px] text-stone/85">Choose your preferred UPI application to pay <span className="font-semibold text-olive">₹{cartTotal}</span></p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 max-h-[250px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-stone/30">
                    {upiApps.map((app) => (
                      <div
                        key={app.id}
                        onClick={() => {
                          setSelectedUpiApp(app.id)
                          if (app.id !== 'other') {
                            setUpiId('')
                          }
                        }}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border cursor-pointer select-none transition duration-300 ${
                          selectedUpiApp === app.id
                            ? 'border-olive bg-sand shadow-sm ring-2 ring-stone/10 font-bold'
                            : 'border-stone/15 hover:border-stone/30 bg-sand/35 hover:scale-[1.02]'
                        }`}
                      >
                        <span className="text-2xl mb-1">{app.icon}</span>
                        <span className="text-xs text-olive">{app.name}</span>
                      </div>
                    ))}
                  </div>

                  {selectedUpiApp === 'other' && (
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-stone">Enter UPI ID</label>
                      <input
                        type="text"
                        placeholder="e.g. username@bank"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full rounded-xl border border-stone/30 bg-sand/65 px-4 py-3 text-sm text-olive placeholder:text-stone/45 outline-none transition focus:border-olive focus:ring-4 focus:ring-stone/10"
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={submitting || !selectedUpiApp || (selectedUpiApp === 'other' && !upiId.includes('@'))}
                    onClick={async () => {
                      setUpiStep('processing')
                      // Simulate processing delay, then submit order
                      setTimeout(async () => {
                        const appName = upiApps.find(a => a.id === selectedUpiApp)?.name || 'UPI'
                        const methodLabel = selectedUpiApp === 'other' ? `UPI (${upiId})` : `UPI - ${appName}`
                        await submitOrder(methodLabel)
                      }, 2500)
                    }}
                    className="w-full rounded-full bg-olive text-oatmeal hover:bg-stone hover:text-oatmeal disabled:bg-stone/20 disabled:text-olive/40 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition duration-300 shadow-md flex items-center justify-center gap-2"
                  >
                    Pay ₹{cartTotal}
                  </button>
                </div>
              ) : (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-olive/20 opacity-75" />
                    <div className="h-16 w-16 rounded-full border-[3px] border-olive/20 border-t-olive animate-spin flex items-center justify-center text-xl">
                      🛡️
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-xl font-bold tracking-wide text-olive">Security authorization</h4>
                    <p className="text-xs text-stone/85 max-w-xs leading-relaxed mx-auto">
                      Connecting securely to {upiApps.find(a => a.id === selectedUpiApp)?.name || 'UPI'} Gateway...
                    </p>
                    <p className="text-[10px] text-stone font-mono animate-pulse">
                      Please approve the payment request on your mobile app.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
