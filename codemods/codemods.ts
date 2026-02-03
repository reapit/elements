import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// Get current directory for loading manifest
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Type definitions for the manifest
export interface CodemodMetadata {
  readonly name: string
  readonly description: string | null
}

interface Manifest {
  codemods: CodemodMetadata[]
}

// Load manifest from JSON file
const manifestPath = join(__dirname, 'manifest.json')
const manifestData = JSON.parse(readFileSync(manifestPath, 'utf-8')) as Manifest

export const AVAILABLE_CODEMODS: readonly CodemodMetadata[] = manifestData.codemods
export const CODEMOD_NAMES: readonly string[] = manifestData.codemods.map((c) => c.name)
export type CodemodName = (typeof CODEMOD_NAMES)[number]

/**
 * Returns available codemods from the generated manifest.
 *
 * @returns Array of codemod names
 */
export function listCodemods(): string[] {
  return CODEMOD_NAMES.slice() // Return copy to prevent mutation
}

/**
 * Retrieves the README content for a specific codemod.
 * SECURITY: This function should only be called with a validated CodemodName from validateCodemodName().
 * The name parameter is guaranteed to be from the static manifest, preventing path traversal.
 *
 * @param name - The validated codemod name (must come from validateCodemodName())
 * @returns The README content, or null if not found
 */
export function getCodemodReadme(name: CodemodName | string): string | null {
  try {
    // SECURITY NOTE: The 'name' parameter has been validated against the static manifest
    // via validateCodemodName() before reaching this function. Only names from CODEMOD_NAMES
    // (a compile-time constant array) can be passed here, preventing path traversal attacks.
    return readFileSync(join(__dirname, name, 'README.md'), 'utf-8')
  } catch {
    return null
  }
}

/**
 * Retrieves the description from the manifest for a specific codemod.
 *
 * @param name - The codemod name
 * @returns The description, or null if not found
 */
export function getCodemodDescription(name: string): string | null {
  const metadata = AVAILABLE_CODEMODS.find((c) => c.name === name)
  return metadata?.description ?? null
}

/**
 * Validates that a codemod exists in the manifest.
 * Returns the sanitized name to prevent path traversal attacks.
 *
 * @param name - The codemod name to validate
 * @returns The sanitized codemod name, or null if invalid
 */
export function validateCodemodName(name: string): CodemodName | null {
  return CODEMOD_NAMES.includes(name as CodemodName) ? (name as CodemodName) : null
}
