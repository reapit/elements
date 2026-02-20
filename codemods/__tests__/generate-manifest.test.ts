import { existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { discoverCodemods, getCodemodMetadata, hasCodemodsChanged } from '../generate-manifest'

let testDir: string

beforeEach(() => {
  // Create a temporary test directory
  testDir = join(tmpdir(), `codemods-test-${Date.now()}`)
  mkdirSync(testDir, { recursive: true })
})

afterEach(() => {
  // Clean up test directory
  if (existsSync(testDir)) {
    rmSync(testDir, { recursive: true, force: true })
  }
})

describe('discoverCodemods', () => {
  test('returns empty array when directory has no codemods', () => {
    const result = discoverCodemods(testDir)
    expect(result).toEqual([])
  })

  test('returns codemod names that have transform.ts files', () => {
    // Create valid codemod directories
    const codemod1Dir = join(testDir, 'codemod-1')
    const codemod2Dir = join(testDir, 'codemod-2')

    mkdirSync(codemod1Dir)
    mkdirSync(codemod2Dir)

    writeFileSync(join(codemod1Dir, 'transform.ts'), 'export default function() {}')
    writeFileSync(join(codemod2Dir, 'transform.ts'), 'export default function() {}')

    const result = discoverCodemods(testDir)

    expect(result).toHaveLength(2)
    expect(result).toContain('codemod-1')
    expect(result).toContain('codemod-2')
  })

  test('ignores directories without transform.ts files', () => {
    const validDir = join(testDir, 'valid-codemod')
    const invalidDir = join(testDir, 'invalid-codemod')

    mkdirSync(validDir)
    mkdirSync(invalidDir)

    writeFileSync(join(validDir, 'transform.ts'), 'export default function() {}')
    writeFileSync(join(invalidDir, 'index.ts'), 'export default function() {}')

    const result = discoverCodemods(testDir)

    expect(result).toHaveLength(1)
    expect(result).toContain('valid-codemod')
    expect(result).not.toContain('invalid-codemod')
  })

  test('ignores files in the root directory', () => {
    const validDir = join(testDir, 'valid-codemod')
    mkdirSync(validDir)
    writeFileSync(join(validDir, 'transform.ts'), 'export default function() {}')

    // Create some files in root that should be ignored
    writeFileSync(join(testDir, 'transform.ts'), 'export default function() {}')
    writeFileSync(join(testDir, 'runner.ts'), 'export function run() {}')

    const result = discoverCodemods(testDir)

    expect(result).toHaveLength(1)
    expect(result).toContain('valid-codemod')
  })

  test('returns codemods in consistent alphabetical order', () => {
    const names = ['zebra', 'alpha', 'beta']

    for (const name of names) {
      const dir = join(testDir, name)
      mkdirSync(dir)
      writeFileSync(join(dir, 'transform.ts'), 'export default function() {}')
    }

    const result = discoverCodemods(testDir)

    expect(result).toEqual(['alpha', 'beta', 'zebra'])
  })

  test('ignores special directories', () => {
    const validDir = join(testDir, 'valid-codemod')
    const nodeModulesDir = join(testDir, 'node_modules')
    const testsDir = join(testDir, '__tests__')
    const hiddenDir = join(testDir, '.hidden')

    mkdirSync(validDir)
    mkdirSync(nodeModulesDir)
    mkdirSync(testsDir)
    mkdirSync(hiddenDir)

    writeFileSync(join(validDir, 'transform.ts'), 'export default function() {}')
    writeFileSync(join(nodeModulesDir, 'transform.ts'), 'export default function() {}')
    writeFileSync(join(testsDir, 'transform.ts'), 'export default function() {}')
    writeFileSync(join(hiddenDir, 'transform.ts'), 'export default function() {}')

    const result = discoverCodemods(testDir)

    expect(result).toHaveLength(1)
    expect(result).toContain('valid-codemod')
  })

  test('handles non-existent directory gracefully', () => {
    const nonExistentDir = join(testDir, 'does-not-exist')
    const result = discoverCodemods(nonExistentDir)

    expect(result).toEqual([])
  })
})

describe('getCodemodMetadata', () => {
  test('extracts description from README front matter', () => {
    const codemodDir = join(testDir, 'test-codemod')
    mkdirSync(codemodDir)

    const readmeContent = `---
description: Transforms old API to new API
---
# Documentation

Body content.`

    writeFileSync(join(codemodDir, 'README.md'), readmeContent)

    const result = getCodemodMetadata(testDir, 'test-codemod')

    expect(result).toEqual({
      name: 'test-codemod',
      description: 'Transforms old API to new API',
    })
  })

  test('returns null description when README does not exist', () => {
    const codemodDir = join(testDir, 'test-codemod')
    mkdirSync(codemodDir)

    const result = getCodemodMetadata(testDir, 'test-codemod')

    expect(result).toEqual({
      name: 'test-codemod',
      description: null,
    })
  })

  test('returns null description when README has no front matter', () => {
    const codemodDir = join(testDir, 'test-codemod')
    mkdirSync(codemodDir)

    writeFileSync(join(codemodDir, 'README.md'), '# Test\n\nNo front matter.')

    const result = getCodemodMetadata(testDir, 'test-codemod')

    expect(result).toEqual({
      name: 'test-codemod',
      description: null,
    })
  })

  test('returns null description when front matter has no description', () => {
    const codemodDir = join(testDir, 'test-codemod')
    mkdirSync(codemodDir)

    const readmeContent = `---
author: John Doe
---
# Documentation`

    writeFileSync(join(codemodDir, 'README.md'), readmeContent)

    const result = getCodemodMetadata(testDir, 'test-codemod')

    expect(result).toEqual({
      name: 'test-codemod',
      description: null,
    })
  })

  test('extracts description with special characters', () => {
    const codemodDir = join(testDir, 'test-codemod')
    mkdirSync(codemodDir)

    const readmeContent = `---
description: Transforms @reapit/elements v4 -> v5
---
# Documentation`

    writeFileSync(join(codemodDir, 'README.md'), readmeContent)

    const result = getCodemodMetadata(testDir, 'test-codemod')

    expect(result).toEqual({
      name: 'test-codemod',
      description: 'Transforms @reapit/elements v4 -> v5',
    })
  })
})

describe('integration', () => {
  test('workflow: discover codemods and extract metadata', () => {
    // Create codemods
    const codemod1Dir = join(testDir, 'my-codemod')
    const codemod2Dir = join(testDir, 'another-codemod')

    mkdirSync(codemod1Dir)
    mkdirSync(codemod2Dir)

    writeFileSync(join(codemod1Dir, 'transform.ts'), 'export default function() {}')
    writeFileSync(
      join(codemod1Dir, 'README.md'),
      `---
description: My awesome codemod
---
# My Codemod`,
    )

    writeFileSync(join(codemod2Dir, 'transform.ts'), 'export default function() {}')

    // Discover codemods
    const codemods = discoverCodemods(testDir)
    expect(codemods).toEqual(['another-codemod', 'my-codemod'])

    // Get metadata for each
    const metadata = codemods.map((name) => getCodemodMetadata(testDir, name))

    expect(metadata).toEqual([
      { name: 'another-codemod', description: null },
      { name: 'my-codemod', description: 'My awesome codemod' },
    ])
  })
})

describe('hasCodemodsChanged', () => {
  let manifestPath: string

  beforeEach(() => {
    manifestPath = join(testDir, 'manifest.json')
  })

  test('returns false when codemods are identical', () => {
    const codemods = [
      { name: 'codemod-a', description: 'Description A' },
      { name: 'codemod-b', description: 'Description B' },
      { name: 'codemod-c', description: null },
    ]

    const manifest = {
      $schema: './manifest.schema.json',
      generated: '2024-01-01T00:00:00.000Z',
      codemods,
    }

    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))

    const result = hasCodemodsChanged(manifestPath, codemods)

    expect(result).toBe(false)
  })

  test('returns true when a codemod is added', () => {
    const existingCodemods = [
      { name: 'codemod-a', description: 'Description A' },
      { name: 'codemod-b', description: 'Description B' },
    ]

    const newCodemods = [
      { name: 'codemod-a', description: 'Description A' },
      { name: 'codemod-b', description: 'Description B' },
      { name: 'codemod-c', description: 'Description C' },
    ]

    const manifest = {
      $schema: './manifest.schema.json',
      generated: '2024-01-01T00:00:00.000Z',
      codemods: existingCodemods,
    }

    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))

    const result = hasCodemodsChanged(manifestPath, newCodemods)

    expect(result).toBe(true)
  })

  test('returns true when a codemod is removed', () => {
    const existingCodemods = [
      { name: 'codemod-a', description: 'Description A' },
      { name: 'codemod-b', description: 'Description B' },
      { name: 'codemod-c', description: 'Description C' },
    ]

    const newCodemods = [
      { name: 'codemod-a', description: 'Description A' },
      { name: 'codemod-b', description: 'Description B' },
    ]

    const manifest = {
      $schema: './manifest.schema.json',
      generated: '2024-01-01T00:00:00.000Z',
      codemods: existingCodemods,
    }

    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))

    const result = hasCodemodsChanged(manifestPath, newCodemods)

    expect(result).toBe(true)
  })

  test('returns true when a description changes', () => {
    const existingCodemods = [
      { name: 'codemod-a', description: 'Old Description' },
      { name: 'codemod-b', description: 'Description B' },
    ]

    const newCodemods = [
      { name: 'codemod-a', description: 'New Description' },
      { name: 'codemod-b', description: 'Description B' },
    ]

    const manifest = {
      $schema: './manifest.schema.json',
      generated: '2024-01-01T00:00:00.000Z',
      codemods: existingCodemods,
    }

    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))

    const result = hasCodemodsChanged(manifestPath, newCodemods)

    expect(result).toBe(true)
  })

  test('returns false when codemods are in different order (order-independent)', () => {
    const existingCodemods = [
      { name: 'codemod-c', description: 'Description C' },
      { name: 'codemod-a', description: 'Description A' },
      { name: 'codemod-b', description: 'Description B' },
    ]

    const newCodemods = [
      { name: 'codemod-a', description: 'Description A' },
      { name: 'codemod-b', description: 'Description B' },
      { name: 'codemod-c', description: 'Description C' },
    ]

    const manifest = {
      $schema: './manifest.schema.json',
      generated: '2024-01-01T00:00:00.000Z',
      codemods: existingCodemods,
    }

    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))

    const result = hasCodemodsChanged(manifestPath, newCodemods)

    expect(result).toBe(false)
  })

  test('returns true when manifest does not exist', () => {
    const nonExistentPath = join(testDir, 'non-existent-manifest.json')
    const codemods = [{ name: 'codemod-a', description: 'Description A' }]

    const result = hasCodemodsChanged(nonExistentPath, codemods)

    expect(result).toBe(true)
  })

  test('returns true when manifest is malformed JSON', () => {
    writeFileSync(manifestPath, '{ this is not valid JSON }')

    const codemods = [{ name: 'codemod-a', description: 'Description A' }]

    const result = hasCodemodsChanged(manifestPath, codemods)

    expect(result).toBe(true)
  })

  test('returns false when both have empty codemods arrays', () => {
    const manifest = {
      $schema: './manifest.schema.json',
      generated: '2024-01-01T00:00:00.000Z',
      codemods: [],
    }

    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))

    const result = hasCodemodsChanged(manifestPath, [])

    expect(result).toBe(false)
  })
})
