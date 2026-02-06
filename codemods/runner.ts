import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve, relative } from 'node:path'

export type Transform = (source: string, filePath: string, options?: { facadePackage?: string }) => string

export interface RunOptions {
  transform: Transform
  codemodName: string
  args: string[]
}

/**
 * Validates that a path is safe and doesn't attempt directory traversal.
 * This prevents malicious paths like "../../../etc/passwd" from being accessed.
 *
 * @param basePath - The trusted base directory path
 * @param targetPath - The path to validate against the base
 * @returns true if the target path is within the base directory, false otherwise
 */
function isPathSafe(basePath: string, targetPath: string): boolean {
  const resolvedBase = resolve(basePath)
  const resolvedTarget = resolve(targetPath)
  const relativePath = relative(resolvedBase, resolvedTarget)

  // Empty string means target === base, which is safe
  if (relativePath === '') {
    return true
  }

  // Check if relativePath tries to escape the base directory:
  // - Starts with '..' means going up and out of base (e.g., '../../etc/passwd')
  // - Starts with '/' means absolute Unix path (e.g., '/etc/passwd')
  // - Windows cross-drive paths return absolute paths from relative() (e.g., 'C:\Windows')
  return !relativePath.startsWith('..') && !relativePath.startsWith('/') && !/^[a-zA-Z]:[\\/]/.test(relativePath)
}

/**
 * Recursively finds files matching the given patterns within a directory.
 * Includes path traversal protection via isPathSafe validation.
 *
 * @param dir - The directory to search
 * @param patterns - File patterns to match (e.g., ["*.ts", "*.tsx"])
 * @param results - Accumulator for matching file paths
 * @returns Array of absolute paths to matching files
 */
export function findFiles(dir: string, patterns: string[], results: string[] = []): string[] {
  // readdirSync is safe here - dir is validated by isPathSafe, and entry names from filesystem are trusted
  const entries = readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    // Validate path safety to prevent directory traversal
    if (!isPathSafe(dir, fullPath)) {
      continue
    }

    // Skip node_modules and dist
    if (entry.name === 'node_modules' || entry.name === 'dist') {
      continue
    }

    if (entry.isDirectory()) {
      findFiles(fullPath, patterns, results)
    } else if (entry.isFile() && matchesPatterns(entry.name, patterns)) {
      results.push(fullPath)
    }
  }

  return results
}

export function matchesPatterns(filename: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    // Security: Validate pattern to prevent ReDoS attacks
    // Limit pattern length and check for excessive wildcards
    if (pattern.length > 100 || (pattern.match(/\*/g) || []).length > 5) {
      console.warn(`Warning: Skipping potentially unsafe pattern: ${pattern}`)
      return false
    }

    // Simple pattern matching for common cases
    if (pattern.startsWith('*.')) {
      return filename.endsWith(pattern.slice(1))
    }
    if (pattern.includes('*')) {
      // Additional protection: limit filename length to prevent catastrophic backtracking
      // Even with wildcard limits, long filenames + multiple wildcards can cause issues
      if (filename.length > 500) {
        console.warn(`Warning: Filename too long for pattern matching: ${filename}`)
        return false
      }
      const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$')
      return regex.test(filename)
    }
    return filename === pattern
  })
}

function printUsage(codemodName: string): void {
  console.log(`
Usage: codemod apply ${codemodName} <directory> [options]

Arguments:
  <directory>         Directory to search for files to transform

Options:
  --ext <extensions>  File extensions to process (default: .tsx,.ts,.jsx,.js)
  --facade-package <pkg>  Package name that re-exports @reapit/elements
  --dry-run, -d       Preview changes without writing files
  --help, -h          Show this help message

Examples:
  yarn dlx @reapit/elements codemod apply ${codemodName} src/
  yarn dlx @reapit/elements codemod apply ${codemodName} src/ --dry-run
  yarn dlx @reapit/elements codemod apply ${codemodName} src/ --ext .tsx,.jsx
  yarn dlx @reapit/elements codemod apply ${codemodName} src/ --facade-package @company/ui-components
`)
}

export async function run({ transform, codemodName, args }: RunOptions): Promise<void> {
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printUsage(codemodName)
    process.exit(0)
  }

  const dryRun = args.includes('--dry-run') || args.includes('-d')
  const extIndex = args.indexOf('--ext')
  const extensions = extIndex !== -1 ? args[extIndex + 1].split(',') : ['.tsx', '.ts', '.jsx', '.js']
  const patterns = extensions.map((ext) => `*${ext}`)
  const facadePackageIndex = args.indexOf('--facade-package')
  const facadePackage = facadePackageIndex !== -1 ? args[facadePackageIndex + 1] : undefined

  // Get directory argument (first non-flag argument, excluding --ext value if present)
  const extValue = extIndex !== -1 ? args[extIndex + 1] : null
  const facadePackageValue = facadePackageIndex !== -1 ? args[facadePackageIndex + 1] : null
  const directory = args.find((arg) => !arg.startsWith('-') && arg !== extValue && arg !== facadePackageValue)

  if (!directory) {
    console.error('Error: No directory provided')
    process.exit(1)
  }

  const cwd = process.cwd()
  const resolvedDir = resolve(directory)

  // Security: Validate path to prevent directory traversal attacks
  // Use isPathSafe to ensure the resolved directory is within the current working directory
  // This prevents accessing files outside the project (e.g., /etc/passwd, ../../../../sensitive-file)
  if (!isPathSafe(cwd, resolvedDir)) {
    console.error('Error: Directory path is outside the current working directory')
    process.exit(1)
  }

  try {
    // NOTE: Path traversal protection implemented above via isPathSafe validation
    statSync(resolvedDir)
  } catch {
    console.error(`Error: Directory not found: ${directory}`)
    process.exit(1)
  }

  // NOTE: Path traversal protection implemented via isPathSafe validation in findFiles
  const files = findFiles(resolvedDir, patterns)

  if (files.length === 0) {
    console.log('No matching files found')
    process.exit(0)
  }

  console.log(`Found ${files.length} file(s) to process${dryRun ? ' (dry run)' : ''}...\n`)

  let transformedCount = 0

  for (const filePath of files) {
    try {
      const source = readFileSync(filePath, 'utf-8')
      const result = transform(source, filePath, facadePackage ? { facadePackage } : undefined)

      if (result !== source) {
        transformedCount++
        const relativePath = filePath.replace(process.cwd() + '/', '')
        console.log(`  ${dryRun ? 'Would transform' : 'Transformed'}: ${relativePath}`)

        if (!dryRun) {
          writeFileSync(filePath, result, 'utf-8')
        }
      }
    } catch (error) {
      const relativePath = filePath.replace(process.cwd() + '/', '')
      console.error(`  Error processing ${relativePath}: ${(error as Error).message}`)
    }
  }

  console.log(`\n${dryRun ? 'Would transform' : 'Transformed'} ${transformedCount} file(s)`)
}
