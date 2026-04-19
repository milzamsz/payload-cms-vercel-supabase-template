import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { populatePublishedAt } from '../hooks/populatePublishedAt'
import {
  revalidateMediaMentionAfterChange,
  revalidateMediaMentionAfterDelete,
} from '../hooks/revalidateFrontend'

export const MediaMentions: CollectionConfig = {
  slug: 'mediaMentions',
  labels: {
    singular: 'Media Mention',
    plural: 'Media Mentions',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'source', 'displayDate', 'displayOrder', 'status'],
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
    afterChange: [revalidateMediaMentionAfterChange],
    afterDelete: [revalidateMediaMentionAfterDelete],
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
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'displayDate',
      label: 'Display Date',
      type: 'text',
    },
    {
      name: 'excerpt',
      label: 'Excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'source',
      label: 'Source',
      type: 'text',
    },
    {
      name: 'url',
      label: 'Article / Feature URL',
      type: 'text',
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'displayOrder',
      label: 'Display Order',
      type: 'number',
      defaultValue: 0,
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
