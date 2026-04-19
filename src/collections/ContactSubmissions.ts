import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contactSubmissions',
  labels: {
    singular: 'Contact Message',
    plural: 'Contact Messages',
  },
  admin: {
    useAsTitle: 'senderName',
    defaultColumns: ['senderName', 'email', 'subject', 'status', 'receivedOn'],
    description: 'Messages received via the contact form. Read-only — do not edit submissions.',
  },
  access: {
    create: () => false,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'senderName',
      label: 'Sender Name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
    },
    {
      name: 'subject',
      label: 'Subject',
      type: 'text',
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Read', value: 'read' },
        { label: 'Replied', value: 'replied' },
      ],
    },
    {
      name: 'receivedOn',
      label: 'Received On',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        readOnly: true,
      },
    },
  ],
}
