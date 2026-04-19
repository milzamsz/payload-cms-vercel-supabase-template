import config from '@payload-config'
import type {
  Category,
  Media,
  MediaMention,
  Page,
  Plant,
  Portfolio,
  Post,
  Service,
  SiteSetting,
  TeamMember,
  Testimonial,
} from '@/payload-types'
import { getPayload } from 'payload'
import type { Where } from 'payload'

type MediaRelation = number | Media | null | undefined
type ServiceCategory = Service['serviceCategory']

export type FrontendPageDoc = Page | null
export type FrontendSiteSettingsDoc = SiteSetting | null
export type FrontendServiceDoc = Service | null

export function getMediaUrl(media: MediaRelation): string | null {
  return typeof media === 'object' && media !== null && 'url' in media
    ? ((media as Media).url ?? null)
    : null
}

export function getMediaAlt(media: MediaRelation): string | null {
  return typeof media === 'object' && media !== null && 'alt' in media
    ? ((media as Media).alt ?? null)
    : null
}

export function shouldQueryCMS(): boolean {
  return process.env.NEXT_PHASE !== 'phase-production-build'
}

async function getPayloadSafely(logLabel: string) {
  if (!shouldQueryCMS()) {
    return null
  }

  try {
    return await getPayload({ config })
  } catch (err) {
    console.error(`[${logLabel}] Failed to initialize Payload CMS:`, err)
    return null
  }
}

export async function getPublishedPageBySlug(
  slug: string,
  logLabel: string,
): Promise<FrontendPageDoc> {
  const payload = await getPayloadSafely(logLabel)

  if (!payload) {
    return null
  }

  try {
    const result = await payload.find({
      collection: 'pages',
      where: {
        and: [
          { slug: { equals: slug } },
          { _status: { equals: 'published' } },
        ],
      },
      depth: 2,
      limit: 1,
    })

    return (result.docs[0] as Page | undefined) ?? null
  } catch (err) {
    console.error(`[${logLabel}] Failed to fetch page "${slug}" from CMS:`, err)
    return null
  }
}

export async function getSiteSettings(
  logLabel: string,
): Promise<FrontendSiteSettingsDoc> {
  const payload = await getPayloadSafely(logLabel)

  if (!payload) {
    return null
  }

  try {
    return (await payload.findGlobal({
      slug: 'siteSettings',
      depth: 1,
    })) as FrontendSiteSettingsDoc
  } catch (err) {
    console.error(`[${logLabel}] Failed to fetch site settings from CMS:`, err)
    return null
  }
}

export async function getPublishedServicesByCategory(
  serviceCategory: ServiceCategory,
  logLabel: string,
): Promise<Service[]> {
  const payload = await getPayloadSafely(logLabel)

  if (!payload) {
    return []
  }

  try {
    const result = await payload.find({
      collection: 'services',
      where: {
        and: [
          { serviceCategory: { equals: serviceCategory } },
          { _status: { equals: 'published' } },
        ],
      },
      sort: 'displayOrder',
      depth: 2,
      limit: 100,
    })

    return result.docs as Service[]
  } catch (err) {
    console.error(
      `[${logLabel}] Failed to fetch services for category "${serviceCategory}" from CMS:`,
      err,
    )
    return []
  }
}

export async function getPublishedServiceBySlug(
  slug: string,
  logLabel: string,
  serviceCategory?: ServiceCategory,
): Promise<FrontendServiceDoc> {
  const payload = await getPayloadSafely(logLabel)

  if (!payload) {
    return null
  }

  const filters: Where[] = [
    { slug: { equals: slug } },
    { _status: { equals: 'published' } },
  ]

  if (serviceCategory) {
    filters.push({ serviceCategory: { equals: serviceCategory } })
  }

  try {
    const result = await payload.find({
      collection: 'services',
      where: { and: filters },
      depth: 2,
      limit: 1,
    })

    return (result.docs[0] as Service | undefined) ?? null
  } catch (err) {
    console.error(`[${logLabel}] Failed to fetch service "${slug}" from CMS:`, err)
    return null
  }
}

export async function getPublishedTestimonials(
  logLabel: string,
): Promise<Testimonial[]> {
  const payload = await getPayloadSafely(logLabel)

  if (!payload) {
    return []
  }

  try {
    const result = await payload.find({
      collection: 'testimonials',
      where: { _status: { equals: 'published' } },
      sort: 'displayOrder',
      depth: 1,
      limit: 50,
    })

    return result.docs as Testimonial[]
  } catch (err) {
    console.error(`[${logLabel}] Failed to fetch testimonials from CMS:`, err)
    return []
  }
}

export async function getPublishedTeamMembers(
  logLabel: string,
): Promise<TeamMember[]> {
  const payload = await getPayloadSafely(logLabel)

  if (!payload) {
    return []
  }

  try {
    const result = await payload.find({
      collection: 'teamMembers',
      where: { _status: { equals: 'published' } },
      sort: 'displayOrder',
      depth: 1,
      limit: 100,
    })

    return result.docs as TeamMember[]
  } catch (err) {
    console.error(`[${logLabel}] Failed to fetch team members from CMS:`, err)
    return []
  }
}

export async function getPublishedMediaMentions(
  logLabel: string,
): Promise<MediaMention[]> {
  const payload = await getPayloadSafely(logLabel)

  if (!payload) {
    return []
  }

  try {
    const result = await payload.find({
      collection: 'mediaMentions',
      where: { _status: { equals: 'published' } },
      sort: 'displayOrder',
      depth: 1,
      limit: 100,
    })

    return result.docs as MediaMention[]
  } catch (err) {
    console.error(`[${logLabel}] Failed to fetch media mentions from CMS:`, err)
    return []
  }
}

export async function getPublishedPortfolios(
  logLabel: string,
): Promise<Portfolio[]> {
  const payload = await getPayloadSafely(logLabel)

  if (!payload) {
    return []
  }

  try {
    const result = await payload.find({
      collection: 'portfolios',
      where: { _status: { equals: 'published' } },
      sort: '-yearCompleted',
      depth: 2,
      limit: 100,
    })

    return result.docs as Portfolio[]
  } catch (err) {
    console.error(`[${logLabel}] Failed to fetch portfolios from CMS:`, err)
    return []
  }
}

export async function getPublishedPortfolioBySlug(
  slug: string,
  logLabel: string,
): Promise<Portfolio | null> {
  const payload = await getPayloadSafely(logLabel)

  if (!payload) {
    return null
  }

  try {
    const result = await payload.find({
      collection: 'portfolios',
      where: {
        and: [
          { slug: { equals: slug } },
          { _status: { equals: 'published' } },
        ],
      },
      depth: 2,
      limit: 1,
    })

    return (result.docs[0] as Portfolio | undefined) ?? null
  } catch (err) {
    console.error(`[${logLabel}] Failed to fetch portfolio "${slug}" from CMS:`, err)
    return null
  }
}

export async function getPublishedPosts(logLabel: string): Promise<Post[]> {
  const payload = await getPayloadSafely(logLabel)

  if (!payload) {
    return []
  }

  try {
    const result = await payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      sort: '-publishedAt',
      depth: 2,
      limit: 100,
    })

    return result.docs as Post[]
  } catch (err) {
    console.error(`[${logLabel}] Failed to fetch posts from CMS:`, err)
    return []
  }
}

export async function getPublishedPostBySlug(
  slug: string,
  logLabel: string,
): Promise<Post | null> {
  const payload = await getPayloadSafely(logLabel)

  if (!payload) {
    return null
  }

  try {
    const result = await payload.find({
      collection: 'posts',
      where: {
        and: [
          { slug: { equals: slug } },
          { _status: { equals: 'published' } },
        ],
      },
      depth: 2,
      limit: 1,
    })

    return (result.docs[0] as Post | undefined) ?? null
  } catch (err) {
    console.error(`[${logLabel}] Failed to fetch post "${slug}" from CMS:`, err)
    return null
  }
}

export async function getCategories(logLabel: string): Promise<Category[]> {
  const payload = await getPayloadSafely(logLabel)

  if (!payload) {
    return []
  }

  try {
    const result = await payload.find({
      collection: 'categories',
      sort: 'name',
      limit: 100,
    })

    return result.docs as Category[]
  } catch (err) {
    console.error(`[${logLabel}] Failed to fetch categories from CMS:`, err)
    return []
  }
}

export async function getPublishedPlants(logLabel: string): Promise<Plant[]> {
  const payload = await getPayloadSafely(logLabel)

  if (!payload) {
    return []
  }

  try {
    const result = await payload.find({
      collection: 'plants',
      where: { _status: { equals: 'published' } },
      sort: 'commonName',
      depth: 2,
      limit: 300,
    })

    return result.docs as Plant[]
  } catch (err) {
    console.error(`[${logLabel}] Failed to fetch plants from CMS:`, err)
    return []
  }
}

export async function getPublishedPlantBySlug(
  slug: string,
  logLabel: string,
): Promise<Plant | null> {
  const payload = await getPayloadSafely(logLabel)

  if (!payload) {
    return null
  }

  try {
    const result = await payload.find({
      collection: 'plants',
      where: {
        and: [
          { slug: { equals: slug } },
          { _status: { equals: 'published' } },
        ],
      },
      depth: 2,
      limit: 1,
    })

    return (result.docs[0] as Plant | undefined) ?? null
  } catch (err) {
    console.error(`[${logLabel}] Failed to fetch plant "${slug}" from CMS:`, err)
    return null
  }
}
