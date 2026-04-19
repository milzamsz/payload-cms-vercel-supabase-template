import type { Block } from 'payload'
import { defaultLexical } from '../fields/defaultLexical'

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: 'Text Content',
    plural: 'Text Content Blocks',
  },
  fields: [
    {
      name: 'columns',
      label: 'Column Layout',
      type: 'select',
      defaultValue: '1',
      options: [
        { label: '1 Column', value: '1' },
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
      ],
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      editor: defaultLexical,
      required: true,
    },
  ],
}
