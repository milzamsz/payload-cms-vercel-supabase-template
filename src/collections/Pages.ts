import type { CollectionConfig, Field } from 'payload'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { isAdminOrEditor } from '../access/isAdminOrEditor'
import { populatePublishedAt } from '../hooks/populatePublishedAt'
import { HeroBanner } from '../blocks/HeroBanner'
import { Content } from '../blocks/Content'
import { MediaBlock } from '../blocks/MediaBlock'
import { CallToAction } from '../blocks/CallToAction'
import { Gallery } from '../blocks/Gallery'
import { ServiceCards } from '../blocks/ServiceCards'
import { Testimonials } from '../blocks/Testimonials'
import { MapBlock } from '../blocks/MapBlock'
import { Stats } from '../blocks/Stats'
import { FAQ } from '../blocks/FAQ'
import {
  revalidatePageAfterChange,
  revalidatePageAfterDelete,
} from '../hooks/revalidateFrontend'

const sectionCondition = (...keys: string[]) => ({
  condition: (_: unknown, siblingData: Record<string, unknown>) => {
    const candidate =
      typeof siblingData?.pageType === 'string'
        ? siblingData.pageType
        : siblingData?.slug

    return typeof candidate === 'string' && keys.includes(candidate)
  },
})

const uploadField = (name: string, label: string): Field => ({
  name,
  label,
  type: 'upload',
  relationTo: 'media',
})

const ctaFields: Field[] = [
  {
    name: 'label',
    label: 'Label',
    type: 'text',
  },
  {
    name: 'url',
    label: 'URL',
    type: 'text',
  },
]

const pageSection = (
  name: string,
  label: string,
  keys: string[],
  fields: Field[],
): Field => ({
  name,
  label,
  type: 'group',
  admin: sectionCondition(...keys),
  fields,
})

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'publishedAt'],
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
    afterChange: [revalidatePageAfterChange],
    afterDelete: [revalidatePageAfterDelete],
  },
  access: {
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: authenticatedOrPublished,
    update: isAdminOrEditor,
    readVersions: isAdminOrEditor,
  },
  fields: [
    {
      name: 'title',
      label: 'Page Title',
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
        description: 'Auto-generated from title, e.g. about-us',
      },
    },
    {
      name: 'pageType',
      label: 'Page Type',
      type: 'select',
      admin: {
        description:
          'Select the matching frontend page to show page-specific content fields.',
      },
      options: [
        { label: 'Home', value: 'home' },
        { label: 'About', value: 'about' },
        { label: 'Why Garden', value: 'why-garden' },
        { label: 'Contact', value: 'contact' },
        { label: 'Media', value: 'media' },
        { label: 'Educational Program', value: 'educational-program' },
        { label: 'Garden Product', value: 'garden-product' },
        { label: 'Landscaping Consultancy', value: 'landscaping-consultancy' },
        { label: 'Movement', value: 'movement' },
        { label: 'Privacy Policy', value: 'privacy-policy' },
      ],
    },
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          label: 'Meta Title',
          type: 'text',
        },
        {
          name: 'metaDescription',
          label: 'Meta Description',
          type: 'textarea',
        },
        {
          name: 'canonicalUrl',
          label: 'Canonical URL',
          type: 'text',
        },
        uploadField('ogImage', 'Open Graph Image'),
      ],
    },
    {
      name: 'hero',
      label: 'Hero Section',
      type: 'group',
      fields: [
        {
          name: 'heading',
          label: 'Heading',
          type: 'text',
        },
        {
          name: 'subheading',
          label: 'Subheading',
          type: 'text',
        },
        {
          name: 'backgroundImage',
          label: 'Background Image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'backgroundVideo',
          label: 'Background Video URL',
          type: 'text',
        },
        {
          name: 'buttonText',
          label: 'Button Text',
          type: 'text',
        },
        {
          name: 'buttonLink',
          label: 'Button Link',
          type: 'text',
        },
      ],
    },
    pageSection('homeSections', 'Home Page Sections', ['home'], [
      {
        name: 'whyGarden',
        label: 'Why Garden Section',
        type: 'group',
        fields: [
          { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { name: 'heading', label: 'Heading', type: 'text' },
          {
            name: 'items',
            label: 'Items',
            type: 'array',
            fields: [
              { name: 'itemId', label: 'Item ID', type: 'text', required: true },
              { name: 'tag', label: 'Tag', type: 'text', required: true },
              { name: 'description', label: 'Description', type: 'textarea' },
              uploadField('image', 'Image'),
            ],
          },
        ],
      },
      {
        name: 'aboutExcerpt',
        label: 'About Excerpt',
        type: 'group',
        fields: [
          { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'content', label: 'Content', type: 'textarea' },
          uploadField('image', 'Image'),
          {
            name: 'cta',
            label: 'CTA',
            type: 'group',
            fields: ctaFields,
          },
        ],
      },
      {
        name: 'whatWeDo',
        label: 'What We Do Section',
        type: 'group',
        fields: [
          { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { name: 'heading', label: 'Heading', type: 'text' },
          {
            name: 'cards',
            label: 'Cards',
            type: 'array',
            fields: [
              { name: 'title', label: 'Title', type: 'text', required: true },
              { name: 'summary', label: 'Summary', type: 'textarea' },
              uploadField('image', 'Image'),
              { name: 'href', label: 'Link URL', type: 'text', required: true },
            ],
          },
        ],
      },
      {
        name: 'gardenVisit',
        label: 'Garden Visit Section',
        type: 'group',
        fields: [
          { name: 'heading', label: 'Heading', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'mapLabel', label: 'Map Label', type: 'text' },
          {
            name: 'slides',
            label: 'Slider Images',
            type: 'array',
            fields: [
              uploadField('image', 'Image'),
              { name: 'alt', label: 'Alt Text', type: 'text' },
              { name: 'caption', label: 'Caption', type: 'text' },
            ],
          },
        ],
      },
      {
        name: 'finalCta',
        label: 'Final CTA',
        type: 'group',
        fields: [
          { name: 'heading', label: 'Heading', type: 'text' },
          { name: 'highlightedText', label: 'Highlighted Text', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          uploadField('backgroundImage', 'Background Image'),
          {
            name: 'primaryCta',
            label: 'Primary CTA',
            type: 'group',
            fields: ctaFields,
          },
          {
            name: 'secondaryCta',
            label: 'Secondary CTA',
            type: 'group',
            fields: ctaFields,
          },
        ],
      },
    ]),
    pageSection('aboutSections', 'About Page Sections', ['about'], [
      {
        name: 'story',
        label: 'Story Section',
        type: 'group',
        fields: [
          { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { name: 'heading', label: 'Heading', type: 'text' },
          uploadField('image', 'Image'),
          {
            name: 'paragraphs',
            label: 'Paragraphs',
            type: 'array',
            fields: [{ name: 'text', label: 'Text', type: 'textarea' }],
          },
        ],
      },
      {
        name: 'values',
        label: 'Values',
        type: 'array',
        fields: [
          { name: 'icon', label: 'Icon', type: 'text' },
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea' },
          uploadField('image', 'Image'),
        ],
      },
      {
        name: 'timeline',
        label: 'Timeline',
        type: 'array',
        fields: [
          { name: 'year', label: 'Year', type: 'text', required: true },
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        name: 'teamIntro',
        label: 'Team Intro',
        type: 'group',
        fields: [
          { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { name: 'heading', label: 'Heading', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        name: 'cta',
        label: 'CTA',
        type: 'group',
        fields: [
          { name: 'heading', label: 'Heading', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
      },
    ]),
    pageSection('whyGardenSections', 'Why Garden Page Sections', ['why-garden'], [
      {
        name: 'items',
        label: 'Why Garden Items',
        type: 'array',
        fields: [
          { name: 'itemId', label: 'Item ID', type: 'text', required: true },
          { name: 'tag', label: 'Tag', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea' },
          uploadField('image', 'Image'),
        ],
      },
      {
        name: 'feedback',
        label: 'How We Work',
        type: 'group',
        fields: [
          { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { name: 'heading', label: 'Heading', type: 'text' },
          { name: 'content', label: 'Content', type: 'textarea' },
        ],
      },
      {
        name: 'stories',
        label: 'Featured Stories',
        type: 'array',
        fields: [
          { name: 'storyId', label: 'Story ID', type: 'text', required: true },
          { name: 'label', label: 'Label', type: 'text' },
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea' },
          uploadField('image', 'Image'),
          { name: 'linkText', label: 'Link Text', type: 'text' },
          { name: 'linkUrl', label: 'Link URL', type: 'text' },
          { name: 'color', label: 'Accent Color', type: 'text' },
        ],
      },
      {
        name: 'storiesHeading',
        label: 'Featured Stories Heading',
        type: 'text',
      },
      {
        name: 'resources',
        label: 'Resources Section',
        type: 'group',
        fields: [
          { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { name: 'heading', label: 'Heading', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'plantStoryHeading', label: 'Plant Story Heading', type: 'text' },
          {
            name: 'plantStoryDescription',
            label: 'Plant Story Description',
            type: 'textarea',
          },
          { name: 'plantStoryButtonText', label: 'Plant Story Button Text', type: 'text' },
          uploadField('plantStoryImage', 'Plant Story Image'),
          { name: 'blogHeading', label: 'Blog Heading', type: 'text' },
          {
            name: 'blogLinks',
            label: 'Blog Category Links',
            type: 'array',
            fields: [
              { name: 'label', label: 'Label', type: 'text', required: true },
              { name: 'url', label: 'URL', type: 'text', required: true },
              { name: 'colorClass', label: 'Color Classes', type: 'text' },
            ],
          },
        ],
      },
    ]),
    pageSection('contactSections', 'Contact Page Sections', ['contact'], [
      {
        name: 'formIntro',
        label: 'Form Intro',
        type: 'group',
        fields: [
          { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { name: 'heading', label: 'Heading', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
      },
    ]),
    pageSection('mediaSections', 'Media Page Sections', ['media'], [
      {
        name: 'cardImages',
        label: 'Fallback Card Images',
        type: 'array',
        fields: [
          uploadField('image', 'Image'),
          { name: 'alt', label: 'Alt Text', type: 'text' },
        ],
      },
    ]),
    pageSection(
      'serviceIndexSections',
      'Service Index Page Sections',
      ['educational-program', 'garden-product', 'landscaping-consultancy', 'movement'],
      [
        {
          name: 'cta',
          label: 'CTA',
          type: 'group',
          fields: [
            { name: 'icon', label: 'Icon', type: 'text' },
            { name: 'heading', label: 'Heading', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            {
              name: 'primaryCta',
              label: 'Primary CTA',
              type: 'group',
              fields: ctaFields,
            },
            {
              name: 'secondaryCta',
              label: 'Secondary CTA',
              type: 'group',
              fields: ctaFields,
            },
          ],
        },
      ],
    ),
    pageSection('privacyPolicySections', 'Privacy Policy Sections', ['privacy-policy'], [
      { name: 'effectiveDate', label: 'Effective Date', type: 'text' },
      {
        name: 'sections',
        label: 'Policy Sections',
        type: 'array',
        fields: [
          { name: 'heading', label: 'Heading', type: 'text', required: true },
          { name: 'body', label: 'Body', type: 'textarea', required: true },
        ],
      },
    ]),
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
        ServiceCards,
        Testimonials,
        MapBlock,
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
  ],
}
