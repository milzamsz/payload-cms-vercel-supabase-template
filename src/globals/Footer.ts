import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { revalidateFrontendGlobals } from '../hooks/revalidateFrontend'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  hooks: {
    afterChange: [revalidateFrontendGlobals],
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'logo',
      label: 'Footer Logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tagline',
      label: 'Tagline',
      type: 'text',
    },
    {
      name: 'columns',
      label: 'Footer Columns',
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Column Title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          label: 'Links',
          type: 'array',
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      label: 'Social Media Links',
      type: 'array',
      fields: [
        {
          name: 'platform',
          label: 'Platform',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'showNewsletter',
      label: 'Show Newsletter Form',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'copyrightText',
      label: 'Copyright Text',
      type: 'text',
      defaultValue: '© 2026 Northstar IT Services. All rights reserved.',
    },
  ],
}
