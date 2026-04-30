import { createComponentMigration } from '../shared/migration-engine.js'

const TARGET_SPECIFIER = '@reapit/elements/core/empty-state'

/**
 * Codemod to migrate EmptyData to the renamed EmptyState component.
 *
 * Import transformations:
 * - EmptyData -> EmptyState
 *
 * JSX element transformations:
 * - <EmptyData> -> <EmptyState>
 *
 * Skipped:
 * - Re-export declarations (left unchanged)
 * - Files not containing any EmptyData identifiers
 */
const transform = createComponentMigration({
  identifiers: [{ from: 'EmptyData', to: 'EmptyState', targetSpecifier: TARGET_SPECIFIER }],
})

export default transform
