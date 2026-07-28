import {
  JsxAttribute,
  JsxExpression,
  JsxOpeningElement,
  JsxSelfClosingElement,
  StringLiteral,
  SyntaxKind,
} from "ts-morph";

/**
 * Renames a JSX attribute's name node to `newName`.
 *
 * @param attr - The JSX attribute to rename.
 * @param newName - The replacement attribute name.
 */
export function renameProp(attr: JsxAttribute, newName: string): void {
  attr.getNameNode().replaceWithText(newName);
}

/**
 * Removes a JSX attribute from its parent element.
 *
 * @param attr - The JSX attribute to remove.
 */
export function removeProp(attr: JsxAttribute): void {
  attr.remove();
}

/**
 * Adds a named attribute to a JSX opening or self-closing element.
 *
 * If `initializer` is provided it is written as the attribute's initializer
 * (e.g. `'={value}'` or `'="value"'`). Pass the raw initializer string
 * exactly as it should appear in the source.
 *
 * @param element - The JSX element to receive the new attribute.
 * @param name - The attribute name to add.
 * @param initializer - An optional raw initializer string.
 */
export function addProp(
  element: JsxOpeningElement | JsxSelfClosingElement,
  name: string,
  initializer?: string,
): void {
  element.addAttribute({ name, initializer });
}

/**
 * Extracts the static string value from a JSX attribute's initializer.
 *
 * Handles two forms:
 * - A bare string literal: `prop="value"`
 * - A JSX expression wrapping a string literal: `prop={"value"}`
 *
 * Returns `undefined` for dynamic expressions, boolean shorthand attributes,
 * or absent initializers.
 *
 * @param attr - The JSX attribute to inspect.
 */
export function getPropStringValue(attr: JsxAttribute): string | undefined {
  const init = attr.getInitializer();
  if (!init) return undefined;

  const kind = init.getKind();

  if (kind === SyntaxKind.StringLiteral) {
    return (init as StringLiteral).getLiteralText();
  }

  if (kind === SyntaxKind.JsxExpression) {
    const expr = (init as JsxExpression).getExpression();
    if (expr?.getKind() === SyntaxKind.StringLiteral) {
      return (expr as StringLiteral).getLiteralText();
    }
  }

  return undefined;
}

/**
 * Applies prop renames and removals to all JSX attributes on an element.
 *
 * Iterates every attribute on `element`. Spread attributes are skipped.
 * For each `JsxAttribute`:
 * - If its name is a key in `propRenames`, the attribute is renamed to the
 *   mapped value.
 * - If its name is present in `propsToRemove`, the attribute is removed.
 *
 * @param element - The JSX opening or self-closing element to transform.
 * @param propRenames - A map of old attribute names to new attribute names.
 * @param propsToRemove - A set of attribute names to delete.
 */
export function applyPropTransforms(
  element: JsxOpeningElement | JsxSelfClosingElement,
  propRenames: Record<string, string>,
  propsToRemove: Set<string>,
): void {
  for (const attr of element.getAttributes().slice()) {
    if (attr.getKind() !== SyntaxKind.JsxAttribute) continue;
    const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute);
    const name = jsxAttr.getNameNode().getText();
    if (name in propRenames) {
      renameProp(jsxAttr, propRenames[name]);
    } else if (propsToRemove.has(name)) {
      removeProp(jsxAttr);
    }
  }
}
