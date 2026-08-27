import { Project, QuoteKind, SyntaxKind } from "ts-morph";
import { describe, test, expect } from "vitest";

import { getImportAliases } from "../aliases.js";
import {
  getNearestStatement,
  collectStatementCommentPositions,
  insertLineComments,
} from "../comments.js";
import { hasIdentifierUsage } from "../identifiers.js";
import { resolveTargetSpecifier, addImportsToTarget } from "../imports.js";
import { getJsxElements, hasJsxUsage, syncClosingTag } from "../jsx.js";
import { createProjectFromSource } from "../project.js";
import {
  renameProp,
  removeProp,
  addProp,
  getPropStringValue,
  applyPropTransforms,
} from "../props.js";
import { getReExportedLocalNames } from "../re-exports.js";
import { transformTypeReferences } from "../types.js";

function createSourceFile(source: string, filePath = "file.tsx") {
  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: { jsx: 2 },
    manipulationSettings: { quoteKind: QuoteKind.Single },
  });
  return project.createSourceFile(filePath, source);
}

// ----------------------------------------------------------------------------
// createProjectFromSource
// ----------------------------------------------------------------------------

describe("createProjectFromSource", () => {
  test("returns a SourceFile with the correct text", () => {
    const source = `import { Button } from '@reapit/elements'`;
    const sf = createProjectFromSource(source, "file.tsx");
    expect(sf.getFullText()).toContain(source);
  });

  test("uses the provided filePath", () => {
    const sf = createProjectFromSource("const x = 1", "custom/path.tsx");
    expect(sf.getFilePath()).toContain("custom/path.tsx");
  });
});

// ----------------------------------------------------------------------------
// getImportAliases
// ----------------------------------------------------------------------------

describe("getImportAliases", () => {
  test("returns the original name when no alias is used", () => {
    const sf = createSourceFile(`import { Button } from '@reapit/elements'`);
    const aliases = getImportAliases(sf, "Button");
    expect(aliases).toEqual(new Set(["Button"]));
  });

  test("returns the alias when an alias is present", () => {
    const sf = createSourceFile(`import { Button as Btn } from '@reapit/elements'`);
    const aliases = getImportAliases(sf, "Button");
    expect(aliases).toEqual(new Set(["Btn"]));
  });

  test("returns an empty Set when the import is not found", () => {
    const sf = createSourceFile(`import { Input } from '@reapit/elements'`);
    const aliases = getImportAliases(sf, "Button");
    expect(aliases.size).toBe(0);
  });

  test("falls back to name when fallbackToName is true and the file has no imports", () => {
    const sf = createSourceFile(`const x = Button`);
    const aliases = getImportAliases(sf, "Button", undefined, { fallbackToName: true });
    expect(aliases).toEqual(new Set(["Button"]));
  });

  test("does not fall back when the file has imports but the target is not among them", () => {
    const sf = createSourceFile(`import { Input } from '@reapit/elements'`);
    const aliases = getImportAliases(sf, "Button", undefined, { fallbackToName: true });
    expect(aliases.size).toBe(0);
  });

  test("matches imports from a facade package", () => {
    const sf = createSourceFile(`import { Button } from '@company/ui'`);
    const aliases = getImportAliases(sf, "Button", "@company/ui");
    expect(aliases).toEqual(new Set(["Button"]));
  });

  test("ignores imports from unrelated packages", () => {
    const sf = createSourceFile(`import { Button } from 'some-other-lib'`);
    const aliases = getImportAliases(sf, "Button");
    expect(aliases.size).toBe(0);
  });
});

// ----------------------------------------------------------------------------
// resolveTargetSpecifier
// ----------------------------------------------------------------------------

describe("resolveTargetSpecifier", () => {
  test("returns targetSpecifier when no facadePackage is provided", () => {
    const result = resolveTargetSpecifier("@reapit/elements", "@reapit/elements/core/button");
    expect(result).toBe("@reapit/elements/core/button");
  });

  test("returns the sourceSpecifier when it matches the facadePackage exactly", () => {
    const result = resolveTargetSpecifier(
      "@company/ui",
      "@reapit/elements/core/button",
      "@company/ui",
    );
    expect(result).toBe("@company/ui");
  });

  test("returns targetSpecifier when facadePackage does not match", () => {
    const result = resolveTargetSpecifier(
      "@reapit/elements",
      "@reapit/elements/core/button",
      "@company/ui",
    );
    expect(result).toBe("@reapit/elements/core/button");
  });

  test("returns sourceSpecifier for a subpath facade import", () => {
    const result = resolveTargetSpecifier(
      "@company/ui/core",
      "@reapit/elements/core/button",
      "@company/ui",
    );
    expect(result).toBe("@company/ui/core");
  });
});

// ----------------------------------------------------------------------------
// addImportsToTarget
// ----------------------------------------------------------------------------

describe("addImportsToTarget", () => {
  test("creates a new import declaration when none exists for the specifier", () => {
    const sf = createSourceFile(`const x = 1`);
    addImportsToTarget(sf, [{ name: "Button", isTypeOnly: false }], "@reapit/elements");
    expect(sf.getFullText()).toContain("import { Button } from '@reapit/elements'");
  });

  test("adds a named import to an existing declaration", () => {
    const sf = createSourceFile(`import { Input } from '@reapit/elements'`);
    addImportsToTarget(sf, [{ name: "Button", isTypeOnly: false }], "@reapit/elements");
    expect(sf.getFullText()).toContain("Button");
    expect(sf.getFullText()).toContain("Input");
  });

  test("does not duplicate an already-present named import", () => {
    const sf = createSourceFile(`import { Button } from '@reapit/elements'`);
    addImportsToTarget(sf, [{ name: "Button", isTypeOnly: false }], "@reapit/elements");
    const text = sf.getFullText();
    const matches = text.match(/Button/g);
    expect(matches).toHaveLength(1);
  });

  test("upgrades a type-only specifier to a value import when isTypeOnly is false", () => {
    const sf = createSourceFile(`import { type Button } from '@reapit/elements'`);
    addImportsToTarget(sf, [{ name: "Button", isTypeOnly: false }], "@reapit/elements");
    // The existing specifier should no longer be type-only
    const namedImports = sf.getImportDeclarations()[0].getNamedImports();
    const btn = namedImports.find((n) => n.getName() === "Button");
    expect(btn?.isTypeOnly()).toBe(false);
  });

  test("adds an aliased import", () => {
    const sf = createSourceFile(`const x = 1`);
    addImportsToTarget(
      sf,
      [{ name: "LabelText", alias: "L", isTypeOnly: false }],
      "@reapit/elements",
    );
    expect(sf.getFullText()).toContain("LabelText as L");
  });

  test("demotes a declaration-level import type when promoteDeclarationTypeOnly is true", () => {
    const sf = createSourceFile(`import type { Button } from '@reapit/elements'`);
    addImportsToTarget(sf, [{ name: "Input", isTypeOnly: false }], "@reapit/elements", {
      promoteDeclarationTypeOnly: true,
    });
    expect(sf.getImportDeclarations()[0].isTypeOnly()).toBe(false);
  });

  test("does nothing when importsToAdd is empty", () => {
    const source = `import { Button } from '@reapit/elements'`;
    const sf = createSourceFile(source);
    addImportsToTarget(sf, [], "@reapit/elements");
    expect(sf.getFullText()).toBe(source);
  });
});

// ----------------------------------------------------------------------------
// getReExportedLocalNames
// ----------------------------------------------------------------------------

describe("getReExportedLocalNames", () => {
  test("returns names from a bare export statement without a from clause", () => {
    const sf = createSourceFile(`export { Pagination }`);
    const names = getReExportedLocalNames(sf);
    expect(names).toEqual(new Set(["Pagination"]));
  });

  test("does not include names from a re-export with a module specifier", () => {
    const sf = createSourceFile(`export { Pagination } from '@reapit/elements'`);
    const names = getReExportedLocalNames(sf);
    expect(names.size).toBe(0);
  });

  test("returns an empty Set when there are no export declarations", () => {
    const sf = createSourceFile(`const x = 1`);
    const names = getReExportedLocalNames(sf);
    expect(names.size).toBe(0);
  });
});

// ----------------------------------------------------------------------------
// hasIdentifierUsage
// ----------------------------------------------------------------------------

describe("hasIdentifierUsage", () => {
  test("returns true for a variable reference", () => {
    const sf = createSourceFile(`const x = Button`);
    expect(hasIdentifierUsage(sf, new Set(["Button"]))).toBe(true);
  });

  test("returns false for an import specifier", () => {
    const sf = createSourceFile(`import { Button } from '@reapit/elements'`);
    expect(hasIdentifierUsage(sf, new Set(["Button"]))).toBe(false);
  });

  test("returns false for a JSX opening tag name", () => {
    const sf = createSourceFile(`import { Button } from '@reapit/elements'\n<Button>ok</Button>`);
    expect(hasIdentifierUsage(sf, new Set(["Button"]))).toBe(false);
  });

  test("returns false for a re-export with a module specifier", () => {
    const sf = createSourceFile(`export { Button } from '@reapit/elements'`);
    expect(hasIdentifierUsage(sf, new Set(["Button"]))).toBe(false);
  });

  test("returns false for a bare export with treatLocalReExportsAsUsage at default (false)", () => {
    const sf = createSourceFile(`export { Button }`);
    expect(hasIdentifierUsage(sf, new Set(["Button"]))).toBe(false);
  });

  test("returns true for a bare export with treatLocalReExportsAsUsage: true", () => {
    const sf = createSourceFile(`export { Button }`);
    expect(hasIdentifierUsage(sf, new Set(["Button"]), { treatLocalReExportsAsUsage: true })).toBe(
      true,
    );
  });

  test("returns false for a re-export with module specifier even when treatLocalReExportsAsUsage: true", () => {
    const sf = createSourceFile(`export { Button } from '@reapit/elements'`);
    expect(hasIdentifierUsage(sf, new Set(["Button"]), { treatLocalReExportsAsUsage: true })).toBe(
      false,
    );
  });
});

// ----------------------------------------------------------------------------
// transformTypeReferences
// ----------------------------------------------------------------------------

describe("transformTypeReferences", () => {
  test("rewrites a TypeReference alias", () => {
    const sf = createSourceFile(`type Props = OldProps`);
    transformTypeReferences(sf, new Set(["OldProps"]), "NewName");
    expect(sf.getFullText()).toContain("type Props = NewName");
    expect(sf.getFullText()).not.toContain("OldProps");
  });

  test("rewrites a heritage clause expression", () => {
    const sf = createSourceFile(`interface Foo extends OldProps {}`);
    transformTypeReferences(sf, new Set(["OldProps"]), "NewName");
    expect(sf.getFullText()).toContain("interface Foo extends NewName {}");
  });

  test("rewrites a generic type argument", () => {
    const sf = createSourceFile(`type Bar = Partial<OldProps>`);
    transformTypeReferences(sf, new Set(["OldProps"]), "NewName");
    expect(sf.getFullText()).toContain("type Bar = Partial<NewName>");
  });

  test("does not rewrite names not in the set", () => {
    const sf = createSourceFile(`type Props = UnrelatedProps`);
    transformTypeReferences(sf, new Set(["OldProps"]), "NewName");
    expect(sf.getFullText()).toContain("UnrelatedProps");
    expect(sf.getFullText()).not.toContain("NewName");
  });
});

// ----------------------------------------------------------------------------
// getJsxElements, hasJsxUsage, syncClosingTag
// ----------------------------------------------------------------------------

describe("getJsxElements", () => {
  test("returns matching opening elements", () => {
    const sf = createSourceFile(`<Button>ok</Button>`);
    const elements = getJsxElements(sf, new Set(["Button"]));
    expect(elements).toHaveLength(1);
    expect(elements[0].getTagNameNode().getText()).toBe("Button");
  });

  test("returns matching self-closing elements", () => {
    const sf = createSourceFile(`<Button />`);
    const elements = getJsxElements(sf, new Set(["Button"]));
    expect(elements).toHaveLength(1);
    expect(elements[0].getTagNameNode().getText()).toBe("Button");
  });

  test("ignores non-matching tag names", () => {
    const sf = createSourceFile(`<Input />`);
    const elements = getJsxElements(sf, new Set(["Button"]));
    expect(elements).toHaveLength(0);
  });
});

describe("hasJsxUsage", () => {
  test("returns true when a matching tag is present", () => {
    const sf = createSourceFile(`<Button>ok</Button>`);
    expect(hasJsxUsage(sf, new Set(["Button"]))).toBe(true);
  });

  test("returns false when no matching tags are present", () => {
    const sf = createSourceFile(`<Input />`);
    expect(hasJsxUsage(sf, new Set(["Button"]))).toBe(false);
  });
});

describe("syncClosingTag", () => {
  test("renames the closing tag when it matches oldName", () => {
    const sf = createSourceFile(`<OldName>text</OldName>`);
    const elements = getJsxElements(sf, new Set(["OldName"]));
    syncClosingTag(elements[0], "OldName", "NewName");
    expect(sf.getFullText()).toContain("</NewName>");
  });

  test("does nothing for self-closing elements", () => {
    const sf = createSourceFile(`<OldName />`);
    const elements = getJsxElements(sf, new Set(["OldName"]));
    syncClosingTag(elements[0], "OldName", "NewName");
    // Source should be unchanged: no closing tag to rename
    expect(sf.getFullText()).toContain("<OldName />");
  });

  test("does not rename closing tag when it does not match oldName", () => {
    const sf = createSourceFile(`<OldName>text</OldName>`);
    const elements = getJsxElements(sf, new Set(["OldName"]));
    syncClosingTag(elements[0], "DifferentName", "NewName");
    // Closing tag should remain unchanged
    expect(sf.getFullText()).toContain("</OldName>");
  });
});

// ----------------------------------------------------------------------------
// getNearestStatement, collectStatementCommentPositions, insertLineComments
// ----------------------------------------------------------------------------

describe("getNearestStatement", () => {
  test("finds the enclosing statement for a nested node", () => {
    const sf = createSourceFile(`const x = Button`);
    // Locate the 'Button' identifier
    const identifiers = sf.getDescendantsOfKind(SyntaxKind.Identifier);
    const button = identifiers.find((id) => id.getText() === "Button");
    expect(button).toBeDefined();
    const stmt = getNearestStatement(button!);
    expect(stmt).toBeDefined();
    expect(stmt!.getText()).toContain("const x = Button");
  });
});

describe("collectStatementCommentPositions", () => {
  test("de-duplicates statements so each statement produces at most one entry", () => {
    const sf = createSourceFile(`const x = Button`);
    // Both 'x' and 'Button' are inside the same variable statement
    const identifiers = sf.getDescendantsOfKind(SyntaxKind.Identifier);
    const positions = collectStatementCommentPositions(sf, identifiers);
    expect(positions.size).toBe(1);
  });
});

describe("insertLineComments", () => {
  test("inserts a line comment before the containing statement", () => {
    const sf = createSourceFile(`const x = 1`);
    const identifiers = sf.getDescendantsOfKind(SyntaxKind.Identifier);
    const positions = collectStatementCommentPositions(sf, identifiers);
    insertLineComments(sf, positions, " TODO: check this");
    expect(sf.getFullText()).toContain("// TODO: check this");
  });
});

// ----------------------------------------------------------------------------
// renameProp, removeProp, addProp, getPropStringValue, applyPropTransforms
// ----------------------------------------------------------------------------

describe("renameProp", () => {
  test("changes the attribute name", () => {
    const sf = createSourceFile(`<Button oldProp="value" />`);
    const elements = getJsxElements(sf, new Set(["Button"]));
    const attr = elements[0].getAttribute("oldProp")!.asKindOrThrow(SyntaxKind.JsxAttribute);
    renameProp(attr, "newProp");
    expect(sf.getFullText()).toContain("newProp");
    expect(sf.getFullText()).not.toContain("oldProp");
  });
});

describe("removeProp", () => {
  test("removes the attribute from the element", () => {
    const sf = createSourceFile(`<Button toRemove="value" other="x" />`);
    const elements = getJsxElements(sf, new Set(["Button"]));
    const attr = elements[0].getAttribute("toRemove")!.asKindOrThrow(SyntaxKind.JsxAttribute);
    removeProp(attr);
    expect(sf.getFullText()).not.toContain("toRemove");
    expect(sf.getFullText()).toContain("other");
  });
});

describe("addProp", () => {
  test("adds an attribute with an initializer", () => {
    const sf = createSourceFile(`<Button />`);
    const elements = getJsxElements(sf, new Set(["Button"]));
    addProp(elements[0], "size", '"medium"');
    expect(sf.getFullText()).toContain('size="medium"');
  });
});

describe("getPropStringValue", () => {
  test("extracts value from a bare string literal prop", () => {
    const sf = createSourceFile(`<Button size="medium" />`);
    const elements = getJsxElements(sf, new Set(["Button"]));
    const attr = elements[0].getAttribute("size")!.asKindOrThrow(SyntaxKind.JsxAttribute);
    expect(getPropStringValue(attr)).toBe("medium");
  });

  test("extracts value from a JSX expression wrapping a string literal", () => {
    const sf = createSourceFile(`<Button size={"medium"} />`);
    const elements = getJsxElements(sf, new Set(["Button"]));
    const attr = elements[0].getAttribute("size")!.asKindOrThrow(SyntaxKind.JsxAttribute);
    expect(getPropStringValue(attr)).toBe("medium");
  });

  test("returns undefined for a dynamic expression", () => {
    const sf = createSourceFile(`<Button size={someVar} />`);
    const elements = getJsxElements(sf, new Set(["Button"]));
    const attr = elements[0].getAttribute("size")!.asKindOrThrow(SyntaxKind.JsxAttribute);
    expect(getPropStringValue(attr)).toBeUndefined();
  });
});

describe("applyPropTransforms", () => {
  test("renames and removes props based on config", () => {
    const sf = createSourceFile(`<Button oldName="x" toRemove="y" kept="z" />`);
    const elements = getJsxElements(sf, new Set(["Button"]));
    applyPropTransforms(elements[0], { oldName: "newName" }, new Set(["toRemove"]));
    expect(sf.getFullText()).toContain("newName");
    expect(sf.getFullText()).not.toContain("oldName");
    expect(sf.getFullText()).not.toContain("toRemove");
    expect(sf.getFullText()).toContain("kept");
  });
});
