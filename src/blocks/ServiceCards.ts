import type { Block } from 'payload'

export const ServiceCards: Block = {
  slug: 'serviceCards',
  labels: {
    singular: 'Service Cards',
    plural: 'Service Cards Blocks',
  },
  fields: [
    {
      name: 'heading',
      label: 'Section Heading',
      type: 'text',
    },
    {
      name: 'services',
      label: 'Services to Show',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },
    {
      name: 'columns',
      label: 'Number of Columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
  ],
}
