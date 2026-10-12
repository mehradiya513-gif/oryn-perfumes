'use client'

import { useEffect, useState } from 'react'

/* ————————————————————————————————————————————————————————————————
   OfferBanner — "Buy 2, Get 10% Off" with a countdown to midnight
   IST. Pure client timer; no server dependency.
———————————————————————————————————————————————————————————————— */

/* Countdown ends at the next 00:00 IST, so it never appears expired */
function nextMidnightIST(): number {
  const now = new Date()
  /* IST = UTC+5:30 */
  const istNow = new Date(now.getTime() + (5.5 * 60 - -now.getTimezoneOffset()) * 60000)
  istNow.setHours(24, 0, 0, 0)
  return istNow.getTime()
}

export default function OfferBanner() {
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    const target = nextMidnightIST()
    const tick = () => {
      const diff = Math.max(0, target - Date.now())
      const h = Math.floor(diff / 3_600_000)
      const m = Math.floor((diff % 3_600_000) / 60_000)
      const s = Math.floor((diff % 60_000) / 1000)
      setRemaining(h * 3600 + m * 60 + s)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')
  const h = remaining === null ? '--' : pad(Math.floor(remaining / 3600))
  const m = remaining === null ? '--' : pad(Math.floor((remaining % 3600) / 60))
  const s = remaining === null ? '--' : pad(remaining % 60)

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section aria-labelledby="offer-heading" className="bg-charcoal text-ivory">
      <div className="grain-dark relative overflow-hidden">
        <div className="shell relative z-10 py-16 text-center md:py-20">
          <p className="section-tag mb-5">Limited Offer</p>
          <h2 id="offer-heading" className="mx-auto max-w-2xl font-serif text-3xl font-semibold leading-[1.1] md:text-[2.6rem]">
            Buy 2, get <span className="italic text-gold">10% off</span> — today only
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-[1.75] text-ivory/70">
            Add any two fragrances to your cart and the discount applies automatically. Stacks with
            free shipping above ₹499.
          </p>

          {/* Countdown */}
          <div
            className="mx-auto mt-8 flex items-center justify-center gap-2 md:gap-3"
            role="timer"
            aria-label="Offer ends tonight at midnight IST"
          >
            {[
              [h, 'hrs'],
              [m, 'min'],
              [s, 'sec'],
            ].map(([value, label]) => (
              <span key={label} className="flex w-16 flex-col items-center md:w-20">
                <span className="w-full border border-gold/50 bg-ivory/5 py-2.5 font-serif text-2xl font-semibold tabular-nums md:text-3xl">
                  {value}
                </span>
                <span className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ivory/50">
                  {label}
                </span>
              </span>
            ))}
          </div>

          <button type="button" onClick={() => scrollTo('bestsellers')} className="btn-light mt-9">
            Pick your two
          </button>
        </div>
      </div>
    </section>
  )
}
