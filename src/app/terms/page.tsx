export default function TermsPage() {
  return (
    <main className="min-h-screen bg-transparent pb-32 text-olive">
      <section className="mx-auto max-w-3xl px-6 py-24 sm:px-10">
        <span className="mono-tag text-[9px] font-bold text-stone mb-4 block">Legal</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-olive mb-8 tracking-wide">Terms & Conditions</h1>
        
        <div className="space-y-8 text-sm text-olive/80 leading-relaxed font-sans">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-light text-olive">1. Introduction</h2>
            <p>Welcome to ORYN. By accessing this website, we assume you accept these terms and conditions. Do not continue to use ORYN if you do not agree to take all of the terms and conditions stated on this page.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-light text-olive">2. Intellectual Property</h2>
            <p>Unless otherwise stated, ORYN and/or its licensors own the intellectual property rights for all material on ORYN. All intellectual property rights are reserved. You may access this from ORYN for your own personal use subjected to restrictions set in these terms and conditions.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-light text-olive">3. Restrictions</h2>
            <p>You are specifically restricted from all of the following:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Publishing any website material in any other media</li>
              <li>Selling, sublicensing and/or otherwise commercializing any website material</li>
              <li>Using this website in any way that is or may be damaging to this website</li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  )
}
