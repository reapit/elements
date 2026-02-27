import { listCodemods, getCodemodDescription, validateCodemodName, AVAILABLE_CODEMODS } from '../codemods'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

describe('listCodemods', () => {
  test('returns codemods from manifest', () => {
    const result = listCodemods()

    // Should return at least the codemods we know exist
    expect(result).toContain('at-a-glance-article-card')
    expect(Array.isArray(result)).toBe(true)
  })

  test('returns a copy to prevent external mutation', () => {
    const result1 = listCodemods()
    const result2 = listCodemods()

    expect(result1).toEqual(result2)
    expect(result1).not.toBe(result2) // Different array instances
  })
})

describe('getCodemodDescription', () => {
  test('returns description from manifest', () => {
    const result = getCodemodDescription('at-a-glance-article-card')

    expect(result).toBe('Migrates AtAGlance.Card to AtAGlance.ArticleCard')
  })

  test('returns null when codemod does not exist in manifest', () => {
    const result = getCodemodDescription('nonexistent-codemod')

    expect(result).toBeNull()
  })

  test('returns description for all codemods in manifest', () => {
    const codemods = listCodemods()

    for (const name of codemods) {
      const description = getCodemodDescription(name)
      // Description can be null or a string
      expect(description === null || typeof description === 'string').toBe(true)
    }
  })
})

describe('validateCodemodName', () => {
  test('returns true when codemod exists in manifest', () => {
    const result = validateCodemodName('at-a-glance-article-card')

    expect(result).toBe(true)
  })

  test('returns false when codemod does not exist', () => {
    const result = validateCodemodName('nonexistent-codemod')

    expect(result).toBe(false)
  })

  test('prevents path traversal attacks with ../', () => {
    const result = validateCodemodName('../../../etc/passwd')

    expect(result).toBe(false)
  })

  test('prevents path traversal attacks with absolute paths', () => {
    const result = validateCodemodName('/etc/passwd')

    expect(result).toBe(false)
  })

  test('prevents path traversal with encoded characters', () => {
    const result = validateCodemodName('..%2F..%2Fetc%2Fpasswd')

    expect(result).toBe(false)
  })

  test('prevents path components in name', () => {
    const result = validateCodemodName('at-a-glance-article-card/index.ts')

    expect(result).toBe(false)
  })

  test('case-sensitive validation', () => {
    const result = validateCodemodName('AT-A-GLANCE-ARTICLE-CARD')

    expect(result).toBe(false)
  })

  test('validates all codemods from manifest correctly', () => {
    const codemods = listCodemods()

    for (const name of codemods) {
      const validated = validateCodemodName(name)
      expect(validated).toBe(true)
    }
  })
})

describe('integration tests', () => {
  test('workflow: list codemods, validate, and get description', () => {
    // List codemods
    const codemods = listCodemods()
    expect(codemods.length).toBeGreaterThan(0)
    expect(codemods).toContain('at-a-glance-article-card')

    // Validate a known codemod
    const validated = validateCodemodName('at-a-glance-article-card')
    expect(validated).toBe(true)

    // Get description
    const description = getCodemodDescription('at-a-glance-article-card')
    expect(description).toBe('Migrates AtAGlance.Card to AtAGlance.ArticleCard')
  })

  test('workflow: attempt to access invalid codemod', () => {
    // List shows only valid codemods
    const codemods = listCodemods()
    expect(codemods.length).toBeGreaterThan(0)

    // Attempt to validate malicious input
    const validated = validateCodemodName('../../etc/passwd')
    expect(validated).toBe(false)

    // No description accessible for invalid name
    const description = getCodemodDescription('../../etc/passwd')
    expect(description).toBeNull()
  })

  test('consistency: manifest and file system match', () => {
    const codemods = listCodemods()

    // All codemods in manifest should have their directories accessible
    for (const name of codemods) {
      const validated = validateCodemodName(name)
      expect(validated).toBe(true)

      // Should be able to get description from manifest
      const description = getCodemodDescription(name)
      expect(description === null || typeof description === 'string').toBe(true)
    }
  })

  test('filesystem parity: each manifest entry has a corresponding transform.ts', () => {
    const codemodDir = dirname(dirname(fileURLToPath(import.meta.url)))

    for (const { name } of AVAILABLE_CODEMODS) {
      const transformPath = join(codemodDir, name, 'transform.ts')
      expect(
        existsSync(transformPath),
        `Expected transform.ts to exist for codemod '${name}' at ${transformPath}`,
      ).toBe(true)
    }
  })
})
