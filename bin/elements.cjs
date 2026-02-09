#!/usr/bin/env node
const { spawn } = require('node:child_process')
const { join } = require('node:path')
const { readFileSync } = require('node:fs')

const args = process.argv.slice(2)
const command = args[0]

function getVersion() {
  const packageJsonPath = join(__dirname, '..', 'package.json')
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
  return packageJson.version
}

function printHelp() {
  console.log(`
@reapit/elements CLI

Usage: elements <command> [options]

Commands:
  codemod                 Run codemods to migrate code (see 'elements codemod --help')

Options:
  --version, -v           Show version number
  --help, -h              Show this help message

Examples:
  elements codemod list
  elements codemod apply at-a-glance-article-card src/
  elements --version

For more information, visit: https://github.com/reapit/elements
`)
}

function handleCodemod(codemodArgs) {
  const child = spawn(
    process.execPath,
    ['--experimental-strip-types', '--no-warnings', join(__dirname, '..', 'codemods', 'bin.ts'), ...codemodArgs],
    { stdio: 'inherit' },
  )

  child.on('exit', (code) => {
    process.exit(code ?? 0)
  })
}

// Handle no command or help
if (!command || command === '--help' || command === '-h') {
  printHelp()
  process.exit(0)
}

// Handle version
if (command === '--version' || command === '-v') {
  console.log(getVersion())
  process.exit(0)
}

// Route commands
switch (command) {
  case 'codemod':
    handleCodemod(args.slice(1))
    break

  default:
    console.error(`Error: Unknown command '${command}'`)
    console.log("\nRun 'elements --help' for usage information.")
    process.exit(1)
}
