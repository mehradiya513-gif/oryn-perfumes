export default function RefundPage() {
  return (
    <div className="bg-obsidian text-pearl min-h-screen">
      <section className="mx-auto max-w-3xl px-6 pt-32 md:pt-40 pb-28 md:pb-32">
        <span className="section-tag mb-4">Assurances</span>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6">Returns &amp; Refunds Policy</h1>
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80 mb-12">
          Last updated {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-10 text-sand text-sm leading-[1.8] rounded-3xl border border-[#1E3A5F] bg-[#0F1E35] p-8 md:p-12 shadow-card">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">1. Order Cancellations</h2>
            <p>
              Orders may be cancelled for an immediate full refund at any point before courier dispatch. Once the parcel is in transit, cancellation cannot be accommodated, though a return may be initiated upon arrival.
            </p>
          </section>

          <section className="border-t border-[#1E3A5F] pt-8">
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">2. 7-Day Unconditional Returns</h2>
            <p className="mb-3">
              Due to hygiene and cosmetic regulatory standards, we accept returns on unopened, unused flacons in original sealed packaging within 7 days of delivery.
            </p>
            <p>
              If a flacon arrives impaired or damaged, share a parcel photograph with our WhatsApp concierge within 48 hours for an instant complimentary replacement.
            </p>
          </section>

          <section className="border-t border-[#1E3A5F] pt-8">
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">3. Refund Settlement</h2>
            <p>
              Following inspection at our Mumbai atelier, approved refunds are remitted to your original payment method (or UPI account for COD orders) within 5–7 business days.
            </p>
          </section>
        </div>
      </section>
    </div>
  )
}
