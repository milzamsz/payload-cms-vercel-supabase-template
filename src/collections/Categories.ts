import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import {
  revalidateCategoryAfterChange,
  revalidateCategoryAfterDelete,
} from '../hooks/revalidateFrontend'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
  },
  hooks: {
    afterChange: [revalidateCategoryAfterChange],
    afterDelete: [revalidateCategoryAfterDelete],
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
      label: 'Category Name',
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
        description: 'Auto-generated from category name',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    // parent field is added automatically by nestedDocsPlugin
  ],
}
