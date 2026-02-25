import { run } from './runner.js'
import { listCodemods, getCodemodDescription, validateCodemodName } from './codemods.js'
import { transforms } from './transforms.js'

function printHelp(): void {
  console.log(`
Usage: yarn dlx @reapit/elements@beta codemod <command> [options]

Commands:
  list                    List available codemods
  info <name>             Show information about a specific codemod
  apply <name> <dir>      Apply a codemod to a directory

Options:
  --help, -h              Show this help message

Examples:
  yarn dlx @reapit/elements@beta codemod list
  yarn dlx @reapit/elements@beta codemod info at-a-glance-article-card
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

function printList({ trailingNewline = false }: { trailingNewline?: boolean } = {}): void {
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

  if (trailingNewline) {
    console.log()
  }
}

function printInfo(name: string): void {
  const description = getCodemodDescription(name)

  console.log(`\nCodemod: ${name}`)
  if (description) {
    console.log(`Description: ${description}`)
  }
  console.log(`\nTo apply this codemod, run:`)
  console.log(`  yarn dlx @reapit/elements@beta codemod apply ${name} <directory>`)
  console.log(`\nFor full options, run:`)
  console.log(`  yarn dlx @reapit/elements@beta codemod apply ${name} --help`)
  console.log()
}

export function handleInfo(args: string[]): void {
  const codemodName = args[0]

  if (!codemodName || codemodName.startsWith('-')) {
    console.error('Error: No codemod name provided')
    console.log('\nUsage: yarn dlx @reapit/elements@beta codemod info <name>')
    console.log("\nRun 'yarn dlx @reapit/elements@beta codemod list' to see available codemods.")
    process.exit(1)
  }

  if (!validateCodemodName(codemodName)) {
    console.error(`Error: Unknown codemod '${codemodName}'`)
    printList()
    process.exit(1)
  }

  printInfo(codemodName)
}

export async function handleApply(args: string[]): Promise<void> {
  const codemodName = args[0]

  if (!codemodName || codemodName.startsWith('-')) {
    console.error('Error: No codemod name provided')
    console.log('\nUsage: yarn dlx @reapit/elements@beta codemod apply <name> <directory> [options]')
    console.log("\nRun 'yarn dlx @reapit/elements@beta codemod list' to see available codemods.")
    process.exit(1)
  }

  // Validate codemod name against the allowlist before looking up in transforms
  if (!validateCodemodName(codemodName)) {
    console.error(`Error: Unknown codemod '${codemodName}'`)
    printList()
    process.exit(1)
  }

  const remainingArgs = args.slice(1)

  // Handle help for specific codemod
  if (remainingArgs.includes('--help') || remainingArgs.includes('-h')) {
    printApplyHelp(codemodName)
    process.exit(0)
  }

  // Load and run the codemod
  const loader = transforms[codemodName]
  if (!loader) {
    console.error(`Error: No transform found for codemod '${codemodName}'`)
    process.exit(1)
  }
  const codemodModule = await loader()
  const transform = codemodModule.default

  if (typeof transform !== 'function') {
    console.error(`Error: Codemod '${codemodName}' does not export a default transform function`)
    process.exit(1)
  }

  await run({
    transform,
    codemodName: codemodName,
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
      printList({ trailingNewline: true })
      break

    case 'info':
      handleInfo(args.slice(1))
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
