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
    'w-full rounded-xl border border-[#1E3A5F] bg-[#0F1E35] px-4 py-3 text-sm text-pearl outline-none transition-colors placeholder:text-smoke focus:border-gold'

  const labelClass = 'mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] text-gold/80'

  return (
    <div className="bg-obsidian text-pearl min-h-screen">
      {/* Opening Hero */}
      <section className="shell pb-20 pt-28 md:pb-28 md:pt-36">
        <Reveal>
          <span className="section-tag mb-6">Atelier Genesis</span>
          <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-[1.1] tracking-[-0.015em] text-pearl md:text-6xl">
            A perfume house created <span className="gold-gradient-text italic">with intention.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[16px] leading-[1.8] text-sand md:text-[17.5px]">
            ORYN is an independent haute parfumerie. No archive, no borrowed heritage — only an uncompromising
            conviction of what luxury fragrance must be, and the artisanal patience to compose it properly.
          </p>
        </Reveal>
      </section>

      {/* The Brand Plate */}
      <section className="shell pb-24 md:pb-32">
        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-3xl border border-gold/30 bg-[#0F1E35] shadow-card">
            <Image
              src="/images/oryn-brand-plate.png"
              alt="The ORYN brand plate"
              fill
              sizes="(max-width: 768px) 92vw, 512px"
              className="object-cover"
            />
          </div>
          <p className="mt-5 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-gold/70">
            The ORYN Atelier Brand Plaque
          </p>
        </Reveal>
      </section>

      {/* Why ORYN Exists */}
      <section className="border-y border-gold/15 bg-[#112240]">
        <div className="shell py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <span className="section-tag mb-6">Why ORYN Exists</span>
              <h2 className="font-serif text-3xl font-semibold leading-[1.18] text-pearl md:text-5xl">
                Fragrance had surrendered to <span className="gold-gradient-text italic">noise.</span>
              </h2>
              <p className="mt-7 max-w-md text-[15px] leading-[1.8] text-sand">
                Thousands of mass synthetic releases each year. Scents engineered for a fleeting quarter,
                hyped with millions in marketing, and forgotten by the next season. We built ORYN as the antithesis:
                a focused collection, formulated with master French oils, made to be worn for decades.
              </p>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-4">
              {[
                {
                  n: 'I',
                  title: 'Composed Slowly, Never Rushed',
                  copy: 'Each extrait is built around a singular evocative premise — a mood, a memory, a precious botanical — matured until perfectly harmonized.',
                },
                {
                  n: 'II',
                  title: 'Extrait Concentration for True Intimacy',
                  copy: 'Our fragrances are dosed at up to 25% oil concentration. They become a second skin rather than an assault on a crowded room.',
                },
                {
                  n: 'III',
                  title: 'Radical Honesty & Zero Luxury Tax',
                  copy: 'We formulate in small batches. We disclose note pyramids and hold prices strictly under ₹800. That is the entire philosophy.',
                },
              ].map((item, i) => (
                <Reveal key={item.n} delay={i * 80}>
                  <div className="rounded-2xl border border-[#1E3A5F] bg-[#0F1E35] p-7 transition-all hover:border-gold/30">
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
            <span className="section-tag mb-8 block text-center justify-center">Haute Parfumerie Credo</span>
            <blockquote className="mx-auto max-w-3xl text-center font-serif text-2xl font-medium italic leading-[1.4] text-pearl md:text-4xl">
              &ldquo;A fragrance should not aggressively announce you. It should linger — in a room, in a memory,
              on a collar — long after you have departed.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Contact Concierge Form */}
      <section className="border-t border-gold/15 bg-[#112240]">
        <div className="shell py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <span className="section-tag mb-6">Concierge Dialogue</span>
              <h2 className="font-serif text-3xl font-semibold text-pearl md:text-5xl">
                Converse with <span className="gold-gradient-text italic">ORYN</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-sand">
                Inquiries regarding notes, custom allocations, or private gifting — our perfumer team reads every note
                and responds with care.
              </p>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
              <form onSubmit={handleContactSubmit} className="space-y-6 rounded-3xl border border-[#1E3A5F] bg-[#0F1E35] p-8 md:p-10 shadow-card">
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
                  <span className={labelClass}>Inquiry or Note</span>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                    placeholder="How may our atelier assist you?"
                  />
                </label>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="btn-gold w-full disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? 'Transmitting…' : 'Dispatch Message'}
                </button>

                {formStatus === 'success' && (
                  <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
                    Transmitted successfully. Our perfumer concierge will respond to your dispatch shortly.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-400">
                    Network error. Kindly re-attempt or reach us on WhatsApp.
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
