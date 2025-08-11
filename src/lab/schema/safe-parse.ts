import type { StandardSchemaV1 } from '@standard-schema/spec'

/**
 * Parses the value using the given schema. Schema must to be synchronous, otherwise
 * parsing will fail with an issue.
 */
export function safeParse<Schema extends StandardSchemaV1>(
  schema: Schema,
  value: StandardSchemaV1.InferInput<Schema>,
): StandardSchemaV1.Result<StandardSchemaV1.InferOutput<Schema>> {
  const result = schema['~standard'].validate(value)

  if (result instanceof Promise) {
    return { issues: [{ message: 'Schema validation must be synchronous' }] }
  }

  return result
}
