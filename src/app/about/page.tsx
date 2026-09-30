'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

/* Gentle reveal, consistent with the homepage */
function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add('is-visible'), delay)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

export default function AboutPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setFormStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setFormStatus('error')
      }
    } catch (err) {
      setFormStatus('error')
    }
  }

  return (
    <div className="bg-ivory text-ink">
      {/* Opening — quiet, typographic */}
      <section className="mx-auto max-w-3xl px-6 pt-40 md:pt-52 pb-20 md:pb-28 text-center">
        <Reveal>
          <p className="section-tag">Our Story</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.12] mb-8">
            A house that begins
            <br />
            <span className="italic">with intention.</span>
          </h1>
          <p className="text-ink-soft font-light leading-relaxed text-base md:text-lg">
            Oryn is a new fragrance house. No archive, no heritage to lean on — only a clear idea
            of what fragrance should be, and the patience to make it properly.
          </p>
        </Reveal>
      </section>

      {/* The mark — the rose-gold Oryn plaque, cropped to the mark itself */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-24 md:pb-32">
        <Reveal>
          <div className="relative aspect-[20/21] max-w-xl mx-auto overflow-hidden">
            <Image
              src="/images/oryn-plaque.jpg"
              alt="The Oryn rose-gold mark"
              fill
              sizes="(max-width: 768px) 92vw, 576px"
              className="object-cover"
            />
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-stone text-center">
            The Oryn mark, as it appears on every bottle
          </p>
        </Reveal>
      </section>

      {/* Why Oryn exists */}
      <section className="bg-ivory-deep border-y border-ink/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="section-tag">Why Oryn Exists</p>
              <h2 className="font-serif text-3xl md:text-4xl leading-[1.2] mb-8">
                Fragrance had become
                <span className="italic"> noise.</span>
              </h2>
              <p className="text-ink-soft font-light leading-relaxed max-w-md">
                Thousands of launches a year. Scents designed for a season and forgotten by the
                next. We started Oryn because we believed there was room for the opposite: a
                small collection, composed with care, meant to be worn for years.
              </p>
            </Reveal>

            <div className="lg:col-span-7">
              {[
                {
                  n: 'I',
                  title: 'Composed, not manufactured',
                  copy: 'Each fragrance is built around a single clear idea — a mood, a material, a memory — and refined until nothing is accidental.',
                },
                {
                  n: 'II',
                  title: 'Concentrated to be worn, not noticed from across a room',
                  copy: 'Our fragrances sit close to the skin. They are meant for the person wearing them, and the people who get close.',
                },
                {
                  n: 'III',
                  title: 'Honest by design',
                  copy: 'We make six fragrances. We say what is in them, what they cost, and why. That is the whole story — there is no other version of it.',
                },
              ].map((item, i) => (
                <Reveal key={item.n} delay={i * 60}>
                  <div className="flex gap-8 md:gap-12 py-9 border-t border-ink/15 last:border-b">
                    <span className="font-serif text-sm text-gold pt-1.5 w-8 shrink-0">{item.n}</span>
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl mb-3">{item.title}</h3>
                      <p className="text-ink-soft font-light leading-relaxed max-w-lg">{item.copy}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What we believe — pull-quote section */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-3xl px-6 py-24 md:py-36 text-center">
          <Reveal>
            <p className="section-tag">What We Believe</p>
            <blockquote className="font-serif text-2xl md:text-4xl leading-[1.35] italic">
              &ldquo;A fragrance should not announce you. It should remain —
              in a room, in a memory, on a collar — after you have gone.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Contact — direct, human */}
      <section className="bg-sand border-t border-ink/10">
        <div className="mx-auto max-w-2xl px-6 py-24 md:py-32">
          <Reveal>
            <p className="section-tag">Write to Us</p>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Talk to Oryn</h2>
            <p className="text-ink-soft font-light leading-relaxed mb-12 max-w-lg">
              A question about the fragrances, a note, a beginning — we read everything and answer
              personally.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <form onSubmit={handleContactSubmit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <label className="block">
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-stone mb-3">Name</span>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-0 border-b border-ink/25 focus:border-ink outline-none py-2.5 text-ink placeholder:text-stone/60 transition-colors"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-stone mb-3">Email</span>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-0 border-b border-ink/25 focus:border-ink outline-none py-2.5 text-ink placeholder:text-stone/60 transition-colors"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="block">
                <span className="block text-[10px] uppercase tracking-[0.25em] text-stone mb-3">
                  Phone <span className="normal-case tracking-normal text-stone/70">(optional)</span>
                </span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent border-0 border-b border-ink/25 focus:border-ink outline-none py-2.5 text-ink placeholder:text-stone/60 transition-colors"
                  placeholder="+91"
                />
              </label>

              <label className="block">
                <span className="block text-[10px] uppercase tracking-[0.25em] text-stone mb-3">Message</span>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-0 border-b border-ink/25 focus:border-ink outline-none py-2.5 text-ink placeholder:text-stone/60 resize-none transition-colors"
                  placeholder="What would you like to know?"
                />
              </label>

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="btn-dark w-full sm:w-auto disabled:opacity-50"
              >
                {formStatus === 'submitting' ? 'Sending…' : 'Send message'}
              </button>

              {formStatus === 'success' && (
                <p className="text-sm text-ink-soft border-l-2 border-gold pl-4">
                  Received — thank you. We will reply personally, and soon.
                </p>
              )}
              {formStatus === 'error' && (
                <p className="text-sm text-ink-soft border-l-2 border-gold pl-4">
                  Something went wrong. Please try again in a moment.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
