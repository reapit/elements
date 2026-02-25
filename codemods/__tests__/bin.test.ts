// Mock transforms BEFORE importing bin (hoisted by vitest)
vi.mock('../transforms.js', () => ({
  transforms: {
    'my-codemod': vi.fn().mockResolvedValue({ default: vi.fn() }),
  },
}))

// Mock codemods module
vi.mock('../codemods.js', () => ({
  listCodemods: vi.fn(() => ['my-codemod']),
  getCodemodDescription: vi.fn(() => 'A test codemod'),
  validateCodemodName: vi.fn((name: string) => name === 'my-codemod' || name === 'known-but-missing-loader'),
  CODEMOD_NAMES: ['my-codemod'],
  AVAILABLE_CODEMODS: [{ name: 'my-codemod', description: 'A test codemod' }],
}))

// Mock runner to prevent actual file I/O
vi.mock('../runner.js', () => ({
  run: vi.fn(),
}))

// bin.ts auto-runs main() at the bottom when imported. We cannot prevent this
// with a static import, but we can use dynamic import inside beforeEach after
// vi.resetModules() so we control when the module loads. However that means
// main() re-runs each time. Instead, we use a single dynamic import in a
// beforeAll, setting process.argv to 'list' first so main() returns without
// calling process.exit, and silencing console output during that boot.
let handleInfo: (args: string[]) => void
let handleApply: (args: string[]) => Promise<void>

beforeAll(async () => {
  const savedArgv = process.argv
  const savedLog = console.log
  process.argv = ['node', 'bin.js', 'list']
  console.log = () => {}
  try {
    const mod = await import('../bin.js')
    handleInfo = mod.handleInfo
    handleApply = mod.handleApply
  } finally {
    process.argv = savedArgv
    console.log = savedLog
  }
})

describe('handleInfo', () => {
  let consoleOutput: string[]
  let originalExit: typeof process.exit
  let exitCode: number | null

  beforeEach(() => {
    consoleOutput = []
    exitCode = null
    originalExit = process.exit

    process.exit = ((code?: number) => {
      exitCode = code ?? 0
      throw new Error(`process.exit(${code})`)
    }) as typeof process.exit

    vi.spyOn(console, 'log').mockImplementation((msg) => {
      consoleOutput.push(String(msg))
    })
    vi.spyOn(console, 'error').mockImplementation((msg) => {
      consoleOutput.push(String(msg))
    })
  })

  afterEach(() => {
    process.exit = originalExit
    vi.restoreAllMocks()
  })

  test('prints codemod info for a valid codemod name', () => {
    handleInfo(['my-codemod'])

    const output = consoleOutput.join('\n')
    expect(output).toContain('my-codemod')
    expect(exitCode).toBeNull()
  })

  test('exits with code 1 for an unknown codemod name', () => {
    expect(() => handleInfo(['unknown-codemod'])).toThrow('process.exit(1)')
    expect(exitCode).toBe(1)
    expect(consoleOutput.join('\n')).toContain('Unknown codemod')
  })

  test('exits with code 1 when no name is provided', () => {
    expect(() => handleInfo([])).toThrow('process.exit(1)')
    expect(exitCode).toBe(1)
    expect(consoleOutput.join('\n')).toContain('No codemod name provided')
  })
})

describe('handleApply', () => {
  let consoleOutput: string[]
  let originalExit: typeof process.exit
  let exitCode: number | null

  beforeEach(() => {
    consoleOutput = []
    exitCode = null
    originalExit = process.exit

    process.exit = ((code?: number) => {
      exitCode = code ?? 0
      throw new Error(`process.exit(${code})`)
    }) as typeof process.exit

    vi.spyOn(console, 'log').mockImplementation((msg) => {
      consoleOutput.push(String(msg))
    })
    vi.spyOn(console, 'error').mockImplementation((msg) => {
      consoleOutput.push(String(msg))
    })
  })

  afterEach(() => {
    process.exit = originalExit
    vi.restoreAllMocks()
  })

  test('exits with code 1 for an unknown codemod name', async () => {
    await expect(() => handleApply(['unknown-codemod', 'src'])).rejects.toThrow('process.exit(1)')
    expect(exitCode).toBe(1)
    expect(consoleOutput.join('\n')).toContain('Unknown codemod')
  })

  test('exits with code 1 when no name is provided', async () => {
    await expect(() => handleApply([])).rejects.toThrow('process.exit(1)')
    expect(exitCode).toBe(1)
    expect(consoleOutput.join('\n')).toContain('No codemod name provided')
  })

  test('resolves a loader for a valid codemod name and calls run', async () => {
    const { run } = await import('../runner.js')

    await handleApply(['my-codemod', 'src'])

    expect(run).toHaveBeenCalledWith(
      expect.objectContaining({
        codemodName: 'my-codemod',
      }),
    )
    expect(exitCode).toBeNull()
  })

  test('exits with code 1 when loader is missing for a validated codemod name', async () => {
    // 'known-but-missing-loader' passes validateCodemodName but has no entry in transforms
    await expect(() => handleApply(['known-but-missing-loader', 'src'])).rejects.toThrow('process.exit(1)')
    expect(exitCode).toBe(1)
    expect(consoleOutput.join('\n')).toContain("No transform found for codemod 'known-but-missing-loader'")
  })
})
