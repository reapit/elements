import { safeParse } from './safe-parse'

import type { StandardSchemaV1 } from '@standard-schema/spec'

interface NullableSchema<Schema extends StandardSchemaV1>
  extends StandardSchemaV1<StandardSchemaV1.InferInput<Schema> | null, StandardSchemaV1.InferOutput<Schema> | null> {}

/**
 * A standard schema that validates a value according the provided schema, but also allows
 * the value to be null.
 */
export function nullable<Schema extends StandardSchemaV1>(schema: Schema): NullableSchema<Schema> {
  return {
    '~standard': {
      vendor: '@reapit/elements',
      version: 1,
      validate(value) {
        return value === null ? { value } : safeParse(schema, value)
      },
    },
  }
}
