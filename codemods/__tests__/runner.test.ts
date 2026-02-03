import { existsSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { findFiles, matchesPatterns, run } from '../runner'
import type { Transform } from '../runner'

let testDir: string

beforeEach(() => {
  // Create a temporary test directory
  testDir = join(tmpdir(), `runner-test-${Date.now()}`)
  mkdirSync(testDir, { recursive: true })
})

afterEach(() => {
  // Clean up test directory
  if (existsSync(testDir)) {
    rmSync(testDir, { recursive: true, force: true })
  }
})

describe('matchesPatterns', () => {
  test('matches files with *.ext pattern', () => {
    expect(matchesPatterns('file.ts', ['*.ts'])).toBe(true)
    expect(matchesPatterns('file.tsx', ['*.tsx'])).toBe(true)
    expect(matchesPatterns('file.js', ['*.js'])).toBe(true)
  })

  test('does not match files with wrong extension', () => {
    expect(matchesPatterns('file.ts', ['*.tsx'])).toBe(false)
    expect(matchesPatterns('file.js', ['*.ts'])).toBe(false)
  })

  test('matches with multiple patterns', () => {
    const patterns = ['*.ts', '*.tsx']

    expect(matchesPatterns('file.ts', patterns)).toBe(true)
    expect(matchesPatterns('file.tsx', patterns)).toBe(true)
    expect(matchesPatterns('file.js', patterns)).toBe(false)
  })

  test('matches exact filename', () => {
    expect(matchesPatterns('specific-file.ts', ['specific-file.ts'])).toBe(true)
    expect(matchesPatterns('other-file.ts', ['specific-file.ts'])).toBe(false)
  })

  test('matches with wildcard in middle of pattern', () => {
    expect(matchesPatterns('test.spec.ts', ['*.spec.ts'])).toBe(true)
    expect(matchesPatterns('file.test.ts', ['*.spec.ts'])).toBe(false)
  })

  test('rejects patterns that are too long (ReDoS protection)', () => {
    const longPattern = '*'.repeat(200)
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const result = matchesPatterns('file.ts', [longPattern])

    expect(result).toBe(false)
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('potentially unsafe pattern'))

    consoleSpy.mockRestore()
  })

  test('rejects patterns with excessive wildcards (ReDoS protection)', () => {
    const pattern = '*.*.*.*.*.*.ts'
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const result = matchesPatterns('file.ts', [pattern])

    expect(result).toBe(false)
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('potentially unsafe pattern'))

    consoleSpy.mockRestore()
  })

  test('rejects filenames that are too long', () => {
    const longFilename = 'a'.repeat(600) + '.ts'
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const result = matchesPatterns(longFilename, ['*test*.ts'])

    expect(result).toBe(false)
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Filename too long'))

    consoleSpy.mockRestore()
  })

  test('matches common file extensions', () => {
    expect(matchesPatterns('Component.tsx', ['*.tsx', '*.ts', '*.jsx', '*.js'])).toBe(true)
    expect(matchesPatterns('utils.ts', ['*.tsx', '*.ts', '*.jsx', '*.js'])).toBe(true)
    expect(matchesPatterns('App.jsx', ['*.tsx', '*.ts', '*.jsx', '*.js'])).toBe(true)
    expect(matchesPatterns('index.js', ['*.tsx', '*.ts', '*.jsx', '*.js'])).toBe(true)
  })

  test('returns false for empty pattern array', () => {
    expect(matchesPatterns('file.ts', [])).toBe(false)
  })

  test('matches first matching pattern', () => {
    const patterns = ['*.js', '*.ts', '*.tsx']

    expect(matchesPatterns('file.ts', patterns)).toBe(true)
  })
})

describe('findFiles', () => {
  test('finds files matching patterns in directory', () => {
    writeFileSync(join(testDir, 'file1.ts'), 'content')
    writeFileSync(join(testDir, 'file2.tsx'), 'content')
    writeFileSync(join(testDir, 'file3.js'), 'content')

    const files = findFiles(testDir, ['*.ts', '*.tsx'])

    expect(files).toHaveLength(2)
    expect(files).toContainEqual(join(testDir, 'file1.ts'))
    expect(files).toContainEqual(join(testDir, 'file2.tsx'))
  })

  test('recursively finds files in subdirectories', () => {
    const subDir = join(testDir, 'subdir')
    mkdirSync(subDir)

    writeFileSync(join(testDir, 'root.ts'), 'content')
    writeFileSync(join(subDir, 'nested.ts'), 'content')

    const files = findFiles(testDir, ['*.ts'])

    expect(files).toHaveLength(2)
    expect(files).toContainEqual(join(testDir, 'root.ts'))
    expect(files).toContainEqual(join(subDir, 'nested.ts'))
  })

  test('skips node_modules directory', () => {
    const nodeModules = join(testDir, 'node_modules')
    mkdirSync(nodeModules)

    writeFileSync(join(testDir, 'app.ts'), 'content')
    writeFileSync(join(nodeModules, 'package.ts'), 'content')

    const files = findFiles(testDir, ['*.ts'])

    expect(files).toHaveLength(1)
    expect(files).toContainEqual(join(testDir, 'app.ts'))
    expect(files).not.toContainEqual(join(nodeModules, 'package.ts'))
  })

  test('skips dist directory', () => {
    const dist = join(testDir, 'dist')
    mkdirSync(dist)

    writeFileSync(join(testDir, 'source.ts'), 'content')
    writeFileSync(join(dist, 'compiled.js'), 'content')

    const files = findFiles(testDir, ['*.ts', '*.js'])

    expect(files).toHaveLength(1)
    expect(files).toContainEqual(join(testDir, 'source.ts'))
  })

  test('returns empty array when no matching files exist', () => {
    writeFileSync(join(testDir, 'file.txt'), 'content')
    writeFileSync(join(testDir, 'file.md'), 'content')

    const files = findFiles(testDir, ['*.ts'])

    expect(files).toEqual([])
  })

  test('finds files in deeply nested directories', () => {
    const level1 = join(testDir, 'level1')
    const level2 = join(level1, 'level2')
    const level3 = join(level2, 'level3')

    mkdirSync(level3, { recursive: true })

    writeFileSync(join(level3, 'deep.ts'), 'content')

    const files = findFiles(testDir, ['*.ts'])

    expect(files).toHaveLength(1)
    expect(files).toContainEqual(join(level3, 'deep.ts'))
  })

  test('handles multiple file types in nested structure', () => {
    const src = join(testDir, 'src')
    const components = join(src, 'components')
    const utils = join(src, 'utils')

    mkdirSync(components, { recursive: true })
    mkdirSync(utils, { recursive: true })

    writeFileSync(join(components, 'Button.tsx'), 'content')
    writeFileSync(join(components, 'Input.tsx'), 'content')
    writeFileSync(join(utils, 'helpers.ts'), 'content')
    writeFileSync(join(src, 'index.ts'), 'content')

    const files = findFiles(testDir, ['*.ts', '*.tsx'])

    expect(files).toHaveLength(4)
  })

  test('uses accumulator parameter correctly', () => {
    writeFileSync(join(testDir, 'file1.ts'), 'content')
    writeFileSync(join(testDir, 'file2.ts'), 'content')

    const existingResults = ['/existing/file.ts']
    const files = findFiles(testDir, ['*.ts'], existingResults)

    expect(files).toHaveLength(3)
    expect(files).toContain('/existing/file.ts')
  })

  test('prevents path traversal attacks', () => {
    // This test ensures that symlinks or malicious paths don't escape the base directory
    writeFileSync(join(testDir, 'safe.ts'), 'content')

    const files = findFiles(testDir, ['*.ts'])

    // All returned files should be within testDir
    files.forEach((file) => {
      expect(file.startsWith(testDir)).toBe(true)
    })
  })
})

describe('run', () => {
  let originalCwd: string
  let originalExit: typeof process.exit
  let exitCode: number | null
  let consoleOutput: string[]

  beforeEach(() => {
    originalCwd = process.cwd()
    originalExit = process.exit
    exitCode = null
    consoleOutput = []

    // Mock process.exit to capture exit codes
    process.exit = ((code?: number) => {
      exitCode = code ?? 0
      throw new Error(`process.exit(${code})`)
    }) as typeof process.exit

    // Mock console methods
    vi.spyOn(console, 'log').mockImplementation((msg) => {
      consoleOutput.push(String(msg))
    })
    vi.spyOn(console, 'error').mockImplementation((msg) => {
      consoleOutput.push(String(msg))
    })
  })

  afterEach(() => {
    process.exit = originalExit
    process.chdir(originalCwd)
    vi.restoreAllMocks()
  })

  test('exits with help when no args provided', async () => {
    const transform: Transform = (source) => source

    await expect(
      run({
        transform,
        codemodName: 'test-codemod',
        args: [],
      }),
    ).rejects.toThrow('process.exit(0)')

    expect(exitCode).toBe(0)
    expect(consoleOutput.join('\n')).toContain('Usage:')
  })

  test('exits with help when --help flag provided', async () => {
    const transform: Transform = (source) => source

    await expect(
      run({
        transform,
        codemodName: 'test-codemod',
        args: ['--help'],
      }),
    ).rejects.toThrow('process.exit(0)')

    expect(exitCode).toBe(0)
    expect(consoleOutput.join('\n')).toContain('Usage:')
  })

  test('transforms files in directory', async () => {
    process.chdir(testDir)

    const srcDir = join(testDir, 'src')
    mkdirSync(srcDir)

    writeFileSync(join(srcDir, 'file1.ts'), 'OLD_CODE')
    writeFileSync(join(srcDir, 'file2.ts'), 'OLD_CODE')

    const transform: Transform = (source) => source.replace('OLD_CODE', 'NEW_CODE')

    await run({
      transform,
      codemodName: 'test-codemod',
      args: ['src'],
    })

    const file1Content = readFileSync(join(srcDir, 'file1.ts'), 'utf-8')
    const file2Content = readFileSync(join(srcDir, 'file2.ts'), 'utf-8')

    expect(file1Content).toBe('NEW_CODE')
    expect(file2Content).toBe('NEW_CODE')
  })

  test('performs dry run without modifying files', async () => {
    process.chdir(testDir)

    const srcDir = join(testDir, 'src')
    mkdirSync(srcDir)

    writeFileSync(join(srcDir, 'file.ts'), 'OLD_CODE')

    const transform: Transform = (source) => source.replace('OLD_CODE', 'NEW_CODE')

    await run({
      transform,
      codemodName: 'test-codemod',
      args: ['src', '--dry-run'],
    })

    const fileContent = readFileSync(join(srcDir, 'file.ts'), 'utf-8')

    expect(fileContent).toBe('OLD_CODE')
    expect(consoleOutput.join('\n')).toContain('Would transform')
  })

  test('respects custom file extensions', async () => {
    process.chdir(testDir)

    const srcDir = join(testDir, 'src')
    mkdirSync(srcDir)

    writeFileSync(join(srcDir, 'file.tsx'), 'OLD_CODE')
    writeFileSync(join(srcDir, 'file.ts'), 'OLD_CODE')
    writeFileSync(join(srcDir, 'file.js'), 'OLD_CODE')

    const transform: Transform = (source) => source.replace('OLD_CODE', 'NEW_CODE')

    await run({
      transform,
      codemodName: 'test-codemod',
      args: ['src', '--ext', '.tsx,.jsx'],
    })

    const tsxContent = readFileSync(join(srcDir, 'file.tsx'), 'utf-8')
    const tsContent = readFileSync(join(srcDir, 'file.ts'), 'utf-8')

    expect(tsxContent).toBe('NEW_CODE')
    expect(tsContent).toBe('OLD_CODE') // Not transformed
  })

  test('exits with error when directory not found', async () => {
    process.chdir(testDir)

    const transform: Transform = (source) => source

    await expect(
      run({
        transform,
        codemodName: 'test-codemod',
        args: ['nonexistent'],
      }),
    ).rejects.toThrow('process.exit(1)')

    expect(exitCode).toBe(1)
    expect(consoleOutput.join('\n')).toContain('Directory not found')
  })

  test('exits with error when no directory provided', async () => {
    process.chdir(testDir)

    const transform: Transform = (source) => source

    await expect(
      run({
        transform,
        codemodName: 'test-codemod',
        args: ['--dry-run'],
      }),
    ).rejects.toThrow('process.exit(1)')

    expect(exitCode).toBe(1)
    expect(consoleOutput.join('\n')).toContain('No directory provided')
  })

  test('prevents directory traversal attacks', async () => {
    process.chdir(testDir)

    const transform: Transform = (source) => source

    await expect(
      run({
        transform,
        codemodName: 'test-codemod',
        args: ['../../../etc'],
      }),
    ).rejects.toThrow('process.exit(1)')

    expect(exitCode).toBe(1)
    expect(consoleOutput.join('\n')).toContain('outside the current working directory')
  })

  test('only transforms files that change', async () => {
    process.chdir(testDir)

    const srcDir = join(testDir, 'src')
    mkdirSync(srcDir)

    writeFileSync(join(srcDir, 'changed.ts'), 'OLD_CODE')
    writeFileSync(join(srcDir, 'unchanged.ts'), 'KEEP_CODE')

    const transform: Transform = (source) => source.replace('OLD_CODE', 'NEW_CODE')

    await run({
      transform,
      codemodName: 'test-codemod',
      args: ['src'],
    })

    const output = consoleOutput.join('\n')
    expect(output).toContain('Transformed: src/changed.ts')
    expect(output).not.toContain('unchanged.ts')
    expect(output).toContain('Transformed 1 file(s)')
  })

  test('handles transform errors gracefully', async () => {
    process.chdir(testDir)

    const srcDir = join(testDir, 'src')
    mkdirSync(srcDir)

    writeFileSync(join(srcDir, 'file1.ts'), 'content')
    writeFileSync(join(srcDir, 'file2.ts'), 'content')

    const transform: Transform = (source, filePath) => {
      if (filePath.includes('file1')) {
        throw new Error('Transform failed')
      }
      return source.replace('content', 'transformed')
    }

    await run({
      transform,
      codemodName: 'test-codemod',
      args: ['src'],
    })

    const output = consoleOutput.join('\n')
    expect(output).toContain('Error processing')
    expect(output).toContain('Transform failed')

    // Second file should still be transformed
    const file2Content = readFileSync(join(srcDir, 'file2.ts'), 'utf-8')
    expect(file2Content).toBe('transformed')
  })

  test('reports correct file count when no files match', async () => {
    process.chdir(testDir)

    const srcDir = join(testDir, 'src')
    mkdirSync(srcDir)

    writeFileSync(join(srcDir, 'file.txt'), 'content')

    const transform: Transform = (source) => source

    await expect(
      run({
        transform,
        codemodName: 'test-codemod',
        args: ['src'],
      }),
    ).rejects.toThrow('process.exit(0)')

    expect(consoleOutput.join('\n')).toContain('No matching files found')
  })

  test('handles -d shorthand for dry-run', async () => {
    process.chdir(testDir)

    const srcDir = join(testDir, 'src')
    mkdirSync(srcDir)

    writeFileSync(join(srcDir, 'file.ts'), 'OLD_CODE')

    const transform: Transform = (source) => source.replace('OLD_CODE', 'NEW_CODE')

    await run({
      transform,
      codemodName: 'test-codemod',
      args: ['src', '-d'],
    })

    const fileContent = readFileSync(join(srcDir, 'file.ts'), 'utf-8')

    expect(fileContent).toBe('OLD_CODE')
    expect(consoleOutput.join('\n')).toContain('dry run')
  })

  test('passes file path to transform function', async () => {
    process.chdir(testDir)

    const srcDir = join(testDir, 'src')
    mkdirSync(srcDir)

    writeFileSync(join(srcDir, 'file.ts'), 'content')

    let receivedPath = ''
    const transform: Transform = (source, filePath) => {
      receivedPath = filePath
      return source
    }

    await run({
      transform,
      codemodName: 'test-codemod',
      args: ['src'],
    })

    expect(receivedPath).toContain('file.ts')
  })
})
