import type { MetadataRoute } from 'next'
import { getServerURL } from '@/utilities/getURL'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getServerURL()
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
