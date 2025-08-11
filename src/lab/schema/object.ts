import { safeParse } from './safe-parse'
import { scopeAllIssuesToPath } from './common/scope-issue-to-path'

import type { StandardSchemaV1 } from '@standard-schema/spec'

type ObjectProperties = Record<PropertyKey, StandardSchemaV1>
type InferObjectOutput<Properties extends ObjectProperties> = {
  [K in keyof Properties]: StandardSchemaV1.InferOutput<Properties[K]>
}

interface ObjectSchema<Properties extends ObjectProperties>
  extends StandardSchemaV1<Record<PropertyKey, any>, InferObjectOutput<Properties>> {
  message: string
  properties: Properties
}

/**
 * A standard schema that validates key-value pairs in an object based on the specified
 * object properties and their associated standard schemas.
 */
export function object<Properties extends ObjectProperties>(
  properties: Properties,
  message: string = 'Invalid type',
): ObjectSchema<Properties> {
  return {
    message,
    properties,
    '~standard': {
      vendor: '@reapit/elements',
      version: 1,
      validate(value) {
        if (!isPlainObject(value)) {
          return { issues: [{ message }] }
        }

        const issues: StandardSchemaV1.Issue[] = []
        const parsedProperties = new Map()

        for (const [key, schema] of Object.entries(properties)) {
          const rawValue = value[key]
          const result = safeParse(schema, rawValue)

          if (result.issues) {
            issues.push(...scopeAllIssuesToPath(key, result.issues))
          } else {
            parsedProperties.set(key, result.value)
          }
        }

        if (issues.length > 0) {
          return { issues }
        }

        return { value: Object.fromEntries(parsedProperties) }
      },
    },
  }
}

function isPlainObject(value: unknown): value is Record<PropertyKey, unknown> {
  return !!value && Object.getPrototypeOf(value) === Object.prototype
}
