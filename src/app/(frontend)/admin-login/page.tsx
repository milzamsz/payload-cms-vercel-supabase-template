'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { TwoFactorVerify } from '@/components/auth/TwoFactorVerify'
import type { TwoFactorMethod } from '@/utilities/twoFactorAuth'

type LoginStep = 'credentials' | '2fa-verification'

export default function AdminLoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<LoginStep>('credentials')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [twoFactorMethod, setTwoFactorMethod] = useState<TwoFactorMethod>(null)
  const [pendingToken, setPendingToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/2fa/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      if (data.requires2FA) {
        setPendingToken(data.pendingToken)
        setTwoFactorMethod(data.method)
        setStep('2fa-verification')
      } else if (data.success && data.token) {
        // Store token and redirect to admin
        document.cookie = `payload-token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}`
        localStorage.setItem('payload-token', data.token)
        router.push('/admin')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handle2FAVerify = async (code: string, useBackupCode: boolean) => {
    if (!pendingToken) {
      throw new Error('Session expired')
    }

    const response = await fetch('/api/auth/2fa/login', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pendingToken,
        code,
        useBackupCode,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Verification failed')
    }

    // 2FA verified - store the Payload token and redirect
    if (data.token) {
      document.cookie = `payload-token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}`
      localStorage.setItem('payload-token', data.token)
    }
    router.push('/admin')
  }

  const handle2FACancel = () => {
    setStep('credentials')
    setPendingToken(null)
    setTwoFactorMethod(null)
  }

  if (step === '2fa-verification' && twoFactorMethod && pendingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="w-full max-w-md">
          <TwoFactorVerify
            onVerify={handle2FAVerify}
            onCancel={handle2FACancel}
            method={twoFactorMethod}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Admin Login</h1>
          <p className="mt-2 text-[var(--muted-foreground)]">
            Sign in to access the admin panel
          </p>
        </div>

        <form onSubmit={handleCredentialsSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="admin@example.com"
              required
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="w-full py-3 px-4 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-medium hover:bg-[var(--primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/admin/forgot"
            className="text-sm text-[var(--primary)] hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  )
}
