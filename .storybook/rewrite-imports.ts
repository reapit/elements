import { EXPORT_MAP } from '../codemods/rewrite-v5-imports/export-map'

export function rewriteImports(importStr: string | undefined): string | undefined {
  if (!importStr) return importStr
  const match = importStr.match(/import\s*\{([^}]+)\}\s*from\s*["']@reapit\/elements["']/)
  if (!match) return importStr

  const grouped = new Map<string, string[]>()
  for (const raw of match[1].split(',')) {
    const symbol = raw.trim()
    if (!symbol) continue
    const subpath = EXPORT_MAP[symbol]
    if (!subpath) continue
    const specifier = `@reapit/elements/${subpath}`
    const bucket = grouped.get(specifier)
    if (bucket) bucket.push(symbol)
    else grouped.set(specifier, [symbol])
  }

  if (grouped.size === 0) return undefined
  return Array.from(grouped.entries())
    .map(([specifier, names]) => `import { ${names.sort().join(', ')} } from "${specifier}";`)
    .join('\n')
}
