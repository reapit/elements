import { safeParse } from './safe-parse'
import type { StandardSchemaV1 } from '@standard-schema/spec'

/**
 * Parses the value using the given schema. If any issues are encountered, an error will be thrown.
 */
export function parse<Schema extends StandardSchemaV1>(
  schema: Schema,
  data: StandardSchemaV1.InferInput<Schema>,
): StandardSchemaV1.InferOutput<Schema> {
  const result = safeParse(schema, data)

  if (result.issues) {
    throw new ParseError(result.issues)
  }

  return result.value
}
