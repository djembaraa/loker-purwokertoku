import { type SchemaTypeDefinition } from 'sanity'
import { jobPosting } from './jobPosting'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [jobPosting],
}