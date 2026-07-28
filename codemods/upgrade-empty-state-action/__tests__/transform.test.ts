import { describe, test, expect } from "vitest";

import transform from "../transform";

describe("no-op", () => {
  test("returns source unchanged when no deprecated symbols are present", () => {
    const input = `import { EmptyState } from '@reapit/elements'\n<EmptyState><EmptyState.Description>None found</EmptyState.Description></EmptyState>`;
    expect(transform(input, "file.tsx")).toBe(input);
  });

  test("returns source unchanged for empty string", () => {
    expect(transform("", "file.tsx")).toBe("");
  });

  test("does not rewrite re-export declarations", () => {
    const input = `export { EmptyStateAction } from '@reapit/elements'`;
    expect(transform(input, "file.tsx")).toBe(input);
  });
});

describe("EmptyStateAction (direct import)", () => {
  test("rewrites the import and JSX tag, adding default props", () => {
    const input = [
      `import { EmptyStateAction } from '@reapit/elements'`,
      `<EmptyStateAction href="/items">Add item</EmptyStateAction>`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain(`import { AnchorButton } from '@reapit/elements/core/button'`);
    expect(output).toContain(
      '<AnchorButton href="/items" size="medium" variant="tertiary" useLinkStyle>',
    );
    expect(output).toContain("</AnchorButton>");
    expect(output).not.toContain("EmptyStateAction");
  });

  test("rewrites self-closing JSX tags", () => {
    const input = [
      `import { EmptyStateAction } from '@reapit/elements'`,
      `<EmptyStateAction href="/items" />`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain(
      '<AnchorButton href="/items" size="medium" variant="tertiary" useLinkStyle />',
    );
  });

  test("preserves the import alias and adds default props to the aliased tag", () => {
    const input = [
      `import { EmptyStateAction as Alias } from '@reapit/elements'`,
      `<Alias href="/items" />`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain(
      `import { AnchorButton as Alias } from '@reapit/elements/core/button'`,
    );
    expect(output).toContain(
      '<Alias href="/items" size="medium" variant="tertiary" useLinkStyle />',
    );
    expect(output).not.toMatch(/\{\s*EmptyStateAction\s*(as|,|\})/);
  });

  test("preserves unrelated imports and cleans up the empty declaration", () => {
    const input = [
      `import { EmptyStateAction, Input } from '@reapit/elements'`,
      `<EmptyStateAction href="/items" />`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain(`import { Input } from '@reapit/elements'`);
    expect(output).toContain(`import { AnchorButton } from '@reapit/elements/core/button'`);
    expect(output).not.toMatch(/import\s*\{\s*\}\s*from\s*'@reapit\/elements'/);
  });

  test("merges into an existing @reapit/elements/core/button import", () => {
    const input = [
      `import { Button } from '@reapit/elements/core/button'`,
      `import { EmptyStateAction } from '@reapit/elements'`,
      `<EmptyStateAction href="/items" />`,
      `<Button onClick={handleClick}>Existing</Button>`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    const matches = output.match(/from '@reapit\/elements\/core\/button'/g);
    expect(matches).toHaveLength(1);
    expect(output).toContain(`import { Button, AnchorButton } from '@reapit/elements/core/button'`);
  });

  test("supports a facade package", () => {
    const input = [
      `import { EmptyStateAction } from '@company/ui'`,
      `<EmptyStateAction href="/items" />`,
    ].join("\n");
    const output = transform(input, "file.tsx", { facadePackage: "@company/ui" });
    expect(output).toContain(`import { AnchorButton } from '@company/ui'`);
    expect(output).not.toContain("@reapit/elements/core/button");
  });
});

describe("EmptyStateActionButton (direct import)", () => {
  test("rewrites the import and JSX tag, adding default props", () => {
    const input = [
      `import { EmptyStateActionButton } from '@reapit/elements'`,
      `<EmptyStateActionButton onClick={handleClick}>Retry</EmptyStateActionButton>`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`);
    expect(output).toContain(
      '<Button onClick={handleClick} size="medium" variant="tertiary" useLinkStyle>',
    );
    expect(output).toContain("</Button>");
    expect(output).not.toContain("EmptyStateActionButton");
  });
});

describe("EmptyState.Action (namespaced JSX)", () => {
  test("migrates a self-closing element and adds default props", () => {
    const input = [
      `import { EmptyState } from '@reapit/elements'`,
      `<EmptyState>`,
      `  <EmptyState.Action href="/items" />`,
      `</EmptyState>`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain(`import { AnchorButton } from '@reapit/elements/core/button'`);
    expect(output).toContain(
      '<AnchorButton href="/items" size="medium" variant="tertiary" useLinkStyle />',
    );
    expect(output).not.toContain("EmptyState.Action");
    // The EmptyState wrapper import/usage must be preserved.
    expect(output).toContain(`import { EmptyState } from '@reapit/elements'`);
    expect(output).toContain("<EmptyState>");
  });

  test("migrates an element with children and syncs the closing tag", () => {
    const input = [
      `import { EmptyState } from '@reapit/elements'`,
      `<EmptyState.Action href="/items">Add item</EmptyState.Action>`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain(
      '<AnchorButton href="/items" size="medium" variant="tertiary" useLinkStyle>',
    );
    expect(output).toContain("</AnchorButton>");
    expect(output).not.toContain("EmptyState.Action");
  });

  test("preserves arbitrary passthrough props, including icons and data attributes", () => {
    const input = [
      `import { EmptyState } from '@reapit/elements'`,
      `<EmptyState.Action href="/items" iconLeft={<PlusIcon />} data-testid="empty-state-action">Add item</EmptyState.Action>`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain("iconLeft={<PlusIcon />}");
    expect(output).toContain('data-testid="empty-state-action"');
    expect(output).toContain('size="medium" variant="tertiary" useLinkStyle');
  });

  test("replaces a pre-existing size/variant/useLinkStyle attribute instead of duplicating it", () => {
    const input = [
      `import { EmptyState } from '@reapit/elements'`,
      `<EmptyState.Action href="/items" size="large" variant="primary" useLinkStyle={false}>Add item</EmptyState.Action>`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain(
      '<AnchorButton href="/items" size="medium" variant="tertiary" useLinkStyle>',
    );
    expect(output).not.toContain('size="large"');
    expect(output).not.toContain('variant="primary"');
    expect(output).not.toContain("useLinkStyle={false}");
  });
});

describe("EmptyState.ActionButton (namespaced JSX)", () => {
  test("migrates a self-closing element and adds default props", () => {
    const input = [
      `import { EmptyState } from '@reapit/elements'`,
      `<EmptyState.ActionButton onClick={handleClick} />`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`);
    expect(output).toContain(
      '<Button onClick={handleClick} size="medium" variant="tertiary" useLinkStyle />',
    );
    expect(output).not.toContain("EmptyState.ActionButton");
  });
});

describe("both EmptyState.Action and EmptyState.ActionButton in one file", () => {
  test("imports both AnchorButton and Button into a single declaration", () => {
    const input = [
      `import { EmptyState } from '@reapit/elements'`,
      `<EmptyState>`,
      `  <EmptyState.Action href="/items" />`,
      `  <EmptyState.ActionButton onClick={handleClick} />`,
      `</EmptyState>`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain(`import { AnchorButton, Button } from '@reapit/elements/core/button'`);
  });

  test("merges into an existing @reapit/elements/core/button import", () => {
    const input = [
      `import { Button } from '@reapit/elements/core/button'`,
      `import { EmptyState } from '@reapit/elements'`,
      `<EmptyState.Action href="/items" />`,
      `<Button onClick={handleClick}>Existing</Button>`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    const matches = output.match(/from '@reapit\/elements\/core\/button'/g);
    expect(matches).toHaveLength(1);
    expect(output).toContain(`import { Button, AnchorButton } from '@reapit/elements/core/button'`);
  });
});

describe("facade package support", () => {
  test("adds the AnchorButton import to the facade package for namespaced JSX", () => {
    const input = [
      `import { EmptyState } from '@company/ui'`,
      `<EmptyState.Action href="/items" />`,
    ].join("\n");
    const output = transform(input, "file.tsx", { facadePackage: "@company/ui" });
    expect(output).toContain(`import { EmptyState, AnchorButton } from '@company/ui'`);
    expect(output).not.toContain("@reapit/elements/core/button");
  });

  test("preserves a facade subpath specifier for namespaced JSX", () => {
    const input = [
      `import { EmptyState } from '@company/ui/core'`,
      `<EmptyState.Action href="/items" />`,
    ].join("\n");
    const output = transform(input, "file.tsx", { facadePackage: "@company/ui" });
    expect(output).toContain(`import { EmptyState, AnchorButton } from '@company/ui/core'`);
    expect(output).not.toContain("@reapit/elements/core/button");
    expect(output).not.toMatch(/from '@company\/ui'/);
  });
});

describe("type-only import promotion (namespaced JSX)", () => {
  test("promotes a pre-existing type-only target import to a value import", () => {
    const input = [
      `import type { Button } from '@reapit/elements/core/button'`,
      `import { EmptyState } from '@reapit/elements'`,
      `<EmptyState.ActionButton onClick={handleClick} />`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`);
    expect(output).not.toContain("import type");
  });
});
