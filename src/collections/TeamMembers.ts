import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { populatePublishedAt } from '../hooks/populatePublishedAt'
import {
  revalidateTeamMemberAfterChange,
  revalidateTeamMemberAfterDelete,
} from '../hooks/revalidateFrontend'

export const TeamMembers: CollectionConfig = {
  slug: 'teamMembers',
  labels: {
    singular: 'Team Member',
    plural: 'Team Members',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'displayOrder', 'status'],
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
    afterChange: [revalidateTeamMemberAfterChange],
    afterDelete: [revalidateTeamMemberAfterDelete],
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
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Role',
      type: 'text',
      required: true,
    },
    {
      name: 'photo',
      label: 'Photo',
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
