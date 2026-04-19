import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { populatePublishedAt } from '../hooks/populatePublishedAt'
import { HeroBanner } from '../blocks/HeroBanner'
import { Content } from '../blocks/Content'
import { MediaBlock } from '../blocks/MediaBlock'
import { CallToAction } from '../blocks/CallToAction'
import { Gallery } from '../blocks/Gallery'
import { Testimonials } from '../blocks/Testimonials'
import { Stats } from '../blocks/Stats'
import { FAQ } from '../blocks/FAQ'
import {
  revalidateServiceAfterChange,
  revalidateServiceAfterDelete,
} from '../hooks/revalidateFrontend'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'serviceCategory', 'status', 'displayOrder'],
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
    afterChange: [revalidateServiceAfterChange],
    afterDelete: [revalidateServiceAfterDelete],
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
      name: 'name',
      label: 'Service Name',
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
      name: 'serviceCategory',
      label: 'Service Category',
      type: 'select',
      required: true,
      options: [
        { label: 'Managed IT', value: 'managed-it' },
        { label: 'Cloud', value: 'cloud' },
        { label: 'Security', value: 'security' },
        { label: 'Software', value: 'software' },
        { label: 'Data & Automation', value: 'data' },
        { label: 'Support', value: 'support' },
      ],
    },
    {
      name: 'shortDescription',
      label: 'Short Description',
      type: 'textarea',
    },
    {
      name: 'coverImage',
      label: 'Cover Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tagline',
      label: 'Tagline',
      type: 'text',
    },
    {
      name: 'longDescription',
      label: 'Long Description',
      type: 'textarea',
    },
    {
      name: 'features',
      label: 'Feature Tags',
      type: 'array',
      fields: [
        {
          name: 'text',
          label: 'Text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'imageSlides',
      label: 'Listing / Detail Slider Images',
      type: 'array',
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'alt',
          label: 'Alt Text',
          type: 'text',
        },
      ],
    },
    {
      name: 'gallery',
      label: 'Gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'caption',
          label: 'Caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'specs',
      label: 'Specifications',
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          label: 'Value',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'whyChoose',
      label: 'Why Choose This',
      type: 'array',
      fields: [
        {
          name: 'icon',
          label: 'Icon',
          type: 'text',
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'text',
          label: 'Text',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'faq',
      label: 'FAQ',
      type: 'array',
      fields: [
        {
          name: 'question',
          label: 'Question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          label: 'Answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'whatsappNumber',
      label: 'WhatsApp Number',
      type: 'text',
      admin: {
        description: 'Optional override for product/program CTAs.',
      },
    },
    {
      name: 'ctaLinks',
      label: 'CTA Links',
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
        },
        {
          name: 'style',
          label: 'Style',
          type: 'select',
          defaultValue: 'text',
          options: [
            { label: 'Text Link', value: 'text' },
            { label: 'Primary Button', value: 'primary' },
            { label: 'Secondary Button', value: 'secondary' },
          ],
        },
      ],
    },
    {
      name: 'layout',
      label: 'Page Content',
      type: 'blocks',
      blocks: [
        HeroBanner,
        Content,
        MediaBlock,
        CallToAction,
        Gallery,
        Testimonials,
        Stats,
        FAQ,
      ],
    },
    {
      name: 'publishedAt',
      label: 'Publish Date',
      type: 'date',
      hooks: {
        beforeChange: [populatePublishedAt],
      },
    },
    {
      name: 'displayOrder',
      label: 'Display Order',
      type: 'number',
      admin: {
        description: 'Controls the order on the services listing page',
      },
    },
  ],
}
