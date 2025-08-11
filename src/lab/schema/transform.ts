import type { StandardSchemaV1 } from '@standard-schema/spec'

interface TransformSchema<Transformer extends (value: any) => any>
  extends StandardSchemaV1<
    StandardSchemaV1.InferInput<any> | null | undefined,
    StandardSchemaV1.InferOutput<ReturnType<Transformer>> | null | undefined
  > {}

/**
 * A standard schema that transforms a value using the provided transform function. Any error thrown
 * by the transform will be reported as a validation issue.
 */
export function transform<Transformer extends (value: any) => any>(fn: Transformer): TransformSchema<Transformer> {
  return {
    '~standard': {
      vendor: '@reapit/elements',
      version: 1,
      validate(value) {
        try {
          return { value: fn(value) }
        } catch (error) {
          if (error instanceof Error) {
            return { issues: [{ message: error.message }] }
          } else {
            return { issues: [{ message: String(error) }] }
          }
        }
      },
    },
  }
}
