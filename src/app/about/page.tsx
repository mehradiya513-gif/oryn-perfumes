'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    if (!heroRef.current) return

    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
    )

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return
      gsap.fromTo(
        ref,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.2 + index * 0.15, ease: 'power2.out' },
      )
    })
  }, [])

  const spiritValues = [
    {
      title: 'Ethical Sourcing',
      description: 'We partner directly with family farms and local cooperatives to harvest organic ingredients under fair trade guidelines.',
      icon: '🌱',
    },
    {
      title: 'Timeless Chemistry',
      description: 'Our formulations reject fast-fashion trends, focusing on robust base structures that mature beautifully over the years.',
      icon: '⏳',
    },
    {
      title: 'Intimate Projection',
      description: 'We design scents that sit warm and close to the skin, creating a personal signature rather than a loud, synthetic trail.',
      icon: '✨',
    },
    {
      title: 'Zero-Waste Harvest',
      description: 'From local stem-distillation to recyclable crystal glass, we prioritize carbon-conscious production.',
      icon: '♻️',
    },
  ]

  return (
    <main className="min-h-screen bg-transparent pb-32 text-olive">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="mx-auto max-w-5xl px-6 py-24 sm:px-10 text-center"
      >
        <div className="space-y-6">
          <div>
            <span className="mono-tag text-[9px] font-bold text-stone mb-4 block">Our Heritage</span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light text-olive mb-6 tracking-wide lowercase italic">
              perfumes with <span className="text-stone font-normal">purpose</span>
            </h1>
            <p className="text-xs sm:text-sm text-olive/80 max-w-3xl mx-auto leading-relaxed font-sans">
              ORYN fragrances are created as a quiet protest against temporary trends. We believe that fine perfume should be a permanent investment—carrying organic soul, ecological integrity, and a personal depth that grows more cherished with each passing year.
            </p>
          </div>
        </div>
      </section>

      {/* The Concept */}
      <section
        ref={(el) => { sectionRefs.current[0] = el }}
        className="mx-auto max-w-6xl px-6 sm:px-10 py-12"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl font-light text-olive tracking-wide">Patience & Quality</h2>
              <p className="text-xs sm:text-sm text-olive/75 leading-relaxed font-sans">
                At ORYN, we honor slow maturation. Instead of rushing synthetic chemicals to the bottling line, we allow our ethically harvested ingredients to settle together in cold-matured batches. This process yields a refined depth that synthetic shortcuts simply cannot replicate.
              </p>
              <p className="text-xs sm:text-sm text-olive/80 leading-relaxed font-sans">
                Each fragrance is formulated using raw natural extracts—like wild hinoki cypress, organic Damask rose, and vetiver—allowing the scent to develop, breathe, and merge with your personal body chemistry.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {spiritValues.map((value, index) => (
                <div
                  key={index}
                  className="rounded-3xl bg-sand/65 border border-stone/20 p-5 hover:bg-sand transition duration-300 shadow-xs"
                >
                  <div className="text-3xl mb-3 text-stone">{value.icon}</div>
                  <h4 className="font-serif font-semibold text-olive text-sm mb-1">{value.title}</h4>
                  <p className="text-[11px] text-olive/75 leading-relaxed font-sans">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:pl-10">
            <div className="relative w-full h-[400px] rounded-wabi-1 overflow-hidden bg-sand border border-stone/20 p-8 flex items-center justify-center text-center shadow-soft">
              <div className="space-y-4 text-center px-6">
                <p className="text-5xl text-stone">🌱</p>
                <h3 className="font-serif text-2xl font-light text-olive tracking-wide uppercase">Sustainably Slowed</h3>
                <p className="text-olive/75 text-xs leading-relaxed max-w-xs font-sans">
                  Batch-aged under strict temperature guidelines to preserve the molecular integrity of our delicate, zero-waste botanical extracts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why ORYN? Accent block */}
      <section
        ref={(el) => { sectionRefs.current[1] = el }}
        className="mx-auto max-w-6xl px-6 sm:px-10 py-16 bg-sand/65 rounded-wabi-2 text-olive my-16 border border-stone/20 relative overflow-hidden shadow-soft"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-stone/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="mono-tag text-[9px] font-bold text-stone">Brand Philosophy</span>
            <h2 className="font-serif text-3xl font-light tracking-wide text-olive">Why ORYN?</h2>
            <p className="text-olive/75 text-xs sm:text-sm leading-relaxed font-sans">
              ORYN represents a conscious escape from hyper-consumption, centering on carbon-conscious harvesting, slow batch aging, and timeless signatures.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Durable Signatures',
                description: 'We construct fragrances that grow with you. By using dense natural woods and resins, ORYN scents cling gracefully to the skin for hours.',
              },
              {
                title: 'Ethical Supply',
                description: 'We source ingredients from cooperatives that employ fair wages, sustainable crop rotation, and zero-waste distillation.',
              },
              {
                title: 'Fewer but Better',
                description: 'We reject the constant launch of trendy, temporary scents, focusing instead on perfecting a small registry of permanent signatures.',
              },
            ].map((item, index) => (
              <div key={index} className="space-y-3 z-0">
                <div className="h-10 w-10 rounded-full bg-sand flex items-center justify-center border border-stone/30">
                  <div className="h-4 w-4 rounded-full bg-stone/40" />
                </div>
                <h3 className="font-serif text-lg font-medium text-olive">{item.title}</h3>
                <p className="text-olive/75 text-xs leading-relaxed font-sans">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        ref={(el) => { sectionRefs.current[2] = el }}
        className="mx-auto max-w-6xl px-6 sm:px-10 py-12"
      >
        <div className="rounded-wabi-3 bg-sand/65 border border-stone/20 p-10 sm:p-14 text-center space-y-6 shadow-soft">
          <span className="mono-tag text-[9px] font-bold text-stone">Experience ORYN</span>
          <h2 className="font-serif text-3xl font-light text-olive tracking-wide lowercase italic">unveil your signature</h2>
          <p className="text-olive/75 max-w-xl mx-auto text-xs leading-relaxed font-sans">
            Step into our catalog. Discover our batch-matured signature registry and find a scent you will cherish for years.
          </p>
          <a
            href="/"
            className="inline-block rounded-full bg-olive text-oatmeal px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest font-mono hover:bg-stone hover:-translate-y-0.5 active:translate-y-0 transition duration-300 shadow-xs"
          >
            Discover the Scents
          </a>
        </div>
      </section>
    </main>
  )
}
