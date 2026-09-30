export default function RefundPage() {
  return (
    <div className="bg-ivory text-ink">
      <section className="mx-auto max-w-3xl px-6 pt-40 md:pt-48 pb-28 md:pb-32">
        <p className="section-tag">Orders</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-10">Cancellation &amp; Refund Policy</h1>
        <p className="text-[10px] uppercase tracking-[0.25em] text-stone mb-14">
          Last updated {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-12 text-ink-soft font-light leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">1. Order Cancellations</h2>
            <p>
              You may cancel your order for a full refund at any time before it has been
              processed for shipping. Once an order has been dispatched, it cannot be cancelled,
              but you may initiate a return upon receiving the item.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">2. Returns</h2>
            <p className="mb-4">
              Due to the intimate nature of our products and hygiene standards, we can only
              accept returns on unopened, unused fragrances in their original, sealed packaging
              within 14 days of delivery.
            </p>
            <p>
              If you wish to return an item, please contact our support team first to authorize
              the return.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">3. Refunds</h2>
            <p className="mb-4">
              Once your return is received and inspected, we will send you an email to notify you
              that we have received your returned item, and notify you of the approval or
              rejection of your refund.
            </p>
            <p>
              If approved, your refund will be processed, and a credit will automatically be
              applied to your original method of payment, within 5-10 business days.
            </p>
          </section>
        </div>
      </section>
    </div>
  )
}
