'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

interface TwoFactorVerifyProps {
  onVerify: (code: string, useBackupCode: boolean) => Promise<void>
  onCancel: () => void
  method: 'email' | 'authenticator'
}

export function TwoFactorVerify({ onVerify, onCancel, method }: TwoFactorVerifyProps) {
  const [code, setCode] = useState('')
  const [useBackupCode, setUseBackupCode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!code || code.length < 6) {
      setError(useBackupCode ? 'Please enter a valid backup code' : 'Please enter a valid 6-digit code')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await onVerify(code, useBackupCode)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (useBackupCode) {
      // Backup codes format: XXXX-XXXX or XXXXXXXX
      const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '')
      if (cleaned.length <= 8) {
        // Format with dash
        if (cleaned.length > 4) {
          setCode(`${cleaned.slice(0, 4)}-${cleaned.slice(4)}`)
        } else {
          setCode(cleaned)
        }
      }
    } else {
      // Numeric code
      setCode(value.replace(/\D/g, '').slice(0, 6))
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
          {useBackupCode ? (
            <svg className="w-8 h-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          ) : method === 'email' ? (
            <svg className="w-8 h-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          )}
        </div>

        <h2 className="text-2xl font-bold text-[var(--foreground)]">
          {useBackupCode ? 'Enter Backup Code' : 'Two-Factor Authentication'}
        </h2>
        <p className="mt-2 text-[var(--muted-foreground)]">
          {useBackupCode
            ? 'Use one of your saved backup codes'
            : method === 'email'
              ? 'Enter the 6-digit code sent to your email'
              : 'Enter the 6-digit code from your authenticator app'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            inputMode={useBackupCode ? 'text' : 'numeric'}
            value={code}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-center text-2xl tracking-[0.3em] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            placeholder={useBackupCode ? 'XXXX-XXXX' : '000000'}
            maxLength={useBackupCode ? 9 : 6}
            autoFocus
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading || code.length < (useBackupCode ? 8 : 6)}
          className="w-full"
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </Button>

        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={() => {
              setUseBackupCode(!useBackupCode)
              setCode('')
              setError(null)
            }}
            className="text-sm text-[var(--primary)] hover:underline"
          >
            {useBackupCode ? 'Use regular code' : 'Use backup code'}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
