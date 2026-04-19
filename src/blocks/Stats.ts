import type { Block } from 'payload'

export const Stats: Block = {
  slug: 'stats',
  labels: {
    singular: 'Key Numbers',
    plural: 'Key Numbers Blocks',
  },
  fields: [
    {
      name: 'heading',
      label: 'Section Heading',
      type: 'text',
    },
    {
      name: 'stats',
      label: 'Stats',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'number',
          label: 'Number',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          label: 'Icon (Lucide icon name)',
          type: 'text',
        },
      ],
    },
  ],
}
