import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function fetchWebFeatures(): Promise<Record<string, any>> {
  const url = 'https://unpkg.com/web-features@3.24.0/data.json'
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = (await res.json()) as Record<string, any>
    return data.features ?? data
  } catch (e: any) {
    throw new Error(`Failed to fetch web-features data from ${url}: ${e.message}`)
  }
}

interface FeaturePattern {
  name: string
  webFeaturesKey: string
  category: 'css' | 'js' | 'html'
  patterns: string[]
  include: string
  knownPolyfill?: string
  notes?: string
}

interface Match {
  file: string
  line: number
  text: string
}

interface FeatureResult {
  name: string
  category: string
  baselineStatus: 'high' | 'low' | false
  baselineDate: string | null
  baselineYear: number | null
  guarded: boolean
  polyfilled: boolean
  knownPolyfill: string | null
  matchCount: number
  matches: Match[]
  notes: string | null
}

interface ScanReport {
  timestamp: string
  scanRoot: string
  excludedDirs: string[]
  declaredTarget: string | null
  effectiveFloor: {
    baselineYear: number | null
    baselineStatus: string | null
    boundBy: string | null
  }
  features: FeatureResult[]
}

function getBaselineYear(dateStr: string | null): number | null {
  if (!dateStr) return null
  return new Date(dateStr).getFullYear()
}

function findDeclaredTarget(repoRoot: string): string | null {
  try {
    const browserslistrc = readFileSync(resolve(repoRoot, '.browserslistrc'), 'utf-8').trim()
    return browserslistrc
  } catch {
    return null
  }
}

function grepForPattern(pattern: string, include: string, scanRoot: string, excludeDirs: string[]): Match[] {
  const args = ['--no-heading', '--line-number', '--glob', include]
  for (const d of excludeDirs) {
    args.push('--glob', `!${d}`)
  }
  args.push(pattern, scanRoot)

  let output: string
  try {
    output = execFileSync('rg', args, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 })
  } catch (e: any) {
    // rg exits with code 1 when no matches found
    if (e.status === 1) return []
    throw e
  }
  const matches: Match[] = []

  for (const line of output.split('\n')) {
    if (!line.trim()) continue
    const match = line.match(/^(.+?):(\d+):(.*)$/)
    if (match) {
      const text = match[3].trim()
      // Skip matches on comment-only lines
      if (isComment(text)) continue
      matches.push({
        file: match[1].replace(scanRoot + '/', ''),
        line: parseInt(match[2], 10),
        text: text.slice(0, 120),
      })
    }
  }

  return matches
}

function isComment(text: string): boolean {
  const trimmed = text.trim()
  return (
    trimmed.startsWith('//') ||
    trimmed.startsWith('/*') ||
    trimmed.startsWith('<!--') ||
    /^\*\s/.test(trimmed) || // multi-line comment continuation: " * ..."
    trimmed === '*/' // closing comment
  )
}

function isTestOrSnapshot(file: string): boolean {
  return (
    file.includes('__tests__') ||
    file.includes('__snapshots__') ||
    file.includes('.test.') ||
    file.includes('.spec.') ||
    file.includes('.stories.')
  )
}

function checkIfGuarded(matches: Match[], scanRoot: string): boolean {
  if (matches.length === 0) return false

  const productionMatches = matches.filter((m) => !isTestOrSnapshot(m.file))
  if (productionMatches.length === 0) return true // only in tests/stories

  // Check if all production matches are inside @supports blocks
  for (const match of productionMatches) {
    try {
      const fullPath = resolve(scanRoot, match.file)
      const content = readFileSync(fullPath, 'utf-8')
      const lines = content.split('\n')

      // Look backwards from the match line for @supports
      let foundSupports = false
      const startLine = Math.max(0, match.line - 15)
      for (let i = match.line - 1; i >= startLine; i--) {
        if (lines[i].includes('@supports')) {
          foundSupports = true
          break
        }
      }
      if (!foundSupports) return false
    } catch {
      return false
    }
  }

  return true
}

async function run() {
  const repoRoot = resolve(__dirname, '../../../..')
  const scanRoot = resolve(repoRoot, 'src')
  const excludeDirs = ['src/lab', 'src/deprecated']
  const excludeDirsForGrep = ['**/lab/**', '**/deprecated/**']

  const patterns: FeaturePattern[] = JSON.parse(readFileSync(resolve(__dirname, 'feature-patterns.json'), 'utf-8'))

  const declaredTarget = findDeclaredTarget(repoRoot)

  const webFeatures = await fetchWebFeatures()

  const pkg = JSON.parse(readFileSync(resolve(repoRoot, 'package.json'), 'utf-8'))
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies }

  const results: FeatureResult[] = []

  for (const feature of patterns) {
    let allMatches: Match[] = []

    for (const pattern of feature.patterns) {
      const matches = grepForPattern(pattern, feature.include, scanRoot, excludeDirsForGrep)
      allMatches = allMatches.concat(matches)
    }

    // Deduplicate by file:line
    const seen = new Set<string>()
    allMatches = allMatches.filter((m) => {
      const key = `${m.file}:${m.line}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })

    if (allMatches.length === 0) continue

    const wfData = webFeatures[feature.webFeaturesKey]
    const baselineStatus = wfData?.status?.baseline ?? false
    const baselineDate = wfData?.status?.baseline_low_date ?? null
    const baselineYear = getBaselineYear(baselineDate)

    const guarded = checkIfGuarded(allMatches, scanRoot)
    const polyfilled = !!feature.knownPolyfill && feature.knownPolyfill in allDeps

    results.push({
      name: feature.name,
      category: feature.category,
      baselineStatus,
      baselineDate,
      baselineYear,
      guarded,
      polyfilled,
      knownPolyfill: feature.knownPolyfill ?? null,
      matchCount: allMatches.length,
      matches: allMatches.slice(0, 5),
      notes: feature.notes ?? null,
    })
  }

  // Sort by baseline year descending (null = not yet baseline = highest)
  results.sort((a, b) => {
    const aYear = a.baselineYear ?? 9999
    const bYear = b.baselineYear ?? 9999
    return bYear - aYear
  })

  // Compute effective floor: highest unguarded, non-polyfilled baseline year
  const unguardedFeatures = results.filter((r) => !r.guarded && !r.polyfilled)
  const withBaseline = unguardedFeatures.filter((r) => r.baselineYear !== null)
  const beyondBaseline = unguardedFeatures.filter((r) => r.baselineStatus === false)

  let effectiveFloor: ScanReport['effectiveFloor']

  if (beyondBaseline.length > 0) {
    effectiveFloor = {
      baselineYear: null,
      baselineStatus: 'beyond baseline (not yet widely available)',
      boundBy: beyondBaseline.map((f) => f.name).join(', '),
    }
  } else if (withBaseline.length > 0) {
    const highest = withBaseline.reduce((a, b) => ((a.baselineYear ?? 0) > (b.baselineYear ?? 0) ? a : b))
    effectiveFloor = {
      baselineYear: highest.baselineYear,
      baselineStatus: `baseline ${highest.baselineStatus}`,
      boundBy: highest.name,
    }
  } else {
    effectiveFloor = {
      baselineYear: null,
      baselineStatus: 'no unguarded modern features found',
      boundBy: null,
    }
  }

  const report: ScanReport = {
    timestamp: new Date().toISOString(),
    scanRoot: 'src/',
    excludedDirs: excludeDirs,
    declaredTarget,
    effectiveFloor,
    features: results,
  }

  console.log(JSON.stringify(report, null, 2))
}

run().catch((err) => {
  console.error(err.message)
  process.exitCode = 1
})
