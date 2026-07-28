import { SyntaxKind } from "ts-morph";
import type { JsxOpeningElement, JsxSelfClosingElement } from "ts-morph";

import { createComponentMigration } from "../shared/migration-engine.js";
import { addProp } from "../shared/props.js";

/**
 * Codemod to upgrade the deprecated Toggle component to the new Switch component.
 *
 * This codemod transforms imports and usage of the checkbox-style Toggle component
 * to use the new Switch component from @reapit/elements/core/switch. It handles:
 *
 * Import Transformations:
 * - Toggle → Switch (from @reapit/elements/core/switch)
 * - ToggleProps → removed (type references rewritten to Switch.Props)
 * - ElToggleItem, ElToggleCheckbox, ElToggleLabel → removed
 * - elToggleFullWidth, elHasGreyBg → removed
 * - handleKeyboardToggleChange → removed (import only; call sites remain)
 * - ToggleWrapped → removed
 *
 * Type Transformations:
 * - ToggleProps → Switch.Props
 *
 * JSX Element Transformations:
 * - <Toggle>...</Toggle> → <Switch label="extractedText" />
 * - Text from the first ElToggleItem child becomes the label prop
 * - Self-closing <Toggle /> → <Switch aria-label="TODO: add accessible label" />
 * - Empty ElToggleItem children → <Switch aria-label="TODO: add accessible label" />
 * - isFullWidth and hasGreyBg props are removed
 *
 * ToggleRadio is not migrated by this codemod (see replace-deprecated-toggle-radio).
 */

const TODO_LABEL = "TODO: add accessible label";

/**
 * Returns true if the element already has an `aria-label` or `label` prop.
 */
function hasAriaLabelOrLabel(element: JsxOpeningElement | JsxSelfClosingElement): boolean {
  return (
    element.getAttribute("aria-label") !== undefined || element.getAttribute("label") !== undefined
  );
}

/**
 * Escapes raw text (e.g. from a `JsxText` node) for safe embedding in a
 * double-quoted JSX attribute value. Assumes the input is unescaped — do not
 * pass already entity-encoded strings or `&` will be double-encoded.
 * Replaces `&` with `&amp;` and `"` with `&quot;` in a single pass.
 */
function escapeJsxAttributeValue(s: string): string {
  return s.replace(/[&"]/g, (ch) => (ch === "&" ? "&amp;" : "&quot;"));
}

/**
 * Returns true if the tag name matches ElToggleItem or any alias ending with
 * 'ToggleItem'.
 */
function isToggleItemTag(tagName: string): boolean {
  return tagName === "ElToggleItem" || tagName.endsWith("ToggleItem");
}

/**
 * Extracts the label content from the first ElToggleItem child found in the
 * given children array.
 *
 * Returns:
 * - `{ kind: 'static', value: string }` for a single text node
 * - `{ kind: 'expression', value: string }` for a single JSX expression or
 *   complex inner JSX wrapped in a fragment
 * - `undefined` if no ElToggleItem is found or it has no meaningful content
 */
function extractFirstToggleItemText(
  children: ReturnType<import("ts-morph").JsxElement["getJsxChildren"]>,
): { kind: "static" | "expression"; value: string } | undefined {
  for (const child of children) {
    // Match <ElToggleItem>...</ElToggleItem>
    if (child.getKind() === SyntaxKind.JsxElement) {
      const jsxElement = child.asKindOrThrow(SyntaxKind.JsxElement);
      const tagName = jsxElement.getOpeningElement().getTagNameNode().getText();
      if (!isToggleItemTag(tagName)) continue;

      const innerChildren = jsxElement.getJsxChildren();
      const meaningful = innerChildren.filter((c) => {
        if (c.getKind() === SyntaxKind.JsxText) {
          return c.getText().trim().length > 0;
        }
        return true;
      });

      if (meaningful.length === 0) return undefined;

      if (meaningful.length === 1) {
        const only = meaningful[0];
        if (only.getKind() === SyntaxKind.JsxText) {
          return { kind: "static", value: only.getText().trim() };
        }
        if (only.getKind() === SyntaxKind.JsxExpression) {
          const expr = only.asKindOrThrow(SyntaxKind.JsxExpression).getExpression();
          if (expr) {
            return { kind: "expression", value: expr.getText() };
          }
          return undefined;
        }
      }

      // Complex inner JSX — wrap in a fragment
      const innerText = innerChildren.map((c) => c.getText()).join("");
      return { kind: "expression", value: `<>${innerText.trim()}</>` };
    }

    // Match <ElToggleItem /> (self-closing — no content)
    if (child.getKind() === SyntaxKind.JsxSelfClosingElement) {
      const selfClosing = child.asKindOrThrow(SyntaxKind.JsxSelfClosingElement);
      const tagName = selfClosing.getTagNameNode().getText();
      if (!isToggleItemTag(tagName)) continue;
      return undefined;
    }
  }

  return undefined;
}

/**
 * Builds the attribute string for the replacement self-closing Switch element.
 */
function buildAttrsString(
  existingAttrs: string,
  labelText: { kind: "static" | "expression"; value: string } | undefined,
  hasExistingLabel: boolean,
): string {
  const parts: string[] = [];
  if (existingAttrs) parts.push(existingAttrs);

  // Only add a label or aria-label when there is no existing label or aria-label.
  if (!hasExistingLabel) {
    if (labelText) {
      if (labelText.kind === "static") {
        parts.push(`label="${escapeJsxAttributeValue(labelText.value)}"`);
      } else {
        parts.push(`label={${labelText.value}}`);
      }
    } else {
      parts.push(`aria-label="${TODO_LABEL}"`);
    }
  }

  return parts.join(" ");
}

export default createComponentMigration({
  quickRejectStrings: ["Toggle"],
  identifiers: [
    {
      from: "Toggle",
      to: "Switch",
      targetSpecifier: "@reapit/elements/core/switch",
    },
  ],
  props: [
    {
      from: "ToggleProps",
      to: "Switch.Props",
      targetSpecifier: "@reapit/elements/core/switch",
    },
  ],
  importsToRemove: [
    "ElToggleItem",
    "ElToggleCheckbox",
    "ElToggleLabel",
    "elToggleFullWidth",
    "elHasGreyBg",
    "handleKeyboardToggleChange",
    "ToggleWrapped",
  ],
  alwaysRewriteMatchingImports: true,
  propsToRemove: new Set(["isFullWidth", "hasGreyBg"]),

  customJsxTransform(element: JsxOpeningElement | JsxSelfClosingElement): void {
    // --- Self-closing element: <Switch /> ---
    if (element.getKind() === SyntaxKind.JsxSelfClosingElement) {
      if (!hasAriaLabelOrLabel(element)) {
        addProp(element, "aria-label", `"${TODO_LABEL}"`);
      }
      return;
    }

    // --- Opening element: <Switch>...</Switch> ---
    const parent = element.getParent();
    if (!parent || parent.getKind() !== SyntaxKind.JsxElement) return;
    const jsxElement = parent.asKindOrThrow(SyntaxKind.JsxElement);

    const children = jsxElement.getJsxChildren();
    const labelText = extractFirstToggleItemText(children);
    const existingLabel = hasAriaLabelOrLabel(element);

    // Collect existing attributes as a string (the engine has already renamed
    // the tag to Switch and removed isFullWidth / hasGreyBg).
    const attrs = element
      .getAttributes()
      .map((a) => a.getText())
      .join(" ");

    const attrsString = buildAttrsString(attrs, labelText, existingLabel);
    const tagName = element.getTagNameNode().getText();
    const replacement = attrsString ? `<${tagName} ${attrsString} />` : `<${tagName} />`;

    jsxElement.replaceWithText(replacement);
  },
});
