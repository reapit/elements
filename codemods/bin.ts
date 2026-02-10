import { run } from './runner.js'
import { listCodemods, getCodemodDescription, validateCodemodName } from './codemods.js'

function printHelp(): void {
  console.log(`
Usage: yarn dlx @reapit/elements@beta codemod <command> [options]

Commands:
  list                    List available codemods
  apply <name> <dir>      Apply a codemod to a directory

Options:
  --help, -h              Show this help message

Examples:
  yarn dlx @reapit/elements@beta codemod list
  yarn dlx @reapit/elements@beta codemod apply at-a-glance-article-card src/
  yarn dlx @reapit/elements@beta codemod apply at-a-glance-article-card src/ --dry-run
`)
}

function printApplyHelp(codemodName: string): void {
  console.log(`
Usage: yarn dlx @reapit/elements@beta codemod apply ${codemodName} <directory> [options]

Arguments:
  <directory>             Directory to search for files to transform

Options:
  --ext <extensions>      File extensions to process (default: .tsx,.ts,.jsx,.js)
  --facade-package <pkg>  Package name that re-exports @reapit/elements
  --dry-run, -d           Preview changes without writing files
  --help, -h              Show this help message

Examples:
  yarn dlx @reapit/elements@beta codemod apply ${codemodName} src/
  yarn dlx @reapit/elements@beta codemod apply ${codemodName} src/ --dry-run
  yarn dlx @reapit/elements@beta codemod apply ${codemodName} src/ --ext .tsx,.jsx
  yarn dlx @reapit/elements@beta codemod apply ${codemodName} src/ --facade-package @company/ui-components
`)
}

function printList(): void {
  const codemods = listCodemods()

  if (codemods.length === 0) {
    console.log('No codemods available.')
    return
  }

  console.log('\nAvailable codemods:\n')

  // Calculate padding for alignment
  const maxNameLength = Math.max(...codemods.map((name) => name.length))

  for (const name of codemods) {
    const description = getCodemodDescription(name)
    const padding = ' '.repeat(maxNameLength - name.length + 4)
    if (description) {
      console.log(`  ${name}${padding}${description}`)
    } else {
      console.log(`  ${name}`)
    }
  }

  console.log()
}

function printAvailableCodemods(): void {
  const codemods = listCodemods()

  if (codemods.length === 0) {
    console.log('No codemods available.')
    return
  }

  console.log('\nAvailable codemods:')

  const maxNameLength = Math.max(...codemods.map((name) => name.length))

  for (const name of codemods) {
    const description = getCodemodDescription(name)
    const padding = ' '.repeat(maxNameLength - name.length + 4)
    if (description) {
      console.log(`  ${name}${padding}${description}`)
    } else {
      console.log(`  ${name}`)
    }
  }
}

async function handleApply(args: string[]): Promise<void> {
  const codemodName = args[0]

  if (!codemodName || codemodName.startsWith('-')) {
    console.error('Error: No codemod name provided')
    console.log('\nUsage: yarn dlx @reapit/elements@beta codemod apply <name> <directory> [options]')
    console.log("\nRun 'yarn dlx @reapit/elements@beta codemod list' to see available codemods.")
    process.exit(1)
  }

  // Security: Sanitize codemod name by validating it against the allowlist
  // This prevents path traversal attacks in the dynamic import below
  const sanitizedCodemodName = validateCodemodName(codemodName)

  if (!sanitizedCodemodName) {
    console.error(`Error: Unknown codemod '${codemodName}'`)
    printAvailableCodemods()
    process.exit(1)
  }

  const remainingArgs = args.slice(1)

  // Handle help for specific codemod
  if (remainingArgs.includes('--help') || remainingArgs.includes('-h')) {
    printApplyHelp(sanitizedCodemodName)
    process.exit(0)
  }

  // Load and run the codemod
  const codemodModule = await import(`./${sanitizedCodemodName}/transform.js`)
  const transform = codemodModule.default

  if (typeof transform !== 'function') {
    console.error(`Error: Codemod '${codemodName}' does not export a default transform function`)
    process.exit(1)
  }

  await run({
    transform,
    codemodName: sanitizedCodemodName,
    args: remainingArgs,
  })
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const command = args[0]

  // Handle no command or help
  if (!command || command === '--help' || command === '-h') {
    printHelp()
    process.exit(0)
  }

  switch (command) {
    case 'list':
      printList()
      break

    case 'apply':
      await handleApply(args.slice(1))
      break

    default:
      console.error(`Error: Unknown command '${command}'`)
      printHelp()
      process.exit(1)
  }
}

main().catch((error: Error) => {
  console.error('Error:', error.message)
  process.exit(1)
})
