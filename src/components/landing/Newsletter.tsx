'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

/* ————————————————————————————————————————————————————————————————
   Newsletter — Private Fragrance Circle & 10% Welcome Privilege
———————————————————————————————————————————————————————————————— */

const WHATSAPP_NUMBER = '919000000000'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter signup',
          email: email.trim(),
          phone: phone.trim(),
          message: '10% first-order offer',
        }),
      })
      setStatus('done')
    } catch {
      setStatus('done')
    }
  }

  return (
    <section id="newsletter" aria-labelledby="newsletter-heading" className="scroll-mt-20 bg-[#FAF6F5] py-20 md:py-28 relative">
      <div className="shell">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[#EBDCD7] bg-gradient-to-b from-[#F7EDE9] via-white to-[#F5EBE6] p-8 md:p-16 text-center shadow-card">
          
          {/* Subtle central rose aura */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E8B8B0]/25 blur-[100px]"
          />

          <div className="relative z-10">
            <span className="section-tag mb-4">Private Society</span>
            
            <h2 id="newsletter-heading" className="font-serif text-3xl font-semibold leading-[1.1] text-[#23171B] md:text-5xl">
              Join The <span className="gold-gradient-text italic">Fragrance Circle</span>
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-[1.8] text-[#5C484E]">
              Receive a private 10% welcome privilege toward your first order, plus exclusive early allocations of seasonal batch extraits.
            </p>

            {status === 'done' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto mt-8 max-w-md rounded-2xl border border-[#C5857B]/40 bg-[#F7EDE9] p-6 text-sm text-[#23171B]"
                role="status"
              >
                <span className="text-[#A86359] text-lg block mb-1">✦</span>
                <p className="font-serif text-lg font-semibold text-[#23171B]">You are formally initiated.</p>
                <p className="text-xs text-[#5C484E] mt-1">
                  Check your inbox for your exclusive 10% privilege invitation code.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="mx-auto mt-8 max-w-lg space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <label className="sr-only" htmlFor="newsletter-email">Email address</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address…"
                    className="flex-1 rounded-2xl border border-[#EBDCD7] bg-white px-5 py-3.5 text-sm text-[#23171B] placeholder:text-[#8D767C] outline-none transition-colors focus:border-[#C5857B]"
                  />
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-gold !py-3.5 whitespace-nowrap"
                  >
                    {status === 'sending' ? 'Initiating…' : 'Claim 10% Off'}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 pt-2 text-xs text-[#8D767C]">
                  <span>Prefer WhatsApp dispatch?</span>
                  <label htmlFor="newsletter-phone" className="sr-only">WhatsApp number</label>
                  <input
                    id="newsletter-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 Mobile…"
                    className="w-32 rounded-xl border border-[#EBDCD7] bg-white px-2.5 py-1 text-xs text-[#23171B] placeholder:text-[#8D767C] outline-none focus:border-[#C5857B]"
                  />
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi ORYN! Send me the 10% first-order privilege code.')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="border-b border-[#C5857B] text-[10px] font-bold uppercase tracking-wider text-[#A86359] hover:text-[#23171B] transition-colors"
                  >
                    Dispatch Privileges
                  </a>
                </div>
              </form>
            )}

            <div className="mt-8 flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8D767C]">
              <span>✦ Pure French Oils</span>
              <span>✦ Zero Spam Guarantee</span>
              <span>✦ Monthly Releases Only</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
