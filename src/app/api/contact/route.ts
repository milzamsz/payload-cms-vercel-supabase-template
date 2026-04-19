import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import config from '@payload-config'
import {
  buildContactAdminEmail,
  buildContactAutoReplyEmail,
  type ContactSubmissionEmailData,
} from '@/utilities/emailTemplates'
import {
  getEffectiveEmailSettings,
  isEmailDeliveryEnabled,
} from '@/utilities/emailSettings'

type ContactRequestBody = {
  email?: unknown
  message?: unknown
  phone?: unknown
  senderName?: unknown
  subject?: unknown
  website?: unknown
}

export const runtime = 'nodejs'

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function parseContactBody(body: ContactRequestBody): {
  data?: ContactSubmissionEmailData
  error?: string
  honeypotTriggered?: boolean
} {
  const senderName = normalizeText(body.senderName)
  const email = normalizeText(body.email).toLowerCase()
  const phone = normalizeText(body.phone)
  const subject = normalizeText(body.subject)
  const message = normalizeText(body.message)
  const website = normalizeText(body.website)

  if (website) {
    return { honeypotTriggered: true }
  }

  if (!senderName) {
    return { error: 'Name is required.' }
  }

  if (!email || !isValidEmail(email)) {
    return { error: 'A valid email address is required.' }
  }

  if (!message) {
    return { error: 'Message is required.' }
  }

  if (senderName.length > 120 || subject.length > 160 || phone.length > 40 || message.length > 5000) {
    return { error: 'One or more fields exceed the allowed length.' }
  }

  return {
    data: {
      email,
      message,
      phone,
      senderName,
      subject,
    },
  }
}

export async function POST(request: Request) {
  let body: ContactRequestBody

  try {
    body = (await request.json()) as ContactRequestBody
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = parseContactBody(body)

  if (parsed.honeypotTriggered) {
    return NextResponse.json({ message: 'Thanks, your message has been sent.' })
  }

  if (!parsed.data) {
    return NextResponse.json({ message: parsed.error || 'Invalid contact submission.' }, { status: 400 })
  }

  const payload = await getPayload({ config })

  await payload.create({
    collection: 'contactSubmissions',
    data: {
      email: parsed.data.email,
      message: parsed.data.message,
      phone: parsed.data.phone,
      receivedOn: new Date().toISOString(),
      senderName: parsed.data.senderName,
      status: 'new',
      subject: parsed.data.subject,
    },
    draft: false,
  })

  try {
    const settings = await getEffectiveEmailSettings({ payload })

    if (!isEmailDeliveryEnabled(settings)) {
      return NextResponse.json({ message: 'Thanks, your message has been sent.' })
    }

    const sendOperations: Promise<unknown>[] = []

    if (settings.sendContactAdminNotification && settings.adminRecipients.length > 0) {
      const adminEmail = buildContactAdminEmail({
        settings,
        submission: parsed.data,
      })

      sendOperations.push(
        payload.sendEmail({
          html: adminEmail.html,
          replyTo: parsed.data.email,
          subject: adminEmail.subject,
          text: adminEmail.text,
          to: settings.adminRecipients,
        }),
      )
    }

    if (settings.sendContactAutoReply) {
      const autoReplyEmail = buildContactAutoReplyEmail({
        settings,
        submission: parsed.data,
      })

      sendOperations.push(
        payload.sendEmail({
          html: autoReplyEmail.html,
          subject: autoReplyEmail.subject,
          text: autoReplyEmail.text,
          to: parsed.data.email,
        }),
      )
    }

    await Promise.all(sendOperations)

    return NextResponse.json({ message: 'Thanks, your message has been sent.' })
  } catch (error) {
    payload.logger.error(`Contact email delivery failed: ${String(error)}`)

    return NextResponse.json({
      message:
        'Your message was saved, but email delivery could not be completed. Please contact us directly by email or WhatsApp.',
    })
  }
}
