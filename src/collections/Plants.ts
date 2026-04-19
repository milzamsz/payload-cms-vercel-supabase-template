import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { defaultLexical } from '../fields/defaultLexical'
import { populatePublishedAt } from '../hooks/populatePublishedAt'
import {
  revalidatePlantAfterChange,
  revalidatePlantAfterDelete,
} from '../hooks/revalidateFrontend'

export const Plants: CollectionConfig = {
  slug: 'plants',
  labels: {
    singular: 'Plant',
    plural: 'Plants',
  },
  admin: {
    useAsTitle: 'commonName',
    defaultColumns: ['commonName', 'scientificName', 'status', 'publishedAt'],
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
    afterChange: [revalidatePlantAfterChange],
    afterDelete: [revalidatePlantAfterDelete],
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
      name: 'commonName',
      label: 'Common Name',
      type: 'text',
      required: true,
    },
    {
      name: 'scientificName',
      label: 'Scientific Name',
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
      name: 'plantFamily',
      label: 'Plant Family',
      type: 'text',
    },
    {
      name: 'origin',
      label: 'Origin / Native Region',
      type: 'textarea',
    },
    {
      name: 'mainPhoto',
      label: 'Main Photo',
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
      ],
    },
    {
      name: 'careGuide',
      label: 'Care Guide',
      type: 'group',
      fields: [
        {
          name: 'sunlight',
          label: 'Sunlight Needs',
          type: 'text',
        },
        {
          name: 'watering',
          label: 'Watering',
          type: 'text',
        },
        {
          name: 'soil',
          label: 'Soil Type',
          type: 'text',
        },
        {
          name: 'temperature',
          label: 'Temperature',
          type: 'text',
        },
        {
          name: 'humidity',
          label: 'Humidity',
          type: 'text',
        },
      ],
    },
    {
      name: 'ecologicalRole',
      label: 'Ecological Role',
      type: 'richText',
      editor: defaultLexical,
    },
    {
      name: 'benefits',
      label: 'Ecological Benefits',
      type: 'array',
      fields: [
        {
          name: 'icon',
          label: 'Icon',
          type: 'text',
        },
        {
          name: 'text',
          label: 'Text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'designersNote',
      label: "Designer's Note",
      type: 'group',
      fields: [
        {
          name: 'quote',
          label: 'Quote',
          type: 'textarea',
        },
        {
          name: 'author',
          label: 'Author',
          type: 'text',
        },
      ],
    },
    {
      name: 'plantType',
      label: 'Plant Type',
      type: 'relationship',
      relationTo: 'plantCategories',
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
