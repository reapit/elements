import { test, expect, describe } from 'vitest'
import transform from '../transform'

// ===== Single export — maps to subpath =====

describe('single subpath-eligible imports', () => {
  test('transforms Button import to core/button', () => {
    const input = `import { Button } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(`import { Button } from '@reapit/elements/core/button'\n`)
  })

  test('transforms Link import to core/link', () => {
    const input = `import { Link } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(`import { Link } from '@reapit/elements/core/link'\n`)
  })

  test('transforms DeprecatedSelect import to deprecated/select', () => {
    const input = `import { DeprecatedSelect } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(`import { DeprecatedSelect } from '@reapit/elements/deprecated/select'\n`)
  })

  test('transforms Popover import to utils/popover', () => {
    const input = `import { Popover } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(`import { Popover } from '@reapit/elements/utils/popover'\n`)
  })

  test('transforms MoreIcon import to icons/more', () => {
    const input = `import { MoreIcon } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(`import { MoreIcon } from '@reapit/elements/icons/more'\n`)
  })

  test('transforms AddIcon import to icons/add', () => {
    const input = `import { AddIcon } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(`import { AddIcon } from '@reapit/elements/icons/add'\n`)
  })
})

// ===== Multiple exports — same subpath → single import =====

describe('multiple exports from the same subpath', () => {
  test('groups Button and AnchorButton into one core/button import', () => {
    const input = `import { Button, AnchorButton } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(`import { Button, AnchorButton } from '@reapit/elements/core/button'\n`)
  })

  test('groups multiple accordion exports into one core/accordion import', () => {
    const input = `import { Accordion, AccordionSummary } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(`import { Accordion, AccordionSummary } from '@reapit/elements/core/accordion'\n`)
  })
})

// ===== Multiple exports — different subpaths → split into multiple imports =====

describe('multiple exports from different subpaths', () => {
  test('splits Button (core/button) and Link (core/link) into separate imports', () => {
    const input = `import { Button, Link } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`)
    expect(output).toContain(`import { Link } from '@reapit/elements/core/link'`)
  })

  test('splits Button, Link, DeprecatedSelect, Popover, and MoreIcon into five imports', () => {
    const input = `import { Button, Link, DeprecatedSelect, Popover, MoreIcon } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`)
    expect(output).toContain(`import { Link } from '@reapit/elements/core/link'`)
    expect(output).toContain(`import { DeprecatedSelect } from '@reapit/elements/deprecated/select'`)
    expect(output).toContain(`import { Popover } from '@reapit/elements/utils/popover'`)
    expect(output).toContain(`import { MoreIcon } from '@reapit/elements/icons/more'`)
    // Original barrel import must be gone
    expect(output).not.toContain(`from '@reapit/elements'`)
  })
})

// ===== Root-only exports — stay as barrel import =====

describe('root-only exports remain as barrel import', () => {
  test('leaves getIntentClassName unchanged (helpers/intent)', () => {
    const input = `import { getIntentClassName } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(input)
  })

  test('leaves Intent type unchanged (helpers/intent)', () => {
    const input = `import type { Intent } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(input)
  })

  test('leaves Theme type unchanged (tokens)', () => {
    const input = `import type { Theme } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(input)
  })
})

// ===== Mixed: subpath-eligible + root-only → split into subpath(s) + residual barrel =====

describe('mixed subpath-eligible and root-only exports', () => {
  test('splits Button to core/button and keeps getIntentClassName in barrel', () => {
    const input = `import { Button, getIntentClassName } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`)
    expect(output).toContain(`import { getIntentClassName } from '@reapit/elements'`)
    // Should not have Button in the barrel import
    expect(output).not.toMatch(/import \{ Button.*\} from '@reapit\/elements'/)
  })

  test('splits multiple subpath imports and keeps residual root-only in barrel', () => {
    const input = `import { Button, MoreIcon, getIntentClassName, Theme } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`)
    expect(output).toContain(`import { MoreIcon } from '@reapit/elements/icons/more'`)
    // getIntentClassName and Theme are root-only; they stay in the barrel import together
    expect(output).toContain(`import { getIntentClassName, Theme } from '@reapit/elements'`)
  })
})

// ===== Type imports =====

describe('type imports', () => {
  test('transforms type-only import declaration', () => {
    const input = `import type { Button } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(`import type { Button } from '@reapit/elements/core/button'\n`)
  })

  test('transforms inline type specifier', () => {
    const input = `import { type Button } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(`import { type Button } from '@reapit/elements/core/button'\n`)
  })

  test('handles mixed value and type imports from same subpath', () => {
    // AccordionProps is a real named export mapping to core/accordion
    const input = `import { Accordion, type AccordionProps } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(`import { Accordion, type AccordionProps } from '@reapit/elements/core/accordion'\n`)
  })

  test('handles type-only import declaration that splits across subpaths', () => {
    const input = `import type { Button, MoreIcon } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toContain(`import type { Button } from '@reapit/elements/core/button'`)
    expect(output).toContain(`import type { MoreIcon } from '@reapit/elements/icons/more'`)
  })
})

// ===== Aliased imports =====

describe('aliased imports', () => {
  test('preserves alias when transforming to subpath', () => {
    const input = `import { Button as Btn } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(`import { Button as Btn } from '@reapit/elements/core/button'\n`)
  })

  test('preserves alias for icon import', () => {
    const input = `import { MoreIcon as More } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(`import { MoreIcon as More } from '@reapit/elements/icons/more'\n`)
  })

  test('preserves alias for root-only export', () => {
    const input = `import { getIntentClassName as getIntent } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(input)
  })
})

// ===== Existing subpath imports are untouched =====

describe('existing subpath imports are not re-transformed', () => {
  test('does not change an already-correct core/button import', () => {
    const input = `import { Button } from '@reapit/elements/core/button'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(input)
  })

  test('does not change an already-correct icons/more import', () => {
    const input = `import { MoreIcon } from '@reapit/elements/icons/more'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(input)
  })

  test('does not change an already-correct deprecated/icon import', () => {
    const input = `import { DeprecatedIcon } from '@reapit/elements/deprecated/icon'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(input)
  })

  test('transforms barrel but leaves existing subpath imports alone', () => {
    const input = `import { Link } from '@reapit/elements'
import { Button } from '@reapit/elements/core/button'`
    const output = transform(input, 'test.tsx')
    expect(output).toContain(`import { Link } from '@reapit/elements/core/link'`)
    expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`)
  })
})

// ===== Non-elements imports are untouched =====

describe('non-elements imports are untouched', () => {
  test('does not change React imports', () => {
    const input = `import { useState } from 'react'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(input)
  })

  test('does not change unrelated package imports', () => {
    const input = `import { something } from 'some-other-lib'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(input)
  })
})

// ===== Default and namespace imports are left untouched =====

describe('default and namespace imports are left untouched', () => {
  test('leaves default + named import unchanged', () => {
    const input = `import Elements, { Button } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(input)
  })

  test('leaves default-only import unchanged', () => {
    const input = `import Elements from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(input)
  })

  test('leaves namespace import unchanged', () => {
    const input = `import * as Elements from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(input)
  })
})

// ===== Early-exit optimisation =====

describe('early exit when no barrel imports present', () => {
  test('returns source unchanged when no @reapit/elements import', () => {
    const input = `import { useState } from 'react'

export const MyComponent = () => <div>Hello</div>`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(input)
  })

  test('returns empty string unchanged', () => {
    const input = ``
    const output = transform(input, 'test.tsx')
    expect(output).toBe(input)
  })
})

// ===== Multi-line imports =====

describe('multi-line imports', () => {
  test('handles multi-line import that maps to single subpath', () => {
    const input = `import {
  Button,
  AnchorButton,
} from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toBe(`import { Button, AnchorButton } from '@reapit/elements/core/button'\n`)
  })

  test('handles multi-line import that splits across subpaths', () => {
    const input = `import {
  Button,
  MoreIcon,
} from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`)
    expect(output).toContain(`import { MoreIcon } from '@reapit/elements/icons/more'`)
  })
})

// ===== Real-world scenario =====

describe('real-world scenarios', () => {
  test('transforms a typical component file', () => {
    const input = `import { Button, Link, DeprecatedSelect, Popover, MoreIcon } from '@reapit/elements'
import { useState } from 'react'

export const MyComponent = () => {
  return <Button>Click</Button>
}`
    const output = transform(input, 'test.tsx')
    expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`)
    expect(output).toContain(`import { Link } from '@reapit/elements/core/link'`)
    expect(output).toContain(`import { DeprecatedSelect } from '@reapit/elements/deprecated/select'`)
    expect(output).toContain(`import { Popover } from '@reapit/elements/utils/popover'`)
    expect(output).toContain(`import { MoreIcon } from '@reapit/elements/icons/more'`)
    expect(output).toContain(`import { useState } from 'react'`)
    expect(output).toContain('export const MyComponent')
    expect(output).not.toContain(`from '@reapit/elements'`)
  })

  test('handles file with multiple separate barrel import statements', () => {
    const input = `import { Button } from '@reapit/elements'
import { Link } from '@reapit/elements'`
    const output = transform(input, 'test.tsx')
    // Each statement is transformed independently (no merging across statements)
    expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`)
    expect(output).toContain(`import { Link } from '@reapit/elements/core/link'`)
  })

  test('handles file with comments around imports', () => {
    const input = `// My components
import { Button } from '@reapit/elements'

/* Usage */
export const App = () => <Button>Go</Button>`
    const output = transform(input, 'test.tsx')
    expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`)
    expect(output).toContain('// My components')
  })

  test('does not rewrite double quotes inside string literals', () => {
    // A string literal that contains the text `from "..."` should not be rewritten.
    // The old global regex would mangle 'import { foo } from "some-lib"' inside a
    // single-quoted string, producing broken syntax.
    // The double-quoted import itself should still be normalised to single quotes.
    const input = `import { Button } from "@reapit/elements"

const dynamicImport = 'import { foo } from "some-lib"'
`
    const output = transform(input, 'test.tsx')
    // Import normalised to single quotes
    expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`)
    // String literal left untouched
    expect(output).toContain(`const dynamicImport = 'import { foo } from "some-lib"'`)
  })
})
