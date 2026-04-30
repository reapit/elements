import { createMigrationTestSuite } from '../../shared/test-helpers.js'
import transform from '../transform'

createMigrationTestSuite(transform, {
  oldName: 'EmptyData',
  newName: 'EmptyState',
  targetSpecifier: '@reapit/elements/core/empty-state',
  facadePackage: '@company/ui',
})
