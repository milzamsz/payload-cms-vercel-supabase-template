import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { revalidateFrontendGlobals } from '../hooks/revalidateFrontend'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header / Navigation',
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
      label: 'Site Logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'navLinks',
      label: 'Navigation Links',
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'Link Label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
        },
        {
          name: 'subLinks',
          label: 'Dropdown Sub-links',
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
      name: 'ctaButton',
      label: 'Action Button',
      type: 'group',
      fields: [
        {
          name: 'label',
          label: 'Button Label',
          type: 'text',
        },
        {
          name: 'url',
          label: 'Button URL',
          type: 'text',
        },
      ],
    },
  ],
}
