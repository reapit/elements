import { Node, SourceFile, SyntaxKind } from "ts-morph";

import {
  isElementsImport,
  createProjectFromSource,
  getImportAliases,
  getNearestStatement,
} from "../shared/index.js";

/**
 * Codemod to replace the lab MobileNavItem with core TopBar components.
 *
 * Import transformations:
 * - MobileNavItem -> TopBar (from @reapit/elements/core/top-bar or facade package)
 *
 * Type transformations:
 * - MobileNavItem.Props -> TopBar.MenuItemProps
 *
 * JSX element transformations:
 * - <MobileNavItem href="…">        -> <TopBar.MenuItem>                   (anchor variant)
 * - <MobileNavItem onClick={…}>     -> <TopBar.MenuItemButton>             (button variant)
 * - <MobileNavItem>{children}</>    -> <TopBar.MenuGroup>                  (expandable variant)
 *                                      children -> <TopBar.MenuSubmenuItem> / <TopBar.MenuSubmenuItemButton>
 *
 * JSX prop transformations (anchor):
 * - label="…"          -> children text node
 * - isActive           -> aria-current="page"
 * - isActive={false}   -> aria-current={false}
 * - isActive={expr}    -> aria-current={expr ? 'page' : false}  + TODO comment
 * - absent isActive    -> aria-current={false}
 * - hasBadge           -> unchanged
 * - href               -> unchanged
 * - all other attrs    -> unchanged (passed through)
 *
 * JSX prop transformations (button):
 * - label="…"          -> children text node
 * - isActive           -> dropped + TODO comment (no equivalent on TopBar.MenuItemButton)
 * - onClick            -> unchanged (ButtonHTMLAttributes pass-through)
 * - hasBadge           -> unchanged
 * - all other attrs    -> unchanged (passed through)
 *
 * JSX prop transformations (expandable):
 * - label="…"          -> TopBar.MenuGroupSummary children
 * - isActive           -> isActive on TopBar.MenuGroup (same semantics)
 * - hasBadge           -> hasBadge on TopBar.MenuGroupSummary
 * - children           -> wrapped in TopBar.MenuSubmenu + TODO comment
 *
 * TODO comments inserted when:
 * - isActive on button variant (no equivalent)
 * - dynamic isActive expression on anchor variant (ternary emitted but flagged)
 * - expandable children wrapped in TopBar.MenuSubmenu (flagged for review)
 * - spread-only usage that cannot be statically analysed
 *
 * Skipped:
 * - Re-export declarations (left unchanged)
 * - Files not containing MobileNavItem symbols
 */

const TARGET_SPECIFIER = "@reapit/elements/core/top-bar";
const TARGET_LOCAL_NAME = "TopBar";

const TODO_BUTTON_IS_ACTIVE =
  " TODO: MobileNavItem isActive has no equivalent on TopBar.MenuItemButton. Verify the intended behaviour.";
const TODO_DYNAMIC_IS_ACTIVE =
  " TODO: MobileNavItem isActive was a boolean; aria-current expects 'page' or false. Verify this expression.";
const TODO_SUBMENU_CHILDREN =
  " TODO: Children have been wrapped in TopBar.MenuSubmenu. Verify that the submenu children are correct TopBar sub-components.";
const TODO_SPREAD_ONLY =
  " TODO: MobileNavItem could not be automatically migrated. Rewrite using TopBar.MenuItem, TopBar.MenuItemButton, or TopBar.MenuGroup.";

/**
 * Returns the local name that will be used for TopBar after the import rewrite.
 * If TopBar is already imported from the target specifier, use its existing local name.
 */
function resolveTopBarLocalName(sourceFile: SourceFile, facadePackage?: string): string {
  const targetSpecifier = facadePackage ?? TARGET_SPECIFIER;
  const existing = sourceFile
    .getImportDeclarations()
    .find((decl) => decl.getModuleSpecifierValue() === targetSpecifier);
  if (existing) {
    const named = existing.getNamedImports().find((n) => n.getName() === "TopBar");
    if (named) return named.getAliasNode()?.getText() ?? "TopBar";
  }
  return TARGET_LOCAL_NAME;
}

/** Returns the text of a JSX attribute's initialiser, or undefined when absent (boolean shorthand). */
function getAttrInitialiserText(attr: import("ts-morph").JsxAttribute): string | undefined {
  const init = attr.getInitializer();
  return init ? init.getText() : undefined;
}

/**
 * Returns the value to use as JSX children for the `label` prop.
 * - `label="Foo"` → `Foo` (raw string literal content for JSX text)
 * - `label={expr}` → `{expr}` (JSX expression container)
 * - absent → empty string
 */
function labelToChildrenText(attr: import("ts-morph").JsxAttribute | undefined): string {
  if (!attr) return "";
  const init = attr.getInitializer();
  if (!init) return "";
  if (Node.isStringLiteral(init)) return init.getLiteralText();
  return init.getText();
}

/**
 * Resolves the isActive attribute to a typed discriminant for downstream use.
 *   { kind: 'true' }           — boolean shorthand or ={true}
 *   { kind: 'false' }          — ={false}
 *   { kind: 'dynamic', text }  — any other expression
 *   { kind: 'absent' }         — attribute not present
 */
type IsActiveResult =
  | { kind: "absent" }
  | { kind: "true" }
  | { kind: "false" }
  | { kind: "dynamic"; text: string };

function resolveIsActive(attr: import("ts-morph").JsxAttribute | undefined): IsActiveResult {
  if (!attr) return { kind: "absent" };
  const init = attr.getInitializer();
  if (!init) return { kind: "true" }; // boolean shorthand
  const text = init.getText();
  if (text === "{true}") return { kind: "true" };
  if (text === "{false}") return { kind: "false" };
  // Strip braces for a clean inner expression
  const inner = text.startsWith("{") && text.endsWith("}") ? text.slice(1, -1).trim() : text;
  return { kind: "dynamic", text: inner };
}

type TodoEntry = { insertPos: number; indent: string; message: string };

function buildTodoEntry(
  node: Node,
  sourceFile: SourceFile,
  message: string,
): TodoEntry | undefined {
  const stmt = getNearestStatement(node);
  if (!stmt) return undefined;
  const triviaStart = stmt.getPos();
  const trivia = sourceFile.getFullText().slice(triviaStart, stmt.getStart());
  const lastNewline = trivia.lastIndexOf("\n");
  const indent = lastNewline === -1 ? "" : trivia.slice(lastNewline + 1);
  const insertPos = triviaStart + (lastNewline === -1 ? 0 : lastNewline + 1);
  return { insertPos, indent, message };
}

function insertTodos(entries: TodoEntry[]): (sourceFile: SourceFile) => void {
  return (sourceFile: SourceFile) => {
    // De-duplicate by (insertPos, message) so distinct TODOs at the same position are preserved
    const seen = new Set<string>();
    const deduped = entries.filter((e) => {
      const key = `${e.insertPos}::${e.message}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    // Insert in reverse source order so earlier positions are not shifted by later insertions
    const sorted = [...deduped].sort((a, b) => b.insertPos - a.insertPos);
    for (const { insertPos, indent, message } of sorted) {
      sourceFile.insertText(insertPos, `${indent}//${message}\n`);
    }
  };
}

// ---------------------------------------------------------------------------
// Import rewriting
// ---------------------------------------------------------------------------

function addTopBarImport(
  sourceFile: SourceFile,
  topBarLocalName: string,
  targetSpecifier: string,
): void {
  let targetDecl = sourceFile
    .getImportDeclarations()
    .find((decl) => decl.getModuleSpecifierValue() === targetSpecifier);

  if (!targetDecl) {
    targetDecl = sourceFile.addImportDeclaration({ moduleSpecifier: targetSpecifier });
  }

  const alreadyPresent = targetDecl.getNamedImports().some((n) => {
    return (
      n.getName() === "TopBar" && (n.getAliasNode()?.getText() ?? "TopBar") === topBarLocalName
    );
  });

  if (alreadyPresent) return;

  if (topBarLocalName === "TopBar") {
    targetDecl.addNamedImport("TopBar");
  } else {
    targetDecl.addNamedImport(`TopBar as ${topBarLocalName}`);
  }
}

function transformImports(sourceFile: SourceFile, facadePackage?: string): void {
  const alreadyMigratedPath = facadePackage ? null : TARGET_SPECIFIER;
  const topBarLocalName = resolveTopBarLocalName(sourceFile, facadePackage);

  // Track which original specifier had MobileNavItem so we can add TopBar to the same specifier.
  let sourceSpecifierWithMobileNavItem: string | undefined;

  for (const importDecl of sourceFile.getImportDeclarations().slice()) {
    if (importDecl.wasForgotten()) continue;
    const specifier = importDecl.getModuleSpecifierValue();
    if (!isElementsImport(specifier, facadePackage)) continue;
    if (alreadyMigratedPath && specifier === alreadyMigratedPath) continue;

    const toRemove: import("ts-morph").ImportSpecifier[] = [];
    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === "MobileNavItem") {
        toRemove.push(namedImport);
      }
    }

    if (toRemove.length > 0) {
      sourceSpecifierWithMobileNavItem = specifier;
      toRemove.forEach((n) => n.remove());

      if (
        importDecl.getNamedImports().length === 0 &&
        !importDecl.getDefaultImport() &&
        !importDecl.getNamespaceImport()
      ) {
        importDecl.remove();
      }
    }
  }

  // If TopBar is already imported from any elements/facade specifier, reuse that import
  // instead of adding a second one, to avoid duplicate local bindings.
  const hasExistingTopBarImport = sourceFile.getImportDeclarations().some((importDecl) => {
    if (importDecl.wasForgotten()) return false;
    const specifier = importDecl.getModuleSpecifierValue();
    if (!isElementsImport(specifier, facadePackage)) return false;
    return importDecl.getNamedImports().some((namedImport) => {
      const alias = namedImport.getAliasNode();
      const localName = alias ? alias.getText() : namedImport.getName();
      return localName === topBarLocalName;
    });
  });

  if (!hasExistingTopBarImport) {
    // When a facade subpath was used (e.g. @company/ui/lab/mobile-nav-item) keep TopBar on that
    // same specifier. For facade root imports, keep the root specifier. For @reapit/elements
    // imports, always target @reapit/elements/core/top-bar.
    const targetSpecifier = facadePackage
      ? (sourceSpecifierWithMobileNavItem ?? facadePackage)
      : TARGET_SPECIFIER;
    addTopBarImport(sourceFile, topBarLocalName, targetSpecifier);
  }
}

// ---------------------------------------------------------------------------
// Type reference rewriting
// ---------------------------------------------------------------------------

function transformTypeReferences(
  sourceFile: SourceFile,
  aliases: Set<string>,
  topBarLocalName: string,
): void {
  // MobileNavItem.Props in ordinary type positions (e.g. type alias, generic arg):
  //   TypeReference -> QualifiedName { left: Identifier('MobileNavItem'), right: Identifier('Props') }
  for (const typeRef of sourceFile.getDescendantsOfKind(SyntaxKind.TypeReference)) {
    const typeName = typeRef.getTypeName();
    if (typeName.getKind() !== SyntaxKind.QualifiedName) continue;
    const qualified = typeName.asKindOrThrow(SyntaxKind.QualifiedName);
    if (aliases.has(qualified.getLeft().getText()) && qualified.getRight().getText() === "Props") {
      typeName.replaceWithText(`${topBarLocalName}.MenuItemProps`);
    }
  }

  // MobileNavItem.Props in heritage clauses (e.g. `interface Foo extends MobileNavItem.Props`):
  //   ExpressionWithTypeArguments -> PropertyAccessExpression { expression: 'MobileNavItem', name: 'Props' }
  for (const exprWithTypes of sourceFile.getDescendantsOfKind(
    SyntaxKind.ExpressionWithTypeArguments,
  )) {
    const expr = exprWithTypes.getExpression();
    if (expr.getKind() !== SyntaxKind.PropertyAccessExpression) continue;
    const propAccess = expr.asKindOrThrow(SyntaxKind.PropertyAccessExpression);
    const objText = propAccess.getExpression().getText();
    const propText = propAccess.getName();
    if (aliases.has(objText) && propText === "Props") {
      expr.replaceWithText(`${topBarLocalName}.MenuItemProps`);
    }
  }
}

// ---------------------------------------------------------------------------
// Attribute helpers
// ---------------------------------------------------------------------------

type JsxOpeningLike =
  | import("ts-morph").JsxOpeningElement
  | import("ts-morph").JsxSelfClosingElement;

function getAttr(node: JsxOpeningLike, name: string): import("ts-morph").JsxAttribute | undefined {
  return node
    .getAttributes()
    .filter(Node.isJsxAttribute)
    .find((a) => a.getNameNode().getText() === name);
}

/**
 * Returns all attribute texts except those in the exclude set.
 * Spread attributes are always preserved.
 */
function getRemainingAttrsText(node: JsxOpeningLike, exclude: Set<string>): string {
  const parts: string[] = [];
  for (const attr of node.getAttributes()) {
    if (Node.isJsxSpreadAttribute(attr)) {
      parts.push(attr.getText());
    } else if (!exclude.has(attr.getNameNode().getText())) {
      parts.push(attr.getText());
    }
  }
  return parts.length > 0 ? " " + parts.join(" ") : "";
}

// ---------------------------------------------------------------------------
// Variant detection
// ---------------------------------------------------------------------------

type MobileNavItemVariant = "anchor" | "button" | "expandable" | "spread-only";

function detectVariant(
  node: JsxOpeningLike,
  jsxChildren: import("ts-morph").JsxChild[],
): MobileNavItemVariant {
  // Non-whitespace JSX children → expandable
  const hasJsxChildren = jsxChildren.some((child) => {
    if (Node.isJsxText(child)) return child.getText().trim() !== "";
    return true;
  });
  if (hasJsxChildren) return "expandable";

  const attrs = node.getAttributes();
  const hasHref = attrs.some((a) => Node.isJsxAttribute(a) && a.getNameNode().getText() === "href");
  const hasOnClick = attrs.some(
    (a) => Node.isJsxAttribute(a) && a.getNameNode().getText() === "onClick",
  );
  const hasLabel = attrs.some(
    (a) => Node.isJsxAttribute(a) && a.getNameNode().getText() === "label",
  );
  const hasSpread = attrs.some((a) => Node.isJsxSpreadAttribute(a));

  if (hasHref) return "anchor";
  if (hasOnClick) return "button";

  // Only spread attributes and no resolvable static props
  if (attrs.length > 0 && attrs.every((a) => Node.isJsxSpreadAttribute(a))) return "spread-only";

  // Spread present without a definitive routing prop (href or onClick) — cannot safely infer the
  // variant even when a label is present, so leave the element unchanged for manual review.
  if (hasSpread && !hasHref && !hasOnClick) return "spread-only";

  // Default: treat as anchor; TypeScript will surface any missing href errors
  return "anchor";
}

// ---------------------------------------------------------------------------
// Per-variant replacement builders
// ---------------------------------------------------------------------------

function buildAnchorReplacement(
  node: JsxOpeningLike,
  sourceFile: SourceFile,
  topBarLocalName: string,
  todoEntries: TodoEntry[],
): string {
  const labelAttr = getAttr(node, "label");
  const isActiveAttr = getAttr(node, "isActive");
  const isActiveResult = resolveIsActive(isActiveAttr);
  const childrenText = labelToChildrenText(labelAttr);

  let ariaCurrent: string;
  if (isActiveResult.kind === "true") {
    ariaCurrent = `aria-current="page"`;
  } else if (isActiveResult.kind === "false" || isActiveResult.kind === "absent") {
    ariaCurrent = `aria-current={false}`;
  } else {
    // Dynamic expression — emit ternary and flag for review
    ariaCurrent = `aria-current={${isActiveResult.text} ? 'page' : false}`;
    const entry = buildTodoEntry(node, sourceFile, TODO_DYNAMIC_IS_ACTIVE);
    if (entry) todoEntries.push(entry);
  }

  const exclude = new Set(["label", "isActive"]);
  const remaining = getRemainingAttrsText(node, exclude);
  const tag = `${topBarLocalName}.MenuItem`;
  return `<${tag} ${ariaCurrent}${remaining}>${childrenText}</${tag}>`;
}

function buildButtonReplacement(
  node: JsxOpeningLike,
  sourceFile: SourceFile,
  topBarLocalName: string,
  todoEntries: TodoEntry[],
): string {
  const labelAttr = getAttr(node, "label");
  const isActiveAttr = getAttr(node, "isActive");
  const childrenText = labelToChildrenText(labelAttr);

  // isActive has no equivalent on TopBar.MenuItemButton — drop it and add a TODO
  if (isActiveAttr) {
    const entry = buildTodoEntry(node, sourceFile, TODO_BUTTON_IS_ACTIVE);
    if (entry) todoEntries.push(entry);
  }

  const exclude = new Set(["label", "isActive"]);
  const remaining = getRemainingAttrsText(node, exclude);
  const tag = `${topBarLocalName}.MenuItemButton`;
  return `<${tag}${remaining}>${childrenText}</${tag}>`;
}

function buildSubmenuItemReplacement(
  node: JsxOpeningLike,
  sourceFile: SourceFile,
  topBarLocalName: string,
  todoEntries: TodoEntry[],
): string {
  const labelAttr = getAttr(node, "label");
  const isActiveAttr = getAttr(node, "isActive");
  const isActiveResult = resolveIsActive(isActiveAttr);
  const childrenText = labelToChildrenText(labelAttr);

  let ariaCurrent: string;
  if (isActiveResult.kind === "true") {
    ariaCurrent = `aria-current="page"`;
  } else if (isActiveResult.kind === "false" || isActiveResult.kind === "absent") {
    ariaCurrent = `aria-current={false}`;
  } else {
    ariaCurrent = `aria-current={${isActiveResult.text} ? 'page' : false}`;
    const entry = buildTodoEntry(node, sourceFile, TODO_DYNAMIC_IS_ACTIVE);
    if (entry) todoEntries.push(entry);
  }

  const exclude = new Set(["label", "isActive"]);
  const remaining = getRemainingAttrsText(node, exclude);
  const tag = `${topBarLocalName}.MenuSubmenuItem`;
  return `<${tag} ${ariaCurrent}${remaining}>${childrenText}</${tag}>`;
}

function buildSubmenuItemButtonReplacement(
  node: JsxOpeningLike,
  sourceFile: SourceFile,
  topBarLocalName: string,
  todoEntries: TodoEntry[],
): string {
  const labelAttr = getAttr(node, "label");
  const isActiveAttr = getAttr(node, "isActive");
  const childrenText = labelToChildrenText(labelAttr);

  if (isActiveAttr) {
    const entry = buildTodoEntry(node, sourceFile, TODO_BUTTON_IS_ACTIVE);
    if (entry) todoEntries.push(entry);
  }

  const exclude = new Set(["label", "isActive"]);
  const remaining = getRemainingAttrsText(node, exclude);
  const tag = `${topBarLocalName}.MenuSubmenuItemButton`;
  return `<${tag}${remaining}>${childrenText}</${tag}>`;
}

function buildExpandableReplacement(
  node: JsxOpeningLike,
  jsxChildren: import("ts-morph").JsxChild[],
  aliases: Set<string>,
  sourceFile: SourceFile,
  topBarLocalName: string,
  todoEntries: TodoEntry[],
): string {
  const labelAttr = getAttr(node, "label");
  const isActiveAttr = getAttr(node, "isActive");
  const hasBadgeAttr = getAttr(node, "hasBadge");
  const isActiveResult = resolveIsActive(isActiveAttr);
  const labelText = labelToChildrenText(labelAttr);

  // isActive on TopBar.MenuGroup has the same name and semantics — pass through
  let isActiveProp = "";
  if (isActiveResult.kind === "true") {
    isActiveProp = " isActive";
  } else if (isActiveResult.kind === "dynamic") {
    isActiveProp = ` isActive={${isActiveResult.text}}`;
  }
  // 'false' and 'absent' → omit (falsy default)

  // hasBadge on TopBar.MenuGroupSummary
  let hasBadgeProp = "";
  if (hasBadgeAttr) {
    const init = getAttrInitialiserText(hasBadgeAttr);
    hasBadgeProp = init ? ` hasBadge=${init}` : " hasBadge";
  }

  const exclude = new Set(["label", "isActive", "hasBadge"]);
  const remaining = getRemainingAttrsText(node, exclude);

  // Recursively transform children
  const { childrenText, hasNonMobileNavItemChildren } = transformExpandableChildren(
    jsxChildren,
    aliases,
    sourceFile,
    topBarLocalName,
    todoEntries,
  );

  // Always wrap children in TopBar.MenuSubmenu; add a TODO when non-MobileNavItem children
  // are present because the developer must verify they are correct sub-components.
  if (hasNonMobileNavItemChildren) {
    const entry = buildTodoEntry(node, sourceFile, TODO_SUBMENU_CHILDREN);
    if (entry) todoEntries.push(entry);
  }

  const summaryTag = `${topBarLocalName}.MenuGroupSummary`;
  const groupTag = `${topBarLocalName}.MenuGroup`;
  const submenuTag = `${topBarLocalName}.MenuSubmenu`;
  const summaryJsx = `<${summaryTag}${hasBadgeProp}>${labelText}</${summaryTag}>`;

  return `<${groupTag}${isActiveProp}${remaining} summary={${summaryJsx}}><${submenuTag}>${childrenText}</${submenuTag}></${groupTag}>`;
}

/**
 * Recursively transforms the JSX children of an expandable MobileNavItem.
 * Children that are MobileNavItem elements are converted to the appropriate TopBar sub-component.
 * All other children are preserved verbatim and flagged via hasNonMobileNavItemChildren.
 */
function transformExpandableChildren(
  children: import("ts-morph").JsxChild[],
  aliases: Set<string>,
  sourceFile: SourceFile,
  topBarLocalName: string,
  todoEntries: TodoEntry[],
): { childrenText: string; hasNonMobileNavItemChildren: boolean } {
  let childrenText = "";
  let hasNonMobileNavItemChildren = false;

  for (const child of children) {
    if (Node.isJsxText(child)) {
      const text = child.getText();
      if (text.trim() !== "") {
        childrenText += text;
        hasNonMobileNavItemChildren = true;
      }
      continue;
    }

    if (Node.isJsxSelfClosingElement(child)) {
      const tagName = child.getTagNameNode().getText();
      if (aliases.has(tagName)) {
        const variant = detectVariant(child, []);
        if (variant === "anchor") {
          childrenText += buildSubmenuItemReplacement(
            child,
            sourceFile,
            topBarLocalName,
            todoEntries,
          );
        } else if (variant === "button") {
          childrenText += buildSubmenuItemButtonReplacement(
            child,
            sourceFile,
            topBarLocalName,
            todoEntries,
          );
        } else {
          // spread-only or unexpected — preserve and flag
          childrenText += child.getText();
          hasNonMobileNavItemChildren = true;
        }
      } else {
        childrenText += child.getText();
        hasNonMobileNavItemChildren = true;
      }
      continue;
    }

    if (Node.isJsxElement(child)) {
      const openingTag = child.getOpeningElement().getTagNameNode().getText();
      if (aliases.has(openingTag)) {
        const grandChildren = child.getJsxChildren();
        const variant = detectVariant(child.getOpeningElement(), grandChildren);
        if (variant === "anchor") {
          childrenText += buildSubmenuItemReplacement(
            child.getOpeningElement(),
            sourceFile,
            topBarLocalName,
            todoEntries,
          );
        } else if (variant === "button") {
          childrenText += buildSubmenuItemButtonReplacement(
            child.getOpeningElement(),
            sourceFile,
            topBarLocalName,
            todoEntries,
          );
        } else if (variant === "expandable") {
          // Nested expandable — recurse
          childrenText += buildExpandableReplacement(
            child.getOpeningElement(),
            grandChildren,
            aliases,
            sourceFile,
            topBarLocalName,
            todoEntries,
          );
        } else {
          childrenText += child.getText();
          hasNonMobileNavItemChildren = true;
        }
      } else {
        childrenText += child.getText();
        hasNonMobileNavItemChildren = true;
      }
      continue;
    }

    // JSX expression containers, fragments, or other node kinds
    childrenText += child.getText();
    hasNonMobileNavItemChildren = true;
  }

  return { childrenText, hasNonMobileNavItemChildren };
}

// ---------------------------------------------------------------------------
// Main JSX transform pass
// ---------------------------------------------------------------------------

function transformJsx(
  sourceFile: SourceFile,
  aliases: Set<string>,
  topBarLocalName: string,
): TodoEntry[] {
  const todoEntries: TodoEntry[] = [];

  // Collect all top-level MobileNavItem JSX nodes (self-closing and full elements).
  // "Top-level" means not a descendant of another MobileNavItem target — children of
  // expandable variants are handled recursively by buildExpandableReplacement.
  type Target =
    | { kind: "self-closing"; node: import("ts-morph").JsxSelfClosingElement; pos: number }
    | { kind: "element"; node: import("ts-morph").JsxElement; pos: number };

  const allTargets: Target[] = [];

  for (const node of sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)) {
    if (aliases.has(node.getTagNameNode().getText())) {
      allTargets.push({ kind: "self-closing", node, pos: node.getPos() });
    }
  }

  for (const node of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    if (aliases.has(node.getOpeningElement().getTagNameNode().getText())) {
      allTargets.push({ kind: "element", node, pos: node.getPos() });
    }
  }

  // Build a set of all target nodes for ancestor-check purposes
  const targetNodeSet = new Set<Node>(allTargets.map((t) => t.node));

  const isDescendantOfTarget = (node: Node): boolean => {
    let current = node.getParent();
    while (current) {
      if (targetNodeSet.has(current)) return true;
      current = current.getParent();
    }
    return false;
  };

  // Only process outer-most targets; inner children are handled by recursion
  const outerTargets = allTargets.filter((t) => !isDescendantOfTarget(t.node));

  // Process in reverse source order so replacements don't invalidate sibling positions
  outerTargets.sort((a, b) => b.pos - a.pos);

  for (const target of outerTargets) {
    if (target.kind === "self-closing") {
      const { node } = target;
      const variant = detectVariant(node, []);

      if (variant === "spread-only") {
        const entry = buildTodoEntry(node, sourceFile, TODO_SPREAD_ONLY);
        if (entry) todoEntries.push(entry);
        continue;
      }

      const replacement =
        variant === "button"
          ? buildButtonReplacement(node, sourceFile, topBarLocalName, todoEntries)
          : buildAnchorReplacement(node, sourceFile, topBarLocalName, todoEntries);

      node.replaceWithText(replacement);
    } else {
      const { node } = target;
      const opening = node.getOpeningElement();
      const jsxChildren = node.getJsxChildren();
      const variant = detectVariant(opening, jsxChildren);

      if (variant === "spread-only") {
        const entry = buildTodoEntry(opening, sourceFile, TODO_SPREAD_ONLY);
        if (entry) todoEntries.push(entry);
        continue;
      }

      let replacement: string;
      if (variant === "anchor") {
        replacement = buildAnchorReplacement(opening, sourceFile, topBarLocalName, todoEntries);
      } else if (variant === "button") {
        replacement = buildButtonReplacement(opening, sourceFile, topBarLocalName, todoEntries);
      } else {
        replacement = buildExpandableReplacement(
          opening,
          jsxChildren,
          aliases,
          sourceFile,
          topBarLocalName,
          todoEntries,
        );
      }

      node.replaceWithText(replacement);
    }
  }

  return todoEntries;
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

export default function transform(
  source: string,
  filePath: string = "file.tsx",
  options?: { facadePackage?: string },
): string {
  if (!source.includes("MobileNavItem")) {
    return source;
  }

  const sourceFile = createProjectFromSource(source, filePath);
  const facadePackage = options?.facadePackage;
  const aliases = getImportAliases(sourceFile, "MobileNavItem", facadePackage);

  if (aliases.size === 0) {
    return source;
  }

  const topBarLocalName = resolveTopBarLocalName(sourceFile, facadePackage);

  // Phase 1: rewrite type references (stable positions, before JSX mutations)
  transformTypeReferences(sourceFile, aliases, topBarLocalName);

  // Phase 2: rewrite JSX — produces a list of TODO entries to insert later
  const todoEntries = transformJsx(sourceFile, aliases, topBarLocalName);

  // Phase 3: insert TODO comments before the import rewrite so that the captured source
  // positions (which refer to post-Phase-2 offsets) are still accurate. The import rewrite
  // can change the length of the import declaration, shifting all subsequent character
  // positions and corrupting any insertions made after it.
  insertTodos(todoEntries)(sourceFile);

  // Phase 4: rewrite imports (must come last — it may change the length of the file header)
  transformImports(sourceFile, facadePackage);

  return sourceFile.getFullText();
}
