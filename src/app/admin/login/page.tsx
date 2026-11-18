'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SellerLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [needsSetup, setNeedsSetup] = useState(false)

  // Verify status with server on mount
  useEffect(() => {
    fetch('/api/admin/auth')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          router.replace('/admin')
        } else if (!data.hasAdmin) {
          setNeedsSetup(true)
        }
      })
      .catch(() => {
        // Fallback
      })
      .finally(() => {
        setIsChecking(false)
      })
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    const u = username.trim().toLowerCase()
    const p = password.trim()

    if (!u || !p) {
      setLoginError('Please enter both username and password.')
      return
    }

    if (needsSetup) {
      if (p.length < 6) {
        setLoginError('Password must be at least 6 characters.')
        return
      }
      if (p !== confirmPassword.trim()) {
        setLoginError('Passwords do not match.')
        return
      }
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: u,
          password: p,
          action: needsSetup ? 'setup' : 'login',
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        localStorage.setItem('oryn_admin_user', u)
        router.push('/admin')
      } else {
        if (data.needsSetup) {
          setNeedsSetup(true)
        }
        setLoginError(data.error || 'Authentication failed. Please verify credentials.')
      }
    } catch {
      setLoginError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center space-y-4 text-[#F5F2EB]">
        <div className="h-8 w-8 border-2 border-[#262626] border-t-[#C9A84C] rounded-full animate-spin" />
        <p className="text-xs text-[#78716C] uppercase tracking-widest font-mono">Loading…</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F2EB] flex items-center justify-center px-4 relative overflow-hidden py-12">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C9A84C]/10 blur-[130px] pointer-events-none" />

      <div className="relative w-full max-w-md rounded-3xl border border-[#262626] bg-[#121212]/95 backdrop-blur-xl p-8 sm:p-10 shadow-card space-y-7 z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto h-14 w-14 rounded-full border border-[#C9A84C]/40 bg-gradient-to-b from-[#C9A84C]/20 to-transparent flex items-center justify-center p-2 text-[#C9A84C] shadow-sm">
            <Image
              src="/images/oryn-emblem-gold.png"
              alt="ORYN Logo"
              width={34}
              height={34}
              className="object-contain"
            />
          </div>
          <div>
            <span className="inline-block rounded-full bg-[#161616] border border-[#C9A84C]/30 px-3 py-0.5 text-[9px] font-bold uppercase tracking-[0.25em] text-[#C9A84C] mb-2">
              {needsSetup ? 'First-Time Setup' : 'Admin Portal'}
            </span>
            <h1 className="font-serif text-3xl font-semibold tracking-wide text-[#F5F2EB]">
              {needsSetup ? 'Create Admin Account' : 'Admin Login'}
            </h1>
            <p className="text-xs text-[#78716C] mt-1.5 leading-relaxed">
              {needsSetup
                ? 'Choose your administrator username and password to secure this portal.'
                : 'Restricted administrative area. Admin sign-in only.'}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#262626] to-transparent" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] mb-2">
              {needsSetup ? 'Choose Admin Username' : 'Admin Username'}
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => { setUsername(e.target.value); setLoginError('') }}
              placeholder={needsSetup ? 'e.g. Diya or Admin' : 'Enter username'}
              autoComplete="username"
              className="w-full rounded-xl border border-[#262626] bg-[#0A0A0A] px-4 py-3 text-sm text-[#F5F2EB] placeholder:text-[#78716C] outline-none focus:border-[#C9A84C] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] mb-2">
              {needsSetup ? 'Create Master Password (min 6 chars)' : 'Master Password'}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setLoginError('') }}
              placeholder="••••••••"
              autoComplete={needsSetup ? 'new-password' : 'current-password'}
              className="w-full rounded-xl border border-[#262626] bg-[#0A0A0A] px-4 py-3 text-sm text-[#F5F2EB] placeholder:text-[#78716C] outline-none focus:border-[#C9A84C] transition-colors"
            />
          </div>

          {needsSetup && (
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] mb-2">
                Confirm Master Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setLoginError('') }}
                placeholder="••••••••"
                autoComplete="new-password"
                className="w-full rounded-xl border border-[#262626] bg-[#0A0A0A] px-4 py-3 text-sm text-[#F5F2EB] placeholder:text-[#78716C] outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>
          )}

          {loginError && (
            <div className="rounded-xl border border-red-900/60 bg-red-950/40 p-3 text-xs text-red-300 text-center leading-relaxed">
              ⚠️ {loginError}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-gold w-full mt-2 !py-3.5 text-center disabled:opacity-50 cursor-pointer shadow-gold-sm"
          >
            {isLoading
              ? 'Securing Session…'
              : needsSetup
              ? 'Save & Initialize Admin Access'
              : 'Sign In to Admin Panel'}
          </button>
        </form>

        <div className="pt-2 text-center border-t border-[#262626]">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="text-[11px] font-semibold text-[#78716C] hover:text-[#C9A84C] transition-colors uppercase tracking-wider"
          >
            ← Return to Boutique
          </button>
        </div>

      </div>
    </main>
  )
}
