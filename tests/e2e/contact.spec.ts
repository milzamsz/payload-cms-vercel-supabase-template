import { expect, test } from '@playwright/test'
import type { Locator } from '@playwright/test'

async function fillStable(locator: Locator, value: string) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    await locator.fill(value)

    try {
      await expect(locator).toHaveValue(value, { timeout: 2_000 })
      return
    } catch (error) {
      if (attempt === 2) {
        throw error
      }
    }
  }
}

test('contact form creates a submission successfully', async ({ page }) => {
  test.setTimeout(60_000)

  const uniqueId = Date.now()

  await page.goto('/contact')
  await fillStable(page.locator('[name="senderName"]'), `Playwright Tester ${uniqueId}`)
  await fillStable(page.locator('[name="email"]'), `playwright-${uniqueId}@example.com`)
  await fillStable(page.locator('[name="phone"]'), '+1 555 010 4102')
  await fillStable(page.locator('[name="subject"]'), `E2E validation ${uniqueId}`)
  await fillStable(
    page.locator('[name="message"]'),
    'Automated E2E submission verifying the Payload-backed contact flow.',
  )

  const [response] = await Promise.all([
    page.waitForResponse(
      (candidate) =>
        candidate.url().includes('/api/contact') && candidate.request().method() === 'POST',
      { timeout: 30_000 },
    ),
    page.getByRole('button', { name: /send message/i }).click(),
  ])

  expect(response.ok(), 'contact submission request should succeed').toBe(true)

  await expect(
    page.getByText(/(Thanks, your message has been sent|Your message was saved)/),
  ).toBeVisible({ timeout: 30_000 })
})
