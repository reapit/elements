import transform from '../transform'

describe('replace-deprecated-use-click-outside codemod', () => {
  test('inlines hook call and removes elements import', () => {
    const input = `import { useRef } from 'react'
import { useClickOutside } from '@reapit/elements'

function Example() {
  const popoverRef = useRef<HTMLDivElement | null>(null)
  const closeMenu = () => {}
  useClickOutside(popoverRef, closeMenu)
  return null
}
`

    const output = transform(input, 'example.tsx')

    expect(output).toContain("import { useRef, useEffect } from 'react'")
    expect(output).not.toContain('useClickOutside } from')
    expect(output).toContain('const __inlineUseClickOutsideRef1 = popoverRef')
    expect(output).toContain('const __inlineUseClickOutsideOnClickOutside1 = closeMenu')
    expect(output).toContain('const handleClickOutside = (event: MouseEvent) =>')
    expect(output).toContain(
      'const outsideParentElementForClickOutside = __inlineUseClickOutsideRef1.current?.parentElement',
    )
    expect(output).toContain('const target = event.target')
    expect(output).toContain(
      'if (outsideParentElementForClickOutside && target instanceof Node && !outsideParentElementForClickOutside.contains(target))',
    )
    expect(output).toContain('(__inlineUseClickOutsideOnClickOutside1)()')
    expect(output).toContain('}, [__inlineUseClickOutsideRef1, __inlineUseClickOutsideOnClickOutside1])')
  })

  test('supports aliased import and invocation', () => {
    const input = `import { useRef } from 'react'
import { useClickOutside as outside } from '@reapit/elements'

function Example() {
  const ref = useRef<HTMLDivElement | null>(null)
  const onClose = () => {}
  outside(ref, onClose)
  return null
}
`

    const output = transform(input, 'example.tsx')

    expect(output).not.toContain('as outside')
    expect(output).not.toContain('outside(ref, onClose)')
    expect(output).toContain(
      'const outsideParentElementForClickOutside = __inlineUseClickOutsideRef1.current?.parentElement',
    )
    expect(output).toContain('}, [__inlineUseClickOutsideRef1, __inlineUseClickOutsideOnClickOutside1])')
  })

  test('handles subpath import', () => {
    const input = `import { useClickOutside } from '@reapit/elements/deprecated/use-click-outside'

function Example(ref, onClose) {
  useClickOutside(ref, onClose)
}
`

    const output = transform(input, 'example.tsx')

    expect(output).not.toContain("from '@reapit/elements/deprecated/use-click-outside'")
    expect(output).toContain("import { useEffect } from 'react'")
    expect(output).toContain(
      'const outsideParentElementForClickOutside = __inlineUseClickOutsideRef1.current?.parentElement',
    )
  })

  test('handles facade package import', () => {
    const input = `import { useClickOutside } from '@company/ui'

function Example(ref, onClose) {
  useClickOutside(ref, onClose)
}
`

    const output = transform(input, 'example.tsx', { facadePackage: '@company/ui' })

    expect(output).not.toContain("from '@company/ui'")
    expect(output).toContain("import { useEffect } from 'react'")
    expect(output).toContain(
      'const outsideParentElementForClickOutside = __inlineUseClickOutsideRef1.current?.parentElement',
    )
  })

  test('does not duplicate useEffect import when already present', () => {
    const input = `import { useEffect, useRef } from 'react'
import { useClickOutside } from '@reapit/elements'

function Example() {
  const ref = useRef<HTMLDivElement | null>(null)
  useClickOutside(ref, () => {})
  return null
}
`

    const output = transform(input, 'example.tsx')
    const reactImportMatches = output.match(/from 'react'/g) ?? []

    expect(reactImportMatches).toHaveLength(1)
    expect(output).toContain("import { useEffect, useRef } from 'react'")
  })

  test('uses aliased useEffect identifier when useEffect is imported with an alias', () => {
    const input = `import { useEffect as ue, useRef } from 'react'
import { useClickOutside } from '@reapit/elements'

function Example() {
  const ref = useRef<HTMLDivElement | null>(null)
  const onClose = () => {}
  useClickOutside(ref, onClose)
  return null
}
`

    const output = transform(input, 'example.tsx')

    expect(output).toContain('ue(() =>')
    expect(output).not.toContain('useEffect(() =>')
    const reactImportMatches = output.match(/from 'react'/g) ?? []
    expect(reactImportMatches).toHaveLength(1)
  })

  test('adds a value useEffect import when only type-only react import exists', () => {
    const input = `import type { FC } from 'react'
import { useClickOutside } from '@reapit/elements'

const Example: FC<{ refEl: any; onClose: () => void }> = ({ refEl, onClose }) => {
  useClickOutside(refEl, onClose)
  return null
}
`

    const output = transform(input, 'example.tsx')

    expect(output).toContain("import type { FC } from 'react'")
    expect(output).toContain("import { useEffect } from 'react'")
    expect(output).not.toContain("import type { FC, useEffect } from 'react'")
  })

  test('keeps elements import when other named imports remain', () => {
    const input = `import { Button, useClickOutside } from '@reapit/elements'

function Example(ref, onClose) {
  useClickOutside(ref, onClose)
  return <Button />
}
`

    const output = transform(input, 'example.tsx')

    expect(output).toContain("import { Button } from '@reapit/elements'")
    expect(output).not.toContain('useClickOutside')
  })

  test('keeps import when useClickOutside is referenced but not called', () => {
    const input = `import { useClickOutside } from '@reapit/elements'

const fn = useClickOutside
`

    const output = transform(input, 'example.tsx')

    expect(output).toContain('useClickOutside')
    expect(output).toContain("import { useClickOutside } from '@reapit/elements'")
    expect(output).not.toContain('TODO: Inline useClickOutside manually')
  })

  test('adds TODO for wrong argument count', () => {
    const input = `import { useClickOutside } from '@reapit/elements'

function Example(ref) {
  useClickOutside(ref)
}
`

    const output = transform(input, 'example.tsx')

    expect(output).toContain('TODO: Inline useClickOutside manually')
    expect(output).toContain('useClickOutside(ref)')
  })

  test('hoists non-trivial arguments to avoid repeated evaluation inside effect', () => {
    const input = `import { useClickOutside } from '@reapit/elements'

function Example() {
  useClickOutside(getRef(), getOnClose())
}
`

    const output = transform(input, 'example.tsx')

    expect(output).toContain('const __inlineUseClickOutsideRef1 = getRef()')
    expect(output).toContain('const __inlineUseClickOutsideOnClickOutside1 = getOnClose()')
    expect(output).toContain(
      'const outsideParentElementForClickOutside = __inlineUseClickOutsideRef1.current?.parentElement',
    )
    expect(output).toContain('}, [__inlineUseClickOutsideRef1, __inlineUseClickOutsideOnClickOutside1])')
  })

  test('does not throw when same statement has nested useClickOutside calls', () => {
    const input = `import { useClickOutside } from '@reapit/elements'

function Example(ref, onClose) {
  run(useClickOutside(ref, onClose), useClickOutside(ref, onClose))
}
`

    const output = transform(input, 'example.tsx')

    expect(output).toContain('TODO: Inline useClickOutside manually')
    expect(output).toContain('run(useClickOutside(ref, onClose), useClickOutside(ref, onClose))')
  })

  test('returns unchanged when no matching import exists', () => {
    const input = `import { useClickOutside } from 'some-other-library'

function Example(ref, onClose) {
  useClickOutside(ref, onClose)
}
`

    const output = transform(input, 'example.tsx')
    expect(output).toBe(input)
  })
})
