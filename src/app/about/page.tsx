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
    } catch {
      setFormStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-xl border border-[#262626] bg-[#161616] px-4 py-3 text-sm text-pearl outline-none transition-colors placeholder:text-smoke focus:border-gold'

  const labelClass = 'mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] text-gold/80'

  return (
    <div className="bg-obsidian text-pearl min-h-screen">
      {/* Opening Hero */}
      <section className="shell pb-20 pt-28 md:pb-28 md:pt-36">
        <Reveal>
          <span className="section-tag mb-6">Our Story</span>
          <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-[1.1] tracking-[-0.015em] text-pearl md:text-6xl">
            Luxury perfume created <span className="gold-gradient-text italic">with care.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[16px] leading-[1.8] text-sand md:text-[17.5px]">
            ORYN is an independent Indian fragrance brand. We believe great perfumes should be long-lasting, beautifully made, and affordable for everyone to wear every day.
          </p>
        </Reveal>
      </section>

      {/* The Brand Plate */}
      <section className="shell pb-24 md:pb-32">
        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-3xl border border-gold/30 bg-[#161616] shadow-card">
            <Image
              src="/images/oryn-brand-plate.png"
              alt="The ORYN brand plate"
              fill
              sizes="(max-width: 768px) 92vw, 512px"
              className="object-cover"
            />
          </div>
          <p className="mt-5 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-gold/70">
            The ORYN Brand Emblem
          </p>
        </Reveal>
      </section>

      {/* Why ORYN Exists */}
      <section className="border-y border-gold/15 bg-[#121212]">
        <div className="shell py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <span className="section-tag mb-6">Why ORYN Exists</span>
              <h2 className="font-serif text-3xl font-semibold leading-[1.18] text-pearl md:text-5xl">
                Perfume should not cost a <span className="gold-gradient-text italic">fortune.</span>
              </h2>
              <p className="mt-7 max-w-md text-[15px] leading-[1.8] text-sand">
                Most big perfume brands spend huge amounts of money on celebrity endorsements and luxury malls,
                then pass those costs onto you. We do things differently: fine French perfume oils, clean formulas,
                and direct prices under ₹800.
              </p>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-4">
              {[
                {
                  n: 'I',
                  title: 'Carefully Crafted Scents',
                  copy: 'Every fragrance is made with fine French oils and matured carefully until the scent is smooth, rich, and well-balanced.',
                },
                {
                  n: 'II',
                  title: 'High 25% Oil Concentration',
                  copy: 'Our perfumes carry a high concentration of fragrance oils. They easily last 8–12 hours on skin and clothes without fading.',
                },
                {
                  n: 'III',
                  title: 'Honest Prices Under ₹800',
                  copy: 'We bottle in small batches, share all fragrance notes clearly, and keep every single bottle under ₹800 with zero middleman fees.',
                },
              ].map((item, i) => (
                <Reveal key={item.n} delay={i * 80}>
                  <div className="rounded-2xl border border-[#262626] bg-[#161616] p-7 transition-all hover:border-gold/30">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-serif text-lg font-bold text-gold">{item.n}</span>
                      <h3 className="font-serif text-xl font-semibold text-pearl">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-[1.8] text-sand pl-7">
                      {item.copy}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="bg-obsidian">
        <div className="shell py-24 md:py-36">
          <Reveal>
            <span className="section-tag mb-8 block text-center justify-center">Our Philosophy</span>
            <blockquote className="mx-auto max-w-3xl text-center font-serif text-2xl font-medium italic leading-[1.4] text-pearl md:text-4xl">
              &ldquo;A great perfume should never be loud or overpowering. It should leave a pleasant, memorable scent that people remember.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Contact Form */}
      <section className="border-t border-gold/15 bg-[#121212]">
        <div className="shell py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <span className="section-tag mb-6">Get in Touch</span>
              <h2 className="font-serif text-3xl font-semibold text-pearl md:text-5xl">
                Send Us a <span className="gold-gradient-text italic">Message</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-sand">
                Have a question about our perfumes or need assistance with your order? Send us a message and our team will get back to you quickly.
              </p>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
              <form onSubmit={handleContactSubmit} className="space-y-6 rounded-3xl border border-[#262626] bg-[#161616] p-8 md:p-10 shadow-card">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className={labelClass}>Your Name</span>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                      placeholder="Full name"
                    />
                  </label>
                  <label className="block">
                    <span className={labelClass}>Email Address</span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                      placeholder="you@domain.com"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className={labelClass}>Phone Contact (Optional)</span>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass}
                    placeholder="+91 Mobile"
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
                    placeholder="How can we help you?"
                  />
                </label>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="btn-gold w-full disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? 'Sending…' : 'Send Message'}
                </button>

                {formStatus === 'success' && (
                  <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
                    Message sent successfully! Our team will get back to you shortly.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-400">
                    Something went wrong. Please try again or message us directly on WhatsApp.
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
