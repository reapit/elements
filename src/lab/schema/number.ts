import type { StandardSchemaV1 } from '@standard-schema/spec'

interface NumberSchema extends StandardSchemaV1<number> {
  message: string
}

/**
 * A standard schema that validates a value as a number.
 */
export function number(message: string = 'Invalid type'): NumberSchema {
  return {
    message,
    '~standard': {
      vendor: '@reapit/elements',
      version: 1,
      validate(value) {
        return typeof value !== 'number' ? { issues: [{ message }] } : { value }
      },
    },
  }
}
