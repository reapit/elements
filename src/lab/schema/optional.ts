import { safeParse } from './safe-parse'

import type { StandardSchemaV1 } from '@standard-schema/spec'

interface OptionalSchema<Schema extends StandardSchemaV1>
  extends StandardSchemaV1<
    StandardSchemaV1.InferInput<Schema> | undefined,
    StandardSchemaV1.InferOutput<Schema> | undefined
  > {}

/**
 * A standard schema that validates a value according the provided schema, but also allows
 * the value to be undefined.
 */
export function optional<Schema extends StandardSchemaV1>(schema: Schema): OptionalSchema<Schema> {
  return {
    '~standard': {
      vendor: '@reapit/elements',
      version: 1,
      validate(value) {
        return value === undefined ? { value } : safeParse(schema, value)
      },
    },
  }
}
