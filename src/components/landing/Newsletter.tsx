'use client'

import { useState } from 'react'
import Reveal from './Reveal'

/* ————————————————————————————————————————————————————————————————
   Newsletter — email OR WhatsApp signup, 10% first-order hook.
   Posts to the existing /api/leads endpoint (falls back to a local
   success state if the API is unreachable).
———————————————————————————————————————————————————————————————— */

const WHATSAPP_NUMBER = '919000000000' // ← replace with the real number

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
      /* Still confirm locally — the point is capturing intent */
      setStatus('done')
    }
  }

  return (
    <section id="newsletter" aria-labelledby="newsletter-heading" className="scroll-mt-20 bg-blush">
      <div className="shell py-20 text-center md:py-24">
        <Reveal>
          <p className="section-tag mb-4">Newsletter</p>
          <h2 id="newsletter-heading" className="mx-auto max-w-xl font-serif text-3xl font-semibold leading-[1.1] text-ink md:text-[2.4rem]">
            Get <span className="italic text-gold">10% off</span> your first order
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-[1.75] text-ink-soft">
            One email a month — new launches, restocks, and subscriber-only offers. No spam, ever.
          </p>

          {status === 'done' ? (
            <p className="mx-auto mt-8 max-w-md border border-ink/15 bg-ivory px-6 py-5 text-[14.5px] text-ink" role="status">
              You&rsquo;re in — check your inbox for the 10% code.
            </p>
          ) : (
            <form onSubmit={submit} className="mx-auto mt-8 grid max-w-lg gap-3 sm:grid-cols-[1fr_auto]">
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="border border-ink/20 bg-ivory px-5 py-3.5 text-[14.5px] text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-ink"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-dark disabled:opacity-60"
              >
                {status === 'sending' ? 'Joining…' : 'Get 10% off'}
              </button>

              <div className="flex items-center justify-center gap-2 sm:col-span-2">
                <span className="text-[12px] text-ink-soft">Prefer WhatsApp?</span>
                <label htmlFor="newsletter-phone" className="sr-only">WhatsApp number</label>
                <input
                  id="newsletter-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91·"
                  className="w-36 border border-ink/20 bg-ivory px-3 py-1.5 text-[13px] text-ink outline-none placeholder:text-ink-soft/50 focus:border-ink"
                />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi ORYN! Send me the 10% first-order code.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-gold pb-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-ink transition-colors hover:text-gold"
                >
                  Message us
                </a>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
