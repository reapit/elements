import { StandardSchemaV1 } from '@standard-schema/spec'

export class ParseError extends Error {
  issues: readonly StandardSchemaV1.Issue[]

  constructor(issues: readonly StandardSchemaV1.Issue[]) {
    super(`Parsing failed: ${issues.length} issues`)
    this.name = 'ParseError'
    this.issues = issues
  }
}
