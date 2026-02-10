import manifest from './manifest.json' with { type: 'json' }

// Type definitions for the manifest
export interface CodemodMetadata {
  readonly name: string
  readonly description: string | null
}

interface Manifest {
  codemods: CodemodMetadata[]
}

export const AVAILABLE_CODEMODS: readonly CodemodMetadata[] = (manifest as Manifest).codemods
export const CODEMOD_NAMES: readonly string[] = (manifest as Manifest).codemods.map((c) => c.name)
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
