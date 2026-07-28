import { SyntaxKind } from "ts-morph";
import type { JsxOpeningElement, JsxSelfClosingElement, SourceFile, Node } from "ts-morph";

import { collectStatementCommentPositions, insertLineComments } from "../shared/comments.js";
import { isElementsImport } from "../shared/elements-import.js";
import { createComponentMigration } from "../shared/migration-engine.js";

/**
 * Codemod to replace the lab SearchInput with the core SearchInput component.
 *
 * Import transformations:
 * - SearchInput -> SearchInput (from @reapit/elements/core/search-input or facade package)
 * - SearchInputProps -> removed (type references rewritten to SearchInput.Props)
 *
 * Type transformations:
 * - SearchInputProps -> SearchInput.Props
 *
 * JSX prop transformations:
 * - inputSize -> size
 * - isDisabled -> disabled
 * - unstable_onSearch -> removed
 *
 * TODO comment:
 * - A TODO comment is inserted before each JSX statement that contained
 *   unstable_onSearch, prompting the consumer to replace it with onChange.
 *
 * Skipped:
 * - Re-export declarations (left unchanged)
 * - Files not containing SearchInput symbols
 */

const TARGET_SPECIFIER = "@reapit/elements/core/search-input";

interface SearchInputContext {
  todoNodes: Node[];
}

const baseTransform = createComponentMigration<SearchInputContext>({
  identifiers: [
    {
      from: "SearchInput",
      to: "SearchInput",
      targetSpecifier: TARGET_SPECIFIER,
    },
  ],
  props: [
    {
      from: "SearchInputProps",
      to: "SearchInput.Props",
      targetSpecifier: TARGET_SPECIFIER,
    },
  ],
  propRenames: {
    inputSize: "size",
    isDisabled: "disabled",
  },
  // Local re-exports (`export { SearchInput }` without `from`) count as usage
  // and require a new import to be added.
  treatLocalReExportsAsUsage: true,
  createContext: () => ({ todoNodes: [] }),
  // unstable_onSearch is handled here so we can detect its presence before
  // removal and conditionally insert the TODO comment in afterTransform.
  customJsxTransform(
    element: JsxOpeningElement | JsxSelfClosingElement,
    _sourceFile,
    _facadePackage,
    context,
  ): void {
    for (const attr of element.getAttributes().slice()) {
      if (attr.getKind() !== SyntaxKind.JsxAttribute) continue;
      const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute);
      if (jsxAttr.getNameNode().getText() === "unstable_onSearch") {
        jsxAttr.remove();
        context.todoNodes.push(element);
      }
    }
  },
  afterTransform(sourceFile: SourceFile, { facadePackage, context }): void {
    // -----------------------------------------------------------------------
    // Alias-as-Props-base: when SearchInput was imported with an alias
    // (e.g. `import { SearchInput as SI }`), the engine emits `SearchInput.Props`
    // and adds an unaliased `SearchInput` specifier alongside `SearchInput as SI`.
    // We correct this by:
    //   1. Detecting an aliased SearchInput specifier in the target import.
    //   2. Rewriting `SearchInput.Props` type references to `<alias>.Props`.
    //   3. Removing the spurious unaliased `SearchInput` specifier.
    // -----------------------------------------------------------------------
    for (const importDecl of sourceFile.getImportDeclarations()) {
      const specifier = importDecl.getModuleSpecifierValue();
      const effectiveTarget = facadePackage ?? TARGET_SPECIFIER;
      if (!isElementsImport(specifier, facadePackage)) continue;
      // Only examine the target import (or the facade package import).
      if (specifier !== effectiveTarget && specifier !== TARGET_SPECIFIER) continue;

      const namedImports = importDecl.getNamedImports();
      const aliasedEntry = namedImports.find(
        (ni) => ni.getName() === "SearchInput" && ni.getAliasNode() != null,
      );
      if (!aliasedEntry) continue;

      const alias = aliasedEntry.getAliasNode()!.getText();

      // Rewrite `SearchInput.Props` type references to `<alias>.Props`.
      for (const typeRef of sourceFile.getDescendantsOfKind(SyntaxKind.TypeReference)) {
        const typeName = typeRef.getTypeName();
        if (typeName.getText() === "SearchInput.Props") {
          typeName.replaceWithText(`${alias}.Props`);
        }
      }
      for (const heritage of sourceFile.getDescendantsOfKind(
        SyntaxKind.ExpressionWithTypeArguments,
      )) {
        const expression = heritage.getExpression();
        if (expression.getText() === "SearchInput.Props") {
          expression.replaceWithText(`${alias}.Props`);
        }
      }

      // Remove the spurious unaliased `SearchInput` specifier (if present).
      for (const ni of importDecl.getNamedImports()) {
        if (ni.getName() === "SearchInput" && ni.getAliasNode() == null) {
          ni.remove();
          break;
        }
      }

      // We only need to process one import declaration.
      break;
    }

    // -----------------------------------------------------------------------
    // TODO comment insertion for removed unstable_onSearch prop.
    // -----------------------------------------------------------------------
    if (context.todoNodes.length > 0) {
      const positions = collectStatementCommentPositions(sourceFile, context.todoNodes);
      insertLineComments(
        sourceFile,
        positions,
        " TODO: Replace the removed unstable_onSearch prop with onChange.",
      );
    }
  },
});

export default baseTransform;
