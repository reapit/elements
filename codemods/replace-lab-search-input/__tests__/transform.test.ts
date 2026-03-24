import transform from '../transform'

describe('no-op', () => {
  test('returns source unchanged when SearchInput symbols are absent', () => {
    const input = `import { Button } from '@reapit/elements/core/button'\n<Button>ok</Button>`
    expect(transform(input, 'file.tsx')).toBe(input)
  })
})

describe('import rewrites', () => {
  test('rewrites SearchInput import from @reapit/elements to core/search-input', () => {
    const input = [`import { SearchInput } from '@reapit/elements'`, `<SearchInput />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { SearchInput } from '@reapit/elements/core/search-input'")
    expect(output).not.toContain("from '@reapit/elements'\n")
  })

  test('rewrites SearchInput import from @reapit/elements/lab/search-input to core/search-input', () => {
    const input = [`import { SearchInput } from '@reapit/elements/lab/search-input'`, `<SearchInput />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("from '@reapit/elements/core/search-input'")
    expect(output).not.toContain("from '@reapit/elements/lab/search-input'")
  })

  test('rewrites SearchInputProps import and type references', () => {
    const input = [`import { SearchInputProps } from '@reapit/elements'`, `type Props = SearchInputProps`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { SearchInput } from '@reapit/elements/core/search-input'")
    expect(output).toContain('type Props = SearchInput.Props')
    expect(output).not.toContain('SearchInputProps')
  })

  test('rewrites declaration-level type-only SearchInput import to a value import', () => {
    // `import type { SearchInput }` uses declaration-level type-only syntax.
    // namedImport.isTypeOnly() returns false for specifiers inside such a declaration,
    // so the rewritten import is a value import. This is valid TypeScript and
    // consistent with how other codemods in this project handle the same case.
    const input = [`import type { SearchInput } from '@reapit/elements'`, `<SearchInput />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { SearchInput } from '@reapit/elements/core/search-input'")
    expect(output).not.toContain('import type { SearchInput }')
  })

  test('deduplicates SearchInput import when SearchInput and SearchInputProps are imported together', () => {
    const input = [
      `import { SearchInput, SearchInputProps } from '@reapit/elements'`,
      `type Props = SearchInputProps`,
      `<SearchInput />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/from '@reapit\/elements\/core\/search-input'/g)
    expect(matches).toHaveLength(1)
    expect(output).toContain('import { SearchInput } from')
    expect(output).toContain('type Props = SearchInput.Props')
    expect(output).toContain('<SearchInput')
    expect(output).not.toContain('SearchInputProps')
  })

  test('rewrites SearchInputProps alias-only import', () => {
    const input = [`import { SearchInputProps as SP } from '@reapit/elements'`, `type Props = SP`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { SearchInput } from '@reapit/elements/core/search-input'")
    expect(output).toContain('type Props = SearchInput.Props')
    expect(output).not.toContain('SearchInputProps')
    expect(output).not.toContain('= SP')
  })

  test('preserves aliases on SearchInput import and uses alias as .Props base', () => {
    const input = [
      `import { SearchInput as SI, SearchInputProps as SP } from '@reapit/elements'`,
      `type Props = SP`,
      `<SI />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // The alias is preserved and used as the .Props base — no unaliased SearchInput import is added.
    expect(output).toContain("import { SearchInput as SI } from '@reapit/elements/core/search-input'")
    expect(output).not.toContain(', SearchInput }')
    expect(output).toContain('type Props = SI.Props')
    expect(output).toContain('<SI')
  })

  test('uses alias as .Props base when a local SearchInput symbol would conflict', () => {
    const input = [
      `import { SearchInput as SI, SearchInputProps } from '@reapit/elements'`,
      `const SearchInput = () => null`,
      `type Props = SearchInputProps`,
      `<SI />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // SI.Props is used so no unaliased import is added, avoiding a duplicate identifier.
    expect(output).toContain("import { SearchInput as SI } from '@reapit/elements/core/search-input'")
    expect(output).not.toContain(', SearchInput }')
    expect(output).toContain('type Props = SI.Props')
    expect(output).not.toContain('SearchInputProps')
  })

  test('preserves unrelated imports and cleans empty declaration', () => {
    const input = [`import { SearchInput, Input } from '@reapit/elements'`, `<SearchInput />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import { Input } from '@reapit/elements'`)
    expect(output).toContain(`import { SearchInput } from '@reapit/elements/core/search-input'`)
    expect(output).not.toMatch(/import\s*\{\s*\}\s*from\s*'@reapit\/elements'/)
  })

  test('merges into existing core/search-input import', () => {
    const input = [
      `import { SearchInput } from '@reapit/elements/core/search-input'`,
      `import { SearchInput as SI } from '@reapit/elements'`,
      `<SearchInput />`,
      `<SI />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/from '@reapit\/elements\/core\/search-input'/g)
    expect(matches).toHaveLength(1)
  })

  test('merges rewrites from multiple deprecated source specifiers', () => {
    const input = [
      `import { SearchInput } from '@reapit/elements'`,
      `import { SearchInputProps } from '@reapit/elements/lab/search-input'`,
      `type Props = SearchInputProps`,
      `<SearchInput />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/from '@reapit\/elements\/core\/search-input'/g)
    expect(matches).toHaveLength(1)
    expect(output).toContain('type Props = SearchInput.Props')
    expect(output).toContain('<SearchInput')
    expect(output).not.toContain("from '@reapit/elements/lab/search-input'")
  })
})

describe('export behaviour', () => {
  test('does not rewrite re-export declarations', () => {
    const input = `export { SearchInput } from '@reapit/elements/lab/search-input'`
    expect(transform(input, 'file.tsx')).toBe(input)
  })

  test('rewrites local export specifiers safely', () => {
    const input = [`import { SearchInput } from '@reapit/elements'`, `export { SearchInput }`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import { SearchInput } from '@reapit/elements/core/search-input'`)
    expect(output).toContain('export { SearchInput }')
  })
})

describe('type references', () => {
  test('rewrites SearchInputProps in type alias', () => {
    const input = [`import { SearchInputProps } from '@reapit/elements'`, `type Props = SearchInputProps`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('type Props = SearchInput.Props')
    expect(output).not.toContain('SearchInputProps')
  })

  test('rewrites SearchInputProps in generic', () => {
    const input = [`import { SearchInputProps } from '@reapit/elements'`, `type Bar = Partial<SearchInputProps>`].join(
      '\n',
    )
    const output = transform(input, 'file.tsx')
    expect(output).toContain('type Bar = Partial<SearchInput.Props>')
  })

  test('rewrites SearchInputProps in heritage clause', () => {
    const input = [
      `import { SearchInputProps } from '@reapit/elements'`,
      `interface Foo extends SearchInputProps {}`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('interface Foo extends SearchInput.Props {}')
  })
})

describe('prop renames and removals', () => {
  test('renames inputSize to size', () => {
    const input = [`import { SearchInput } from '@reapit/elements'`, `<SearchInput inputSize="large" />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('size="large"')
    expect(output).not.toContain('inputSize')
  })

  test('renames isDisabled to disabled', () => {
    const input = [`import { SearchInput } from '@reapit/elements'`, `<SearchInput isDisabled />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('disabled')
    expect(output).not.toContain('isDisabled')
  })

  test('removes unstable_onSearch prop', () => {
    const input = [
      `import { SearchInput } from '@reapit/elements'`,
      `<SearchInput unstable_onSearch={handleSearch} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('unstable_onSearch=')
  })

  test('renames and removes all three props in the same element', () => {
    const input = [
      `import { SearchInput } from '@reapit/elements'`,
      `<SearchInput inputSize="small" isDisabled unstable_onSearch={handleSearch} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('size="small"')
    expect(output).toContain('disabled')
    expect(output).not.toContain('inputSize')
    expect(output).not.toContain('isDisabled')
    expect(output).not.toContain('unstable_onSearch=')
  })

  test('renames props with expression values', () => {
    const input = [
      `import { SearchInput } from '@reapit/elements'`,
      `<SearchInput inputSize={mySize} isDisabled={isDisabled} unstable_onSearch={handleSearch} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('size={mySize}')
    expect(output).toContain('disabled={isDisabled}')
    expect(output).not.toContain('inputSize=')
    expect(output).not.toContain('isDisabled=')
    expect(output).not.toContain('unstable_onSearch=')
  })

  test('preserves unchanged props alongside renamed and removed ones', () => {
    const input = [
      `import { SearchInput } from '@reapit/elements'`,
      `<SearchInput placeholder="Search…" inputSize="small" isDisabled unstable_onSearch={handleSearch} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('placeholder="Search…"')
    expect(output).toContain('size="small"')
    expect(output).toContain('disabled')
    expect(output).not.toContain('inputSize')
    expect(output).not.toContain('isDisabled')
    expect(output).not.toContain('unstable_onSearch=')
  })

  test('does not rename props on unrelated components', () => {
    const input = [
      `import { SomeOtherComponent } from '@reapit/elements/core/other'`,
      `<SomeOtherComponent inputSize="large" isDisabled unstable_onSearch={handleSearch} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('inputSize="large"')
    expect(output).toContain('isDisabled')
    expect(output).toContain('unstable_onSearch')
  })
})

describe('TODO comment', () => {
  test('inserts a TODO comment before statement containing unstable_onSearch', () => {
    const input = [
      `import { SearchInput } from '@reapit/elements'`,
      `const el = <SearchInput unstable_onSearch={handleSearch} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('// TODO: Replace the removed unstable_onSearch prop with onChange.')
    const todoIndex = output.indexOf('// TODO:')
    const elIndex = output.indexOf('const el =')
    expect(todoIndex).toBeLessThan(elIndex)
  })

  test('does not insert a TODO comment when unstable_onSearch is absent', () => {
    const input = [
      `import { SearchInput } from '@reapit/elements'`,
      `const el = <SearchInput inputSize="small" />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('// TODO:')
  })

  test('inserts only one TODO comment per statement even with multiple elements', () => {
    const input = [
      `import { SearchInput } from '@reapit/elements'`,
      `const els = [<SearchInput unstable_onSearch={onA} />, <SearchInput unstable_onSearch={onB} />]`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/\/\/ TODO:/g)
    expect(matches).toHaveLength(1)
  })

  test('inserts a TODO comment before each of multiple migrated statements', () => {
    const input = [
      `import { SearchInput } from '@reapit/elements'`,
      `const a = <SearchInput unstable_onSearch={onA} />`,
      `const b = <SearchInput unstable_onSearch={onB} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/\/\/ TODO:/g)
    expect(matches).toHaveLength(2)
  })

  test('does not insert a TODO comment when only inputSize or isDisabled are migrated', () => {
    const input = [
      `import { SearchInput } from '@reapit/elements'`,
      `const el = <SearchInput inputSize="large" isDisabled />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('// TODO:')
  })

  test('preserves indentation of the migrated statement after inserting the TODO comment', () => {
    const input = [
      `import { SearchInput } from '@reapit/elements'`,
      `function foo() {`,
      `  const el = <SearchInput unstable_onSearch={handleSearch} />`,
      `}`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const lines = output.split('\n')
    const todoLine = lines.find((l) => l.includes('// TODO:'))!
    const stmtLine = lines.find((l) => l.includes('const el ='))!
    expect(todoLine).toBeDefined()
    expect(stmtLine).toBeDefined()
    expect(todoLine.match(/^\s*/)?.[0]).toBe(stmtLine.match(/^\s*/)?.[0])
  })
})

describe('facade package behaviour', () => {
  test('keeps facade package specifier unchanged', () => {
    const input = [`import { SearchInput } from '@company/ui'`, `<SearchInput />`].join('\n')
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain(`import { SearchInput } from '@company/ui'`)
    expect(output).not.toContain('/core/search-input')
  })

  test('keeps facade subpath specifier unchanged', () => {
    const input = [`import { SearchInput } from '@company/ui/lab/search-input'`, `<SearchInput />`].join('\n')
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain(`import { SearchInput } from '@company/ui/lab/search-input'`)
    expect(output).not.toContain('@reapit/elements/core/search-input')
  })

  test('rewrites SearchInputProps from facade package to SearchInput', () => {
    const input = [`import { SearchInputProps } from '@company/ui'`, `type Props = SearchInputProps`].join('\n')
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain(`import { SearchInput } from '@company/ui'`)
    expect(output).toContain('type Props = SearchInput.Props')
    expect(output).not.toContain('SearchInputProps')
  })
})

describe('import safety', () => {
  test('preserves namespace imports when removing deprecated named imports', () => {
    const input = [
      `import * as Elements from '@reapit/elements'`,
      `import { SearchInput } from '@reapit/elements'`,
      `<SearchInput />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import * as Elements from '@reapit/elements'`)
    expect(output).toContain(`import { SearchInput } from '@reapit/elements/core/search-input'`)
  })

  test('does not migrate local SearchInput symbols when there are no matching imports', () => {
    const input = [`const SearchInput = () => null`, `<SearchInput />`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toBe(input)
  })

  test('does not migrate local SearchInputProps symbols when there are no matching imports', () => {
    const input = [`type SearchInputProps = { a: string }`, `type Props = SearchInputProps`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toBe(input)
  })

  test('removes SearchInputProps import and adds no SearchInput import when SearchInputProps is imported but unused', () => {
    const input = `import { SearchInputProps } from '@reapit/elements'`
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('SearchInputProps')
    expect(output).not.toContain('SearchInput')
    expect(output).not.toContain("from '@reapit/elements/core/search-input'")
  })

  test('upgrades declaration-level type-only import at target specifier to value import when JSX usage is present', () => {
    // If a partially-migrated file already has `import type { SearchInput } from
    // '…/core/search-input'` but the component is used in JSX, the declaration must
    // be promoted to a value import. `alreadyMigratedPath` skips rewriting the
    // specifier, so the promotion must happen inside `addImportsToTarget`.
    const input = [`import type { SearchInput } from '@reapit/elements/core/search-input'`, `<SearchInput />`].join(
      '\n',
    )
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { SearchInput } from '@reapit/elements/core/search-input'")
    expect(output).not.toContain('import type { SearchInput }')
  })
})
