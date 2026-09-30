export default function TermsPage() {
  return (
    <div className="bg-ivory text-ink">
      <section className="mx-auto max-w-3xl px-6 pt-40 md:pt-48 pb-28 md:pb-32">
        <p className="section-tag">Legal</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-10">Terms &amp; Conditions</h1>
        <p className="text-[10px] uppercase tracking-[0.25em] text-stone mb-14">
          Last updated {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-12 text-ink-soft font-light leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">1. Introduction</h2>
            <p>
              Welcome to Oryn. By accessing this website, you accept these terms and conditions.
              Do not continue to use Oryn if you do not agree to all of the terms stated on this
              page.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">2. Intellectual Property</h2>
            <p>
              Unless otherwise stated, Oryn and/or its licensors own the intellectual property
              rights for all material on Oryn. All intellectual property rights are reserved. You
              may access this site for your own personal use, subject to the restrictions set in
              these terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">3. Restrictions</h2>
            <p className="mb-4">You are specifically restricted from all of the following:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Publishing any website material in any other media</li>
              <li>Selling, sublicensing and/or otherwise commercializing any website material</li>
              <li>Using this website in any way that is or may be damaging to this website</li>
            </ul>
          </section>
        </div>
      </section>
    </div>
  )
}
