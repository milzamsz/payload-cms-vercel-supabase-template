/**
 * Payload CMS Seed Script
 * Seeds the starter template with Northstar IT Services sample content.
 *
 * Run with: npm run seed
 *
 * Configure via env:
 *   SEED_ADMIN_EMAIL (default admin@example.com)
 *   SEED_ADMIN_PASSWORD (default ChangeMe123!)
 */
import type { Payload } from 'payload'
import { getPayload } from 'payload'
import config from './payload.config'
import {
  blogCategories,
  blogPosts,
  faqs,
  footerColumns,
  hero,
  navLinks,
  pricingTiers,
  processSteps,
  services,
  siteSettings,
  socialLinks,
  teamMembers,
  testimonials,
  aboutPage,
} from './lib/it-services-content'

// ─── Lexical helpers ────────────────────────────────────────────

type LexicalText = {
  type: 'text'
  text: string
  format: number
  style: string
  mode: 'normal'
  detail: number
  version: number
}

type LexicalBlock = {
  type: 'paragraph' | 'heading'
  children: LexicalText[]
  direction: 'ltr'
  format: ''
  indent: number
  version: number
  tag?: string
  textFormat?: number
}

type LexicalDoc = {
  root: {
    type: 'root'
    children: LexicalBlock[]
    direction: 'ltr'
    format: ''
    indent: number
    version: number
  }
}

const txt = (text: string): LexicalText => ({
  type: 'text',
  text,
  format: 0,
  style: '',
  mode: 'normal',
  detail: 0,
  version: 1,
})

const paragraph = (text: string): LexicalBlock => ({
  type: 'paragraph',
  children: [txt(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

const heading = (text: string, tag: 'h2' | 'h3' = 'h2'): LexicalBlock => ({
  type: 'heading',
  tag,
  children: [txt(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

const doc = (blocks: LexicalBlock[]): LexicalDoc => ({
  root: {
    type: 'root',
    children: blocks,
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

const docFromText = (text: string): LexicalDoc =>
  doc(
    text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map(paragraph),
  )

// ─── Helpers for idempotent upsert ──────────────────────────────

async function upsertAdminUser(payload: Payload) {
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com'
  const password = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!'

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (existing.totalDocs > 0) {
    console.log(`✓ Admin user already exists: ${email}`)
    return existing.docs[0]
  }

  const user = await payload.create({
    collection: 'users',
    data: {
      email,
      password,
      firstName: 'Admin',
      lastName: 'User',
    } as never,
  })
  console.log(`✓ Created admin user: ${email}`)
  return user
}

type AnyData = Record<string, unknown>

async function upsertBySlug(
  payload: Payload,
  collection:
    | 'pages'
    | 'posts'
    | 'services'
    | 'portfolios'
    | 'categories',
  slug: string,
  data: AnyData,
) {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.totalDocs > 0) {
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data: data as never,
      overrideAccess: true,
    })
  }

  return payload.create({
    collection,
    data: data as never,
    overrideAccess: true,
  })
}

async function upsertByField<T extends 'testimonials' | 'teamMembers'>(
  payload: Payload,
  collection: T,
  field: string,
  value: string,
  data: AnyData,
) {
  const existing = await payload.find({
    collection,
    where: { [field]: { equals: value } } as never,
    limit: 1,
    overrideAccess: true,
  })

  if (existing.totalDocs > 0) {
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data: data as never,
      overrideAccess: true,
    })
  }

  return payload.create({
    collection,
    data: data as never,
    overrideAccess: true,
  })
}

// ─── Seeders ────────────────────────────────────────────────────

async function seedGlobals(payload: Payload) {
  await payload.updateGlobal({
    slug: 'siteSettings',
    data: {
      siteName: siteSettings.siteName,
      siteDescription: siteSettings.description,
      email: siteSettings.email,
      address: siteSettings.address,
      mapsEmbedUrl: siteSettings.mapsEmbedUrl,
      socialMedia: {
        instagram: null,
        facebook: null,
        youtube: socialLinks.find((s) => s.platform === 'youtube')?.url ?? null,
        tiktok: null,
        linkedin: socialLinks.find((s) => s.platform === 'linkedin')?.url ?? null,
      },
    } as never,
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navLinks: navLinks.map((link) => ({
        label: link.label,
        url: link.href,
      })),
      ctaButton: {
        label: 'Contact',
        url: '/contact',
      },
    } as never,
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      columns: footerColumns.map((column) => ({
        title: column.title,
        links: column.links.map((link) => ({ label: link.label, url: link.href })),
      })),
      socialLinks: socialLinks.map((social) => ({
        platform: social.platform,
        url: social.url,
      })),
      copyrightText: siteSettings.copyright,
    } as never,
  })

  await payload.updateGlobal({
    slug: 'emailSettings',
    data: {
      enabled: false,
      fromName: siteSettings.siteName,
      adminRecipients: [{ email: siteSettings.email }],
    } as never,
  })

  console.log('✓ Updated globals (header, footer, siteSettings, emailSettings)')
}

async function seedCategories(payload: Payload) {
  for (const name of blogCategories.filter((c) => c !== 'All')) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    await upsertBySlug(payload, 'categories', slug, { name, slug })
  }
  console.log(`✓ Seeded ${blogCategories.length - 1} blog categories`)
}

async function seedServices(payload: Payload) {
  const categoryByService: Record<string, string> = {
    'managed-it': 'managed-it',
    'cloud-migration': 'cloud',
    'cybersecurity': 'security',
    'custom-software': 'software',
    'data-automation': 'data',
    'support-desk': 'support',
  }

  for (const [idx, service] of services.entries()) {
    await upsertBySlug(payload, 'services', service.slug, {
      name: service.title,
      slug: service.slug,
      serviceCategory: categoryByService[service.slug] ?? 'managed-it',
      shortDescription: service.summary,
      displayOrder: idx,
      _status: 'published',
    })
  }
  console.log(`✓ Seeded ${services.length} services`)
}

async function seedPosts(payload: Payload) {
  for (const [idx, post] of blogPosts.entries()) {
    await upsertBySlug(payload, 'posts', post.slug, {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: doc([
        paragraph(post.excerpt),
        heading(post.category, 'h2'),
        ...post.body
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter(Boolean)
          .map(paragraph),
      ]),
      displayOrder: idx,
      publishedAt: post.date,
      _status: 'published',
    })
  }
  console.log(`✓ Seeded ${blogPosts.length} blog posts`)
}

async function seedTestimonials(payload: Payload) {
  for (const [idx, item] of testimonials.entries()) {
    await upsertByField(payload, 'testimonials', 'authorName', item.name, {
      quote: item.quote,
      authorName: item.name,
      authorRole: `${item.title}, ${item.company}`,
      displayOrder: idx,
      _status: 'published',
    })
  }
  console.log(`✓ Seeded ${testimonials.length} testimonials`)
}

async function seedTeam(payload: Payload) {
  for (const [idx, member] of teamMembers.entries()) {
    await upsertByField(payload, 'teamMembers', 'name', member.name, {
      name: member.name,
      role: member.role,
      displayOrder: idx,
      _status: 'published',
    })
  }
  console.log(`✓ Seeded ${teamMembers.length} team members`)
}

async function seedPortfolios(payload: Payload) {
  const cases = [
    {
      slug: 'atrium-cloud-migration',
      projectName: 'Atrium cloud migration',
      clientName: 'Atrium',
      location: 'Remote',
      yearCompleted: 2025,
      category: 'Cloud Migration',
      tagline:
        'Lifted Atrium\u2019s core platform to a multi-account AWS landing zone with zero customer-facing downtime.',
      description: docFromText(
        'Atrium had outgrown their single-account AWS setup. We redesigned their foundation around AWS Organizations, SSO, and Terraform-managed landing zones, then ran a weekend cutover for production workloads. Monthly cloud bill dropped 38% inside the first quarter through right-sizing and savings plans.',
      ),
    },
    {
      slug: 'bluepeak-managed-it',
      projectName: 'BluePeak managed IT',
      clientName: 'BluePeak',
      location: 'Chicago, IL',
      yearCompleted: 2024,
      category: 'Managed IT',
      tagline:
        'Stood up a 24/7 managed IT practice for a 180-person SaaS company, freeing internal engineers for product work.',
      description: docFromText(
        'BluePeak\u2019s engineering team was spending half their week on IT tickets. We took over endpoint management, identity, patching, and Tier 1\u20133 support. Ticket resolution time dropped from days to hours, and engineers reclaimed roughly 15 focused hours per week each.',
      ),
    },
    {
      slug: 'helios-labs-soc2',
      projectName: 'Helios Labs SOC 2 readiness',
      clientName: 'Helios Labs',
      location: 'Berlin, DE',
      yearCompleted: 2025,
      category: 'Security',
      tagline:
        'Took Helios Labs from \u201Cwhat is a Trust Services Criterion\u201D to Type II SOC 2 in four months.',
      description: docFromText(
        'We ran discovery against the TSC controls, picked a compliance tool, wrote policies that actually match reality, and prepped evidence collection. Helios Labs passed their Type I audit ahead of schedule and their Type II a quarter later.',
      ),
    },
  ]

  for (const [idx, project] of cases.entries()) {
    await upsertBySlug(payload, 'portfolios', project.slug, {
      ...project,
      displayOrder: idx,
      _status: 'published',
    })
  }
  console.log(`✓ Seeded ${cases.length} portfolio case studies`)
}

async function seedPages(payload: Payload) {
  const pages = [
    {
      slug: 'home',
      title: 'Home',
      hero: {
        heading: hero.heading,
        subheading: hero.subheading,
      },
    },
    {
      slug: 'about',
      title: 'About',
      hero: {
        heading: aboutPage.heading,
        subheading: aboutPage.lead,
      },
    },
    {
      slug: 'services',
      title: 'Services',
      hero: {
        heading: 'The work we do, described without marketing fluff.',
        subheading: 'A focused set of services we run every day.',
      },
    },
    {
      slug: 'pricing',
      title: 'Pricing',
      hero: {
        heading: 'Simple pricing. No per-ticket surprises.',
        subheading: pricingTiers[0].description,
      },
    },
    {
      slug: 'contact',
      title: 'Contact',
      hero: {
        heading: 'Let\u2019s talk.',
        subheading:
          'Tell us a bit about your team and what you are trying to improve.',
      },
    },
    {
      slug: 'privacy-policy',
      title: 'Privacy Policy',
      hero: {
        heading: 'Privacy Policy',
        subheading: `How ${siteSettings.siteName} collects, uses, and protects your personal information.`,
      },
    },
  ]

  for (const page of pages) {
    await upsertBySlug(payload, 'pages', page.slug, {
      title: page.title,
      slug: page.slug,
      hero: page.hero,
      _status: 'published',
    })
  }
  console.log(`✓ Seeded ${pages.length} pages`)
}

// ─── Entrypoint ─────────────────────────────────────────────────

async function main() {
  // Quiet usage of imports that seed metadata but don't persist directly.
  void faqs
  void processSteps

  const payload = await getPayload({ config })
  console.log('\nSeeding Northstar IT Services template...\n')

  await upsertAdminUser(payload)
  await seedCategories(payload)
  await seedServices(payload)
  await seedPosts(payload)
  await seedTestimonials(payload)
  await seedTeam(payload)
  await seedPortfolios(payload)
  await seedPages(payload)
  await seedGlobals(payload)

  console.log('\nDone.\n')
  process.exit(0)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
