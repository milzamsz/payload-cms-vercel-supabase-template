'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { TwoFactorSetup } from './TwoFactorSetup'
import type { TwoFactorMethod } from '@/utilities/twoFactorAuth'

interface TwoFactorStatus {
  twoFactorEnabled: boolean
  method: TwoFactorMethod
}

interface TwoFactorManageProps {
  onStatusChange?: (enabled: boolean) => void
}

export function TwoFactorManage({ onStatusChange }: TwoFactorManageProps) {
  const [status, setStatus] = useState<TwoFactorStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showSetup, setShowSetup] = useState(false)
  const [showDisable, setShowDisable] = useState(false)
  const [disablePassword, setDisablePassword] = useState('')
  const [disableError, setDisableError] = useState<string | null>(null)
  const [isDisabling, setIsDisabling] = useState(false)

  const getAuthToken = (): string | null => {
    const cookies = document.cookie.split(';')
    const jwtCookie = cookies.find((c) => c.trim().startsWith('payload-token='))
    if (jwtCookie) {
      return jwtCookie.split('=')[1]
    }
    return localStorage.getItem('payload-token')
  }

  const fetchStatus = useCallback(async () => {
    try {
      const token = getAuthToken()
      if (!token) {
        setIsLoading(false)
        return
      }

      const response = await fetch('/api/auth/2fa/status', {
        headers: {
          'Authorization': `JWT ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStatus(data)
      }
    } catch (error) {
      console.error('Failed to fetch 2FA status:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchStatus()
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [fetchStatus])

  const handleSetupComplete = () => {
    setShowSetup(false)
    fetchStatus()
    onStatusChange?.(true)
  }

  const handleDisable = async (e: React.FormEvent) => {
    e.preventDefault()
    setDisableError(null)
    setIsDisabling(true)

    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error('Authentication required')
      }

      const response = await fetch('/api/auth/2fa/disable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`,
        },
        body: JSON.stringify({ password: disablePassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to disable 2FA')
      }

      setShowDisable(false)
      setDisablePassword('')
      fetchStatus()
      onStatusChange?.(false)
    } catch (err) {
      setDisableError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsDisabling(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full mx-auto" />
      </div>
    )
  }

  if (showSetup) {
    return (
      <TwoFactorSetup
        onSetupComplete={handleSetupComplete}
        onCancel={() => setShowSetup(false)}
      />
    )
  }

  if (showDisable) {
    return (
      <div className="max-w-md mx-auto p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Disable 2FA</h2>
          <p className="mt-2 text-[var(--muted-foreground)]">
            Enter your password to disable two-factor authentication
          </p>
        </div>

        <form onSubmit={handleDisable} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Password
            </label>
            <input
              type="password"
              value={disablePassword}
              onChange={(e) => setDisablePassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="Enter your password"
              autoFocus
            />
          </div>

          {disableError && (
            <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
              {disableError}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowDisable(false)
                setDisablePassword('')
                setDisableError(null)
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={isDisabling || !disablePassword}
              className="flex-1"
            >
              {isDisabling ? 'Disabling...' : 'Disable 2FA'}
            </Button>
          </div>
        </form>
      </div>
    )
  }

  const isEnabled = status?.twoFactorEnabled

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
          isEnabled ? 'bg-green-100' : 'bg-[var(--muted)]'
        }`}>
          {isEnabled ? (
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          )}
        </div>

        <h2 className="text-2xl font-bold text-[var(--foreground)]">
          Two-Factor Authentication
        </h2>
        <p className="mt-2 text-[var(--muted-foreground)]">
          {isEnabled
            ? `Your account is protected with ${status.method === 'email' ? 'email verification' : 'authenticator app'}`
            : 'Add an extra layer of security to your account'}
        </p>
      </div>

      {isEnabled ? (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-green-50 border border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-green-800 font-medium">2FA is enabled</span>
            </div>
            <p className="mt-2 text-sm text-green-700">
              Method: {status.method === 'email' ? 'Email verification' : 'Authenticator app'}
            </p>
          </div>

          <Button
            variant="destructive"
            onClick={() => setShowDisable(true)}
            className="w-full"
          >
            Disable 2FA
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--muted)]">
              <svg className="w-5 h-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm text-[var(--foreground)]">Protect against unauthorized access</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--muted)]">
              <svg className="w-5 h-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm text-[var(--foreground)]">Secure your admin account</span>
            </div>
          </div>

          <Button onClick={() => setShowSetup(true)} className="w-full">
            Enable 2FA
          </Button>
        </div>
      )}
    </div>
  )
}
