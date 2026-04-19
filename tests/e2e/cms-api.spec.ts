import { expect, test } from '@playwright/test'

// IT services template seeds these collections with published docs.
const activePublishedCollections = [
  'pages',
  'posts',
  'services',
  'portfolios',
  'testimonials',
  'teamMembers',
]

// Retained legacy collections must remain reachable but may be empty.
const legacyCollections = ['plants', 'plant-categories']

test.describe('Payload REST API', () => {
  for (const collection of activePublishedCollections) {
    test(`${collection} exposes published content`, async ({ request }) => {
      const response = await request.get(
        `/api/${collection}?depth=0&limit=1&where%5B_status%5D%5Bequals%5D=published`,
      )

      expect(response.ok(), `${collection} API should respond successfully`).toBe(true)

      const json = (await response.json()) as { docs?: unknown[] }
      expect(Array.isArray(json.docs), `${collection} API should return docs`).toBe(true)
      expect(json.docs?.length, `${collection} should have seeded published docs`).toBeGreaterThan(0)
    })
  }

  for (const collection of legacyCollections) {
    test(`${collection} API remains reachable`, async ({ request }) => {
      const response = await request.get(`/api/${collection}?depth=0&limit=1`)

      expect(response.ok(), `${collection} API should respond successfully`).toBe(true)

      const json = (await response.json()) as { docs?: unknown[] }
      expect(Array.isArray(json.docs), `${collection} API should return docs array`).toBe(true)
    })
  }
})
