import { expect, test } from '@playwright/test'

const adminEmail = process.env.E2E_ADMIN_EMAIL ?? 'admin@example.com'
const adminPassword = process.env.E2E_ADMIN_PASSWORD ?? 'ChangeMe123!'

test.describe('Payload admin', () => {
  test('admin-login authenticates the seeded admin and loads the admin shell', async ({ page }) => {
    const runtimeErrors: string[] = []
    page.on('pageerror', (error) => runtimeErrors.push(error.message))

    await page.goto('/admin-login')
    await expect(page.getByRole('heading', { name: /admin login/i })).toBeVisible()

    await page.locator('#email').fill(adminEmail)
    await page.locator('#password').fill(adminPassword)
    await page.getByRole('button', { name: /sign in/i }).click()

    await expect(page).toHaveURL(/\/admin/, { timeout: 30_000 })
    await expect(page.locator('body')).toBeVisible()

    const bodyText = await page.locator('body').innerText({ timeout: 30_000 })
    expect(bodyText.length, 'Payload admin shell should not be blank').toBeGreaterThan(40)
    expect(bodyText).not.toContain('Application error')
    expect(runtimeErrors).toEqual([])
  })

  test('2FA admin views render without blank-screen crashes', async ({ page }) => {
    const runtimeErrors: string[] = []
    page.on('pageerror', (error) => runtimeErrors.push(error.message))

    await page.goto('/admin-login')
    await page.locator('#email').fill(adminEmail)
    await page.locator('#password').fill(adminPassword)
    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(page).toHaveURL(/\/admin/, { timeout: 30_000 })

    const viewExpectations = [
      {
        route: '/admin/2fa-setup',
        heading: /Set Up Two-Factor Authentication|Two-Factor Authentication Enabled/,
      },
      {
        route: '/admin/2fa',
        heading: /Two-Factor Authentication|Enter Backup Code/,
      },
    ]

    for (const { route, heading } of viewExpectations) {
      const response = await page.goto(route)
      expect(response?.ok(), `${route} should return a successful response`).toBe(true)
      await expect(page.getByRole('heading', { name: heading }).first()).toBeVisible()

      const bodyText = await page.locator('body').innerText({ timeout: 30_000 })
      expect(bodyText.length, `${route} should not render a blank admin screen`).toBeGreaterThan(40)
      expect(bodyText).not.toContain('Application error')
    }

    expect(runtimeErrors).toEqual([])
  })
})
