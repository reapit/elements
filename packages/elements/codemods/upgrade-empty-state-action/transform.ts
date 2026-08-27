import { SyntaxKind } from "ts-morph";
import type { JsxOpeningElement, JsxSelfClosingElement, SourceFile } from "ts-morph";

import { addImportsToTarget, resolveTargetSpecifier } from "../shared/imports.js";
import { syncClosingTag } from "../shared/jsx.js";
import { createComponentMigration } from "../shared/migration-engine.js";

const BUTTON_TARGET_SPECIFIER = "@reapit/elements/core/button";

type JsxElementWithTag = JsxOpeningElement | JsxSelfClosingElement;

/**
 * Codemod to migrate EmptyState.Action / EmptyState.ActionButton (and their
 * directly-imported EmptyStateAction / EmptyStateActionButton equivalents) to
 * plain AnchorButton / Button usage.
 *
 * Both deprecated components are thin wrappers that always render with
 * `size="medium" variant="tertiary" useLinkStyle` baked in, so the migration
 * un-wraps the element and writes those three props explicitly.
 *
 * Import Transformations:
 * - EmptyStateAction → AnchorButton (from @reapit/elements/core/button or facade package)
 * - EmptyStateActionButton → Button (from @reapit/elements/core/button or facade package)
 *
 * JSX Element Transformations:
 * - <EmptyStateAction> → <AnchorButton size="medium" variant="tertiary" useLinkStyle>
 * - <EmptyStateActionButton> → <Button size="medium" variant="tertiary" useLinkStyle>
 * - <EmptyState.Action> → <AnchorButton size="medium" variant="tertiary" useLinkStyle>
 * - <EmptyState.ActionButton> → <Button size="medium" variant="tertiary" useLinkStyle>
 *
 * The `EmptyState.Action` / `EmptyState.ActionButton` form is matched by exact
 * tag text (mirroring the `at-a-glance-article-card` codemod's handling of
 * `AtAGlance.Card`) rather than alias-tracking the `EmptyState` import: this
 * is the form consumers actually use, since `EmptyStateAction` /
 * `EmptyStateActionButton` are not part of the public package exports.
 */

function addDefaultButtonAttributes(element: JsxElementWithTag): void {
  for (const name of ["size", "variant", "useLinkStyle"]) {
    element.getAttribute(name)?.remove();
  }
  element.addAttribute({ name: "size", initializer: '"medium"' });
  element.addAttribute({ name: "variant", initializer: '"tertiary"' });
  element.addAttribute({ name: "useLinkStyle" });
}

function migrateNamespacedElements(sourceFile: SourceFile, from: string, to: string): boolean {
  let migrated = false;

  const elements: JsxElementWithTag[] = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ];

  for (const element of elements) {
    if (element.getTagNameNode().getText() !== from) continue;

    element.getTagNameNode().replaceWithText(to);
    syncClosingTag(element, from, to);
    addDefaultButtonAttributes(element);
    migrated = true;
  }

  return migrated;
}

export default createComponentMigration({
  quickRejectStrings: ["EmptyStateAction", "EmptyState.Action"],
  identifiers: [
    { from: "EmptyStateAction", to: "AnchorButton", targetSpecifier: BUTTON_TARGET_SPECIFIER },
    { from: "EmptyStateActionButton", to: "Button", targetSpecifier: BUTTON_TARGET_SPECIFIER },
  ],
  customJsxTransform(element): void {
    addDefaultButtonAttributes(element);
  },
  afterTransform(sourceFile, { facadePackage }): void {
    const migratedAnchorButton = migrateNamespacedElements(
      sourceFile,
      "EmptyState.Action",
      "AnchorButton",
    );
    const migratedButton = migrateNamespacedElements(
      sourceFile,
      "EmptyState.ActionButton",
      "Button",
    );

    const importsToAdd: Array<{ name: string; isTypeOnly: boolean }> = [];
    if (migratedAnchorButton) importsToAdd.push({ name: "AnchorButton", isTypeOnly: false });
    if (migratedButton) importsToAdd.push({ name: "Button", isTypeOnly: false });

    if (importsToAdd.length > 0) {
      const emptyStateImportSpecifier = sourceFile
        .getImportDeclarations()
        .find((importDecl) =>
          importDecl
            .getNamedImports()
            .some((namedImport) => namedImport.getName() === "EmptyState"),
        )
        ?.getModuleSpecifierValue();

      const targetSpecifier = emptyStateImportSpecifier
        ? resolveTargetSpecifier(emptyStateImportSpecifier, BUTTON_TARGET_SPECIFIER, facadePackage)
        : (facadePackage ?? BUTTON_TARGET_SPECIFIER);

      addImportsToTarget(sourceFile, importsToAdd, targetSpecifier, {
        promoteDeclarationTypeOnly: true,
      });
    }
  },
});
