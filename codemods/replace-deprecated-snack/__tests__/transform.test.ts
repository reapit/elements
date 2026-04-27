import transform from '../transform'

describe('useSnack migration', () => {
  test('rewrites success call', () => {
    const input = `
import { useSnack } from '@reapit/elements'

function App() {
  const snack = useSnack()
  snack.success('Saved')
}
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain("toast.success('Saved')")
    expect(output).not.toContain('useSnack')
    expect(output).not.toContain('const snack')
  })

  test('rewrites error call', () => {
    const input = `
import { useSnack } from '@reapit/elements'

function App() {
  const snack = useSnack()
  snack.error('Failed')
}
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain("toast.error('Failed')")
    expect(output).not.toContain('useSnack')
  })

  test('rewrites info call', () => {
    const input = `
import { useSnack } from '@reapit/elements'
const snack = useSnack()
snack.info('Note')
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain("toast.info('Note')")
  })

  test('rewrites warning call', () => {
    const input = `
import { useSnack } from '@reapit/elements'
const snack = useSnack()
snack.warning('Careful')
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain("toast.warning('Careful')")
  })

  test('converts second timeout argument to { duration }', () => {
    const input = `
import { useSnack } from '@reapit/elements'
const snack = useSnack()
snack.success('Saved', 5000)
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain("toast.success('Saved', { duration: 5000 })")
  })

  test('omits duration option when no timeout argument', () => {
    const input = `
import { useSnack } from '@reapit/elements'
const snack = useSnack()
snack.success('Saved')
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain("toast.success('Saved')")
    expect(output).not.toContain('duration')
  })

  test('adds TODO for custom() calls and preserves declaration and import', () => {
    const input = `
import { useSnack } from '@reapit/elements'
const snack = useSnack()
snack.custom({ intent: 'primary' }, 3000)
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain('TODO')
    expect(output).toContain('custom')
    expect(output).toContain('const snack')
    expect(output).toContain("from '@reapit/elements'")
  })

  test('migrates success() but keeps declaration and import when custom() also remains', () => {
    const input = `
import { useSnack } from '@reapit/elements'
const snack = useSnack()
snack.success('Saved')
snack.custom({ intent: 'primary' })
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain("toast.success('Saved')")
    expect(output).toContain('TODO')
    expect(output).toContain('snack.custom')
    expect(output).toContain('const snack')
    expect(output).toContain("from '@reapit/elements'")
  })

  test('removes the useSnack() variable declaration', () => {
    const input = `
import { useSnack } from '@reapit/elements'
const snack = useSnack()
snack.success('Done')
`
    const output = transform(input, 'app.tsx')
    expect(output).not.toContain('const snack')
    expect(output).not.toContain('useSnack()')
  })

  test('handles aliased useSnack import', () => {
    const input = `
import { useSnack as useNotification } from '@reapit/elements'
const notif = useNotification()
notif.success('Done')
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain("toast.success('Done')")
    expect(output).not.toContain('useNotification()')
  })

  test('handles multiple method calls on same binding', () => {
    const input = `
import { useSnack } from '@reapit/elements'
function App() {
  const snack = useSnack()
  const handleSave = () => snack.success('Saved')
  const handleError = () => snack.error('Failed')
}
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain("toast.success('Saved')")
    expect(output).toContain("toast.error('Failed')")
    expect(output).not.toContain('const snack')
  })

  test('adds toast import', () => {
    const input = `
import { useSnack } from '@reapit/elements'
const snack = useSnack()
snack.success('Done')
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain("from '@reapit/elements/core/toaster'")
    expect(output).toContain('toast')
  })

  test('destructured useSnack gets TODO comment, not transformed', () => {
    const input = `
import { useSnack } from '@reapit/elements'
const { success, error } = useSnack()
success('Done')
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain('TODO')
    expect(output).toContain('useSnack()')
    expect(output).toContain("from '@reapit/elements'")
  })

  test('removes only the useSnack() binding from a multi-declaration statement', () => {
    const input = `
import { useSnack } from '@reapit/elements'
const snack = useSnack(), count = 0
snack.success('Done')
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain('count = 0')
    expect(output).not.toContain('snack = useSnack()')
    expect(output).toContain("toast.success('Done')")
  })
})

describe('SnackProvider migration', () => {
  test('renames SnackProvider tag to Toaster', () => {
    const input = `
import { SnackProvider } from '@reapit/elements'

function Root() {
  return (
    <SnackProvider>
      <App />
    </SnackProvider>
  )
}
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain('<Toaster>')
    expect(output).toContain('</Toaster>')
    expect(output).not.toContain('SnackProvider')
  })

  test('renames self-closing SnackProvider tag', () => {
    const input = `
import { SnackProvider } from '@reapit/elements'
<SnackProvider />
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain('<Toaster />')
    expect(output).not.toContain('SnackProvider')
  })

  test('adds Toaster import', () => {
    const input = `
import { SnackProvider } from '@reapit/elements'
<SnackProvider><App /></SnackProvider>
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain("import { Toaster } from '@reapit/elements/core/toaster'")
  })

  test('preserves SnackProvider alias in JSX', () => {
    const input = `
import { SnackProvider as Provider } from '@reapit/elements'
<Provider><App /></Provider>
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain('<Toaster>')
    expect(output).toContain('</Toaster>')
    expect(output).not.toContain('<Provider>')
  })

  test('merges Toaster import with existing core/toaster import', () => {
    const input = `
import { toast } from '@reapit/elements/core/toaster'
import { SnackProvider } from '@reapit/elements'
<SnackProvider><App /></SnackProvider>
`
    const output = transform(input, 'app.tsx')
    const matches = output.match(/from '@reapit\/elements\/core\/toaster'/g)
    expect(matches).toHaveLength(1)
    expect(output).toContain('Toaster')
  })
})

describe('Snack and SnackHolder', () => {
  test('adds TODO comment at Snack usage', () => {
    const input = `
import { Snack } from '@reapit/elements'
function App() {
  return <Snack intent="success">Saved</Snack>
}
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain('TODO')
    expect(output).toContain('Snack')
  })

  test('adds TODO comment at SnackHolder usage', () => {
    const input = `
import { SnackHolder } from '@reapit/elements'
function App() {
  return <SnackHolder snacks={[]} />
}
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain('TODO')
    expect(output).toContain('SnackHolder')
  })

  test('removes Snack and SnackHolder imports', () => {
    const input = `
import { Snack, SnackHolder } from '@reapit/elements'
function App() {
  return <Snack intent="success">Saved</Snack>
}
`
    const output = transform(input, 'app.tsx')
    expect(output).not.toContain('import { Snack')
    expect(output).not.toContain('import { SnackHolder')
  })
})

describe('type reference removal', () => {
  test('replaces SnackProps type reference with never + TODO', () => {
    const input = `
import { SnackProps } from '@reapit/elements'
type MyProps = SnackProps
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain('never')
    expect(output).toContain('TODO')
    expect(output).not.toContain('import { SnackProps }')
  })

  test('replaces UseSnack type reference with never + TODO', () => {
    const input = `
import { UseSnack } from '@reapit/elements'
const snack: UseSnack = useSnack()
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain('never')
    expect(output).toContain('TODO')
    expect(output).not.toContain('import { UseSnack }')
  })

  test('replaces SnackHolderProps type reference with never + TODO', () => {
    const input = `
import { SnackHolderProps } from '@reapit/elements'
type MyProps = SnackHolderProps
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain('never')
    expect(output).toContain('TODO')
  })

  test('replaces SnackContextProps type reference with never + TODO', () => {
    const input = `
import { SnackContextProps } from '@reapit/elements'
type MyProps = SnackContextProps
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain('never')
    expect(output).toContain('TODO')
  })

  test('replaces SnackProviderProps type reference with never + TODO', () => {
    const input = `
import { SnackProviderProps } from '@reapit/elements'
type MyProps = SnackProviderProps
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain('never')
    expect(output).toContain('TODO')
    expect(output).not.toContain('import { SnackProviderProps }')
  })

  test('replaces SnackContext usage with undefined + TODO', () => {
    const input = `
import { SnackContext } from '@reapit/elements'
import { useContext } from 'react'
const ctx = useContext(SnackContext)
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain('TODO')
    expect(output).not.toContain('import { SnackContext }')
  })
})

describe('import management', () => {
  test('removes deprecated import when fully consumed', () => {
    const input = `
import { useSnack } from '@reapit/elements'
const snack = useSnack()
snack.success('Done')
`
    const output = transform(input, 'app.tsx')
    expect(output).not.toContain("from '@reapit/elements'")
  })

  test('preserves unrelated imports when partial cleanup', () => {
    const input = `
import { useSnack, Button } from '@reapit/elements'
const snack = useSnack()
snack.success('Done')
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain("import { Button } from '@reapit/elements'")
  })

  test('removes empty import declaration', () => {
    const input = `
import { useSnack } from '@reapit/elements'
const snack = useSnack()
snack.success('Done')
`
    const output = transform(input, 'app.tsx')
    expect(output).not.toMatch(/import\s*\{\s*\}\s*from\s*'@reapit\/elements'/)
  })

  test('does not add toast import when no method calls were migrated', () => {
    const input = `
import { SnackProvider } from '@reapit/elements'
function Root() { return <SnackProvider /> }
`
    const output = transform(input, 'app.tsx')
    expect(output).not.toContain('import { toast }')
    expect(output).toContain('Toaster')
  })

  test('adds both toast and Toaster to the same import when both are needed', () => {
    const input = `
import { useSnack, SnackProvider } from '@reapit/elements'
function Root() {
  const snack = useSnack()
  const handleSave = () => snack.success('Done')
  return <SnackProvider><App /></SnackProvider>
}
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain("from '@reapit/elements/core/toaster'")
    expect(output).toContain('toast')
    expect(output).toContain('Toaster')
    const matches = output.match(/from '@reapit\/elements\/core\/toaster'/g)
    expect(matches).toHaveLength(1)
  })
})

describe('no transformation cases', () => {
  test('returns source unchanged when no deprecated symbols present', () => {
    const input = `
import { Button } from '@reapit/elements/core/button'
<Button>Click</Button>
`
    expect(transform(input, 'app.tsx')).toBe(input)
  })

  test('returns source unchanged when useSnack imported from a non-elements package', () => {
    const input = `
import { useSnack } from 'some-other-library'
const snack = useSnack()
snack.success('Done')
`
    expect(transform(input, 'app.tsx')).toBe(input)
  })

  test('empty file returns unchanged', () => {
    expect(transform('', 'app.tsx')).toBe('')
  })
})

describe('facade package support', () => {
  test('new imports use facade base package', () => {
    const input = `
import { useSnack } from '@company/ui'
const snack = useSnack()
snack.success('Done')
`
    const output = transform(input, 'app.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain("from '@company/ui/core/toaster'")
    expect(output).not.toContain('@reapit/elements')
  })

  test('facade subpath import is detected and transformed', () => {
    const input = `
import { useSnack } from '@company/ui/deprecated/use-snack'
const snack = useSnack()
snack.success('Done')
`
    const output = transform(input, 'app.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain("from '@company/ui/core/toaster'")
    expect(output).not.toContain('@reapit/elements')
  })

  test('SnackProvider renamed to Toaster with facade import', () => {
    const input = `
import { SnackProvider } from '@company/ui'
<SnackProvider><App /></SnackProvider>
`
    const output = transform(input, 'app.tsx', { facadePackage: '@company/ui' })
    expect(output).toContain('<Toaster>')
    expect(output).toContain("from '@company/ui/core/toaster'")
    expect(output).not.toContain('@reapit/elements')
  })

  test('no false positive on similar package name', () => {
    const input = `
import { useSnack } from '@company/ui-v2'
const snack = useSnack()
snack.success('Done')
`
    const output = transform(input, 'app.tsx', { facadePackage: '@company/ui' })
    expect(output).toBe(input)
  })
})

describe('subpath import support', () => {
  test('detects and transforms import from deprecated/use-snack subpath', () => {
    const input = `
import { useSnack } from '@reapit/elements/deprecated/use-snack'
const snack = useSnack()
snack.success('Done')
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain("toast.success('Done')")
    expect(output).not.toContain('@reapit/elements/deprecated/use-snack')
    expect(output).toContain("from '@reapit/elements/core/toaster'")
  })

  test('detects and transforms import from deprecated/snack subpath', () => {
    const input = `
import { SnackProvider } from '@reapit/elements/deprecated/use-snack'
<SnackProvider><App /></SnackProvider>
`
    const output = transform(input, 'app.tsx')
    expect(output).toContain('<Toaster>')
    expect(output).not.toContain('@reapit/elements/deprecated/use-snack')
    expect(output).toContain("from '@reapit/elements/core/toaster'")
  })
})

describe('import type promotion', () => {
  test('promotes import type { toast } to a value import when adding toast', () => {
    const input = `
import type { toast } from '@reapit/elements/core/toaster'
import { useSnack } from '@reapit/elements'
const snack = useSnack()
snack.success('Done')
`
    const output = transform(input, 'app.tsx')
    expect(output).not.toMatch(/import\s+type\s+\{/)
    expect(output).toContain('toast')
  })
})

describe('generated imports have no trailing semicolons', () => {
  test('core/toaster import line does not end with semicolon', () => {
    const input = `import { useSnack } from '@reapit/elements'
const snack = useSnack()
snack.success('Done')
`
    const output = transform(input, 'app.tsx')
    const importLines = output.split('\n').filter((line) => line.trimStart().startsWith('import '))
    for (const line of importLines) {
      expect(line.trimEnd()).not.toMatch(/;$/)
    }
  })
})
