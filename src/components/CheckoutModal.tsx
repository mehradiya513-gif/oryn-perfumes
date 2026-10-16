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
  } = useCart()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('India')
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
      setCountry(customer.country || 'India')
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
          items: cart,
          total: cartTotal,
          paymentMethod: finalPaymentMethod,
          freebies,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setOrderSuccess({
          id: data.orderId || Math.random().toString(36).substring(2, 9).toUpperCase(),
          name,
          email,
          phone,
          address,
          country,
          items: [...cart],
          total: cartTotal,
          paymentMethod: finalPaymentMethod,
          created: new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
        })
        clearCart()
        setShowUpiModal(false)
      } else {
        setStatus(data.error || 'Unable to place order. Please check details.')
      }
    } catch {
      setStatus('Network interruption. Please re-attempt.')
    } finally {
      setSubmitting(false)
    }
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
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
    'w-full bg-white border border-[#EBDCD7] rounded-xl focus:border-[#C5857B] outline-none px-4 py-3 text-sm text-[#23171B] placeholder:text-[#8D767C] transition-colors'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div ref={overlayRef} onClick={handleClose} className="absolute inset-0 bg-[#23171B]/60 backdrop-blur-md" />

      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#EBDCD7] bg-[#FAF6F5] text-[#23171B] shadow-card"
      >
        {orderSuccess ? (
          /* Confirmation */
          <div className="text-center py-14 px-8 space-y-7 max-w-xl mx-auto">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#C5857B]/40 bg-[#F7EDE9] text-[#C5857B] mx-auto">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[#C5857B] text-2xl">✦</span>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#A86359]">Order Confirmed</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#23171B]">
              Thank You for Your Patronage.
            </h2>
            <p className="text-[#5C484E] font-light leading-relaxed max-w-md mx-auto text-sm">
              Your flacon is being prepared in our Mumbai atelier. A formal dispatch confirmation
              has been relayed to your email.
            </p>
            <div className="inline-block rounded-full border border-[#C5857B]/40 bg-[#F7EDE9] px-6 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#A86359]">
              Order Reference #{orderSuccess.id}
            </div>

            <div className="text-left rounded-2xl border border-[#EBDCD7] bg-white p-6 space-y-4 text-xs font-light shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8D767C] mb-1">Recipient</p>
                  <p className="text-[#23171B] font-medium">{orderSuccess.name}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8D767C] mb-1">Contact</p>
                  <p className="text-[#23171B] font-medium">{orderSuccess.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8D767C] mb-1">Delivery Address</p>
                  <p className="text-[#23171B] font-medium whitespace-pre-wrap">
                    {orderSuccess.address}, {orderSuccess.country}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8D767C] mb-1">Settlement</p>
                  <p className="text-[#A86359] font-semibold">
                    {orderSuccess.paymentMethod === 'cod'
                      ? 'Cash on Delivery'
                      : orderSuccess.paymentMethod === 'upi'
                        ? 'UPI Payment'
                        : orderSuccess.paymentMethod}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8D767C] mb-1">Initiated On</p>
                  <p className="text-[#23171B] font-medium">{orderSuccess.created}</p>
                </div>
              </div>
            </div>

            <button type="button" onClick={handleClose} className="btn-gold w-full">
              Explore More Creations
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div className="p-8 md:p-12">
            <div className="flex items-start justify-between border-b border-[#EBDCD7] pb-6 mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#A86359] mb-1">Encrypted Checkout</p>
                <h2 className="font-serif text-3xl font-semibold text-[#23171B]">Complete Your Allocation</h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EBDCD7] text-[#8D767C] hover:border-[#C5857B] hover:text-[#A86359] transition-colors"
                aria-label="Close checkout"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Shipping Details */}
              <div className="space-y-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#A86359]">Recipient Details</p>

                <label className="block">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-[#A86359] mb-2">Full Name</span>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full legal name" className={inputClass} />
                </label>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-[#A86359] mb-2">Email</span>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com" className={inputClass} />
                  </label>
                  <label className="block">
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-[#A86359] mb-2">Mobile Phone</span>
                    <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91" className={inputClass} />
                  </label>
                </div>

                <label className="block">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-[#A86359] mb-2">Country</span>
                  <select value={country} onChange={(e) => setCountry(e.target.value)} className={`${inputClass} cursor-pointer`}>
                    {countries.map((c) => (
                      <option key={c} value={c} className="bg-white text-[#23171B]">
                        {c}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-[#A86359] mb-2">Delivery Address</span>
                  <textarea
                    required
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House/Apt, Landmark, City, State, PIN code"
                    className={`${inputClass} resize-none`}
                  />
                </label>

                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-[#A86359] mb-3">Settlement Method</span>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'cod', label: 'Cash on Delivery', desc: 'Pay courier on arrival' },
                      { id: 'upi', label: 'Instant UPI Payment', desc: 'GPay, PhonePe, Paytm' },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`rounded-xl border p-4 text-xs cursor-pointer transition-all duration-300 flex flex-col gap-1.5 ${
                          paymentMethod === method.id
                            ? 'border-[#C5857B] bg-[#F7EDE9] text-[#23171B] shadow-gold-sm'
                            : 'border-[#EBDCD7] bg-white text-[#5C484E] hover:border-[#C5857B]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#23171B]">{method.label}</span>
                          <input
                            type="radio"
                            name="checkoutPaymentMethod"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={() => setPaymentMethod(method.id)}
                            className="accent-[#C5857B]"
                          />
                        </div>
                        <span className="text-[11px] text-[#8D767C]">{method.desc}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary Column */}
              <div className="flex flex-col rounded-2xl border border-[#EBDCD7] bg-white p-6 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#A86359] mb-6">Allocation Summary</p>

                <div className="space-y-4 flex-1 overflow-y-auto max-h-60 pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 border-b border-[#EBDCD7] pb-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#23171B] truncate">{item.name.replace(/^Oryn\s/, '')}</p>
                        <p className="text-xs text-[#C5857B]">₹{item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-6 w-6 rounded-lg border border-[#EBDCD7] text-xs text-[#5C484E] hover:border-[#C5857B] hover:text-[#A86359] transition-colors flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="text-xs font-semibold w-4 text-center text-[#23171B]">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-6 w-6 rounded-lg border border-[#EBDCD7] text-xs text-[#5C484E] hover:border-[#C5857B] hover:text-[#A86359] transition-colors flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-bold text-[#23171B] w-14 text-right">₹{item.price * item.quantity}</p>
                    </div>
                  ))}

                  {freebies.map((gift) => (
                    <div key={gift.id} className="flex items-center justify-between gap-3 border-b border-[#EBDCD7] pb-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#23171B]">{gift.name}</p>
                        <p className="text-[10px] text-[#8D767C] line-clamp-1">{gift.description}</p>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider text-[#A86359]">Complimentary</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#EBDCD7] mt-6 pt-5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-[#5C484E]">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#5C484E]">
                    <span>Express Dispatch</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#A86359]">Complimentary</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#EBDCD7] text-base">
                    <span className="font-serif font-semibold text-[#23171B]">Payable Total</span>
                    <span className="font-serif font-bold text-xl text-[#23171B]">₹{cartTotal}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold w-full mt-4 disabled:opacity-50"
                  >
                    {submitting ? 'Authenticating…' : 'Confirm Order'}
                  </button>

                  {status && (
                    <p className="text-xs text-rose-600 border-l-2 border-rose-400 pl-3 pt-1 bg-rose-50 rounded-r-lg">{status}</p>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}

        {/* UPI Overlay Modal */}
        {showUpiModal && (
          <div className="absolute inset-0 z-40 bg-[#23171B]/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="rounded-3xl border border-[#EBDCD7] bg-[#FAF6F5] w-full max-w-md p-8 space-y-6 shadow-card relative text-[#23171B]">
              <button
                type="button"
                onClick={() => setShowUpiModal(false)}
                className="absolute top-5 right-5 text-[#8D767C] hover:text-[#A86359] transition-colors"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              {upiStep === 'select' ? (
                <>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#A86359] mb-1">Encrypted Gateway</p>
                    <h3 className="font-serif text-2xl font-semibold text-[#23171B]">Choose Your UPI App</h3>
                    <p className="text-xs text-[#5C484E] mt-1">To settle ₹{cartTotal}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {upiApps.map((app) => (
                      <button
                        type="button"
                        key={app.id}
                        onClick={() => {
                          setSelectedUpiApp(app.id)
                          if (app.id !== 'other') setUpiId('')
                        }}
                        className={`rounded-xl border p-3.5 text-xs text-left transition-all ${
                          selectedUpiApp === app.id
                            ? 'border-[#C5857B] bg-[#F7EDE9] text-[#A86359] shadow-gold-sm'
                            : 'border-[#EBDCD7] bg-white text-[#5C484E] hover:border-[#C5857B]/40'
                        }`}
                      >
                        {app.name}
                      </button>
                    ))}
                  </div>

                  {selectedUpiApp === 'other' && (
                    <label className="block">
                      <span className="block text-[10px] uppercase tracking-[0.2em] text-[#A86359] mb-1.5">Enter UPI ID</span>
                      <input
                        type="text"
                        placeholder="yourname@okhdfcbank"
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
                    className="btn-gold w-full disabled:opacity-50"
                  >
                    Authorize ₹{cartTotal}
                  </button>
                </>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="h-10 w-10 mx-auto border-2 border-[#EBDCD7] border-t-[#C5857B] rounded-full animate-spin" />
                  <h4 className="font-serif text-xl font-semibold text-[#23171B]">Authorizing Transaction</h4>
                  <p className="text-xs text-[#5C484E] max-w-xs mx-auto leading-relaxed">
                    Connecting to {upiApps.find((a) => a.id === selectedUpiApp)?.name || 'UPI'}.
                    Kindly approve the transaction notification on your mobile handset.
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
