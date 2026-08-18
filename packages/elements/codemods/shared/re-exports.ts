import { SourceFile } from "ts-morph";

/**
 * Collects the local names that appear in bare `export { X }` declarations
 * (i.e. those without a `from` clause).
 *
 * These names must be preserved during import transformations. If a local
 * import binding is re-exported by name — for example:
 *
 *   import { Pagination } from '@reapit/elements'
 *   export { Pagination }
 *
 * — then removing the import would leave the export referencing a missing
 * binding and produce a compile error. Codemods should skip transforming any
 * import whose local name appears in the returned set.
 *
 * Pass-through re-exports that include a module specifier
 * (`export { X } from '...'`) are excluded because they do not depend on a
 * local import binding.
 */
export function getReExportedLocalNames(sourceFile: SourceFile): Set<string> {
  const names = new Set<string>();
  for (const exportDecl of sourceFile.getExportDeclarations()) {
    if (exportDecl.hasModuleSpecifier()) continue;
    for (const spec of exportDecl.getNamedExports()) {
      names.add(spec.getNameNode().getText());
    }
  }
  return names;
}
