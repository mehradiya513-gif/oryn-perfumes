export default function TermsPage() {
  return (
    <div className="bg-obsidian text-pearl min-h-screen">
      <section className="mx-auto max-w-3xl px-6 pt-32 md:pt-40 pb-28 md:pb-32">
        <span className="section-tag mb-4">Governance</span>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6">Terms of Service</h1>
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80 mb-12">
          Last updated {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-10 text-sand text-sm leading-[1.8] rounded-3xl border border-white/10 bg-[#12121A] p-8 md:p-12">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">1. Terms Acceptance</h2>
            <p>
              By accessing ORYN and placing orders through our online boutique, you accept adherence to these terms and conditions and associated atelier policies.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8">
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">2. Intellectual Property</h2>
            <p>
              All trademarks, olfactory trademarks, flacon designs, brand photography, and proprietary copy remain the exclusive intellectual property of ORYN.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8">
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">3. Product Formulations &amp; Pricing</h2>
            <p>
              All prices are listed in Indian Rupees (₹) inclusive of applicable taxes. We maintain an uncompromising commitment to keep all catalog fragrances accessible under ₹800.
            </p>
          </section>
        </div>
      </section>
    </div>
  )
}
