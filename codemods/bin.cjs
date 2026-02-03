#!/usr/bin/env node
const { spawn } = require('node:child_process')
const { join } = require('node:path')

const child = spawn(
  process.execPath,
  ['--experimental-strip-types', '--no-warnings', join(__dirname, 'bin.ts'), ...process.argv.slice(2)],
  { stdio: 'inherit' }
)

child.on('exit', (code) => {
  process.exit(code ?? 0)
})
