import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { defaultLexical } from '../fields/defaultLexical'
import { populatePublishedAt } from '../hooks/populatePublishedAt'
import {
  revalidatePortfolioAfterChange,
  revalidatePortfolioAfterDelete,
} from '../hooks/revalidateFrontend'

export const Portfolios: CollectionConfig = {
  slug: 'portfolios',
  labels: {
    singular: 'Portfolio',
    plural: 'Portfolios',
  },
  admin: {
    useAsTitle: 'projectName',
    defaultColumns: ['projectName', 'location', 'yearCompleted', 'status'],
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
    afterChange: [revalidatePortfolioAfterChange],
    afterDelete: [revalidatePortfolioAfterDelete],
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
      name: 'projectName',
      label: 'Project Name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'clientName',
      label: 'Client Name',
      type: 'text',
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
    },
    {
      name: 'yearCompleted',
      label: 'Year Completed',
      type: 'number',
    },
    {
      name: 'category',
      label: 'Project Category',
      type: 'select',
      options: [
        { label: 'Cloud Migration', value: 'Cloud Migration' },
        { label: 'Security', value: 'Security' },
        { label: 'Managed IT', value: 'Managed IT' },
        { label: 'Custom Software', value: 'Custom Software' },
        { label: 'Data & Automation', value: 'Data & Automation' },
      ],
    },
    {
      name: 'tagline',
      label: 'Project Tagline',
      type: 'textarea',
    },
    {
      name: 'area',
      label: 'Area',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Project Description',
      type: 'richText',
      editor: defaultLexical,
    },
    {
      name: 'coverImage',
      label: 'Cover Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      label: 'Photo Gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          label: 'Alt Text',
          type: 'text',
        },
        {
          name: 'label',
          label: 'Image Label',
          type: 'text',
        },
        {
          name: 'badge',
          label: 'Badge',
          type: 'text',
        },
        {
          name: 'caption',
          label: 'Caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'plants',
      label: 'Plants Used',
      type: 'relationship',
      relationTo: 'plants',
      hasMany: true,
    },
    {
      name: 'relatedServices',
      label: 'Related Services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },
    {
      name: 'publishedAt',
      label: 'Publish Date',
      type: 'date',
      hooks: {
        beforeChange: [populatePublishedAt],
      },
    },
  ],
}
