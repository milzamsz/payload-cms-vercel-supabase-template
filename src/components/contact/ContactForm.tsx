'use client'

import { FormEvent, useState } from 'react'

type ContactFormState = {
  email: string
  message: string
  phone: string
  senderName: string
  subject: string
  website: string
}

const initialState: ContactFormState = {
  email: '',
  message: '',
  phone: '',
  senderName: '',
  subject: '',
  website: '',
}

export function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(initialState)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })

      const data = (await response.json().catch(() => null)) as
        | { message?: string }
        | null

      if (!response.ok) {
        setError(
          data?.message ||
            'We could not send your message right now. Please try again in a moment.',
        )
        return
      }

      setSuccess(data?.message || 'Thanks, your message has been sent.')
      setForm(initialState)
    } catch {
      setError('We could not send your message right now. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const labelClass = 'text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]'
  const inputClass =
    'mt-1.5 w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20'

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Name</span>
          <input
            className={inputClass}
            name="senderName"
            onChange={(event) =>
              setForm((current) => ({ ...current, senderName: event.target.value }))
            }
            required
            type="text"
            value={form.senderName}
          />
        </label>

        <label className="block">
          <span className={labelClass}>Email</span>
          <input
            className={inputClass}
            name="email"
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
            required
            type="email"
            value={form.email}
          />
        </label>

        <label className="block">
          <span className={labelClass}>Phone</span>
          <input
            className={inputClass}
            name="phone"
            onChange={(event) =>
              setForm((current) => ({ ...current, phone: event.target.value }))
            }
            type="text"
            value={form.phone}
          />
        </label>

        <label className="block">
          <span className={labelClass}>Subject</span>
          <input
            className={inputClass}
            name="subject"
            onChange={(event) =>
              setForm((current) => ({ ...current, subject: event.target.value }))
            }
            type="text"
            value={form.subject}
          />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Message</span>
        <textarea
          className={`${inputClass} min-h-32`}
          name="message"
          onChange={(event) =>
            setForm((current) => ({ ...current, message: event.target.value }))
          }
          required
          value={form.message}
        />
      </label>

      <div aria-hidden="true" className="hidden" style={{ position: 'absolute', left: '-9999px' }}>
        <label htmlFor="website-honeypot">
          Website
          <input
            autoComplete="off"
            id="website-honeypot"
            name="website"
            onChange={(event) =>
              setForm((current) => ({ ...current, website: event.target.value }))
            }
            tabIndex={-1}
            type="text"
            value={form.website}
          />
        </label>
      </div>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {success ? (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </p>
      ) : null}

      <button
        className="inline-flex w-full items-center justify-center rounded-md bg-[var(--primary)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[var(--primary)]/90 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? 'Sending...' : 'Send message'}
      </button>
    </form>
  )
}
