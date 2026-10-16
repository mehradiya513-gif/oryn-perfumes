'use client'

import { useEffect, useState } from 'react'

/* ————————————————————————————————————————————————————————————————
   OfferBanner — Limited Curated Offer with Midnight Countdown
———————————————————————————————————————————————————————————————— */

function nextMidnightIST(): number {
  const now = new Date()
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
    <section aria-labelledby="offer-heading" className="bg-[#FAF6F5] py-16 md:py-24 relative">
      <div className="shell">
        <div className="relative overflow-hidden rounded-3xl border border-[#EBDCD7] bg-gradient-to-b from-[#F7EDE9] via-white to-[#F5EBE6] px-6 py-14 text-center md:py-20 md:px-12 shadow-card">
          
          {/* Radial Rose Aura */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E8B8B0]/25 blur-[110px]"
          />

          <div className="relative z-10">
            <span className="section-tag mb-4">Limited Allocation</span>
            
            <h2 id="offer-heading" className="mx-auto max-w-3xl font-serif text-3xl font-semibold leading-[1.15] text-[#23171B] md:text-5xl">
              Select Any 2 Fragrances, Receive an Instant <span className="gold-gradient-text italic">10% Privilege</span>
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-[1.8] text-[#5C484E]">
              Discount applies automatically at checkout. Seamlessly combinable with complimentary express delivery above ₹499 and pan-India Cash on Delivery.
            </p>

            {/* Countdown Flip Clock Boxes */}
            <div
              className="mx-auto mt-8 flex items-center justify-center gap-3 md:gap-4"
              role="timer"
              aria-label="Offer ends tonight at midnight IST"
            >
              {[
                [h, 'Hours'],
                [m, 'Minutes'],
                [s, 'Seconds'],
              ].map(([value, label]) => (
                <div key={label} className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C5857B]/40 bg-white font-serif text-2xl font-bold tabular-nums text-[#23171B] shadow-sm md:h-20 md:w-20 md:text-3xl">
                    {value}
                  </div>
                  <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A86359]">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-9">
              <button
                type="button"
                onClick={() => scrollTo('bestsellers')}
                className="btn-gold"
              >
                Curate Your Pair
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
