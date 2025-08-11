import type { StandardSchemaV1 } from '@standard-schema/spec'

interface StringSchema extends StandardSchemaV1<string> {
  message: string
}

/**
 * A standard schema that validates a value as a string.
 */
export function string(message: string = 'Invalid type'): StringSchema {
  return {
    message,
    '~standard': {
      vendor: '@reapit/elements',
      version: 1,
      validate(value) {
        return typeof value !== 'string' ? { issues: [{ message }] } : { value }
      },
    },
  }
}
