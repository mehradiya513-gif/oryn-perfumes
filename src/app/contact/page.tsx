export default function ContactPage() {
  return (
    <main className="min-h-screen bg-transparent pb-32 text-olive">
      <section className="mx-auto max-w-4xl px-6 sm:px-10 py-24">
        <div className="bg-sand/40 border border-stone/20 rounded-wabi-1 p-8 sm:p-12 shadow-soft">
          <div className="text-center mb-8 space-y-3">
            <span className="mono-tag text-[9px] font-bold text-stone">Get in Touch</span>
            <h1 className="font-serif text-3xl font-light text-olive tracking-wide">Contact ORYN</h1>
            <p className="text-olive/75 text-xs font-sans max-w-md mx-auto">
              Have a question about our batch process, or interested in a wholesale partnership? Leave your details below and our team will get back to you.
            </p>
          </div>
          
          <div className="flex justify-center w-full">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSdfK82gOEqk26t393lPCH1G8PRjAg60u3f1bAjgTdg1vWiySw/viewform?embedded=true" 
              width="100%" 
              height="800" 
              frameBorder="0" 
              marginHeight={0} 
              marginWidth={0}
              className="max-w-2xl bg-transparent"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </section>
    </main>
  )
}
