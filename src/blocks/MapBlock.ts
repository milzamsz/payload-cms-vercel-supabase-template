import type { Block } from 'payload'

export const MapBlock: Block = {
  slug: 'mapBlock',
  labels: {
    singular: 'Map',
    plural: 'Map Blocks',
  },
  fields: [
    {
      name: 'embedUrl',
      label: 'Google Maps Embed URL',
      type: 'text',
      required: true,
    },
    {
      name: 'label',
      label: 'Map Label',
      type: 'text',
    },
    {
      name: 'height',
      label: 'Height (px)',
      type: 'number',
      defaultValue: 400,
    },
  ],
}
