import { SyntaxKind, JsxOpeningElement, JsxSelfClosingElement, SourceFile } from "ts-morph";

import {
  createProjectFromSource,
  getImportAliases,
  getJsxElements,
  hasJsxUsage,
  syncClosingTag,
  isElementsImport,
} from "../shared/index.js";

/**
 * Codemod to migrate AtAGlance.Card to the new AtAGlance.ArticleCard.
 *
 * The old AtAGlance.Card component accepted props like `displayValue`, `label`,
 * `description`, and `icon` directly. The new API separates concerns:
 *
 * - `AtAGlance.Card` is now a primitive for custom layouts using `grid` prop and
 *   subcomponents (Icon, Label, Description, Value)
 * - `AtAGlance.ArticleCard` is the new high-level component for static article cards
 *
 * Transformations:
 * - AtAGlance.Card (with displayValue/label props) -> AtAGlance.ArticleCard
 * - AtAGlanceCard (with displayValue/label props) -> AtAGlance.ArticleCard
 * - AtAGlance.Card (with children/grid) -> No change (already using new API)
 * - AtAGlanceCard (with children/grid) -> No change (already using new API)
 * - AtAGlance.AnchorCard / AtAGlanceAnchorCard -> No change (API unchanged)
 * - AtAGlance.ButtonCard / AtAGlanceButtonCard -> No change (API unchanged)
 */

type JsxElementWithTag = JsxOpeningElement | JsxSelfClosingElement;

function getTagName(element: JsxElementWithTag): string {
  return element.getTagNameNode().getText();
}

function isNamespacedComponent(element: JsxElementWithTag, componentName: string): boolean {
  return getTagName(element) === `AtAGlance.${componentName}`;
}

function hasProp(element: JsxElementWithTag, propName: string): boolean {
  const attributes = element.getAttributes();
  return attributes.some((attr) => {
    if (attr.getKind() !== SyntaxKind.JsxAttribute) {
      return false;
    }
    const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute);
    const nameNode = jsxAttr.getNameNode();
    return nameNode.getText() === propName;
  });
}

function hasChildren(element: JsxElementWithTag): boolean {
  // Self-closing elements have no children
  if (element.getKind() === SyntaxKind.JsxSelfClosingElement) {
    return false;
  }

  // For opening elements, check the parent JsxElement's children
  const parent = element.getParent();
  if (parent?.getKind() === SyntaxKind.JsxElement) {
    const jsxElement = parent.asKindOrThrow(SyntaxKind.JsxElement);
    const children = jsxElement.getJsxChildren();
    // Filter out whitespace-only text
    return children.some((child) => {
      if (child.getKind() === SyntaxKind.JsxText) {
        return child.getText().trim().length > 0;
      }
      return true;
    });
  }

  return false;
}

function isUsingOldApi(element: JsxElementWithTag): boolean {
  // New API uses subcomponents as children or grid prop
  if (hasChildren(element) || hasProp(element, "grid")) {
    return false;
  }
  // Old API has displayValue or label props, or is completely empty (no props, no children)
  // Empty cards should be migrated to ArticleCard (will cause TS errors, but that's expected)
  return true;
}

function renameTagTo(element: JsxElementWithTag, newTagName: string): void {
  const tagNameNode = element.getTagNameNode();
  tagNameNode.replaceWithText(newTagName);
}

function transformJsxElements(sourceFile: SourceFile, atAGlanceCardAliases: Set<string>): void {
  // Two-pass transformation approach:
  // Pass 1: Transform namespaced components (AtAGlance.Card -> AtAGlance.ArticleCard)
  // Pass 2: Transform direct imports (AtAGlanceCard -> AtAGlance.ArticleCard)
  //
  // We cannot do this in a single pass because mutating the AST while iterating
  // over it can cause nodes to be invalidated or missed. By collecting all elements
  // first, then mutating, we avoid iterator invalidation issues.

  // Pass 1: Process namespaced AtAGlance.Card components
  const pass1Elements = getJsxElements(sourceFile, new Set(["AtAGlance.Card"]));

  // Transform namespaced AtAGlance.Card to AtAGlance.ArticleCard when using old API
  for (const element of pass1Elements) {
    if (isUsingOldApi(element)) {
      renameTagTo(element, "AtAGlance.ArticleCard");
      syncClosingTag(element, "AtAGlance.Card", "AtAGlance.ArticleCard");
    }
  }

  // Pass 2: Re-fetch elements after Pass 1 mutations, then transform direct imports
  const pass2Elements = getJsxElements(sourceFile, atAGlanceCardAliases);

  // Transform direct AtAGlanceCard (or its aliases) to AtAGlance.ArticleCard when using old API
  for (const element of pass2Elements) {
    const tagName = getTagName(element);
    if (isUsingOldApi(element)) {
      renameTagTo(element, "AtAGlance.ArticleCard");
      syncClosingTag(element, tagName, "AtAGlance.ArticleCard");
    }
  }
}

function isAtAGlanceCardStillUsed(sourceFile: SourceFile, aliases: Set<string>): boolean {
  return hasJsxUsage(sourceFile, aliases);
}

function hasAtAGlanceImport(sourceFile: SourceFile, facadePackage?: string): boolean {
  return sourceFile.getImportDeclarations().some((importDecl) => {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();

    if (!isElementsImport(moduleSpecifier, facadePackage)) return false;

    return importDecl
      .getNamedImports()
      .some((namedImport) => namedImport.getName() === "AtAGlance");
  });
}

function usesAtAGlanceNamespace(sourceFile: SourceFile): boolean {
  const selfClosingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement);
  const openingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement);

  return [...selfClosingElements, ...openingElements].some((element) =>
    getTagName(element).startsWith("AtAGlance."),
  );
}

function updateImports(
  sourceFile: SourceFile,
  atAGlanceCardAliases: Set<string>,
  facadePackage?: string,
): void {
  const importDeclarations = sourceFile.getImportDeclarations();
  const atAGlanceCardStillUsed = isAtAGlanceCardStillUsed(sourceFile, atAGlanceCardAliases);
  const needsAtAGlanceImport =
    usesAtAGlanceNamespace(sourceFile) && !hasAtAGlanceImport(sourceFile, facadePackage);
  let importDeclWhereAtAGlanceCardWasRemoved: (typeof importDeclarations)[0] | null = null;

  // First pass: Remove AtAGlanceCard imports and track where it was removed
  for (const importDecl of importDeclarations) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();

    if (!isElementsImport(moduleSpecifier, facadePackage)) continue;

    if (!atAGlanceCardStillUsed) {
      const namedImports = importDecl.getNamedImports();

      for (const namedImport of namedImports) {
        if (namedImport.getName() === "AtAGlanceCard") {
          namedImport.remove();
          importDeclWhereAtAGlanceCardWasRemoved = importDecl;
        }
      }
    }
  }

  // Second pass: Add AtAGlance import to the same declaration where AtAGlanceCard was removed
  // Do this BEFORE removing empty imports to avoid accessing removed nodes
  if (needsAtAGlanceImport && importDeclWhereAtAGlanceCardWasRemoved) {
    importDeclWhereAtAGlanceCardWasRemoved.addNamedImport("AtAGlance");
  } else if (needsAtAGlanceImport) {
    // If we didn't find where AtAGlanceCard was removed, add to first elements import
    for (const importDecl of importDeclarations) {
      const moduleSpecifier = importDecl.getModuleSpecifierValue();

      if (isElementsImport(moduleSpecifier, facadePackage)) {
        importDecl.addNamedImport("AtAGlance");
        break;
      }
    }
  }

  // Third pass: Remove empty import declarations
  for (const importDecl of importDeclarations) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();

    if (!isElementsImport(moduleSpecifier, facadePackage)) continue;

    if (
      importDecl.getNamedImports().length === 0 &&
      !importDecl.getDefaultImport() &&
      !importDecl.getNamespaceImport()
    ) {
      importDecl.remove();
    }
  }
}

export default function transform(
  source: string,
  filePath: string = "file.tsx",
  options?: { facadePackage?: string },
): string {
  const sourceFile = createProjectFromSource(source, filePath);

  // Get aliases before transforming (e.g., import { AtAGlanceCard as Card })
  const atAGlanceCardAliases = getImportAliases(
    sourceFile,
    "AtAGlanceCard",
    options?.facadePackage,
  );

  transformJsxElements(sourceFile, atAGlanceCardAliases);
  updateImports(sourceFile, atAGlanceCardAliases, options?.facadePackage);

  return sourceFile.getFullText();
}
