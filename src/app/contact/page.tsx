export default function ContactPage() {
  return (
    <div className="bg-obsidian text-pearl min-h-screen">
      <section className="shell pb-24 pt-28 md:pb-32 md:pt-36">
        <div className="max-w-2xl">
          <span className="section-tag mb-6">Concierge</span>
          <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-[-0.015em] text-pearl md:text-6xl">
            Talk to <span className="gold-gradient-text italic">ORYN</span>
          </h1>
          <p className="mt-8 text-[16px] leading-[1.8] text-sand md:text-[17.5px]">
            A question about notes, a special request, or an atelier inquiry — our perfumery team reads every dispatch and answers personally.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-gold/20 bg-[#12121A] p-6 md:p-10 shadow-card">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdfK82gOEqk26t393lPCH1G8PRjAg60u3f1bAjgTdg1vWiySw/viewform?embedded=true"
            width="100%"
            height="720"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Oryn contact form"
            className="w-full rounded-2xl"
          >
            Loading…
          </iframe>
        </div>
      </section>
    </div>
  )
}
