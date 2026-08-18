import {
  ArrayLiteralExpression,
  JsxAttribute,
  JsxExpression,
  JsxOpeningElement,
  JsxSelfClosingElement,
  Node,
  ObjectLiteralExpression,
  SourceFile,
  StringLiteral,
  SyntaxKind,
} from "ts-morph";

import {
  addImportsToTarget,
  collectStatementCommentPositions,
  createProjectFromSource,
  getImportAliases,
  insertLineComments,
  isElementsImport,
  resolveTargetSpecifier,
  syncClosingTag,
  transformTypeReferences,
} from "../shared/index.js";

/**
 * Codemod to replace the deprecated ToggleRadio component with ChipSelect.
 *
 * Import transformations:
 * - ToggleRadio → ChipSelect (from @reapit/elements/core/chip-select)
 * - ToggleRadioProps → removed (type references rewritten to ChipSelect.Props)
 * - ToggleRadioOption → removed (no equivalent; requires manual update)
 * - ToggleRadioWrapped → removed (no equivalent)
 * - ElToggleRadioWrap, ElToggleRadioItem, ElToggleRadioLabel, ElToggleRadio → removed
 * - handleKeyboardToggleChange → removed (accessibility is handled internally by ChipSelect)
 *
 * Type transformations:
 * - ToggleRadioProps → ChipSelect.Props
 * - ToggleRadioOption → removed (TODO comment inserted)
 *
 * JSX element transformations:
 * - <ToggleRadio> → <ChipSelect> (self-closing becomes an element with children)
 * - options prop (inline array literal): expanded to <ChipSelect.Option> children
 *   - Each option's value, text, isChecked, and disabled are mapped
 * - options prop (dynamic/variable): TODO comment inserted, JSX left as-is
 * - hasGreyBg → removed (no direct equivalent; TODO comment inserted)
 * - isFullWidth → removed (no direct equivalent; TODO comment inserted)
 * - disabled → propagated to each generated <ChipSelect.Option>
 */

const CHIP_SELECT_SPECIFIER = "@reapit/elements/core/chip-select";

const IMPORTS_TO_REMOVE = new Set([
  "ToggleRadioOption",
  "ToggleRadioWrapped",
  "ElToggleRadioWrap",
  "ElToggleRadioItem",
  "ElToggleRadioLabel",
  "ElToggleRadio",
  "handleKeyboardToggleChange",
]);

const TODO_COMMENT_DYNAMIC_OPTIONS =
  " TODO (DS-78): ToggleRadio `options` is dynamic — manually convert to <ChipSelect.Option> children. See: https://github.com/reapit/elements";

const TODO_COMMENT_REMOVED_PROPS =
  " TODO (DS-78): `hasGreyBg` and/or `isFullWidth` were removed — ChipSelect has no direct equivalent. Review styling manually.";

const TODO_COMMENT_TOGGLE_RADIO_OPTION_TYPE =
  " TODO (DS-78): `ToggleRadioOption` type has no ChipSelect equivalent — update the type annotation manually.";

/**
 * Extracts the static string text from a property initialiser inside an
 * ObjectLiteralExpression returned from a ToggleRadioOption entry.
 * Returns undefined for non-static (computed / shorthand / spread) values.
 */
function getObjectPropertyString(obj: ObjectLiteralExpression, key: string): string | undefined {
  const prop = obj.getProperty(key);
  if (!prop) return undefined;

  if (Node.isPropertyAssignment(prop)) {
    const init = prop.getInitializerOrThrow();
    const kind = init.getKind();

    if (kind === SyntaxKind.StringLiteral) {
      return (init as StringLiteral).getLiteralText();
    }
    // Handles {"value"} — but plain string is the common case for option objects
    if (kind === SyntaxKind.JsxExpression) {
      const expr = (init as JsxExpression).getExpression();
      if (expr?.getKind() === SyntaxKind.StringLiteral) {
        return (expr as StringLiteral).getLiteralText();
      }
    }
  }
  return undefined;
}

/**
 * Extracts a boolean-ish value from a property assignment inside an options
 * object literal. Returns true/false for literal keywords, undefined
 * otherwise.
 */
function getObjectPropertyBoolean(obj: ObjectLiteralExpression, key: string): boolean | undefined {
  const prop = obj.getProperty(key);
  if (!prop) return undefined;

  if (Node.isPropertyAssignment(prop)) {
    const init = prop.getInitializerOrThrow();
    const kind = init.getKind();
    if (kind === SyntaxKind.TrueKeyword) return true;
    if (kind === SyntaxKind.FalseKeyword) return false;
  }
  return undefined;
}

/**
 * Retrieves the initialiser expression of a JSX attribute.
 * Returns null when the attribute is a bare boolean shorthand (e.g. `disabled`),
 * and undefined when the attribute does not exist.
 */
function getAttr(
  element: JsxOpeningElement | JsxSelfClosingElement,
  name: string,
): JsxAttribute | undefined {
  const attr = element.getAttribute(name);
  if (!attr) return undefined;
  return attr.asKind(SyntaxKind.JsxAttribute);
}

/**
 * Escapes a decoded string for safe embedding in a JSX attribute value
 * (double-quoted). Replaces `"` with `&quot;` and `&` with `&amp;`.
 */
function escapeJsxAttributeValue(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/**
 * Escapes a decoded string for safe embedding as JSX text content.
 * Replaces `&`, `<`, and `>` with their HTML entity equivalents.
 */
function escapeJsxText(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Builds the JSX text for a single <ChipSelect.Option> element from one entry
 * of the ToggleRadio options array.
 *
 * @param obj             - The ObjectLiteralExpression for one option
 * @param disabledAttrText - The exact text of the `disabled` attribute initialiser
 *                           to propagate. `null` means no `disabled` prop; `''`
 *                           means bare shorthand (`disabled`); any other string is
 *                           the raw initialiser (e.g. `{false}` or `{isDisabled}`).
 * @param indent          - The leading whitespace to use for the generated line
 * @param tagName         - The local name used for ChipSelect (may be an alias)
 */
function buildChipSelectOption(
  obj: ObjectLiteralExpression,
  disabledAttrText: string | null,
  indent: string,
  tagName: string,
): string | null {
  const value = getObjectPropertyString(obj, "value");
  const text = getObjectPropertyString(obj, "text");

  // If we can't statically determine value or text, we can't safely generate the option
  if (value === undefined || text === undefined) return null;

  const isChecked = getObjectPropertyBoolean(obj, "isChecked");

  const parts: string[] = [`value="${escapeJsxAttributeValue(value)}"`];
  if (isChecked === true) parts.push("defaultChecked");
  if (disabledAttrText !== null) {
    // Bare shorthand: emit `disabled`; otherwise emit `disabled={...}`
    parts.push(disabledAttrText === "" ? "disabled" : `disabled=${disabledAttrText}`);
  }

  const propsStr = parts.length > 0 ? ` ${parts.join(" ")}` : "";
  return `${indent}<${tagName}.Option${propsStr}>${escapeJsxText(text)}</${tagName}.Option>`;
}

/**
 * Attempts to expand the `options` prop on a ToggleRadio element into
 * declarative <ChipSelect.Option> children, replacing the self-closing or
 * opening element with a full <ChipSelect> element.
 *
 * Returns the replacement (or surviving) node on success, or `null` if the
 * element should be handled as dynamic options instead.
 *
 * @param element   - The JSX element to transform
 * @param sourceFile - The source file (used for indentation calculation)
 * @param tagName   - The local name to use for ChipSelect (may be an alias, e.g. 'TR')
 */
function expandOptionsToChildren(
  element: JsxOpeningElement | JsxSelfClosingElement,
  sourceFile: SourceFile,
  tagName: string,
): Node | null {
  const optionsAttr = getAttr(element, "options");
  if (!optionsAttr) {
    // No options prop at all — remove deprecated props and return; the caller
    // will rename the tag. This is unusual but handled gracefully.
    for (const name of ["hasGreyBg", "isFullWidth", "disabled"]) {
      getAttr(element, name)?.remove();
    }
    return element;
  }

  const init = optionsAttr.getInitializer();
  if (!init || init.getKind() !== SyntaxKind.JsxExpression) return null;

  const jsxExpr = init.asKindOrThrow(SyntaxKind.JsxExpression);
  const innerExpr = jsxExpr.getExpression();
  if (!innerExpr || innerExpr.getKind() !== SyntaxKind.ArrayLiteralExpression) return null;

  const arrayLiteral = innerExpr as ArrayLiteralExpression;
  const elements = arrayLiteral.getElements();

  // All elements must be plain object literals with static string value + text
  const options: ObjectLiteralExpression[] = [];
  for (const el of elements) {
    if (el.getKind() !== SyntaxKind.ObjectLiteralExpression) return null;
    options.push(el as ObjectLiteralExpression);
  }

  // Check that each option has statically resolvable value and text
  for (const obj of options) {
    const value = getObjectPropertyString(obj, "value");
    const text = getObjectPropertyString(obj, "text");
    if (value === undefined || text === undefined) return null;
  }

  // Determine the exact disabled attribute text to propagate to each option.
  // - null  → no disabled prop present
  // - ''    → bare shorthand (`disabled`) — emit `disabled` on each option
  // - other → raw initialiser text (e.g. `{false}`, `{isDisabled}`)
  const disabledAttr = getAttr(element, "disabled");
  let disabledAttrText: string | null = null;
  if (disabledAttr) {
    const initializer = disabledAttr.getInitializer();
    if (!initializer) {
      // Bare shorthand: <ToggleRadio disabled …>
      disabledAttrText = "";
    } else if (initializer.getKind() === SyntaxKind.JsxExpression) {
      const jsxInit = initializer as JsxExpression;
      const expr = jsxInit.getExpression();
      if (!expr) {
        // `{}` — treat as not disabled
        disabledAttrText = null;
      } else if (expr.getKind() === SyntaxKind.FalseKeyword) {
        // `{false}` — explicitly not disabled
        disabledAttrText = null;
      } else {
        // `{true}`, `{someExpr}`, etc. — propagate the raw initialiser text
        disabledAttrText = initializer.getText();
      }
    } else {
      // Non-JSX initialiser (e.g. disabled="true") — treat as disabled
      disabledAttrText = "";
    }
  }

  // Compute indentation from the source position of the element
  const fullText = sourceFile.getFullText();
  const elementPos =
    element.getKind() === SyntaxKind.JsxOpeningElement
      ? (element.getParent()?.getPos() ?? element.getPos())
      : element.getPos();

  const textBefore = fullText.slice(0, elementPos);
  const lastNewline = textBefore.lastIndexOf("\n");
  const baseIndent =
    lastNewline === -1 ? "" : (textBefore.slice(lastNewline + 1).match(/^(\s*)/)?.[1] ?? "");
  const childIndent = baseIndent + "  ";

  // Build the children text
  const childLines: string[] = [];
  for (const obj of options) {
    const line = buildChipSelectOption(obj, disabledAttrText, childIndent, tagName);
    if (line === null) return null;
    childLines.push(line);
  }

  // Collect props to keep on <ChipSelect> (everything except options and disabled)
  const propsToKeep: string[] = [];
  for (const attr of element.getAttributes()) {
    const attrNode = attr.asKind(SyntaxKind.JsxAttribute);
    if (!attrNode) {
      // Spread attribute — keep it
      propsToKeep.push(attr.getText());
      continue;
    }
    const attrName = attrNode.getNameNode().getText();
    if (
      attrName === "options" ||
      attrName === "disabled" ||
      attrName === "hasGreyBg" ||
      attrName === "isFullWidth"
    ) {
      continue;
    }
    propsToKeep.push(attrNode.getText());
  }

  const propsStr = propsToKeep.length > 0 ? ` ${propsToKeep.join(" ")}` : "";
  const childrenStr = childLines.join("\n");
  const replacement = `<${tagName}${propsStr}>\n${childrenStr}\n${baseIndent}</${tagName}>`;

  // Replace the node in the AST. For a self-closing element this is the
  // element itself; for an opening element it's the enclosing JsxElement.
  if (element.getKind() === SyntaxKind.JsxSelfClosingElement) {
    return element.replaceWithText(replacement);
  }
  const jsxElement = element.getParent()?.asKind(SyntaxKind.JsxElement);
  return (jsxElement ?? element).replaceWithText(replacement);
}

/**
 * Transforms ToggleRadio imports to ChipSelect and removes legacy styled
 * component imports.
 *
 * Returns the set of local aliases found for ToggleRadio (collected before
 * the imports are mutated).
 */
function transformImports(sourceFile: SourceFile, facadePackage?: string): Set<string> {
  const aliases = getImportAliases(sourceFile, "ToggleRadio", facadePackage, {
    fallbackToName: true,
  });

  // Track whether any ToggleRadioProps import was found (so we can add a
  // ChipSelect import even when ToggleRadio itself is not used in JSX, since
  // ChipSelect.Props requires the ChipSelect identifier to be importable).
  let hasToggleRadioPropsImport = false;

  for (const importDecl of sourceFile.getImportDeclarations().slice()) {
    if (importDecl.wasForgotten()) continue;

    const specifier = importDecl.getModuleSpecifierValue();
    if (!isElementsImport(specifier, facadePackage)) continue;

    const targetSpecifier = resolveTargetSpecifier(specifier, CHIP_SELECT_SPECIFIER, facadePackage);

    // Skip declarations that are already at the ChipSelect target path
    if (!facadePackage && specifier === CHIP_SELECT_SPECIFIER) continue;

    const importsToRemoveFromDecl: ReturnType<typeof importDecl.getNamedImports> = [];
    const chipSelectImportsToAdd: Array<{ name: string; alias?: string; isTypeOnly: boolean }> = [];

    for (const namedImport of importDecl.getNamedImports()) {
      const name = namedImport.getName();

      if (name === "ToggleRadio") {
        const alias = namedImport.getAliasNode()?.getText();
        chipSelectImportsToAdd.push({
          name: "ChipSelect",
          alias,
          isTypeOnly: namedImport.isTypeOnly(),
        });
        importsToRemoveFromDecl.push(namedImport);
        continue;
      }

      if (name === "ToggleRadioProps") {
        // The type reference is rewritten separately; the import is removed.
        // We still need ChipSelect in scope for ChipSelect.Props to resolve.
        hasToggleRadioPropsImport = true;
        importsToRemoveFromDecl.push(namedImport);
        continue;
      }

      if (IMPORTS_TO_REMOVE.has(name)) {
        importsToRemoveFromDecl.push(namedImport);
        continue;
      }
    }

    for (const namedImport of importsToRemoveFromDecl) {
      namedImport.remove();
    }

    // Clean up now-empty declarations
    if (
      importDecl.getNamedImports().length === 0 &&
      !importDecl.getDefaultImport() &&
      !importDecl.getNamespaceImport()
    ) {
      importDecl.remove();
    }

    if (chipSelectImportsToAdd.length > 0) {
      addImportsToTarget(sourceFile, chipSelectImportsToAdd, targetSpecifier, {
        promoteDeclarationTypeOnly: true,
      });
    }
  }

  // If only ToggleRadioProps was imported (no ToggleRadio JSX), still add
  // ChipSelect so the rewritten ChipSelect.Props type reference resolves.
  if (hasToggleRadioPropsImport && aliases.size === 0) {
    const targetSpecifier = facadePackage ?? CHIP_SELECT_SPECIFIER;
    addImportsToTarget(sourceFile, [{ name: "ChipSelect", isTypeOnly: false }], targetSpecifier, {
      promoteDeclarationTypeOnly: true,
    });
  }

  return aliases;
}

/**
 * Produces a structurally valid `<ChipSelect>…</ChipSelect>` replacement for a
 * ToggleRadio element whose `options` could not be expanded to static children
 * (either because it is dynamic — a variable, call, etc. — or because the
 * inline array contains spread or computed entries).
 *
 * Removes `options`, `hasGreyBg`, `isFullWidth`, and `disabled` from the
 * element; preserves all other attributes; inserts an inline JSX TODO child.
 *
 * Returns the replacement node.
 */
function replaceWithDynamicOptionsPlaceholder(
  element: JsxOpeningElement | JsxSelfClosingElement,
  outputTagName: string,
): Node {
  const attrsToKeep: string[] = [];
  for (const attr of element.getAttributes()) {
    const attrNode = attr.asKind(SyntaxKind.JsxAttribute);
    if (!attrNode) {
      attrsToKeep.push(attr.getText());
      continue;
    }
    const attrName = attrNode.getNameNode().getText();
    if (
      attrName === "options" ||
      attrName === "hasGreyBg" ||
      attrName === "isFullWidth" ||
      attrName === "disabled"
    ) {
      continue;
    }
    attrsToKeep.push(attrNode.getText());
  }

  // Preserve disabled on the container so the developer can make an informed
  // decision about how to propagate it to the dynamic children.
  const dynDisabledAttr = getAttr(element, "disabled");
  if (dynDisabledAttr) {
    attrsToKeep.push(dynDisabledAttr.getText());
  }

  const propsStr = attrsToKeep.length > 0 ? ` ${attrsToKeep.join(" ")}` : "";
  const todoChild = `{/* TODO (DS-78): convert dynamic \`options\` prop to <${outputTagName}.Option> children */}`;
  const replacement = `<${outputTagName}${propsStr}>${todoChild}</${outputTagName}>`;

  if (element.getKind() === SyntaxKind.JsxSelfClosingElement) {
    return element.replaceWithText(replacement);
  }
  const jsxElement = element.getParent()?.asKind(SyntaxKind.JsxElement);
  return (jsxElement ?? element).replaceWithText(replacement);
}

/**
 * Transforms all ToggleRadio JSX elements in the source file:
 * - Expands inline `options` arrays into <ChipSelect.Option> children
 * - Renames the tag to ChipSelect
 * - Removes hasGreyBg and isFullWidth props (with TODO if present)
 * - Inserts TODO comments for dynamic options
 */
function transformJsxElements(
  sourceFile: SourceFile,
  aliases: Set<string>,
): { todoNodes: Node[]; todoNodesRemovedProps: Node[]; todoNodesOptionType: Node[] } {
  const todoNodes: Node[] = [];
  const todoNodesRemovedProps: Node[] = [];
  const todoNodesOptionType: Node[] = [];

  // We collect elements first, then process them. Processing may replace nodes,
  // so we iterate a snapshot.
  const allOpeningElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement);
  const allSelfClosing = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement);

  const elements: Array<JsxOpeningElement | JsxSelfClosingElement> = [
    ...allOpeningElements,
    ...allSelfClosing,
  ].filter((el) => aliases.has(el.getTagNameNode().getText()));

  for (const element of elements) {
    if (element.wasForgotten()) continue;

    const tagNameText = element.getTagNameNode().getText();

    // The output tag name: preserve the alias if one was used, otherwise use ChipSelect
    const outputTagName = tagNameText === "ToggleRadio" ? "ChipSelect" : tagNameText;

    // Determine whether removed props are present (for TODO comment)
    const hasRemovedProps =
      getAttr(element, "hasGreyBg") !== undefined || getAttr(element, "isFullWidth") !== undefined;

    // Attempt to expand inline options into children
    const optionsAttr = getAttr(element, "options");
    const hasOptions = optionsAttr !== undefined;

    // Check if options is dynamic (non-inline) before we potentially replace the node
    let isDynamicOptions = false;
    if (hasOptions) {
      const init = optionsAttr!.getInitializer();
      if (!init || init.getKind() !== SyntaxKind.JsxExpression) {
        isDynamicOptions = true;
      } else {
        const jsxExpr = init.asKind(SyntaxKind.JsxExpression);
        const innerExpr = jsxExpr?.getExpression();
        if (!innerExpr || innerExpr.getKind() !== SyntaxKind.ArrayLiteralExpression) {
          isDynamicOptions = true;
        }
      }
    }

    if (isDynamicOptions) {
      // For dynamic options (variable, call expression, etc.) we produce a
      // structurally valid <ChipSelect> with an inline TODO child.
      const replacedNode = replaceWithDynamicOptionsPlaceholder(element, outputTagName);
      todoNodes.push(replacedNode);
      if (hasRemovedProps) todoNodesRemovedProps.push(replacedNode);
      continue;
    }

    if (hasRemovedProps) todoNodesRemovedProps.push(element);

    // Expand inline options (this replaces the node in the AST).
    // Returns the replacement/surviving node on success, or null if the
    // options could not be statically expanded.
    const expandedNode = expandOptionsToChildren(element, sourceFile, outputTagName);

    if (expandedNode === null) {
      // Couldn't expand (partially-static array — spread or computed entries).
      // Apply the same fallback as the dynamic-options path: produce a
      // structurally valid <ChipSelect> with an inline TODO child.
      if (!element.wasForgotten()) {
        const replacedNode = replaceWithDynamicOptionsPlaceholder(element, outputTagName);
        todoNodes.push(replacedNode);
        // hasRemovedProps already tracked above; update the reference to the
        // replacement node so the comment is inserted at the right position.
        if (hasRemovedProps) {
          const idx = todoNodesRemovedProps.indexOf(element);
          if (idx !== -1) todoNodesRemovedProps[idx] = replacedNode;
        }
      }
    } else {
      // Successfully expanded. When no `options` prop was present (unusual),
      // expandOptionsToChildren returns the original element (still live) and we
      // must rename it here. When options were expanded, the node was replaced
      // and `element.wasForgotten()` is true.
      if (!element.wasForgotten()) {
        if (element.getTagNameNode().getText() === tagNameText) {
          element.getTagNameNode().replaceWithText(outputTagName);
          syncClosingTag(element, tagNameText, outputTagName);
        }
      }

      // Update todoNodesRemovedProps to point at the actual surviving node
      // (the replacement, not the forgotten original) so that the TODO comment
      // can be inserted at the correct position.
      if (hasRemovedProps) {
        const idx = todoNodesRemovedProps.indexOf(element);
        if (idx !== -1) todoNodesRemovedProps[idx] = expandedNode;
      }
    }
  }

  return { todoNodes, todoNodesRemovedProps, todoNodesOptionType };
}

export default function transform(
  source: string,
  filePath: string = "file.tsx",
  options?: { facadePackage?: string },
): string {
  if (!source.includes("ToggleRadio")) {
    return source;
  }

  const facadePackage = options?.facadePackage;
  const sourceFile = createProjectFromSource(source, filePath);

  // Phase 1: Transform imports (collect aliases first — imports are mutated after)
  const aliases = transformImports(sourceFile, facadePackage);

  // Phase 2: Rewrite ToggleRadioProps type references → ChipSelect.Props
  transformTypeReferences(sourceFile, new Set(["ToggleRadioProps"]), "ChipSelect.Props");

  // Phase 3: Check for ToggleRadioOption type usage — insert TODO if found
  // (the import is already removed in Phase 1; we check remaining references)
  const hasToggleRadioOptionRef = sourceFile.getFullText().includes("ToggleRadioOption");

  // Phase 4: Transform JSX elements
  const { todoNodes, todoNodesRemovedProps } = transformJsxElements(sourceFile, aliases);

  // Phase 5: Insert TODO comments

  // Dynamic options TODO
  if (todoNodes.length > 0) {
    const positions = collectStatementCommentPositions(sourceFile, todoNodes);
    insertLineComments(sourceFile, positions, TODO_COMMENT_DYNAMIC_OPTIONS);
  }

  // Removed props TODO (hasGreyBg / isFullWidth)
  if (todoNodesRemovedProps.length > 0) {
    const positions = collectStatementCommentPositions(
      sourceFile,
      todoNodesRemovedProps.filter((n) => !n.wasForgotten()),
    );
    if (positions.size > 0) {
      insertLineComments(sourceFile, positions, TODO_COMMENT_REMOVED_PROPS);
    }
  }

  // ToggleRadioOption type reference TODO — insert at top of file if needed
  if (hasToggleRadioOptionRef) {
    // Find any statement that references ToggleRadioOption and annotate it
    const typeRefNodes: Node[] = [];
    sourceFile.getDescendantsOfKind(SyntaxKind.Identifier).forEach((id) => {
      if (id.getText() === "ToggleRadioOption") {
        typeRefNodes.push(id);
      }
    });
    if (typeRefNodes.length > 0) {
      const positions = collectStatementCommentPositions(sourceFile, typeRefNodes);
      insertLineComments(sourceFile, positions, TODO_COMMENT_TOGGLE_RADIO_OPTION_TYPE);
    }
  }

  return sourceFile.getFullText();
}
