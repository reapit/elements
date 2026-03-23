import transform from '../transform'

describe('no-op', () => {
  test('returns source unchanged when deprecated symbols are absent', () => {
    const input = `import { Button } from '@reapit/elements/core/button'\n<Button>ok</Button>`
    expect(transform(input, 'file.tsx')).toBe(input)
  })

  test('returns source unchanged when only unrelated elements imports are present', () => {
    const input = `import { Pagination } from '@reapit/elements/core/pagination'\n<Pagination pageNumber={1} pageCount={10} />`
    expect(transform(input, 'file.tsx')).toBe(input)
  })
})

describe('import rewrites', () => {
  test('rewrites DeprecatedPagination import from @reapit/elements to core/pagination', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `<DeprecatedPagination callback={fn} currentPage={1} numberPages={10} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { Pagination } from '@reapit/elements/core/pagination'")
    expect(output).not.toContain("from '@reapit/elements'\n")
  })

  test('rewrites DeprecatedPagination import from deprecated/pagination to core/pagination', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements/deprecated/pagination'`,
      `<DeprecatedPagination callback={fn} currentPage={1} numberPages={10} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("from '@reapit/elements/core/pagination'")
    expect(output).not.toContain("from '@reapit/elements/deprecated/pagination'")
  })

  test('rewrites DeprecatedPaginationProps import and type references', () => {
    const input = [
      `import { DeprecatedPaginationProps } from '@reapit/elements'`,
      `type Props = DeprecatedPaginationProps`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { Pagination } from '@reapit/elements/core/pagination'")
    expect(output).toContain('type Props = Pagination.Props')
    expect(output).not.toContain('DeprecatedPaginationProps')
  })

  test('deduplicates Pagination import when DeprecatedPagination and DeprecatedPaginationProps are imported together', () => {
    const input = [
      `import { DeprecatedPagination, DeprecatedPaginationProps } from '@reapit/elements'`,
      `type Props = DeprecatedPaginationProps`,
      `<DeprecatedPagination callback={fn} currentPage={1} numberPages={10} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/from '@reapit\/elements\/core\/pagination'/g)
    expect(matches).toHaveLength(1)
    expect(output).toContain('import { Pagination } from')
    expect(output).toContain('type Props = Pagination.Props')
    expect(output).toContain('<Pagination')
    expect(output).not.toContain('DeprecatedPaginationProps')
  })

  test('rewrites DeprecatedPaginationProps alias-only import', () => {
    const input = [`import { DeprecatedPaginationProps as PP } from '@reapit/elements'`, `type Props = PP`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { Pagination } from '@reapit/elements/core/pagination'")
    expect(output).toContain('type Props = Pagination.Props')
    expect(output).not.toContain('DeprecatedPaginationProps')
    expect(output).not.toContain('PP')
  })

  test('preserves aliases for DeprecatedPagination', () => {
    const input = [
      `import { DeprecatedPagination as DP } from '@reapit/elements'`,
      `<DP callback={fn} currentPage={1} numberPages={10} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { Pagination as DP } from '@reapit/elements/core/pagination'")
    expect(output).toContain('<DP')
    expect(output).not.toContain('DeprecatedPagination')
  })

  test('preserves unrelated imports and cleans empty declaration', () => {
    const input = [
      `import { DeprecatedPagination, Input } from '@reapit/elements'`,
      `<DeprecatedPagination callback={fn} currentPage={1} numberPages={10} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import { Input } from '@reapit/elements'`)
    expect(output).toContain(`import { Pagination } from '@reapit/elements/core/pagination'`)
    expect(output).not.toMatch(/import\s*\{\s*\}\s*from\s*'@reapit\/elements'/)
  })

  test('merges into existing core/pagination import', () => {
    const input = [
      `import { Pagination } from '@reapit/elements/core/pagination'`,
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `<DeprecatedPagination callback={fn} currentPage={1} numberPages={10} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/from '@reapit\/elements\/core\/pagination'/g)
    expect(matches).toHaveLength(1)
  })

  test('merges rewrites from multiple deprecated source specifiers', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `import { DeprecatedPaginationProps } from '@reapit/elements/deprecated/pagination'`,
      `type Props = DeprecatedPaginationProps`,
      `<DeprecatedPagination callback={fn} currentPage={1} numberPages={10} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    const matches = output.match(/from '@reapit\/elements\/core\/pagination'/g)
    expect(matches).toHaveLength(1)
    expect(output).toContain('type Props = Pagination.Props')
    expect(output).toContain('<Pagination')
    expect(output).not.toContain("from '@reapit/elements/deprecated/pagination'")
  })

  test('rewrites type-only imports', () => {
    // DeprecatedPaginationProps rewrites to Pagination.Props, which references the
    // Pagination namespace — so the import is promoted to a value import.
    const input = [
      `import type { DeprecatedPaginationProps } from '@reapit/elements'`,
      `type Props = DeprecatedPaginationProps`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain("import { Pagination } from '@reapit/elements/core/pagination'")
    expect(output).toContain('type Props = Pagination.Props')
    expect(output).not.toContain('DeprecatedPaginationProps')
  })
})

describe('export behaviour', () => {
  test('does not rewrite re-export declarations', () => {
    const input = `export { DeprecatedPagination } from '@reapit/elements'`
    expect(transform(input, 'file.tsx')).toBe(input)
  })
})

describe('jsx tag rewrites', () => {
  test('rewrites self-closing JSX tags and renames props', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `<DeprecatedPagination callback={onPageChange} currentPage={page} numberPages={total} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<Pagination')
    expect(output).toContain('onPageChange={onPageChange}')
    expect(output).toContain('pageNumber={page}')
    expect(output).toContain('pageCount={total}')
    expect(output).not.toContain('<DeprecatedPagination')
    expect(output).not.toContain('callback=')
    expect(output).not.toContain('currentPage=')
    expect(output).not.toContain('numberPages=')
  })

  test('rewrites opening and closing JSX tags', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `<DeprecatedPagination callback={fn} currentPage={1} numberPages={5}>`,
      `  <span>child</span>`,
      `</DeprecatedPagination>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('<Pagination')
    expect(output).toContain('</Pagination>')
    expect(output).not.toContain('<DeprecatedPagination')
    expect(output).not.toContain('</DeprecatedPagination>')
  })

  test('handles multiple DeprecatedPagination elements in the same file', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `<DeprecatedPagination callback={fn} currentPage={1} numberPages={5} />`,
      `<DeprecatedPagination callback={fn2} currentPage={2} numberPages={10} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toContain('<DeprecatedPagination')
    const paginationCount = (output.match(/<Pagination/g) ?? []).length
    expect(paginationCount).toBe(2)
  })

  test('correctly places TODO comment for first element with hasStartButton when a second element follows', () => {
    // Regression: inserting a TODO comment before the first element must not shift
    // the position of the second element's tag rename or prop rewrites.
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `<DeprecatedPagination callback={fn} currentPage={1} numberPages={5} hasStartButton />`,
      `<DeprecatedPagination callback={fn2} currentPage={2} numberPages={10} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // Both elements must be renamed
    expect(output).not.toContain('<DeprecatedPagination')
    const paginationCount = (output.match(/<Pagination/g) ?? []).length
    expect(paginationCount).toBe(2)
    // TODO comment must appear exactly once (only the first element had hasStartButton)
    const todoCount = (output.match(/TODO:/g) ?? []).length
    expect(todoCount).toBe(1)
    // Both elements must have their props correctly renamed
    expect(output).toContain('onPageChange={fn}')
    expect(output).toContain('pageNumber={1}')
    expect(output).toContain('pageCount={5}')
    expect(output).toContain('onPageChange={fn2}')
    expect(output).toContain('pageNumber={2}')
    expect(output).toContain('pageCount={10}')
  })

  test('rewrites aliased component JSX tags', () => {
    const input = [
      `import { DeprecatedPagination as DP } from '@reapit/elements'`,
      `<DP callback={fn} currentPage={1} numberPages={5} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // The alias DP is preserved, but the import is rewritten to Pagination as DP.
    expect(output).toContain('Pagination as DP')
    expect(output).toContain('<DP')
    expect(output).toContain('onPageChange={fn}')
    expect(output).toContain('pageNumber={1}')
    expect(output).toContain('pageCount={5}')
  })
})

describe('prop rewrites', () => {
  test('renames callback to onPageChange', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `<DeprecatedPagination callback={handlePage} currentPage={1} numberPages={5} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('onPageChange={handlePage}')
    expect(output).not.toContain('callback=')
  })

  test('renames currentPage to pageNumber', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `<DeprecatedPagination callback={fn} currentPage={currentPage} numberPages={5} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('pageNumber={currentPage}')
    expect(output).not.toContain('currentPage=')
  })

  test('renames numberPages to pageCount', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `<DeprecatedPagination callback={fn} currentPage={1} numberPages={totalPages} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('pageCount={totalPages}')
    expect(output).not.toContain('numberPages=')
  })

  test('removes hasStartButton and inserts a TODO comment', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `<DeprecatedPagination callback={fn} currentPage={1} numberPages={5} hasStartButton />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // The prop must not appear as a JSX attribute (= or bare at end of tag)
    expect(output).not.toMatch(/\bhasStartButton(?:=|\s+\/>|\s+pageN|\s+pageC|\s+on)/)
    expect(output).toContain('TODO')
    expect(output).toContain('leftAction')
    expect(output).toContain('rightAction')
    expect(output).toContain('<Pagination onPageChange={fn} pageNumber={1} pageCount={5} />')
  })

  test('removes hasEndButton and inserts a TODO comment', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `<DeprecatedPagination callback={fn} currentPage={1} numberPages={5} hasEndButton />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).not.toMatch(/\bhasEndButton(?:=|\s+\/>|\s+pageN|\s+pageC|\s+on)/)
    expect(output).toContain('TODO')
    expect(output).toContain('<Pagination onPageChange={fn} pageNumber={1} pageCount={5} />')
  })

  test('removes both hasStartButton and hasEndButton with a single TODO comment', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `<DeprecatedPagination callback={fn} currentPage={1} numberPages={5} hasStartButton hasEndButton />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // Neither should remain as JSX attributes
    expect(output).not.toMatch(/\bhasStartButton(?:=|\s+\/>|\s+pageN|\s+pageC|\s+on|\s+has)/)
    expect(output).not.toMatch(/\bhasEndButton(?:=|\s+\/>|\s+pageN|\s+pageC|\s+on)/)
    // Should insert one TODO comment listing both props.
    const todoCount = (output.match(/TODO:/g) ?? []).length
    expect(todoCount).toBe(1)
    expect(output).toContain('<Pagination onPageChange={fn} pageNumber={1} pageCount={5} />')
  })
})

describe('context-aware TODO comment syntax', () => {
  test('inserts JSX comment when element is a direct JSX child', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `const App = () => (`,
      `  <div>`,
      `    <DeprecatedPagination callback={fn} currentPage={1} numberPages={5} hasStartButton />`,
      `  </div>`,
      `)`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('{/* TODO:')
    expect(output).not.toMatch(/^\/\/ TODO:/m)
  })

  test('inserts inline block comment when element is in a variable declaration', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `const el = <DeprecatedPagination callback={fn} currentPage={1} numberPages={5} hasStartButton />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toMatch(/\/\* TODO:/)
    expect(output).not.toContain('{/* TODO:')
    expect(output).not.toMatch(/\/\/ TODO:/)
  })

  test('inserts inline block comment when element is in a return statement', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `function Foo() {`,
      `  return <DeprecatedPagination callback={fn} currentPage={1} numberPages={5} hasEndButton />`,
      `}`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toMatch(/\/\* TODO:/)
    expect(output).not.toContain('{/* TODO:')
    expect(output).not.toMatch(/\/\/ TODO:/)
  })

  test('inserts inline block comment when element is in a ternary (JsxExpression)', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `const App = () => (`,
      `  <div>`,
      `    {condition ? <DeprecatedPagination callback={fn} currentPage={1} numberPages={5} hasStartButton /> : null}`,
      `  </div>`,
      `)`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toMatch(/\/\* TODO:/)
    expect(output).not.toContain('{/* TODO:')
    expect(output).not.toMatch(/\/\/ TODO:/)
  })

  test('inserts inline block comment when element is in an arrow function', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `const render = () => <DeprecatedPagination callback={fn} currentPage={1} numberPages={5} hasEndButton />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toMatch(/\/\* TODO:/)
    expect(output).not.toContain('{/* TODO:')
    expect(output).not.toMatch(/\/\/ TODO:/)
  })
})

describe('aliased element regressions', () => {
  test('non-self-closing aliased element keeps matched open/close tags', () => {
    const input = [
      `import { DeprecatedPagination as DP } from '@reapit/elements'`,
      `const App = () => <DP callback={fn} currentPage={1} numberPages={5}><span /></DP>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // Opening tag stays as alias — not renamed (no matching rule for aliases)
    expect(output).toContain('<DP')
    // Closing tag must not be renamed to Pagination (would produce mismatched JSX)
    expect(output).not.toContain('</Pagination>')
    expect(output).toContain('</DP>')
  })

  test('expression-position output is syntactically valid (inline block comment)', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `const el = <DeprecatedPagination callback={fn} currentPage={1} numberPages={5} hasStartButton />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // Must contain the inline block comment immediately before the element, not a line comment
    expect(output).toMatch(/\/\* TODO:.*\*\/ <Pagination/)
    // Must not contain a bare line comment (which would break the following JSX)
    expect(output).not.toMatch(/\/\/ TODO:/)
  })
})

describe('type rewrites', () => {
  test('rewrites DeprecatedPaginationProps in type annotations', () => {
    const input = [
      `import { DeprecatedPaginationProps } from '@reapit/elements'`,
      `const props: DeprecatedPaginationProps = {}`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('const props: Pagination.Props = {}')
    expect(output).not.toContain('DeprecatedPaginationProps')
  })

  test('rewrites DeprecatedPaginationProps in heritage clauses', () => {
    const input = [
      `import { DeprecatedPaginationProps } from '@reapit/elements'`,
      `interface Foo extends DeprecatedPaginationProps {}`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('interface Foo extends Pagination.Props {}')
    expect(output).not.toContain('DeprecatedPaginationProps')
  })

  test('rewrites DeprecatedPaginationProps in generics', () => {
    const input = [
      `import { DeprecatedPaginationProps } from '@reapit/elements'`,
      `type Bar = Partial<DeprecatedPaginationProps>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('type Bar = Partial<Pagination.Props>')
    expect(output).not.toContain('DeprecatedPaginationProps')
  })
})

describe('identifier rewrites', () => {
  test('rewrites non-JSX value references', () => {
    const input = [`import { DeprecatedPagination } from '@reapit/elements'`, `const Comp = DeprecatedPagination`].join(
      '\n',
    )
    const output = transform(input, 'file.tsx')
    expect(output).toContain('const Comp = Pagination')
    expect(output).not.toContain('DeprecatedPagination')
  })

  test('does not rewrite aliased value references — the import alias is already correct', () => {
    // `import { DeprecatedPagination as DP }` is rewritten to
    // `import { Pagination as DP }`, so value-site uses of `DP` remain valid
    // and must not be renamed to `Pagination` (which would be undefined).
    const input = [`import { DeprecatedPagination as DP } from '@reapit/elements'`, `const Comp = DP`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('const Comp = DP')
    expect(output).not.toContain('const Comp = Pagination')
    expect(output).not.toContain('DeprecatedPagination')
  })
})

describe('non-elements import guard', () => {
  test('does not rewrite DeprecatedPagination JSX when imported from a non-Elements package', () => {
    // The symbol comes from a third-party package, not @reapit/elements.
    // The codemod must leave the file completely unchanged.
    const input = [
      `import { DeprecatedPagination } from 'some-other-library'`,
      `<DeprecatedPagination callback={fn} currentPage={1} numberPages={5} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toBe(input)
  })

  test('does not rewrite DeprecatedPaginationProps type when imported from a non-Elements package', () => {
    const input = [
      `import { DeprecatedPaginationProps } from 'some-other-library'`,
      `type Props = DeprecatedPaginationProps`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toBe(input)
  })

  test('does not rewrite DeprecatedPagination identifier reference when not from Elements', () => {
    // A non-JSX value reference of DeprecatedPagination from a non-Elements source
    // must not be renamed to Pagination.
    const input = [
      `import { DeprecatedPagination } from 'some-other-library'`,
      `const Comp = DeprecatedPagination`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toBe(input)
  })

  test('still rewrites Elements symbols when non-Elements imports are also present', () => {
    // A file can have both a non-Elements import and an Elements import.
    // The codemod rewrites only the Elements-aliased symbol (EP here).
    // The non-Elements import declaration and any bare DeprecatedPagination
    // identifier references are left unchanged because transformIdentifierReferences
    // filters by the paginationAliases set derived from Elements imports.
    const input = [
      `import { DeprecatedPagination } from 'some-other-library'`,
      `import { DeprecatedPagination as EP } from '@reapit/elements'`,
      `<EP callback={fn} currentPage={1} numberPages={5} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // The non-Elements import declaration is preserved
    expect(output).toContain(`import { DeprecatedPagination } from 'some-other-library'`)
    // The Elements-aliased symbol should be rewritten
    expect(output).toContain(`import { Pagination as EP } from '@reapit/elements/core/pagination'`)
    expect(output).toContain('<EP')
  })
})

describe('re-export preservation', () => {
  test('preserves import when DeprecatedPagination is re-exported via export { }', () => {
    // A file that only imports the symbol to re-export it must not have its
    // import deleted — that would leave the export referencing a missing binding.
    const input = [`import { DeprecatedPagination } from '@reapit/elements'`, `export { DeprecatedPagination }`].join(
      '\n',
    )
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import { DeprecatedPagination } from '@reapit/elements'`)
    expect(output).toContain(`export { DeprecatedPagination }`)
  })

  test('preserves import when aliased DeprecatedPagination is re-exported via export { }', () => {
    const input = [`import { DeprecatedPagination as DP } from '@reapit/elements'`, `export { DP }`].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import { DeprecatedPagination as DP } from '@reapit/elements'`)
    expect(output).toContain(`export { DP }`)
  })

  test('preserves import when DeprecatedPaginationProps is re-exported via export { }', () => {
    const input = [
      `import { DeprecatedPaginationProps } from '@reapit/elements'`,
      `export { DeprecatedPaginationProps }`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain(`import { DeprecatedPaginationProps } from '@reapit/elements'`)
    expect(output).toContain(`export { DeprecatedPaginationProps }`)
  })
})

describe('non-self-closing element TODO comment context', () => {
  test('inserts inline block comment before non-self-closing element in a variable declaration', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `const el = <DeprecatedPagination callback={fn} currentPage={1} numberPages={5} hasStartButton><span /></DeprecatedPagination>`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    // Must use an inline block comment, not a JSX comment, because the element
    // is in an expression position (variable declaration).
    expect(output).toMatch(/\/\* TODO:/)
    expect(output).not.toContain('{/* TODO:')
    expect(output).not.toMatch(/\/\/ TODO:/)
  })

  test('inserts inline block comment before non-self-closing element in a return statement', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `function Foo() {`,
      `  return <DeprecatedPagination callback={fn} currentPage={1} numberPages={5} hasEndButton><span /></DeprecatedPagination>`,
      `}`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toMatch(/\/\* TODO:/)
    expect(output).not.toContain('{/* TODO:')
    expect(output).not.toMatch(/\/\/ TODO:/)
  })

  test('inserts JSX comment before non-self-closing element that is a direct JSX child', () => {
    const input = [
      `import { DeprecatedPagination } from '@reapit/elements'`,
      `const App = () => (`,
      `  <div>`,
      `    <DeprecatedPagination callback={fn} currentPage={1} numberPages={5} hasStartButton>`,
      `      <span />`,
      `    </DeprecatedPagination>`,
      `  </div>`,
      `)`,
    ].join('\n')
    const output = transform(input, 'file.tsx')
    expect(output).toContain('{/* TODO:')
    expect(output).not.toMatch(/^\/\/ TODO:/m)
    expect(output).not.toMatch(/\/\* TODO:.*\*\/ </)
  })
})

describe('facade package behaviour', () => {
  test('keeps facade package specifier unchanged', () => {
    const input = [
      `import { DeprecatedPagination } from '@company/ui'`,
      `<DeprecatedPagination callback={fn} currentPage={1} numberPages={5} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain(`import { Pagination } from '@company/ui'`)
    expect(output).not.toContain('/core/pagination')
  })

  test('keeps facade subpath specifier unchanged', () => {
    const input = [
      `import { DeprecatedPagination } from '@company/ui/elements'`,
      `<DeprecatedPagination callback={fn} currentPage={1} numberPages={5} />`,
    ].join('\n')
    const output = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain(`import { Pagination } from '@company/ui/elements'`)
    expect(output).not.toContain('@reapit/elements/core/pagination')
  })
})
