/**
 * Shared helpers for detecting @reapit/elements imports (and facade package imports).
 *
 * These are used by codemods that need to identify any import from
 * @reapit/elements or a configured facade package — including subpath imports
 * such as '@reapit/elements/core/button'.
 *
 * NOTE: rewrite-v4-imports/transform.ts intentionally has its OWN local copy of
 * isElementsImport that only matches the bare '@reapit/elements' package (not
 * subpaths). That codemod must NOT touch v5-style subpath imports, so it
 * diverges from this shared version on purpose. Do not replace it with this
 * shared helper.
 */

/**
 * Checks if a module specifier matches a package name.
 * Handles both exact matches and subpath imports.
 * @example
 * matchesPackage('@company/ui', '@company/ui') // true
 * matchesPackage('@company/ui/elements', '@company/ui') // true
 * matchesPackage('@company/ui-v2', '@company/ui') // false
 */
export function matchesPackage(moduleSpecifier: string, packageName: string): boolean {
  return moduleSpecifier === packageName || moduleSpecifier.startsWith(packageName + "/");
}

/**
 * Checks if a module specifier is an import from @reapit/elements or a facade package.
 * Matches both the bare package name and any subpath (e.g. '@reapit/elements/core/button').
 */
export function isElementsImport(moduleSpecifier: string, facadePackage?: string): boolean {
  return (
    matchesPackage(moduleSpecifier, "@reapit/elements") ||
    (facadePackage !== undefined && matchesPackage(moduleSpecifier, facadePackage))
  );
}
