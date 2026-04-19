import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials Blocks',
  },
  fields: [
    {
      name: 'heading',
      label: 'Section Heading',
      type: 'text',
    },
    {
      name: 'testimonials',
      label: 'Testimonials',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'quote',
          label: 'Quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'authorName',
          label: 'Author Name',
          type: 'text',
          required: true,
        },
        {
          name: 'authorRole',
          label: 'Author Role / Title',
          type: 'text',
        },
        {
          name: 'authorPhoto',
          label: 'Author Photo',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
