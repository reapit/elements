import { SyntaxKind } from "ts-morph";
import type { Identifier, JsxOpeningElement, JsxSelfClosingElement, SourceFile } from "ts-morph";

import { getImportAliases } from "./aliases.js";
import { collectStatementCommentPositions, insertLineComments } from "./comments.js";
import { isElementsImport } from "./elements-import.js";
import { hasIdentifierUsage, transformIdentifierReferences } from "./identifiers.js";
import { resolveTargetSpecifier, addImportsToTarget } from "./imports.js";
import { getJsxElements, hasJsxUsage, syncClosingTag } from "./jsx.js";
import { createProjectFromSource } from "./project.js";
import { applyPropTransforms } from "./props.js";
import { transformTypeReferences } from "./types.js";

/**
 * Describes how to migrate a single named export from @reapit/elements.
 */
export interface IdentifierMigration {
  /** The old exported name (e.g. 'DeprecatedLabel'). */
  from: string;
  /** The new exported name (e.g. 'LabelText'). */
  to: string;
  /** The target module specifier (e.g. '@reapit/elements/core/label-text'). */
  targetSpecifier: string;
}

/**
 * Describes how the Props type for a component migrates.
 */
export interface PropsMigration {
  /** The old Props type name (e.g. 'DeprecatedLabelProps'). */
  from: string;
  /**
   * The new type expression (e.g. 'LabelText.Props').
   * When omitted, the props type is simply removed from imports with no
   * type reference rewrite (used for additional imports to remove).
   */
  to?: string;
  /**
   * The target module specifier for the import. Only needed when `to` is set
   * and the namespace type requires the component to be imported.
   * Defaults to the component's targetSpecifier.
   */
  targetSpecifier?: string;
}

/**
 * Describes a TODO comment to be inserted above matching JSX statements.
 */
export interface TodoCommentConfig {
  /** The comment text (including leading space, e.g. ' TODO: Consider using RadioGroupControl'). */
  text: string;
  /**
   * When set, only insert the comment for the named identifier (e.g. 'Radio').
   * When omitted, insert for all migrated identifiers.
   */
  forIdentifier?: string;
}

/**
 * The full config for a single codemod.
 *
 * @typeParam TCtx - The shape of the per-invocation context object created by
 *   `createContext`. Defaults to `Record<string, unknown>`.
 */
export interface ComponentMigrationConfig<TCtx = Record<string, unknown>> {
  /**
   * Quick-reject strings. The transform returns the source unchanged if none
   * of these substrings are present. Defaults to the `from` names of all
   * identifiers.
   */
  quickRejectStrings?: string[];

  /**
   * The component identifier migrations. Each entry maps one old exported name
   * to one new exported name + target specifier.
   */
  identifiers: IdentifierMigration[];

  /**
   * Props type migrations. Each entry maps an old Props type name to a new
   * type expression.
   */
  props?: PropsMigration[];

  /**
   * Additional named imports to remove (without adding anything in their
   * place). Used for styled components, alignment enums, etc.
   * E.g. ['ElDeprecatedBadge', 'DeprecatedButtonGroupAlignment']
   */
  importsToRemove?: string[];

  /**
   * When true, the new import is always added whenever a matching deprecated
   * import specifier is found, even if there is no JSX or identifier usage.
   * Use this when the codemod should rewrite imports unconditionally (e.g.
   * replacing an unused import so that dead-code removal tools can later clean it up).
   * Defaults to false.
   */
  alwaysRewriteMatchingImports?: boolean;

  /**
   * Prop renames to apply to matching JSX elements.
   * E.g. { isRequired: 'required', errorMessage: 'errorText' }
   */
  propRenames?: Record<string, string>;

  /**
   * Props to remove from matching JSX elements. No replacement.
   * E.g. new Set(['hasError'])
   */
  propsToRemove?: Set<string>;

  /**
   * A TODO comment to insert above each JSX statement that contains a
   * migrated element.
   */
  todoComment?: TodoCommentConfig;

  /**
   * When true, use `findReferences()` for identifier reference rewriting
   * (more precise, slower). Defaults to false (text-based scan).
   */
  useFindReferencesForIdentifiers?: boolean;

  /**
   * When true, use `treatLocalReExportsAsUsage` in hasIdentifierUsage checks
   * (local re-exports count as usage). Defaults to false.
   */
  treatLocalReExportsAsUsage?: boolean;

  /**
   * When provided, only aliases found in this set trigger the snippet-test
   * fallback in getImportAliases. Defaults to all identifiers.
   */
  fallbackIdentifiers?: Set<string>;

  /**
   * Factory that creates a fresh per-invocation context object. Called once at
   * the start of each `transform(source, ...)` call and the returned value is
   * passed to both `customJsxTransform` and `afterTransform`. Use this instead
   * of module-level mutable state so that concurrent or sequential invocations
   * cannot share stale data.
   */
  createContext?: () => TCtx;

  /**
   * Custom JSX transform hook. Called after the standard prop renames/removals
   * and tag rename but before TODO comment insertion. Use for escape hatches
   * that need custom logic per element.
   * Return value is ignored.
   */
  customJsxTransform?: (
    element: JsxOpeningElement | JsxSelfClosingElement,
    sourceFile: SourceFile,
    facadePackage: string | undefined,
    context: TCtx,
  ) => void;

  /**
   * Post-transform hook. Called after all 4 phases complete, before returning
   * the final source text. Use for escape hatches that need full-file access
   * (e.g. adding cross-component imports).
   */
  afterTransform?: (
    sourceFile: SourceFile,
    context: { facadePackage?: string; context: TCtx },
  ) => void;
}

/**
 * Creates a reusable transform function from a declarative migration config.
 *
 * The returned function implements the standard 4-phase codemod pipeline:
 * 1. Collect import aliases
 * 2. Transform imports (remove old, add new)
 * 3. Transform type references
 * 4. Transform JSX elements (rename tags, rename/remove props, insert TODO comments,
 *    rename identifier references)
 *
 * @param config - The declarative migration configuration.
 * @returns A transform function with the signature
 *   `(source, filePath?, options?) => string`.
 */
export function createComponentMigration<TCtx = Record<string, unknown>>(
  config: ComponentMigrationConfig<TCtx>,
): (source: string, filePath?: string, options?: { facadePackage?: string }) => string {
  const {
    identifiers,
    props = [],
    importsToRemove = [],
    propRenames = {},
    propsToRemove = new Set<string>(),
    todoComment,
    useFindReferencesForIdentifiers = false,
    treatLocalReExportsAsUsage = false,
    alwaysRewriteMatchingImports = false,
    fallbackIdentifiers,
    createContext,
    customJsxTransform,
    afterTransform,
  } = config;

  // Pre-build a set of quick-reject strings. Defaults to all `from` names.
  const quickRejectStrings = config.quickRejectStrings ?? identifiers.map((id) => id.from);

  // Pre-build a set of all importsToRemove names for O(1) lookup.
  const importsToRemoveSet = new Set(importsToRemove);

  return function transform(
    source: string,
    filePath: string = "file.tsx",
    options?: { facadePackage?: string },
  ): string {
    // Phase 0 — quick reject.
    if (quickRejectStrings.length > 0 && !quickRejectStrings.some((s) => source.includes(s))) {
      return source;
    }

    const facadePackage = options?.facadePackage;

    // Create a fresh per-invocation context. This ensures no state leaks
    // between calls, even when invocations are sequential with no try/finally.
    const ctx = (createContext?.() ?? {}) as TCtx;

    // Setup: create an in-memory SourceFile.
    const sourceFile = createProjectFromSource(source, filePath);

    // -------------------------------------------------------------------------
    // Phase 1 — Collect aliases.
    // -------------------------------------------------------------------------

    // Map from alias name → IdentifierMigration for O(1) lookups in Phase 6.
    const aliasToIdentifier = new Map<string, IdentifierMigration>();

    // Combined set of all component aliases (used for JSX/identifier usage checks).
    const allAliases = new Set<string>();

    // Track whether any Elements imports exist for any identifier (guards the
    // no-import no-op: aliases added via fallbackToName must not trigger
    // needsImport unless the source actually imports from @reapit/elements).
    let hasAnyElementsImport = false;

    for (const importDecl of sourceFile.getImportDeclarations()) {
      if (isElementsImport(importDecl.getModuleSpecifierValue(), facadePackage)) {
        hasAnyElementsImport = true;
        break;
      }
    }

    for (const identifier of identifiers) {
      const useFallback =
        fallbackIdentifiers === undefined || fallbackIdentifiers.has(identifier.from);
      const aliases = getImportAliases(sourceFile, identifier.from, facadePackage, {
        fallbackToName: useFallback,
      });
      for (const alias of aliases) {
        allAliases.add(alias);
        aliasToIdentifier.set(alias, identifier);
      }
    }

    // Map from props.from → Set<alias> for type reference transforms.
    const propsAliasMap = new Map<string, Set<string>>();

    // Combined set of all props aliases (used for props usage check).
    const allPropsAliases = new Set<string>();

    for (const propsMigration of props) {
      const aliases = getImportAliases(sourceFile, propsMigration.from, facadePackage);
      propsAliasMap.set(propsMigration.from, aliases);
      for (const alias of aliases) {
        allPropsAliases.add(alias);
      }
    }

    // -------------------------------------------------------------------------
    // Phase 1b — Pre-collect findReferences data (before imports are removed).
    //
    // When useFindReferencesForIdentifiers is true, findReferences() is called
    // on import name nodes NOW, before Phase 3 removes them. We collect pairs
    // of [Identifier node, newName] and apply renames in Phase 5.
    // -------------------------------------------------------------------------

    // Each entry: the identifier node to rename and the new name to use.
    const preCollectedRenames: Array<{ node: Identifier; newName: string }> = [];

    if (useFindReferencesForIdentifiers) {
      for (const identifier of identifiers) {
        for (const importDecl of sourceFile.getImportDeclarations()) {
          const moduleSpecifier = importDecl.getModuleSpecifierValue();
          if (!isElementsImport(moduleSpecifier, facadePackage)) continue;

          for (const namedImport of importDecl.getNamedImports()) {
            if (namedImport.getName() !== identifier.from) continue;

            // Skip aliased imports: the local binding already has a different
            // name and does not need renaming in usage sites.
            if (namedImport.getAliasNode()) continue;

            const nameNode = namedImport.getNameNode().asKind(SyntaxKind.Identifier);
            if (!nameNode) continue;

            for (const referencedSymbol of nameNode.findReferences()) {
              for (const reference of referencedSymbol.getReferences()) {
                if (reference.isDefinition()) continue;

                const refNode = reference.getNode().asKind(SyntaxKind.Identifier);
                if (!refNode) continue;

                const parent = refNode.getParent();
                if (!parent) continue;
                const parentKind = parent.getKind();

                if (parentKind === SyntaxKind.ExportSpecifier) {
                  // Skip re-exports to an external module; rename bare local re-exports.
                  const exportDeclaration = parent.getFirstAncestorByKind(
                    SyntaxKind.ExportDeclaration,
                  );
                  if (exportDeclaration?.getModuleSpecifierValue()) continue;
                }

                if (
                  parentKind === SyntaxKind.ImportSpecifier ||
                  parentKind === SyntaxKind.JsxOpeningElement ||
                  parentKind === SyntaxKind.JsxSelfClosingElement ||
                  parentKind === SyntaxKind.JsxClosingElement
                ) {
                  continue;
                }

                preCollectedRenames.push({ node: refNode, newName: identifier.to });
              }
            }
          }
        }
      }
    }

    // -------------------------------------------------------------------------
    // Phase 2 — Determine whether any new import is needed.
    // -------------------------------------------------------------------------

    // Only consider aliases that came from actual Elements imports (not fallback
    // names). When there are no Elements imports, allAliases may still contain
    // fallback names (e.g. 'Radio') if the source has no import declarations at
    // all, but we must not treat those as needing a new import.
    const effectiveAliases = hasAnyElementsImport ? allAliases : new Set<string>();
    const effectivePropsAliases = hasAnyElementsImport ? allPropsAliases : new Set<string>();

    // When useFindReferencesForIdentifiers is true, Phase 1b has already
    // pre-collected references and will rename bare local re-exports
    // (export { Radio } without `from`). Such a bare export keeps the symbol
    // in scope for downstream consumers and therefore counts as a usage that
    // requires the new import to be present. We always treat local re-exports
    // as usage in this mode; external re-exports (export { X } from '...') are
    // still excluded by the pre-collection logic in Phase 1b.
    const effectiveTreatLocalReExportsAsUsage =
      treatLocalReExportsAsUsage || useFindReferencesForIdentifiers;

    const hasJsxOrIdentifierUsage =
      effectiveAliases.size > 0 &&
      (hasJsxUsage(sourceFile, effectiveAliases) ||
        hasIdentifierUsage(sourceFile, effectiveAliases, {
          treatLocalReExportsAsUsage: effectiveTreatLocalReExportsAsUsage,
        }));

    const hasPropsUsage =
      effectivePropsAliases.size > 0 &&
      hasIdentifierUsage(sourceFile, effectivePropsAliases, { treatLocalReExportsAsUsage });

    // When alwaysRewriteMatchingImports is set, treat any matching import specifier
    // as sufficient reason to add the new import (even without JSX or usage).
    const hasMatchingSpecifier = alwaysRewriteMatchingImports && effectiveAliases.size > 0;

    const needsImport = hasJsxOrIdentifierUsage || hasPropsUsage || hasMatchingSpecifier;

    // -------------------------------------------------------------------------
    // Phase 3 — Transform imports.
    // -------------------------------------------------------------------------

    // Queued additions, grouped later by targetSpecifier.
    const importsToAdd: Array<{
      name: string;
      alias?: string;
      isTypeOnly: boolean;
      targetSpecifier: string;
    }> = [];

    for (const importDecl of sourceFile.getImportDeclarations().slice()) {
      if (importDecl.wasForgotten()) continue;

      const specifier = importDecl.getModuleSpecifierValue();
      if (!isElementsImport(specifier, facadePackage)) continue;

      // Skip declarations that are already at a target path (non-facade only).
      // With a facade package, even subpath imports may need processing.
      if (!facadePackage) {
        const isAlreadyAtTarget = identifiers.some((id) => specifier === id.targetSpecifier);
        if (isAlreadyAtTarget) continue;
      }

      const namedImportsToRemove: ReturnType<typeof importDecl.getNamedImports> = [];

      for (const namedImport of importDecl.getNamedImports()) {
        const originalName = namedImport.getName();

        // Check against component identifiers.
        const identifier = identifiers.find((id) => id.from === originalName);
        if (identifier) {
          if (needsImport) {
            importsToAdd.push({
              name: identifier.to,
              alias: namedImport.getAliasNode()?.getText(),
              isTypeOnly: namedImport.isTypeOnly(),
              targetSpecifier: resolveTargetSpecifier(
                specifier,
                identifier.targetSpecifier,
                facadePackage,
              ),
            });
          }
          namedImportsToRemove.push(namedImport);
          continue;
        }

        // Check against props migrations.
        const propsMigration = props.find((p) => p.from === originalName);
        if (propsMigration) {
          if (propsMigration.to !== undefined) {
            // Find the corresponding component identifier so we can resolve the target.
            // Use propsMigration.targetSpecifier if provided, otherwise derive from the
            // component whose `to` name is a prefix of the props `to` string (e.g.
            // 'ButtonGroup' is a prefix of 'ButtonGroup.Props').
            // Throw when neither resolves so misconfigured codemods fail loudly.
            const matchedIdentifier = identifiers.find((id) =>
              propsMigration.to?.startsWith(id.to),
            );
            const propsTargetSpecifier =
              propsMigration.targetSpecifier ?? matchedIdentifier?.targetSpecifier;

            if (propsTargetSpecifier === undefined) {
              throw new Error(
                `[createComponentMigration] Cannot resolve targetSpecifier for props migration ` +
                  `"${propsMigration.from}" → "${propsMigration.to}". ` +
                  `Set PropsMigration.targetSpecifier explicitly or ensure the "to" value starts with a known identifier name.`,
              );
            }

            if (needsImport) {
              importsToAdd.push({
                name: matchedIdentifier?.to ?? identifiers[0].to,
                isTypeOnly: namedImport.isTypeOnly(),
                targetSpecifier: resolveTargetSpecifier(
                  specifier,
                  propsTargetSpecifier,
                  facadePackage,
                ),
              });
            }
          }
          // Always remove (whether to is defined or not).
          namedImportsToRemove.push(namedImport);
          continue;
        }

        // Check against plain importsToRemove list.
        if (importsToRemoveSet.has(originalName)) {
          namedImportsToRemove.push(namedImport);
        }
      }

      // Remove queued named imports.
      for (const namedImport of namedImportsToRemove) {
        namedImport.remove();
      }

      // Clean up empty declarations.
      if (
        importDecl.getNamedImports().length === 0 &&
        !importDecl.getDefaultImport() &&
        !importDecl.getNamespaceImport()
      ) {
        importDecl.remove();
      }
    }

    // Snippet-test fallback: if needsImport but no imports were found to migrate
    // (e.g. there are no import declarations), add a fallback for the first identifier.
    if (needsImport && importsToAdd.length === 0) {
      importsToAdd.push({
        name: identifiers[0].to,
        isTypeOnly: false,
        targetSpecifier: facadePackage ?? identifiers[0].targetSpecifier,
      });
    }

    // Group by targetSpecifier and call addImportsToTarget once per group.
    const groupedBySpecifier = new Map<
      string,
      Array<{ name: string; alias?: string; isTypeOnly: boolean }>
    >();
    for (const { targetSpecifier, ...entry } of importsToAdd) {
      const group = groupedBySpecifier.get(targetSpecifier) ?? [];
      group.push(entry);
      groupedBySpecifier.set(targetSpecifier, group);
    }
    for (const [specifier, entries] of groupedBySpecifier) {
      addImportsToTarget(sourceFile, entries, specifier, { promoteDeclarationTypeOnly: true });
    }

    // -------------------------------------------------------------------------
    // Phase 4 — Transform type references.
    // -------------------------------------------------------------------------

    for (const propsMigration of props) {
      if (propsMigration.to === undefined) continue;
      const aliases = propsAliasMap.get(propsMigration.from);
      if (!aliases || aliases.size === 0) continue;
      transformTypeReferences(sourceFile, aliases, propsMigration.to);
    }

    // -------------------------------------------------------------------------
    // Phase 5 — Transform identifier references.
    // -------------------------------------------------------------------------

    if (useFindReferencesForIdentifiers) {
      // Apply the pre-collected renames from Phase 1b (import nodes are gone now).
      for (const { node, newName } of preCollectedRenames) {
        if (!node.wasForgotten()) {
          node.replaceWithText(newName);
        }
      }
    } else {
      for (const identifier of identifiers) {
        transformIdentifierReferences(sourceFile, identifier.from, identifier.to, {
          useFindReferences: false,
          facadePackage,
          isElementsImportFn: isElementsImport,
        });
      }
    }

    // -------------------------------------------------------------------------
    // Phase 6 — Transform JSX elements.
    // -------------------------------------------------------------------------

    const allElements = getJsxElements(sourceFile, allAliases);

    // Collect nodes that need TODO comments, keyed by statement position.
    const todoNodes: import("ts-morph").Node[] = [];

    for (const element of allElements) {
      const tagNameText = element.getTagNameNode().getText();

      // Resolve which identifier originally produced this alias.
      const identifier = aliasToIdentifier.get(tagNameText);
      if (!identifier) continue;

      // Apply prop renames and removals.
      applyPropTransforms(element, propRenames, propsToRemove);

      // Rename the tag only when it is the unaliased original name.
      if (tagNameText === identifier.from) {
        element.getTagNameNode().replaceWithText(identifier.to);
        syncClosingTag(element, identifier.from, identifier.to);
      }

      // Custom JSX transform hook.
      customJsxTransform?.(element, sourceFile, facadePackage, ctx);

      // Collect for TODO comments.
      if (todoComment) {
        const commentAppliesToThis =
          todoComment.forIdentifier === undefined || todoComment.forIdentifier === identifier.from;
        if (commentAppliesToThis) {
          todoNodes.push(element);
        }
      }
    }

    // Insert TODO comments after all mutations are complete.
    if (todoComment && todoNodes.length > 0) {
      const positions = collectStatementCommentPositions(sourceFile, todoNodes);
      insertLineComments(sourceFile, positions, todoComment.text);
    }

    // -------------------------------------------------------------------------
    // Post-transform hook.
    // -------------------------------------------------------------------------

    afterTransform?.(sourceFile, { facadePackage, context: ctx });

    return sourceFile.getFullText();
  };
}
