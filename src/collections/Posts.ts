import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { defaultLexical } from '../fields/defaultLexical'
import { populatePublishedAt } from '../hooks/populatePublishedAt'
import {
  revalidatePostAfterChange,
  revalidatePostAfterDelete,
} from '../hooks/revalidateFrontend'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt', 'author'],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
  hooks: {
    afterChange: [revalidatePostAfterChange],
    afterDelete: [revalidatePostAfterDelete],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    readVersions: authenticated,
  },
  fields: [
    {
      name: 'title',
      label: 'Article Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Auto-generated from title, e.g. tips-menanam-tomat',
      },
    },
    {
      name: 'excerpt',
      label: 'Short Summary',
      type: 'textarea',
    },
    {
      name: 'featuredImage',
      label: 'Cover Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      label: 'Article Body',
      type: 'richText',
      editor: defaultLexical,
      required: true,
    },
    {
      name: 'contentBlocks',
      label: 'Structured Article Blocks',
      type: 'array',
      admin: {
        description:
          'Optional structured blocks used by the bespoke article template for callouts and full-width images.',
      },
      fields: [
        {
          name: 'blockType',
          label: 'Block Type',
          type: 'select',
          required: true,
          options: [
            { label: 'Heading', value: 'heading' },
            { label: 'Paragraph', value: 'paragraph' },
            { label: 'Full Image', value: 'full-image' },
            { label: 'Callout', value: 'callout' },
          ],
        },
        {
          name: 'text',
          label: 'Text',
          type: 'textarea',
        },
        {
          name: 'title',
          label: 'Callout Title',
          type: 'text',
        },
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'alt',
          label: 'Image Alt Text',
          type: 'text',
        },
        {
          name: 'caption',
          label: 'Image Caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'categories',
      label: 'Categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          label: 'Tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'relatedPosts',
      label: 'Related Posts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
    },
    {
      name: 'author',
      label: 'Author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'publishedAt',
      label: 'Publish Date',
      type: 'date',
      required: true,
      hooks: {
        beforeChange: [populatePublishedAt],
      },
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'readingTime',
      label: 'Reading Time (minutes)',
      type: 'number',
    },
  ],
}
