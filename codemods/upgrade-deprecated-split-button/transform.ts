import { SourceFile, SyntaxKind } from "ts-morph";

import {
  isElementsImport,
  matchesPackage,
  createProjectFromSource,
  addImportsToTarget,
  transformTypeReferences,
  syncClosingTag,
} from "../shared/index.js";

/**
 * Codemod to upgrade deprecated split-button identifiers to their core equivalents.
 *
 * This codemod transforms imports, type references, and JSX usage of the deprecated
 * split-button components to use the new SplitButton API from
 * `@reapit/elements/core/split-button`. It handles:
 *
 * Import Transformations:
 * - DeprecatedSplitButton → SplitButton (from @reapit/elements/core/split-button)
 * - DeprecatedActionButton → SplitButtonAction
 * - DeprecatedMenuButton → SplitButtonMenuButton
 * - DeprecatedSplitButtonProps → removed (type refs become SplitButton.Props)
 * - Preserves custom aliases: DeprecatedSplitButton as MySplitBtn → SplitButton as MySplitBtn
 * - Preserves type-only imports: type DeprecatedSplitButton → type SplitButton
 * - Handles facade packages via --facade-package flag (renames in-place, no path change)
 *
 * Type Transformations:
 * - Type references: DeprecatedSplitButtonProps → SplitButton.Props
 * - Interface extensions: extends DeprecatedSplitButtonProps → extends SplitButton.Props
 * - Generics: Generic<DeprecatedSplitButtonProps> → Generic<SplitButton.Props>
 *
 * JSX Element Transformations:
 * - DeprecatedSplitButton → SplitButton
 * - DeprecatedSplitButton.Action → SplitButton.Action
 * - DeprecatedSplitButton.Menu → SplitButton.Menu
 * - DeprecatedActionButton → SplitButtonAction
 * - DeprecatedMenuButton → SplitButtonMenuButton
 * - Preserves custom aliases
 *
 * TODO Comments:
 * - Adds a TODO comment above each <SplitButton> usage (non-aliased) explaining
 *   the manual migration steps required for the new API.
 *
 * No Prop Transformations:
 * - The structural differences between deprecated and core split-button are too
 *   complex for automated prop migration. The TODO comments guide manual changes.
 */

/** Mapping from deprecated import names to their core equivalents. */
const IDENTIFIER_MAP: Record<string, string> = {
  DeprecatedSplitButton: "SplitButton",
  DeprecatedActionButton: "SplitButtonAction",
  DeprecatedMenuButton: "SplitButtonMenuButton",
};

/**
 * The TODO comment block inserted above each renamed <SplitButton> element.
 *
 * Scoped to DeprecatedSplitButton only — DeprecatedActionButton and
 * DeprecatedMenuButton map 1:1 to their replacements with no structural
 * changes required, so they do not need a manual-migration reminder.
 */
const TODO_COMMENT = `// TODO(upgrade-deprecated-split-button): Restructure to use the new SplitButton API.
// Children must be moved into \`action\` and \`menu\` props.
// \`variant\` and \`size\` (both required) must be set on <SplitButton> rather than sub-components.
// \`variant="busy"\` on sub-components maps to \`busy="action"\` or \`busy="menu-item"\` on the parent.
// <SplitButton.Menu> now requires \`aria-label\` and children (menu items).`;

/**
 * Collects the set of names used in JSX for each deprecated identifier, accounting
 * for aliases. For example, `DeprecatedSplitButton as MySplitBtn` means JSX uses
 * `MySplitBtn`, not `DeprecatedSplitButton`.
 *
 * Returns a map from the JSX-visible name to the original deprecated name, so we
 * can later decide whether to rename (non-aliased) or leave untouched (aliased).
 */
function getDeprecatedAliasMap(
  sourceFile: SourceFile,
  facadePackage?: string,
): Map<string, string> {
  const aliasMap = new Map<string, string>();

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();

    if (!isElementsImport(moduleSpecifier, facadePackage)) continue;

    for (const namedImport of importDecl.getNamedImports()) {
      const originalName = namedImport.getName();

      if (!(originalName in IDENTIFIER_MAP)) continue;

      const alias = namedImport.getAliasNode()?.getText();
      aliasMap.set(alias ?? originalName, originalName);
    }
  }

  // Handle test snippets without imports — only add names that actually appear in the source
  if (aliasMap.size === 0 && sourceFile.getImportDeclarations().length === 0) {
    const sourceText = sourceFile.getFullText();
    for (const name of Object.keys(IDENTIFIER_MAP)) {
      if (sourceText.includes(name)) {
        aliasMap.set(name, name);
      }
    }
  }

  return aliasMap;
}

/**
 * Transforms imports from @reapit/elements (and subpaths) by moving deprecated
 * specifiers to a new `@reapit/elements/core/split-button` import declaration.
 *
 * For facade package imports, identifiers are renamed in-place on the same
 * import declaration and the module specifier is left unchanged.
 */
function transformImports(sourceFile: SourceFile, facadePackage?: string): void {
  const elementsImportsToAdd: Array<{ name: string; alias?: string; isTypeOnly: boolean }> = [];

  const importDeclarations = sourceFile.getImportDeclarations().slice();
  const targetModuleSpecifier = "@reapit/elements/core/split-button";

  for (const importDecl of importDeclarations) {
    if (importDecl.wasForgotten()) continue;

    const moduleSpecifier = importDecl.getModuleSpecifierValue();

    if (!isElementsImport(moduleSpecifier, facadePackage)) continue;

    // Skip imports already targeting core/split-button
    if (moduleSpecifier === targetModuleSpecifier) continue;

    const isFacade = facadePackage !== undefined && matchesPackage(moduleSpecifier, facadePackage);

    const namedImports = importDecl.getNamedImports();
    const importsToRemove: typeof namedImports = [];

    for (const namedImport of namedImports) {
      const originalName = namedImport.getName();

      // Handle DeprecatedSplitButtonProps — always removed from imports
      if (originalName === "DeprecatedSplitButtonProps") {
        importsToRemove.push(namedImport);
        continue;
      }

      const newName = IDENTIFIER_MAP[originalName];
      if (!newName) continue;

      if (isFacade && !matchesPackage(moduleSpecifier, "@reapit/elements")) {
        // Facade imports: rename in-place, keep module specifier (and any alias) unchanged.
        // setName replaces only the name before `as`, so aliases are preserved automatically.
        namedImport.setName(newName);
      } else {
        // @reapit/elements imports: collect for new import, remove from original
        const existingAlias = namedImport.getAliasNode()?.getText();
        const isTypeOnly = namedImport.isTypeOnly();

        elementsImportsToAdd.push({
          name: newName,
          alias: existingAlias,
          isTypeOnly,
        });

        importsToRemove.push(namedImport);
      }
    }

    // Remove collected specifiers from the original import
    for (const namedImport of importsToRemove) {
      namedImport.remove();
    }

    // Clean up empty import declarations
    if (
      importDecl.getNamedImports().length === 0 &&
      !importDecl.getDefaultImport() &&
      !importDecl.getNamespaceImport()
    ) {
      importDecl.remove();
    }
  }

  // Add new @reapit/elements/core/split-button import if needed
  addImportsToTarget(sourceFile, elementsImportsToAdd, targetModuleSpecifier, {
    promoteDeclarationTypeOnly: true,
  });
}

/**
 * Renames JSX elements from deprecated identifiers to their core equivalents.
 *
 * Handles simple identifiers (e.g. `<DeprecatedSplitButton>`) and compound member
 * expressions (e.g. `<DeprecatedSplitButton.Action>`). Aliased usage is left
 * untouched because the import alias already maps correctly.
 *
 * Returns the set of line numbers (1-indexed) where a non-aliased
 * `<DeprecatedSplitButton>` was renamed to `<SplitButton>`, so TODO comments
 * can be inserted afterwards.
 */
function transformJsxElements(sourceFile: SourceFile, aliasMap: Map<string, string>): Set<number> {
  const todoLines = new Set<number>();

  const jsxElements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ];

  for (const element of jsxElements) {
    const tagNameNode = element.getTagNameNode();
    const tagNameText = tagNameNode.getText();

    // Handle compound member expressions: DeprecatedSplitButton.Action, DeprecatedSplitButton.Menu
    if (tagNameNode.getKind() === SyntaxKind.PropertyAccessExpression) {
      const propAccess = tagNameNode.asKind(SyntaxKind.PropertyAccessExpression)!;
      const objectText = propAccess.getExpression().getText();

      // Only rename if the object part is a non-aliased deprecated identifier
      const originalName = aliasMap.get(objectText);
      if (originalName === "DeprecatedSplitButton" && objectText === "DeprecatedSplitButton") {
        propAccess.getExpression().replaceWithText("SplitButton");
      }

      // Also handle closing tag for compound expressions
      if (element.getKind() === SyntaxKind.JsxOpeningElement) {
        const parent = element.getParent();
        if (parent?.getKind() === SyntaxKind.JsxElement) {
          const closingElement = parent.asKind(SyntaxKind.JsxElement)?.getClosingElement();
          if (closingElement) {
            const closingTag = closingElement.getTagNameNode();
            if (closingTag.getKind() === SyntaxKind.PropertyAccessExpression) {
              const closingPropAccess = closingTag.asKind(SyntaxKind.PropertyAccessExpression)!;
              const closingObjectText = closingPropAccess.getExpression().getText();
              if (closingObjectText === "DeprecatedSplitButton") {
                closingPropAccess.getExpression().replaceWithText("SplitButton");
              }
            }
          }
        }
      }

      continue;
    }

    // Handle simple identifiers: DeprecatedSplitButton, DeprecatedActionButton, DeprecatedMenuButton
    const originalName = aliasMap.get(tagNameText);
    if (!originalName) continue;

    const newName = IDENTIFIER_MAP[originalName];
    if (!newName) continue;

    // Only rename if the tag name matches the original (non-aliased) deprecated identifier
    if (tagNameText !== originalName) continue;

    tagNameNode.replaceWithText(newName);

    // Track line numbers for TODO comments (only for DeprecatedSplitButton → SplitButton)
    if (originalName === "DeprecatedSplitButton") {
      const containingNode =
        element.getKind() === SyntaxKind.JsxOpeningElement ? element.getParent()! : element;
      todoLines.add(containingNode.getStartLineNumber());
    }

    // Rename corresponding closing tag
    syncClosingTag(element, originalName, newName);
  }

  return todoLines;
}

/**
 * Inserts TODO comment blocks into the source text at the given line numbers.
 * Lines are processed in reverse order to preserve earlier positions.
 */
function insertTodoComments(text: string, todoLines: Set<number>): string {
  if (todoLines.size === 0) return text;

  const lines = text.split("\n");
  const sortedLineNumbers = Array.from(todoLines).sort((a, b) => b - a);

  for (const lineNumber of sortedLineNumbers) {
    const index = lineNumber - 1; // Convert 1-indexed to 0-indexed
    if (index < 0 || index >= lines.length) continue;

    // Detect the indentation of the target line
    const targetLine = lines[index];
    const indentMatch = targetLine.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1] : "";

    // Build the indented TODO comment block
    const commentLines = TODO_COMMENT.split("\n")
      .map((line) => indent + line)
      .join("\n");

    // Insert the comment block before the target line
    lines.splice(index, 0, commentLines);
  }

  return lines.join("\n");
}

export default function transform(
  source: string,
  filePath: string = "file.tsx",
  options?: { facadePackage?: string },
): string {
  // Early return if file doesn't contain any deprecated split-button identifiers
  if (
    !source.includes("DeprecatedSplitButton") &&
    !source.includes("DeprecatedActionButton") &&
    !source.includes("DeprecatedMenuButton") &&
    !source.includes("DeprecatedSplitButtonProps")
  ) {
    return source;
  }

  const sourceFile = createProjectFromSource(source, filePath);

  // Collect alias map BEFORE transforming imports (imports will be modified)
  const aliasMap = getDeprecatedAliasMap(sourceFile, options?.facadePackage);

  transformImports(sourceFile, options?.facadePackage);
  transformTypeReferences(sourceFile, new Set(["DeprecatedSplitButtonProps"]), "SplitButton.Props");
  const todoLines = transformJsxElements(sourceFile, aliasMap);

  let result = sourceFile.getFullText();

  // Insert TODO comments after all AST transforms (operates on text to avoid position issues)
  result = insertTodoComments(result, todoLines);

  return result;
}
