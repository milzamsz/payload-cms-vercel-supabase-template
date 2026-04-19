import type { Block } from 'payload'

export const HeroBanner: Block = {
  slug: 'heroBanner',
  labels: {
    singular: 'Hero Banner',
    plural: 'Hero Banners',
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      label: 'Subheading',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'backgroundVideo',
      label: 'Background Video URL',
      type: 'text',
    },
    {
      name: 'buttonText',
      label: 'Button Text',
      type: 'text',
    },
    {
      name: 'buttonLink',
      label: 'Button Link',
      type: 'text',
    },
    {
      name: 'style',
      label: 'Layout Style',
      type: 'select',
      defaultValue: 'centered',
      options: [
        { label: 'Centered', value: 'centered' },
        { label: 'Left Aligned', value: 'left' },
        { label: 'Overlay', value: 'overlay' },
      ],
    },
  ],
}
