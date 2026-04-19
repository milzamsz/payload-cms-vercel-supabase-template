import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  labels: {
    singular: 'Image / Video',
    plural: 'Image / Video Blocks',
  },
  fields: [
    {
      name: 'media',
      label: 'Media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      label: 'Caption',
      type: 'text',
    },
    {
      name: 'layout',
      label: 'Layout',
      type: 'select',
      defaultValue: 'fullWidth',
      options: [
        { label: 'Full Width', value: 'fullWidth' },
        { label: 'Inset', value: 'inset' },
        { label: 'Float Left', value: 'floatLeft' },
        { label: 'Float Right', value: 'floatRight' },
      ],
    },
  ],
}
