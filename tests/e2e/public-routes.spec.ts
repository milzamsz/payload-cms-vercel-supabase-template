import { expect, test } from '@playwright/test'

const publicRoutes = [
  '/',
  '/about',
  '/services',
  '/pricing',
  '/blog',
  '/blog/right-sizing-aws-for-growing-teams',
  '/contact',
  '/legal/privacy-policy',
]

test.describe('public frontend routes', () => {
  for (const route of publicRoutes) {
    test(`${route} renders successfully`, async ({ page }) => {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' })

      expect(response?.ok(), `${route} should return a successful response`).toBe(true)
      await expect(page.locator('body')).toBeVisible()

      const bodyText = await page.locator('body').innerText()
      expect(bodyText.length, `${route} should render visible content`).toBeGreaterThan(40)
      expect(bodyText).not.toContain('Application error')
      expect(bodyText).not.toContain('This page could not be found')
    })
  }

  test('/ shows the marketing hero', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText(/Northstar IT Services/i).first()).toBeVisible()
  })

  test('/services lists the core services', async ({ page }) => {
    await page.goto('/services', { waitUntil: 'domcontentloaded' })
    await expect(page.getByRole('heading', { name: /managed it/i }).first()).toBeVisible()
    await expect(page.getByRole('heading', { name: /cloud migration/i }).first()).toBeVisible()
  })

  test('/pricing lists pricing tiers', async ({ page }) => {
    await page.goto('/pricing', { waitUntil: 'domcontentloaded' })
    await expect(page.getByRole('heading', { name: /essentials/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /growth/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /enterprise/i })).toBeVisible()
  })

  test('/blog links through to a blog post detail page', async ({ page }) => {
    await page.goto('/blog', { waitUntil: 'domcontentloaded' })
    const firstPost = page.getByRole('link', { name: /right-sizing aws/i }).first()
    await expect(firstPost).toBeVisible()
  })
})
