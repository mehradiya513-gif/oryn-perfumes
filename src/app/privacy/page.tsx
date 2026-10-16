export default function PrivacyPage() {
  return (
    <div className="bg-obsidian text-pearl min-h-screen">
      <section className="mx-auto max-w-3xl px-6 pt-32 md:pt-40 pb-28 md:pb-32">
        <span className="section-tag mb-4">Integrity</span>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6">Privacy Standards</h1>
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80 mb-12">
          Last updated {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-10 text-sand text-sm leading-[1.8] rounded-3xl border border-white/10 bg-[#12121A] p-8 md:p-12">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">1. Information We Collect</h2>
            <p className="mb-3">
              At ORYN, preserving our patrons&rsquo; privacy is paramount. We solely capture information required to safely dispatch your fragrance, process encrypted settlements, and communicate dispatch notifications.
            </p>
            <p>
              We do not sell, rent, or trade your personal data with third-party advertisers under any circumstance.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8">
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">2. Transaction Security</h2>
            <p>
              Payment data processed via UPI, RuPay, or card networks is tokenized through 256-bit SSL encrypted financial conduits. No confidential card credentials or UPI PINs are ever retained on our systems.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8">
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">3. Cookies &amp; Preferences</h2>
            <p>
              We utilize functional session cookies solely to preserve your shopping bag selections and maintain seamless cart persistence while exploring our collection.
            </p>
          </section>
        </div>
      </section>
    </div>
  )
}
