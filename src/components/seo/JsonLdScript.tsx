import { siteSettings } from '@/lib/it-services-content'
import { getServerURL } from '@/utilities/getURL'

export function JsonLdScript() {
  const baseUrl = getServerURL()

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteSettings.siteName,
    url: baseUrl,
    description: siteSettings.description,
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteSettings.email,
      telephone: siteSettings.phone,
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
  }

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteSettings.siteName,
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
  )
}
