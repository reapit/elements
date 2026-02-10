import * as esbuild from 'esbuild'
import { globSync } from 'node:fs'
import path from 'node:path'

/**
 * Build script for codemods CLI.
 *
 * Uses esbuild to bundle the codemods CLI with all dependencies (including ts-morph)
 * to create a self-contained executable that can be distributed via npm.
 *
 * Entry points:
 * - bin.ts: Main CLI entry point
 * - <codemod>/transform.ts: Individual codemod transforms (dynamically discovered)
 */

async function build() {
  console.log('Building codemods CLI with esbuild...\n')

  // Discover all transform files
  const transformFiles = globSync('codemods/*/transform.ts')

  const transformEntryPoints = Object.fromEntries(
    transformFiles.map((filePath) => {
      const codemodName = path.basename(path.dirname(filePath))
      return [
        `${codemodName}/transform`, // Output: dist/codemods/{name}/transform.js
        filePath, // Input: codemods/{name}/transform.ts
      ]
    }),
  )

  const entryPoints = {
    bin: 'codemods/bin.ts',
    codemods: 'codemods/codemods.ts',
    runner: 'codemods/runner.ts',
    ...transformEntryPoints,
  }

  console.log('Entry points:')
  Object.entries(entryPoints).forEach(([name, file]) => {
    console.log(`  ${name}: ${file}`)
  })
  console.log()

  try {
    await esbuild.build({
      entryPoints,
      bundle: true,
      platform: 'node',
      target: 'node22',
      format: 'esm',
      outdir: 'dist/codemods',
      outExtension: { '.js': '.js' },
      // Inject polyfills for CommonJS globals that bundled dependencies expect
      banner: {
        js: [
          `import { createRequire } from 'module';`,
          `import { fileURLToPath } from 'url';`,
          `import { dirname } from 'path';`,
          `const require = createRequire(import.meta.url);`,
          `const __filename = fileURLToPath(import.meta.url);`,
          `const __dirname = dirname(__filename);`,
        ].join('\n'),
      },
      // No minification for easier debugging
      minify: false,
      // No source maps to keep bundle size smaller
      sourcemap: false,
      // Keep readable code
      keepNames: true,
    })

    console.log('✓ Build completed successfully!\n')

    // Post-process bin.js to fix dynamic import paths
    const fs = await import('node:fs/promises')
    const binPath = 'dist/codemods/bin.js'
    let binContents = await fs.readFile(binPath, 'utf8')

    // Verify expected patterns exist before replacement
    if (!binContents.includes('globImport_transform_js')) {
      throw new Error(
        'Expected pattern "globImport_transform_js" not found in bin.js. ' +
          'esbuild output format may have changed. Please review the build output.',
      )
    }

    // Store original content for comparison
    const originalContents = binContents

    // Replace the glob import function call with a regular dynamic import
    // From: globImport_transform_js(`./${sanitizedCodemodName}/transform.js`)
    // To: import(`./${sanitizedCodemodName}/transform.js`)
    binContents = binContents.replace(
      'globImport_transform_js(`./${sanitizedCodemodName}/transform.js`)',
      'import(`./${sanitizedCodemodName}/transform.js`)',
    )

    // Remove the empty glob import declaration
    binContents = binContents.replace(/var globImport_transform_js = __glob\(\{\}\);?\n?/g, '')

    // Verify that replacements actually occurred
    if (binContents === originalContents) {
      throw new Error(
        'Post-processing replacements did not modify bin.js. ' +
          'esbuild output format may have changed. Please review the build output.',
      )
    }

    // Verify complete removal of glob import helper
    if (binContents.includes('globImport_transform_js')) {
      throw new Error(
        'Failed to remove all occurrences of globImport_transform_js from bin.js. ' +
          'Some patterns may remain. Please review the build output.',
      )
    }

    await fs.writeFile(binPath, binContents, 'utf8')
    console.log('✓ Rewrote dynamic imports in bin.js\n')

    console.log('Output: dist/codemods/')
  } catch (error) {
    console.error('✗ Build failed:', error)
    process.exit(1)
  }
}

build()
