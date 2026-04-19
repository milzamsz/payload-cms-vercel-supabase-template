import type { FieldHook } from 'payload'

export const populatePublishedAt: FieldHook = ({ data, operation, value }) => {
  if (operation === 'create' || operation === 'update') {
    if (data && data._status === 'published' && !value) {
      return new Date().toISOString()
    }
  }
  return value
}
