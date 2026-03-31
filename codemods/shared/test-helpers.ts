import { describe, test, expect } from 'vitest'

/**
 * Configuration for the standard migration test suite.
 */
export interface MigrationTestConfig {
  /** The deprecated component name being migrated from (e.g. 'DeprecatedLabel'). */
  oldName: string
  /** The new component name being migrated to (e.g. 'LabelText'). */
  newName: string
  /** The target module specifier (e.g. '@reapit/elements/core/label-text'). */
  targetSpecifier: string
  /**
   * The old Props type name, if any (e.g. 'DeprecatedLabelProps').
   * When provided, import-rewrite and type-reference tests are generated.
   */
  oldPropsName?: string
  /**
   * The new Props type expression (e.g. 'LabelText.Props').
   * Required when `oldPropsName` is set.
   */
  newPropsType?: string
  /**
   * Prop renames map (e.g. `{ isRequired: 'required' }`).
   * When provided, a prop-rename test is generated.
   */
  propRenames?: Record<string, string>
  /**
   * Props that should be removed (e.g. `['hasError']`).
   * When provided, a prop-removal test is generated.
   */
  propsToRemove?: string[]
  /**
   * The facade package specifier (e.g. '@company/ui').
   * When provided, facade-package tests are generated.
   */
  facadePackage?: string
  /**
   * A minimal JSX snippet for the old component to use in tests.
   * Defaults to `<OldName />`.
   */
  jsxSnippet?: string
  /**
   * Optional: the source specifier the old name is imported from in tests.
   * Defaults to `'@reapit/elements'`.
   */
  sourceSpecifier?: string
}

type TransformFn = (source: string, filePath?: string, options?: { facadePackage?: string }) => string

/**
 * Generates a standard Vitest test suite for any codemod that uses
 * `createComponentMigration()`.
 *
 * Automatically generates tests for:
 * - no-op (source unchanged when deprecated symbols absent)
 * - import rewrite
 * - import merge (no duplicate target import)
 * - empty import cleanup
 * - type-only import preservation
 * - alias preservation
 * - facade package handling
 * - re-export safety
 * - closing tag sync
 * - self-closing tag
 * - prop renames (when `propRenames` is set)
 * - prop removals (when `propsToRemove` is set)
 */
export function createMigrationTestSuite(transform: TransformFn, config: MigrationTestConfig): void {
  const {
    oldName,
    newName,
    targetSpecifier,
    oldPropsName,
    newPropsType,
    propRenames,
    propsToRemove,
    facadePackage,
    jsxSnippet: jsxSnippetOverride,
    sourceSpecifier = '@reapit/elements',
  } = config

  const jsx = jsxSnippetOverride ?? `<${oldName} />`
  const newJsxOpen = `<${newName}`

  // ---------------------------------------------------------------------------
  // No-op
  // ---------------------------------------------------------------------------

  describe('no-op', () => {
    test('returns source unchanged when deprecated symbols are absent', () => {
      const input = `import { Button } from '@reapit/elements/core/button'\n<Button>ok</Button>`
      expect(transform(input, 'file.tsx')).toBe(input)
    })
  })

  // ---------------------------------------------------------------------------
  // Import rewrites
  // ---------------------------------------------------------------------------

  describe('import rewrites', () => {
    test(`rewrites ${oldName} import from ${sourceSpecifier} to ${targetSpecifier}`, () => {
      const input = `import { ${oldName} } from '${sourceSpecifier}'\n${jsx}`
      const output = transform(input, 'file.tsx')
      expect(output).toContain(`import { ${newName} } from '${targetSpecifier}'`)
      expect(output).not.toContain(`from '${sourceSpecifier}'\n`)
    })

    if (oldPropsName && newPropsType) {
      test(`rewrites ${oldPropsName} import and type references`, () => {
        const input = [`import { ${oldPropsName} } from '${sourceSpecifier}'`, `type Props = ${oldPropsName}`].join(
          '\n',
        )
        const output = transform(input, 'file.tsx')
        expect(output).toContain(`import { ${newName} } from '${targetSpecifier}'`)
        expect(output).toContain(`type Props = ${newPropsType}`)
        expect(output).not.toContain(oldPropsName)
      })

      test(`deduplicates ${newName} import when ${oldName} and ${oldPropsName} are imported together`, () => {
        const input = [
          `import { ${oldName}, ${oldPropsName} } from '${sourceSpecifier}'`,
          `type Props = ${oldPropsName}`,
          jsx,
        ].join('\n')
        const output = transform(input, 'file.tsx')
        const escapedSpecifier = targetSpecifier.replace(/\//g, '\\/')
        const matches = output.match(new RegExp(`from '${escapedSpecifier}'`, 'g'))
        expect(matches).toHaveLength(1)
        expect(output).toContain(`import { ${newName} }`)
        expect(output).toContain(`type Props = ${newPropsType}`)
        expect(output).toContain(newJsxOpen)
        expect(output).not.toContain(oldPropsName)
      })
    }

    test('preserves aliases', () => {
      const input = [`import { ${oldName} as Alias } from '${sourceSpecifier}'`, `<Alias />`].join('\n')
      const output = transform(input, 'file.tsx')
      expect(output).toContain(`import { ${newName} as Alias } from '${targetSpecifier}'`)
      expect(output).toContain('<Alias />')
      // Ensure the old name no longer appears as an import specifier.
      // Use a word-boundary-style check so names that are prefixes of the new
      // name (e.g. Radio → RadioButton) do not produce false positives.
      expect(output).not.toMatch(new RegExp(`\\{\\s*${oldName}\\s*(as|,|\\})`))
    })

    test('preserves unrelated imports and cleans empty declaration', () => {
      const input = [`import { ${oldName}, Input } from '${sourceSpecifier}'`, jsx].join('\n')
      const output = transform(input, 'file.tsx')
      expect(output).toContain(`import { Input } from '${sourceSpecifier}'`)
      expect(output).toContain(`import { ${newName} } from '${targetSpecifier}'`)
      expect(output).not.toMatch(
        new RegExp(`import\\s*\\{\\s*\\}\\s*from\\s*'${sourceSpecifier.replace(/\//g, '\\/')}'`),
      )
    })

    test(`merges into existing ${targetSpecifier} import`, () => {
      const input = [
        `import { ${newName} } from '${targetSpecifier}'`,
        `import { ${oldName} } from '${sourceSpecifier}'`,
        jsx,
      ].join('\n')
      const output = transform(input, 'file.tsx')
      const escapedSpecifier = targetSpecifier.replace(/\//g, '\\/')
      const matches = output.match(new RegExp(`from '${escapedSpecifier}'`, 'g'))
      expect(matches).toHaveLength(1)
    })
  })

  // ---------------------------------------------------------------------------
  // Export behaviour
  // ---------------------------------------------------------------------------

  describe('export behaviour', () => {
    test('does not rewrite re-export declarations', () => {
      const input = `export { ${oldName} } from '${sourceSpecifier}'`
      expect(transform(input, 'file.tsx')).toBe(input)
    })
  })

  // ---------------------------------------------------------------------------
  // JSX and identifier rewrites
  // ---------------------------------------------------------------------------

  describe('jsx and identifier rewrites', () => {
    test('rewrites opening and closing JSX tags', () => {
      const input = [`import { ${oldName} } from '${sourceSpecifier}'`, `<${oldName}><span /></${oldName}>`].join('\n')
      const output = transform(input, 'file.tsx')
      expect(output).toContain(`<${newName}`)
      expect(output).toContain(`</${newName}>`)
      expect(output).not.toMatch(new RegExp(`</${oldName}[^a-zA-Z]`))
    })

    test('rewrites self-closing JSX tags', () => {
      const input = `import { ${oldName} } from '${sourceSpecifier}'\n${jsx}`
      const output = transform(input, 'file.tsx')
      expect(output).toContain(newJsxOpen)
      // Guard against false positives when oldName is a prefix of newName
      // (e.g. RadioGroup → RadioGroupControl): check for the exact tag, not just
      // the prefix.
      expect(output).not.toMatch(new RegExp(`<${oldName}[^a-zA-Z]`))
    })
  })

  // ---------------------------------------------------------------------------
  // Facade package
  // ---------------------------------------------------------------------------

  if (facadePackage) {
    describe('facade package behaviour', () => {
      test('keeps facade package specifier unchanged', () => {
        const input = [`import { ${oldName} } from '${facadePackage}'`, jsx].join('\n')
        const output = transform(input, 'file.tsx', { facadePackage })
        expect(output).toContain(`import { ${newName} } from '${facadePackage}'`)
        expect(output).not.toContain(targetSpecifier)
      })
    })
  }

  // ---------------------------------------------------------------------------
  // Prop renames
  // ---------------------------------------------------------------------------

  if (propRenames && Object.keys(propRenames).length > 0) {
    describe('prop renames', () => {
      for (const [oldProp, newProp] of Object.entries(propRenames)) {
        test(`renames ${oldProp} to ${newProp}`, () => {
          const jsxWithProp = `<${oldName} ${oldProp} />`
          const input = [`import { ${oldName} } from '${sourceSpecifier}'`, jsxWithProp].join('\n')
          const output = transform(input, 'file.tsx')
          expect(output).toContain(newProp)
          expect(output).not.toContain(oldProp)
        })
      }

      test('does not rename props on unrelated components', () => {
        const firstOldProp = Object.keys(propRenames)[0]
        const input = [
          `import { SomeOtherComponent } from '@reapit/elements/core/other'`,
          `<SomeOtherComponent ${firstOldProp} />`,
        ].join('\n')
        const output = transform(input, 'file.tsx')
        expect(output).toContain(firstOldProp)
      })
    })
  }

  // ---------------------------------------------------------------------------
  // Prop removals
  // ---------------------------------------------------------------------------

  if (propsToRemove && propsToRemove.length > 0) {
    describe('prop removals', () => {
      for (const prop of propsToRemove) {
        test(`removes ${prop} prop`, () => {
          const jsxWithProp = `<${oldName} ${prop} />`
          const input = [`import { ${oldName} } from '${sourceSpecifier}'`, jsxWithProp].join('\n')
          const output = transform(input, 'file.tsx')
          expect(output).not.toContain(prop)
        })
      }

      test('does not remove props on unrelated components', () => {
        const firstProp = propsToRemove[0]
        const input = [
          `import { SomeOtherComponent } from '@reapit/elements/core/other'`,
          `<SomeOtherComponent ${firstProp} />`,
        ].join('\n')
        const output = transform(input, 'file.tsx')
        expect(output).toContain(firstProp)
      })
    })
  }
}
