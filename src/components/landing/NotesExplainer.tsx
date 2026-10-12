'use client'

import Reveal from './Reveal'

/* ————————————————————————————————————————————————————————————————
   NotesExplainer — the fragrance pyramid: top, heart, base.
   Static copy + icons; the example row uses Arabian Oud.
———————————————————————————————————————————————————————————————— */

const stages = [
  {
    label: 'Top Notes',
    when: 'First 15 minutes',
    copy: 'The opening impression — bright citrus, spices, and freshness you smell immediately.',
    example: 'Damask rose · saffron · crushed spices',
    icon: (
      <path d="M12 3c2.5 3.5 6 5.5 6 9.5a6 6 0 0 1-12 0C6 8.5 9.5 6.5 12 3Zm-2.5 9.5c0 1.4 1.1 2.5 2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: 'Heart Notes',
    when: '30 min – 2 hours',
    copy: 'The character of the fragrance — florals and warmth that bloom as the top settles.',
    example: 'Deep oud · patchouli · jasmine',
    icon: (
      <path d="M12 21C7 17 3.5 13.7 3.5 9.8 3.5 7.2 5.5 5 8 5c1.6 0 3.1.8 4 2 .9-1.2 2.4-2 4-2 2.5 0 4.5 2.2 4.5 4.8 0 3.9-3.5 7.2-8.5 11.2Z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: 'Base Notes',
    when: '2 – 10 hours',
    copy: 'What stays with you — deep woods, ambers, and musks that linger on skin and clothes.',
    example: 'Warm amber · smoked oakwood · vetiver',
    icon: (
      <path d="M12 3v18M12 3c-2.8 2.8-2.8 5.4 0 8.2M12 7.5c2.8 2.8 2.8 5.4 0 8.2M8 21h8" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
]

export default function NotesExplainer() {
  return (
    <section id="notes" aria-labelledby="notes-heading" className="scroll-mt-20 bg-cream">
      <div className="shell py-20 md:py-28">
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <p className="section-tag mb-5">How Fragrance Works</p>
          <h2 id="notes-heading" className="font-serif text-3xl font-semibold leading-[1.1] text-ink md:text-[2.6rem]">
            A scent unfolds in <span className="italic">three acts.</span>
          </h2>
        </Reveal>

        <ol className="grid gap-4 md:grid-cols-3 md:gap-5">
          {stages.map((stage, i) => (
            <Reveal key={stage.label} delay={i * 100} className="h-full">
              <li className="flex h-full flex-col border border-ink/10 bg-ivory p-7 md:p-8">
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                    {stage.icon}
                  </svg>
                </span>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-xl font-semibold text-ink">{stage.label}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft">
                    {stage.when}
                  </span>
                </div>
                <p className="mt-3 text-[14.5px] leading-[1.75] text-ink-soft">{stage.copy}</p>
                <p className="mt-auto pt-5 text-[12px] font-semibold uppercase tracking-[0.15em] text-gold">
                  {stage.example}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
