export default function RefundPage() {
  return (
    <div className="bg-obsidian text-pearl min-h-screen">
      <section className="mx-auto max-w-3xl px-6 pt-32 md:pt-40 pb-28 md:pb-32">
        <span className="section-tag mb-4">Assurances</span>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6">Cancellation, Damages &amp; Refunds Policy</h1>
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80 mb-12">
          Last updated {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-10 text-sand text-sm leading-[1.8] rounded-3xl border border-[#262626] bg-[#161616] p-8 md:p-12 shadow-card">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">1. Order Cancellations</h2>
            <p>
              Orders may be cancelled for a full refund at any point before courier dispatch. Once the parcel is in transit, a cancellation cannot be accommodated.
            </p>
          </section>

          <section className="border-t border-[#262626] pt-8">
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">2. No Returns or Exchanges</h2>
            <p className="mb-3">
              Due to hygiene and cosmetic regulatory standards, we do not accept returns or exchanges of any flacon once it has been dispatched.
            </p>
            <p>
              If a flacon arrives impaired or leaking, share a parcel photograph with our WhatsApp concierge within 48 hours of delivery for an instant complimentary replacement.
            </p>
          </section>

          <section className="border-t border-[#262626] pt-8">
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">3. Refund Settlement</h2>
            <p>
              Refund requests are honoured only for pre-dispatch cancellations. Once your cancellation is confirmed, the refund is remitted to your original payment method (or UPI account for COD orders) within 5–7 business days.
            </p>
            <p>
              In the rare event an item is found to be defective or counterfeit upon verified inspection at our Mumbai atelier, a remedy will be arranged with our concierge team.
            </p>
          </section>
        </div>
      </section>
    </div>
  )
}
