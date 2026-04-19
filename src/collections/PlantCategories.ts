import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import {
  revalidatePlantCategoryAfterChange,
  revalidatePlantCategoryAfterDelete,
} from '../hooks/revalidateFrontend'

export const PlantCategories: CollectionConfig = {
  slug: 'plantCategories',
  labels: {
    singular: 'Plant Type',
    plural: 'Plant Types',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
  },
  hooks: {
    afterChange: [revalidatePlantCategoryAfterChange],
    afterDelete: [revalidatePlantCategoryAfterDelete],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      label: 'Type Name',
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
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
  ],
}
