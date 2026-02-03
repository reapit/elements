import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { listCodemods, getCodemodReadme, getCodemodDescription, validateCodemodName } from '../codemods'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const codemodDir = join(__dirname, '..')

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

describe('getCodemodReadme', () => {
  test('returns README content when it exists', () => {
    const result = getCodemodReadme('at-a-glance-article-card')

    expect(result).not.toBeNull()
    expect(typeof result).toBe('string')
    expect(result!.length).toBeGreaterThan(0)
  })

  test('returns null when README does not exist', () => {
    const result = getCodemodReadme('nonexistent-codemod' as any)

    expect(result).toBeNull()
  })

  test('reads complete README with front matter and body', () => {
    const result = getCodemodReadme('at-a-glance-article-card')

    expect(result).not.toBeNull()
    // Check for front matter markers
    expect(result).toContain('---')
    // Check for typical README content
    expect(result).toMatch(/[#\s]/i)
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
  test('returns name when codemod exists in manifest', () => {
    const result = validateCodemodName('at-a-glance-article-card')

    expect(result).toBe('at-a-glance-article-card')
  })

  test('returns null when codemod does not exist', () => {
    const result = validateCodemodName('nonexistent-codemod')

    expect(result).toBeNull()
  })

  test('prevents path traversal attacks with ../', () => {
    const result = validateCodemodName('../../../etc/passwd')

    expect(result).toBeNull()
  })

  test('prevents path traversal attacks with absolute paths', () => {
    const result = validateCodemodName('/etc/passwd')

    expect(result).toBeNull()
  })

  test('prevents path traversal with encoded characters', () => {
    const result = validateCodemodName('..%2F..%2Fetc%2Fpasswd')

    expect(result).toBeNull()
  })

  test('prevents path components in name', () => {
    const result = validateCodemodName('at-a-glance-article-card/index.ts')

    expect(result).toBeNull()
  })

  test('case-sensitive validation', () => {
    const result = validateCodemodName('AT-A-GLANCE-ARTICLE-CARD')

    expect(result).toBeNull()
  })

  test('validates all codemods from manifest correctly', () => {
    const codemods = listCodemods()

    for (const name of codemods) {
      const validated = validateCodemodName(name)
      expect(validated).toBe(name)
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
    expect(validated).toBe('at-a-glance-article-card')

    // Get description
    const description = getCodemodDescription(validated!)
    expect(description).toBe('Migrates AtAGlance.Card to AtAGlance.ArticleCard')
  })

  test('workflow: attempt to access invalid codemod', () => {
    // List shows only valid codemods
    const codemods = listCodemods()
    expect(codemods.length).toBeGreaterThan(0)

    // Attempt to validate malicious input
    const validated = validateCodemodName('../../etc/passwd')
    expect(validated).toBeNull()

    // No description accessible for invalid name
    const description = getCodemodDescription('../../etc/passwd')
    expect(description).toBeNull()
  })

  test('consistency: manifest and file system match', () => {
    const codemods = listCodemods()

    // All codemods in manifest should have their directories accessible
    for (const name of codemods) {
      const validated = validateCodemodName(name)
      expect(validated).toBe(name)

      // Should be able to get README (or null if missing, which is OK)
      const readme = getCodemodReadme(name)
      expect(readme === null || typeof readme === 'string').toBe(true)

      // Should be able to get description from manifest
      const description = getCodemodDescription(name)
      expect(description === null || typeof description === 'string').toBe(true)
    }
  })
})
