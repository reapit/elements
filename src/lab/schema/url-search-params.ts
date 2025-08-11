import { safeParse } from './safe-parse'
import { scopeAllIssuesToPath } from './common/scope-issue-to-path'
import { toMap } from '#src/utils/url-search-params'

import type { StandardSchemaV1 } from '@standard-schema/spec'

type Parameters = Record<string, StandardSchemaV1>

type InferParametersOutput<TParameters extends Parameters> = {
  [K in keyof TParameters]: StandardSchemaV1.InferOutput<TParameters[K]> | null
}

interface URLSearchParamsSchema<TParameters extends Parameters>
  extends StandardSchemaV1<URLSearchParams, InferParametersOutput<TParameters>> {
  message: string
  parameters: TParameters
}

/**
 * A standard schema that validates key-value pairs in URLSearchParams based on the specified
 * parameters and their associated standard schemas.
 *
 * Each parameter should be nullable.
 */
export function urlSearchParams<TParameters extends Parameters>(
  parameters: TParameters,
  message: string = 'Invalid type',
): URLSearchParamsSchema<TParameters> {
  return {
    message,
    parameters,
    '~standard': {
      vendor: '@reapit/elements',
      version: 1,
      validate(value) {
        if (!(value instanceof URLSearchParams)) {
          return { issues: [{ message }] }
        }

        const searchParams = toMap(value)

        const issues: StandardSchemaV1.Issue[] = []
        const parsedParameters = new Map()

        for (const [key, schema] of Object.entries(parameters)) {
          // If we were dealing with the URLSearchParams directly, we'd get `null` for missing keys.
          // See https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get#return_value
          // and https://url.spec.whatwg.org/#dom-urlsearchparams-get
          const rawValue = searchParams.get(key) ?? null
          const result = safeParse(schema, rawValue)

          if (result.issues) {
            issues.push(...scopeAllIssuesToPath(key, result.issues))
          } else {
            parsedParameters.set(key, result.value)
          }
        }

        if (issues.length > 0) {
          return { issues }
        }

        return { value: Object.fromEntries(parsedParameters) }
      },
    },
  }
}
