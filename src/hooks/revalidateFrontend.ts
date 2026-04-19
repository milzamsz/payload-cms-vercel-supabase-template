import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  Payload,
  PayloadRequest,
} from 'payload'

import type {
  Category,
  Page,
  Plant,
  PlantCategory,
  Portfolio,
  Post,
  Service,
} from '../payload-types'

type DraftableDoc = {
  id: string | number
  _status?: string | null
}

type SluggedDoc = {
  slug?: string | null
}

type ServiceCategoryValue = NonNullable<Service['serviceCategory']>

type ServiceRouteDoc = Pick<Service, 'serviceCategory' | 'slug'>

const REVALIDATE_CONTEXT_KEY = 'disableRevalidate'

const STATIC_FRONTEND_PATHS = [
  '/',
  '/about',
  '/blog',
  '/contact',
  '/kumara-plant-story',
  '/legal/privacy-policy',
  '/media',
  '/services/educational-program',
  '/services/garden-product',
  '/services/landscaping-consultancy',
  '/services/movement',
  '/why-garden',
] as const

const PAGE_ROUTE_BY_SLUG: Record<string, string> = {
  home: '/',
  about: '/about',
  contact: '/contact',
  services: '/services',
  pricing: '/pricing',
  'privacy-policy': '/legal/privacy-policy',
}

const SERVICE_CATEGORY_BASE_PATHS = {
  'managed-it': '/services',
  cloud: '/services',
  security: '/services',
  software: '/services',
  data: '/services',
  support: '/services',
} satisfies Record<ServiceCategoryValue, string>

const SERVICE_DETAIL_CATEGORIES = new Set<ServiceCategoryValue>()

function isPublished(doc?: DraftableDoc | null): boolean {
  return doc?._status === 'published'
}

function shouldSkipRevalidate(req: PayloadRequest): boolean {
  return Boolean(req.context?.[REVALIDATE_CONTEXT_KEY])
}

function addPath(paths: Set<string>, path?: string | null): void {
  if (typeof path === 'string' && path.length > 0) {
    paths.add(path)
  }
}

function pagePathFromSlug(slug?: string | null): string | null {
  if (!slug) {
    return null
  }

  return PAGE_ROUTE_BY_SLUG[slug] ?? null
}

function serviceBasePath(
  serviceCategory?: Service['serviceCategory'] | null,
): string | null {
  if (!serviceCategory) {
    return null
  }

  return SERVICE_CATEGORY_BASE_PATHS[serviceCategory as ServiceCategoryValue] ?? null
}

function serviceDetailPath(doc?: ServiceRouteDoc | null): string | null {
  if (!doc?.slug || !doc.serviceCategory) {
    return null
  }

  if (!SERVICE_DETAIL_CATEGORIES.has(doc.serviceCategory as ServiceCategoryValue)) {
    return null
  }

  const basePath = serviceBasePath(doc.serviceCategory)

  return basePath ? `${basePath}/${doc.slug}` : null
}

function revalidatePaths(paths: Iterable<string>, payload?: Payload): void {
  for (const path of new Set(paths)) {
    payload?.logger.info(`Revalidating frontend path: ${path}`)
    revalidatePath(path)
  }
}

function revalidateStaticContentPaths(
  pathsToRevalidate: readonly string[],
  req: PayloadRequest,
  doc?: DraftableDoc | null,
  previousDoc?: DraftableDoc | null,
): void {
  if (shouldSkipRevalidate(req)) {
    return
  }

  if (!isPublished(doc) && !isPublished(previousDoc)) {
    return
  }

  revalidatePaths(pathsToRevalidate, req.payload)
}

function collectPagePaths(paths: Set<string>, doc?: Pick<Page, 'slug'> | null): void {
  addPath(paths, pagePathFromSlug(doc?.slug))
}

function collectPostPaths(paths: Set<string>, doc?: Pick<Post, 'slug'> | null): void {
  addPath(paths, '/blog')

  if (doc?.slug) {
    addPath(paths, `/blog/${doc.slug}`)
  }
}

function collectPlantPaths(
  paths: Set<string>,
  doc?: Pick<Plant, 'slug'> | null,
): void {
  addPath(paths, '/kumara-plant-story')

  if (doc?.slug) {
    addPath(paths, `/kumara-plant-story/${doc.slug}`)
  }
}

function collectServicePaths(
  paths: Set<string>,
  doc?: Pick<Service, 'serviceCategory' | 'slug'> | null,
): void {
  addPath(paths, serviceBasePath(doc?.serviceCategory))
  addPath(paths, serviceDetailPath(doc))
}

function collectPortfolioPaths(
  paths: Set<string>,
  doc?: Pick<Portfolio, 'slug'> | null,
): void {
  addPath(paths, '/services/landscaping-consultancy')

  if (doc?.slug) {
    addPath(paths, `/services/landscaping-consultancy/${doc.slug}`)
  }
}

async function getPublishedCollectionDocs<TDoc extends SluggedDoc>(
  payload: Payload,
  collection: 'plants' | 'portfolios' | 'posts',
): Promise<TDoc[]> {
  const result = await payload.find({
    collection,
    depth: 0,
    limit: 500,
    overrideAccess: true,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return result.docs as unknown as TDoc[]
}

async function revalidateBlogRoutes(payload: Payload): Promise<void> {
  const paths = new Set<string>(['/blog'])
  const posts = await getPublishedCollectionDocs<Pick<Post, 'slug'>>(payload, 'posts')

  for (const post of posts) {
    collectPostPaths(paths, post)
  }

  revalidatePaths(paths, payload)
}

async function revalidatePlantRoutes(payload: Payload): Promise<void> {
  const paths = new Set<string>(['/kumara-plant-story'])
  const plants = await getPublishedCollectionDocs<Pick<Plant, 'slug'>>(
    payload,
    'plants',
  )

  for (const plant of plants) {
    collectPlantPaths(paths, plant)
  }

  revalidatePaths(paths, payload)
}

export const revalidatePageAfterChange: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req,
}) => {
  if (shouldSkipRevalidate(req)) {
    return doc
  }

  if (!isPublished(doc) && !isPublished(previousDoc)) {
    return doc
  }

  const paths = new Set<string>()

  collectPagePaths(paths, previousDoc)
  collectPagePaths(paths, doc)

  revalidatePaths(paths, req.payload)

  return doc
}

export const revalidatePageAfterDelete: CollectionAfterDeleteHook<Page> = ({
  doc,
  req,
}) => {
  if (shouldSkipRevalidate(req)) {
    return doc
  }

  const paths = new Set<string>()
  collectPagePaths(paths, doc)
  revalidatePaths(paths, req.payload)

  return doc
}

export const revalidatePostAfterChange: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req,
}) => {
  if (shouldSkipRevalidate(req)) {
    return doc
  }

  if (!isPublished(doc) && !isPublished(previousDoc)) {
    return doc
  }

  const paths = new Set<string>()

  collectPostPaths(paths, previousDoc)
  collectPostPaths(paths, doc)

  revalidatePaths(paths, req.payload)

  return doc
}

export const revalidatePostAfterDelete: CollectionAfterDeleteHook<Post> = ({
  doc,
  req,
}) => {
  if (shouldSkipRevalidate(req)) {
    return doc
  }

  const paths = new Set<string>()
  collectPostPaths(paths, doc)
  revalidatePaths(paths, req.payload)

  return doc
}

export const revalidatePlantAfterChange: CollectionAfterChangeHook<Plant> = ({
  doc,
  previousDoc,
  req,
}) => {
  if (shouldSkipRevalidate(req)) {
    return doc
  }

  if (!isPublished(doc) && !isPublished(previousDoc)) {
    return doc
  }

  const paths = new Set<string>()

  collectPlantPaths(paths, previousDoc)
  collectPlantPaths(paths, doc)

  revalidatePaths(paths, req.payload)

  return doc
}

export const revalidatePlantAfterDelete: CollectionAfterDeleteHook<Plant> = ({
  doc,
  req,
}) => {
  if (shouldSkipRevalidate(req)) {
    return doc
  }

  const paths = new Set<string>()
  collectPlantPaths(paths, doc)
  revalidatePaths(paths, req.payload)

  return doc
}

export const revalidateServiceAfterChange: CollectionAfterChangeHook<Service> = ({
  doc,
  previousDoc,
  req,
}) => {
  if (shouldSkipRevalidate(req)) {
    return doc
  }

  if (!isPublished(doc) && !isPublished(previousDoc)) {
    return doc
  }

  const paths = new Set<string>()

  collectServicePaths(paths, previousDoc)
  collectServicePaths(paths, doc)

  revalidatePaths(paths, req.payload)

  return doc
}

export const revalidateServiceAfterDelete: CollectionAfterDeleteHook<Service> = ({
  doc,
  req,
}) => {
  if (shouldSkipRevalidate(req)) {
    return doc
  }

  const paths = new Set<string>()
  collectServicePaths(paths, doc)
  revalidatePaths(paths, req.payload)

  return doc
}

export const revalidatePortfolioAfterChange: CollectionAfterChangeHook<Portfolio> = ({
  doc,
  previousDoc,
  req,
}) => {
  if (shouldSkipRevalidate(req)) {
    return doc
  }

  if (!isPublished(doc) && !isPublished(previousDoc)) {
    return doc
  }

  const paths = new Set<string>()

  collectPortfolioPaths(paths, previousDoc)
  collectPortfolioPaths(paths, doc)

  revalidatePaths(paths, req.payload)

  return doc
}

export const revalidatePortfolioAfterDelete: CollectionAfterDeleteHook<Portfolio> = async ({
  doc,
  req,
}) => {
  if (shouldSkipRevalidate(req)) {
    return doc
  }

  const paths = new Set<string>()
  collectPortfolioPaths(paths, doc)
  revalidatePaths(paths, req.payload)

  return doc
}

export const revalidateCategoryAfterChange: CollectionAfterChangeHook<Category> = async ({
  doc,
  req,
}) => {
  if (shouldSkipRevalidate(req)) {
    return doc
  }

  await revalidateBlogRoutes(req.payload)

  return doc
}

export const revalidateCategoryAfterDelete: CollectionAfterDeleteHook<Category> = async ({
  doc,
  req,
}) => {
  if (shouldSkipRevalidate(req)) {
    return doc
  }

  await revalidateBlogRoutes(req.payload)

  return doc
}

export const revalidatePlantCategoryAfterChange: CollectionAfterChangeHook<PlantCategory> = async ({
  doc,
  req,
}) => {
  if (shouldSkipRevalidate(req)) {
    return doc
  }

  await revalidatePlantRoutes(req.payload)

  return doc
}

export const revalidatePlantCategoryAfterDelete: CollectionAfterDeleteHook<PlantCategory> = async ({
  doc,
  req,
}) => {
  if (shouldSkipRevalidate(req)) {
    return doc
  }

  await revalidatePlantRoutes(req.payload)

  return doc
}

export const revalidateFrontendGlobals: GlobalAfterChangeHook = ({
  doc,
  req,
}) => {
  if (shouldSkipRevalidate(req)) {
    return doc
  }

  req.payload.logger.info('Revalidating frontend layout and shared static pages')
  revalidatePath('/', 'layout')
  revalidatePaths(STATIC_FRONTEND_PATHS, req.payload)

  return doc
}

type StaticContentDoc = DraftableDoc

export const revalidateTestimonialAfterChange: CollectionAfterChangeHook<StaticContentDoc> = ({
  doc,
  previousDoc,
  req,
}) => {
  revalidateStaticContentPaths(['/', '/why-garden'], req, doc, previousDoc)
  return doc
}

export const revalidateTestimonialAfterDelete: CollectionAfterDeleteHook<StaticContentDoc> = ({
  doc,
  req,
}) => {
  revalidateStaticContentPaths(['/', '/why-garden'], req, doc)
  return doc
}

export const revalidateTeamMemberAfterChange: CollectionAfterChangeHook<StaticContentDoc> = ({
  doc,
  previousDoc,
  req,
}) => {
  revalidateStaticContentPaths(['/about'], req, doc, previousDoc)
  return doc
}

export const revalidateTeamMemberAfterDelete: CollectionAfterDeleteHook<StaticContentDoc> = ({
  doc,
  req,
}) => {
  revalidateStaticContentPaths(['/about'], req, doc)
  return doc
}

export const revalidateMediaMentionAfterChange: CollectionAfterChangeHook<StaticContentDoc> = ({
  doc,
  previousDoc,
  req,
}) => {
  revalidateStaticContentPaths(['/media'], req, doc, previousDoc)
  return doc
}

export const revalidateMediaMentionAfterDelete: CollectionAfterDeleteHook<StaticContentDoc> = ({
  doc,
  req,
}) => {
  revalidateStaticContentPaths(['/media'], req, doc)
  return doc
}
