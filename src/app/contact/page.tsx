'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setFormStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setFormStatus('error')
      }
    } catch (err) {
      setFormStatus('error')
    }
  }

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
          
          <form onSubmit={handleContactSubmit} className="space-y-4 max-w-lg mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Name" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full rounded-xl border border-stone/30 bg-oatmeal px-4 py-3 text-xs text-olive outline-none focus:border-olive/60 transition"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full rounded-xl border border-stone/30 bg-oatmeal px-4 py-3 text-xs text-olive outline-none focus:border-olive/60 transition"
              />
            </div>
            <input 
              type="tel" 
              placeholder="Phone Number (Optional)" 
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              className="w-full rounded-xl border border-stone/30 bg-oatmeal px-4 py-3 text-xs text-olive outline-none focus:border-olive/60 transition"
            />
            <textarea 
              placeholder="Your Message" 
              rows={4}
              required
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              className="w-full rounded-xl border border-stone/30 bg-oatmeal px-4 py-3 text-xs text-olive outline-none focus:border-olive/60 transition resize-none"
            ></textarea>
            
            <button 
              type="submit" 
              disabled={formStatus === 'submitting'}
              className="w-full rounded-full bg-olive text-oatmeal py-3.5 text-[10px] font-bold uppercase tracking-wider font-mono hover:bg-stone transition disabled:opacity-50"
            >
              {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
            
            {formStatus === 'success' && (
              <p className="text-emerald-700 text-xs text-center font-bold bg-emerald-50/50 p-2 rounded-xl border border-emerald-200">
                ✓ Message sent successfully! We will contact you soon.
              </p>
            )}
            {formStatus === 'error' && (
              <p className="text-red-700 text-xs text-center font-bold bg-red-50/50 p-2 rounded-xl border border-red-200">
                ⚠️ Failed to send message. Please try again.
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  )
}
