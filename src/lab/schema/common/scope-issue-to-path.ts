import type { StandardSchemaV1 } from '@standard-schema/spec'

export function scopeIssueToPath(path: string, issue: StandardSchemaV1.Issue) {
  return {
    ...issue,
    path: [path, ...(issue.path ?? [])],
  }
}

export function scopeAllIssuesToPath(path: string, issues: readonly StandardSchemaV1.Issue[]) {
  return issues.map((issue) => scopeIssueToPath(path, issue))
}
