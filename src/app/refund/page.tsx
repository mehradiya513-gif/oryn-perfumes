export default function RefundPage() {
  return (
    <main className="min-h-screen bg-transparent pb-32 text-olive">
      <section className="mx-auto max-w-3xl px-6 py-24 sm:px-10">
        <span className="mono-tag text-[9px] font-bold text-stone mb-4 block">Orders</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-olive mb-8 tracking-wide">Cancellation & Refund Policy</h1>
        
        <div className="space-y-8 text-sm text-olive/80 leading-relaxed font-sans">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-light text-olive">1. Order Cancellations</h2>
            <p>You may cancel your order for a full refund at any time before it has been processed for shipping. Once an order has been dispatched, it cannot be cancelled, but you may initiate a return upon receiving the item.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-light text-olive">2. Returns</h2>
            <p>Due to the intimate nature of our products and hygiene standards, we can only accept returns on unopened, unused fragrances in their original, sealed packaging within 14 days of delivery.</p>
            <p>If you wish to return an item, please contact our support team first to authorize the return.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-light text-olive">3. Refunds</h2>
            <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
            <p>If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within 5-10 business days.</p>
          </section>
        </div>
      </section>
    </main>
  )
}
