import type { Block } from 'payload'

export const Gallery: Block = {
  slug: 'gallery',
  labels: {
    singular: 'Image Gallery',
    plural: 'Image Galleries',
  },
  fields: [
    {
      name: 'images',
      label: 'Images',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          label: 'Caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'layout',
      label: 'Layout',
      type: 'select',
      defaultValue: 'carousel',
      options: [
        { label: 'Carousel', value: 'carousel' },
        { label: 'Grid', value: 'grid' },
        { label: 'Masonry', value: 'masonry' },
      ],
    },
  ],
}
