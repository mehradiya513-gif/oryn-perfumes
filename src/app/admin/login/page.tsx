'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'

export default function SellerLoginPage() {
  const router = useRouter()
  const [sellerUser, setSellerUser] = useState('')
  const [sellerPass, setSellerPass] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const cardRef = useRef<HTMLDivElement | null>(null)
  const usernameInputRef = useRef<HTMLInputElement | null>(null)
  const passwordInputRef = useRef<HTMLInputElement | null>(null)

  // Check if already logged in → redirect to dashboard
  useEffect(() => {
    const isLogged = localStorage.getItem('oryn_seller_logged_in')
    if (isLogged === 'true') {
      router.replace('/admin')
    }
  }, [router])

  // Check for the secret URL query parameter on mount and set session cookie
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const secret = params.get('secret')
    if (secret === 'oryn-owner-key') {
      document.cookie = 'oryn_admin_session=true; path=/; max-age=86400; SameSite=Lax'
    }
  }, [])

  // Entrance animation
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' },
      )
    }
    gsap.fromTo(
      '.login-field',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', delay: 0.3 },
    )
  }, [])

  const handleSellerLogin = () => {
    const user = (sellerUser || usernameInputRef.current?.value || '').trim()
    const pass = (sellerPass || passwordInputRef.current?.value || '').trim()
    const userLower = user.toLowerCase()

    if (!user || !pass) {
      setLoginError('Please enter both username and password.')
      return
    }

    // Check if trying to use a customer email
    const customersRaw = localStorage.getItem('oryn_customers')
    if (customersRaw) {
      try {
        const customersList = JSON.parse(customersRaw)
        const isCustomer = customersList.some((c: { email: string }) => c.email.toLowerCase() === userLower)
        if (isCustomer) {
          setLoginError('Access Denied. This credential belongs to a Customer Account. Please use seller credentials.')
          return
        }
      } catch {
        // ignore
      }
    }

    setIsLoading(true)
    // Simulate brief auth delay for UX
    setTimeout(() => {
      const storedUser = (localStorage.getItem('oryn_seller_username') || 'seller').toLowerCase()
      const storedPass = localStorage.getItem('oryn_seller_password') || 'oryn123'

      if (userLower === storedUser && pass === storedPass) {
        localStorage.setItem('oryn_seller_logged_in', 'true')
        document.cookie = 'oryn_admin_session=true; path=/; max-age=86400; SameSite=Lax'
        router.push('/admin')
      } else {
        setLoginError('Invalid credentials. Please check your username and password.')
        setIsLoading(false)
        gsap.fromTo(
          cardRef.current,
          { x: -8 },
          { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)', repeat: 3, yoyo: true },
        )
      }
    }, 600)
  }

  return (
    <main className="min-h-screen bg-oatmeal flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient background blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-stone/8 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[35vw] h-[35vw] rounded-full bg-sand/60 blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-stone/4 blur-[120px] pointer-events-none" />

      <div
        ref={cardRef}
        className="relative w-full max-w-md rounded-[2.5rem] border border-stone/20 bg-sand/65 backdrop-blur-sm p-10 shadow-2xl space-y-8 overflow-hidden"
        style={{ opacity: 0 }}
      >
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-stone/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-sand/80 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-4 relative">
          <div className="mx-auto h-14 w-14 rounded-full bg-oatmeal border border-stone/30 flex items-center justify-center text-2xl shadow-sm">
            ⚜️
          </div>
          <div>
            <p className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-stone mb-2">
              ORYN Administration
            </p>
            <h1 className="font-serif text-4xl font-light tracking-wide text-olive lowercase italic">
              seller portal
            </h1>
            <p className="text-[10px] font-mono text-stone/70 mt-2 tracking-wider">
              Restricted access — authorised personnel only
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-stone/20" />
          <span className="text-[9px] font-mono font-bold text-stone/50 uppercase tracking-widest">sign in</span>
          <div className="flex-1 h-px bg-stone/20" />
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          <label className="login-field block text-[10px] font-bold uppercase tracking-[0.2em] text-olive/80 font-mono" style={{ opacity: 0 }}>
            Username
            <input
              ref={usernameInputRef}
              type="text"
              value={sellerUser}
              onChange={(e) => { setSellerUser(e.target.value); setLoginError('') }}
              className="mt-2.5 w-full rounded-2xl border border-stone/30 bg-oatmeal/80 px-5 py-3.5 text-sm text-olive placeholder:text-stone/40 outline-none transition-all duration-300 focus:border-olive/60 focus:ring-4 focus:ring-stone/10 focus:bg-oatmeal"
              placeholder="Enter username"
              autoComplete="username"
              onKeyDown={(e) => e.key === 'Enter' && handleSellerLogin()}
            />
          </label>

          <label className="login-field block text-[10px] font-bold uppercase tracking-[0.2em] text-olive/80 font-mono" style={{ opacity: 0 }}>
            Password
            <input
              ref={passwordInputRef}
              type="password"
              value={sellerPass}
              onChange={(e) => { setSellerPass(e.target.value); setLoginError('') }}
              className="mt-2.5 w-full rounded-2xl border border-stone/30 bg-oatmeal/80 px-5 py-3.5 text-sm text-olive placeholder:text-stone/40 outline-none transition-all duration-300 focus:border-olive/60 focus:ring-4 focus:ring-stone/10 focus:bg-oatmeal"
              placeholder="••••••••"
              autoComplete="current-password"
              onKeyDown={(e) => e.key === 'Enter' && handleSellerLogin()}
            />
          </label>

          {/* Error Message */}
          {loginError && (
            <div className="login-field rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-[11px] font-semibold text-red-800 text-center leading-relaxed">
              ⚠️ {loginError}
            </div>
          )}

          {/* Login Button */}
          <button
            type="button"
            onClick={handleSellerLogin}
            disabled={isLoading}
            className="login-field w-full mt-2 rounded-full bg-olive text-oatmeal py-4 text-[11px] font-bold uppercase tracking-[0.25em] font-mono transition-all duration-300 hover:bg-stone hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
            style={{ opacity: 0 }}
          >
            {isLoading ? (
              <>
                <span className="inline-block w-3.5 h-3.5 border-2 border-oatmeal/40 border-t-oatmeal rounded-full animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                ⚜️ Enter Portal
              </>
            )}
          </button>

          {/* Back to store */}
          <button
            type="button"
            onClick={() => router.push('/')}
            className="login-field w-full rounded-full border border-stone/30 bg-transparent text-stone/80 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] font-mono transition-all duration-300 hover:bg-stone/10 hover:text-olive hover:border-stone/50"
            style={{ opacity: 0 }}
          >
            ← Return to Store
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="login-field pt-6 border-t border-stone/20 text-center space-y-2" style={{ opacity: 0 }}>
          <p className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] text-stone/60">
            Demo Credentials
          </p>
          <div className="inline-flex items-center gap-3 bg-oatmeal/70 border border-stone/20 rounded-2xl px-5 py-2.5">
            <span className="text-[11px] font-mono text-olive/70">
              <span className="font-bold text-olive">seller</span>
              {' '}·{' '}
              <span className="font-bold text-olive">oryn123</span>
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
