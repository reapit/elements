import { safeParse } from './safe-parse'

import type { StandardSchemaV1 } from '@standard-schema/spec'

interface NullishSchema<Schema extends StandardSchemaV1>
  extends StandardSchemaV1<
    StandardSchemaV1.InferInput<Schema> | null | undefined,
    StandardSchemaV1.InferOutput<Schema> | null | undefined
  > {}

/**
 * A standard schema that validates a value according the provided schema, but also allows
 * the value to be null or undefined.
 */
export function nullish<Schema extends StandardSchemaV1>(schema: Schema): NullishSchema<Schema> {
  return {
    '~standard': {
      vendor: '@reapit/elements',
      version: 1,
      validate(value) {
        // NOTE: We're deliberately using loose equality comparison (!=) because we want it to treat
        // null and undefined as loosely equal (which nets us "not nullish" behaviour).
        // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality
        return value == null ? { value } : safeParse(schema, value)
      },
    },
  }
}
