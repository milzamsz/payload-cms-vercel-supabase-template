import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { populatePublishedAt } from '../hooks/populatePublishedAt'
import {
  revalidateTestimonialAfterChange,
  revalidateTestimonialAfterDelete,
} from '../hooks/revalidateFrontend'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'authorRole', 'displayOrder', 'status'],
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
    afterChange: [revalidateTestimonialAfterChange],
    afterDelete: [revalidateTestimonialAfterDelete],
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
    {
      name: 'backgroundImage',
      label: 'Section Background Image',
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
