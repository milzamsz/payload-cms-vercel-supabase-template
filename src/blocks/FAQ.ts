import type { Block } from 'payload'

export const FAQ: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQ Blocks',
  },
  fields: [
    {
      name: 'heading',
      label: 'Section Title',
      type: 'text',
    },
    {
      name: 'items',
      label: 'FAQ Items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'question',
          label: 'Question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          label: 'Answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
