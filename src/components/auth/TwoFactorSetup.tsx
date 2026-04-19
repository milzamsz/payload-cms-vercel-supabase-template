'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { TwoFactorMethod } from '@/utilities/twoFactorAuth'

interface TwoFactorSetupProps {
  onSetupComplete: () => void
  onCancel: () => void
}

type SetupStep = 'method-selection' | 'authenticator-setup' | 'email-setup' | 'verification' | 'backup-codes'

export function TwoFactorSetup({ onSetupComplete, onCancel }: TwoFactorSetupProps) {
  const [step, setStep] = useState<SetupStep>('method-selection')
  const [selectedMethod, setSelectedMethod] = useState<TwoFactorMethod>(null)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [secret, setSecret] = useState<string | null>(null)
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [verificationCode, setVerificationCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedCodes, setCopiedCodes] = useState(false)

  const getAuthToken = (): string | null => {
    // Get JWT token from cookie or localStorage
    const cookies = document.cookie.split(';')
    const jwtCookie = cookies.find((c) => c.trim().startsWith('payload-token='))
    if (jwtCookie) {
      return jwtCookie.split('=')[1]
    }
    return localStorage.getItem('payload-token')
  }

  const handleMethodSelect = async (method: TwoFactorMethod) => {
    setSelectedMethod(method)
    setIsLoading(true)
    setError(null)

    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error('Authentication required')
      }

      const response = await fetch('/api/auth/2fa/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`,
        },
        body: JSON.stringify({ method }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to setup 2FA')
      }

      if (method === 'authenticator') {
        setQrCode(data.qrCode)
        setSecret(data.secret)
        setBackupCodes(data.backupCodes)
        setStep('authenticator-setup')
      } else {
        setStep('email-setup')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerify = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError('Please enter a valid 6-digit code')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error('Authentication required')
      }

      const response = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`,
        },
        body: JSON.stringify({
          code: verificationCode,
          method: selectedMethod,
          isSetup: true,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed')
      }

      if (selectedMethod === 'authenticator' && backupCodes.length > 0) {
        setStep('backup-codes')
      } else {
        onSetupComplete()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyBackupCodes = () => {
    const codesText = backupCodes.join('\n')
    navigator.clipboard.writeText(codesText)
    setCopiedCodes(true)
    setTimeout(() => setCopiedCodes(false), 2000)
  }

  const renderMethodSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">Enable Two-Factor Authentication</h2>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Choose your preferred method to secure your account
        </p>
      </div>

      <div className="grid gap-4">
        <button
          onClick={() => handleMethodSelect('authenticator')}
          disabled={isLoading}
          className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-colors text-left"
        >
          <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[var(--foreground)]">Authenticator App</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Use Google Authenticator, Authy, or similar apps
            </p>
          </div>
          <svg className="w-5 h-5 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button
          onClick={() => handleMethodSelect('email')}
          disabled={isLoading}
          className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-colors text-left"
        >
          <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[var(--foreground)]">Email Verification</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Receive codes via email
            </p>
          </div>
          <svg className="w-5 h-5 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
          {error}
        </div>
      )}

      <Button variant="outline" onClick={onCancel} className="w-full">
        Cancel
      </Button>
    </div>
  )

  const renderAuthenticatorSetup = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">Setup Authenticator</h2>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Scan the QR code with your authenticator app
        </p>
      </div>

      {qrCode && (
        <div className="flex justify-center">
          <div className="p-4 bg-white rounded-xl">
            <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
          </div>
        </div>
      )}

      {secret && (
        <div className="text-center">
          <p className="text-sm text-[var(--muted-foreground)] mb-2">
            Can&apos;t scan? Enter this code manually:
          </p>
          <code className="px-3 py-1 bg-[var(--muted)] rounded text-sm font-mono">
            {secret}
          </code>
        </div>
      )}

      <div className="space-y-3">
        <label className="block text-sm font-medium text-[var(--foreground)]">
          Enter 6-digit code from your app
        </label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
          className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-center text-2xl tracking-[0.5em] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          placeholder="000000"
        />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep('method-selection')} className="flex-1">
          Back
        </Button>
        <Button onClick={handleVerify} disabled={isLoading || verificationCode.length !== 6} className="flex-1">
          {isLoading ? 'Verifying...' : 'Verify'}
        </Button>
      </div>
    </div>
  )

  const renderEmailSetup = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">Email Verification Setup</h2>
        <p className="mt-2 text-[var(--muted-foreground)]">
          We&apos;ve sent a verification code to your email
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-[var(--foreground)]">
          Enter 6-digit code from your email
        </label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
          className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-center text-2xl tracking-[0.5em] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          placeholder="000000"
        />
        <p className="text-xs text-[var(--muted-foreground)] text-center">
          Code expires in 10 minutes
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep('method-selection')} className="flex-1">
          Back
        </Button>
        <Button onClick={handleVerify} disabled={isLoading || verificationCode.length !== 6} className="flex-1">
          {isLoading ? 'Verifying...' : 'Verify'}
        </Button>
      </div>
    </div>
  )

  const renderBackupCodes = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">Save Backup Codes</h2>
        <p className="mt-2 text-[var(--muted-foreground)]">
          These codes let you access your account if you lose your 2FA method
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm text-amber-800">
            Save these codes in a secure place. They will only be shown once!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {backupCodes.map((code, index) => (
          <code
            key={index}
            className="px-3 py-2 bg-[var(--muted)] rounded-lg text-center text-sm font-mono text-[var(--foreground)]"
          >
            {code}
          </code>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={handleCopyBackupCodes}
        className="w-full"
      >
        {copiedCodes ? (
          <>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy Codes
          </>
        )}
      </Button>

      <Button onClick={onSetupComplete} className="w-full">
        I&apos;ve Saved My Codes
      </Button>
    </div>
  )

  return (
    <div className="max-w-md mx-auto p-6">
      {step === 'method-selection' && renderMethodSelection()}
      {step === 'authenticator-setup' && renderAuthenticatorSetup()}
      {step === 'email-setup' && renderEmailSetup()}
      {step === 'backup-codes' && renderBackupCodes()}
    </div>
  )
}
