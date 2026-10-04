'use client'

import { useState } from 'react'
import Image from 'next/image'
import Reveal from '@/components/Reveal'

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

  const inputClass =
    'w-full border-0 border-b border-ink/25 bg-transparent py-2.5 text-[15px] text-ink outline-none transition-colors placeholder:text-stone/70 focus:border-ink'

  const labelClass = 'mb-3 block text-[10px] font-bold uppercase tracking-[0.25em] text-stone'

  return (
    <div className="bg-ivory text-ink">
      {/* Opening */}
      <section className="shell pb-20 pt-32 md:pb-28 md:pt-44">
        <Reveal>
          <p className="section-tag mb-6">Our Story</p>
          <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-[1.1] tracking-[-0.015em] text-ink md:text-6xl">
            A house that begins <span className="italic">with intention.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[16px] leading-[1.8] text-ink-soft md:text-[17px]">
            Oryn is a new fragrance house. No archive, no heritage to lean on — only a clear idea of
            what fragrance should be, and the patience to make it properly.
          </p>
        </Reveal>
      </section>

      {/* The mark */}
      <section className="shell pb-24 md:pb-32">
        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden bg-beige">
            <Image
              src="/images/oryn-brand-plate.png"
              alt="The Oryn brand plate"
              fill
              sizes="(max-width: 768px) 92vw, 576px"
              className="object-cover"
            />
          </div>
          <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-stone">
            The first Oryn brand plate
          </p>
        </Reveal>
      </section>

      {/* Why Oryn exists */}
      <section className="bg-cream">
        <div className="shell py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="section-tag mb-6">Why Oryn Exists</p>
              <h2 className="font-serif text-3xl font-semibold leading-[1.18] tracking-[-0.01em] text-ink md:text-[2.4rem]">
                Fragrance had become <span className="italic">noise.</span>
              </h2>
              <p className="mt-8 max-w-md text-[15.5px] leading-[1.8] text-ink-soft">
                Thousands of launches a year. Scents designed for a season and forgotten by the
                next. We started Oryn because we believed there was room for the opposite: a small
                collection, composed with care, meant to be worn for years.
              </p>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              {[
                {
                  n: 'I',
                  title: 'Composed, not manufactured',
                  copy: 'Each fragrance is built around a single clear idea — a mood, a material, a memory — and refined until nothing is accidental.',
                },
                {
                  n: 'II',
                  title: 'Made to be worn, not noticed from across a room',
                  copy: 'Our fragrances sit close to the skin. They are meant for the person wearing them, and the people who get close.',
                },
                {
                  n: 'III',
                  title: 'Honest by design',
                  copy: 'We make six fragrances. We say what is in them, what they cost, and why. That is the whole story — there is no other version of it.',
                },
              ].map((item, i) => (
                <Reveal key={item.n} delay={i * 80}>
                  <div
                    className={`flex gap-8 py-9 md:gap-12 ${i === 0 ? 'border-t border-ink/15' : ''} border-b border-ink/15`}
                  >
                    <span className="w-8 shrink-0 pt-1.5 font-serif text-sm text-gold">{item.n}</span>
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-ink md:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-lg text-[15px] leading-[1.8] text-ink-soft">
                        {item.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="bg-ivory">
        <div className="shell py-24 md:py-36">
          <Reveal>
            <p className="section-tag mb-10 text-center">What We Believe</p>
            <blockquote className="mx-auto max-w-3xl text-center font-serif text-2xl font-medium italic leading-[1.4] text-ink md:text-[2.1rem]">
              &ldquo;A fragrance should not announce you. It should remain — in a room, in a memory,
              on a collar — after you have gone.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Write to us */}
      <section className="bg-blush">
        <div className="shell py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="section-tag mb-6">Write to Us</p>
              <h2 className="font-serif text-3xl font-semibold text-ink md:text-[2.4rem]">
                Talk to Oryn
              </h2>
              <p className="mt-6 max-w-md text-[15.5px] leading-[1.8] text-ink-soft">
                A question about the fragrances, a note, a beginning — we read everything and answer
                personally.
              </p>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
              <form onSubmit={handleContactSubmit} className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <label className="block">
                    <span className={labelClass}>Name</span>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block">
                    <span className={labelClass}>Email</span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className={labelClass}>
                    Phone <span className="normal-case tracking-normal text-stone/70">(optional)</span>
                  </span>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass}
                    placeholder="+91"
                  />
                </label>

                <label className="block">
                  <span className={labelClass}>Message</span>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                    placeholder="What would you like to know?"
                  />
                </label>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="btn-dark w-full disabled:opacity-50 sm:w-auto"
                >
                  {formStatus === 'submitting' ? 'Sending…' : 'Send message'}
                </button>

                {formStatus === 'success' && (
                  <p className="border-l-2 border-gold pl-4 text-sm leading-relaxed text-ink-soft">
                    Received — thank you. We will reply personally, and soon.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className="border-l-2 border-gold pl-4 text-sm leading-relaxed text-ink-soft">
                    Something went wrong. Please try again in a moment.
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
