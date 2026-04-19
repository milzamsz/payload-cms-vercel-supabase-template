import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Plants } from './collections/Plants'
import { PlantCategories } from './collections/PlantCategories'
import { Services } from './collections/Services'
import { Portfolios } from './collections/Portfolios'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Testimonials } from './collections/Testimonials'
import { TeamMembers } from './collections/TeamMembers'
import { MediaMentions } from './collections/MediaMentions'

import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'
import { EmailSettings } from './globals/EmailSettings'

import { plugins } from './plugins'
import { getAllowedOrigins, getServerURL } from './utilities/getURL'
import { createPayloadEmailAdapter } from './utilities/resendEmailAdapter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    suppressHydrationWarning: true,
    components: {
      graphics: {
        Logo: './components/payload/AdminLogo#AdminLogo',
      },
      providers: ['./components/payload/TwoFactorProvider#TwoFactorProvider'],
      views: {
        twoFactorVerify: {
          Component: './components/payload/TwoFactorAdminPage#TwoFactorAdminPage',
          path: '/2fa',
        },
        twoFactorSetup: {
          Component: './components/payload/TwoFactorSetupPage#TwoFactorSetupPage',
          path: '/2fa-setup',
        },
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },

  collections: [
    Users,
    Media,
    Pages,
    Posts,
    Categories,
    Plants,
    PlantCategories,
    Services,
    Portfolios,
    Testimonials,
    TeamMembers,
    MediaMentions,
    ContactSubmissions,
  ],

  globals: [Header, Footer, SiteSettings, EmailSettings],

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    push: false,
  }),

  editor: lexicalEditor(),

  email: createPayloadEmailAdapter(),

  plugins: [
    ...plugins,
    s3Storage({
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename: file }) =>
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.S3_BUCKET}/${file}`,
          prefix: 'uploads',
        },
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'ap-southeast-1',
        forcePathStyle: true,
      },
    }),
  ],

  cors: getAllowedOrigins(),

  csrf: getAllowedOrigins(),

  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-in-production',

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  serverURL: getServerURL(),

  upload: {
    limits: {
      fileSize: 10_000_000, // 10MB
    },
  },
})
