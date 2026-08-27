import transform from "../transform";

// Helper to normalize output for comparison (removes leading/trailing whitespace and semicolons)
function normalize(str: string): string {
  return str.trim().replace(/;$/, "");
}

describe("import transformations", () => {
  test("transforms DeprecatedSplitButton import from @reapit/elements", () => {
    const input = `import { DeprecatedSplitButton } from '@reapit/elements'`;
    const output = transform(input);
    expect(normalize(output)).toBe(
      `import { SplitButton } from '@reapit/elements/core/split-button'`,
    );
  });

  test("transforms DeprecatedActionButton import", () => {
    const input = `import { DeprecatedActionButton } from '@reapit/elements'`;
    const output = transform(input);
    expect(normalize(output)).toBe(
      `import { SplitButtonAction } from '@reapit/elements/core/split-button'`,
    );
  });

  test("transforms DeprecatedMenuButton import", () => {
    const input = `import { DeprecatedMenuButton } from '@reapit/elements'`;
    const output = transform(input);
    expect(normalize(output)).toBe(
      `import { SplitButtonMenuButton } from '@reapit/elements/core/split-button'`,
    );
  });

  test("preserves alias on DeprecatedSplitButton", () => {
    const input = `import { DeprecatedSplitButton as MySplitBtn } from '@reapit/elements'`;
    const output = transform(input);
    expect(normalize(output)).toBe(
      `import { SplitButton as MySplitBtn } from '@reapit/elements/core/split-button'`,
    );
  });

  test("handles type-only import", () => {
    const input = `import { type DeprecatedSplitButton } from '@reapit/elements'`;
    const output = transform(input);
    expect(normalize(output)).toBe(
      `import { type SplitButton } from '@reapit/elements/core/split-button'`,
    );
  });

  test("removes DeprecatedSplitButtonProps from import", () => {
    const input = `import { DeprecatedSplitButton, DeprecatedSplitButtonProps } from '@reapit/elements'`;
    const output = transform(input);
    expect(output).toContain(`SplitButton`);
    expect(output).not.toContain("DeprecatedSplitButtonProps");
    expect(output).toContain(`@reapit/elements/core/split-button`);
  });

  test("removes type DeprecatedSplitButtonProps from import", () => {
    const input = `import { DeprecatedSplitButton, type DeprecatedSplitButtonProps } from '@reapit/elements'`;
    const output = transform(input);
    expect(output).not.toContain("DeprecatedSplitButtonProps");
  });

  test("handles multiple deprecated identifiers in one import", () => {
    const input = `import { DeprecatedSplitButton, DeprecatedActionButton, DeprecatedMenuButton } from '@reapit/elements'`;
    const output = transform(input);
    expect(output).toContain("SplitButton");
    expect(output).toContain("SplitButtonAction");
    expect(output).toContain("SplitButtonMenuButton");
    expect(output).toContain(`@reapit/elements/core/split-button`);
    expect(output).not.toContain("Deprecated");
  });

  test("preserves non-split-button imports in the same statement", () => {
    const input = `import { DeprecatedSplitButton, Input, Form } from '@reapit/elements'`;
    const output = transform(input);
    expect(output).toContain(`import { Input, Form } from '@reapit/elements'`);
    expect(output).toContain(`import { SplitButton } from '@reapit/elements/core/split-button'`);
  });

  test("rewrites import from subpath", () => {
    const input = `import { DeprecatedSplitButton } from '@reapit/elements/deprecated/split-button'`;
    const output = transform(input);
    expect(output).toContain(`@reapit/elements/core/split-button`);
    expect(output).toContain("SplitButton");
    expect(output).not.toContain("Deprecated");
  });

  test("leaves already-upgraded import unchanged", () => {
    const input = `import { SplitButton } from '@reapit/elements/core/split-button'`;
    const output = transform(input);
    expect(normalize(output)).toBe(input);
  });

  test("returns unchanged when no deprecated split-button usage", () => {
    const input = `import { Input, Form } from '@reapit/elements'`;
    const output = transform(input);
    expect(output).toBe(input);
  });

  test("returns empty file unchanged", () => {
    const input = ``;
    const output = transform(input);
    expect(output).toBe(input);
  });

  test("merges with existing core/split-button import", () => {
    const input = `
import { SplitButton } from '@reapit/elements/core/split-button'
import { DeprecatedActionButton } from '@reapit/elements'
`;
    const output = transform(input);
    expect(output).toContain("SplitButtonAction");
    expect(output).not.toContain("DeprecatedActionButton");
    // Should merge into the existing import
    const importMatches = output.match(/from '@reapit\/elements\/core\/split-button'/g);
    expect(importMatches?.length).toBe(1);
  });
});

describe("facade package support", () => {
  test("renames identifiers in-place for facade import", () => {
    const input = `import { DeprecatedSplitButton } from '@company/ui'`;
    const output = transform(input, "file.tsx", { facadePackage: "@company/ui" });
    expect(normalize(output)).toBe(`import { SplitButton } from '@company/ui'`);
  });

  test("renames multiple identifiers in-place for facade import", () => {
    const input = `import { DeprecatedSplitButton, DeprecatedActionButton, DeprecatedMenuButton } from '@company/ui'`;
    const output = transform(input, "file.tsx", { facadePackage: "@company/ui" });
    expect(output).toContain("SplitButton");
    expect(output).toContain("SplitButtonAction");
    expect(output).toContain("SplitButtonMenuButton");
    expect(output).toContain(`'@company/ui'`);
    expect(output).not.toContain("Deprecated");
  });

  test("handles facade with subpath — identifiers renamed, path unchanged", () => {
    const input = `import { DeprecatedSplitButton } from '@company/ui/elements'`;
    const output = transform(input, "file.tsx", { facadePackage: "@company/ui" });
    expect(normalize(output)).toBe(`import { SplitButton } from '@company/ui/elements'`);
  });

  test("preserves alias on facade import", () => {
    const input = `import { DeprecatedSplitButton as MySplitBtn } from '@company/ui'`;
    const output = transform(input, "file.tsx", { facadePackage: "@company/ui" });
    expect(normalize(output)).toBe(`import { SplitButton as MySplitBtn } from '@company/ui'`);
  });

  test("handles facade + @reapit/elements mix in same file", () => {
    const input = `
import { DeprecatedSplitButton } from '@company/ui'
import { DeprecatedActionButton } from '@reapit/elements'
`;
    const output = transform(input, "file.tsx", { facadePackage: "@company/ui" });
    // Facade import should be renamed in-place
    expect(output).toContain(`import { SplitButton } from '@company/ui'`);
    // @reapit/elements import should be moved to subpath
    expect(output).toContain(
      `import { SplitButtonAction } from '@reapit/elements/core/split-button'`,
    );
    expect(output).not.toContain("Deprecated");
  });

  test("removes DeprecatedSplitButtonProps from facade import", () => {
    const input = `import { DeprecatedSplitButton, DeprecatedSplitButtonProps } from '@company/ui'`;
    const output = transform(input, "file.tsx", { facadePackage: "@company/ui" });
    expect(output).toContain("SplitButton");
    expect(output).not.toContain("DeprecatedSplitButtonProps");
  });
});

describe("type reference transformations", () => {
  test("transforms DeprecatedSplitButtonProps when used without any JSX component import", () => {
    const input = `
import { DeprecatedSplitButtonProps } from '@reapit/elements'

const props: DeprecatedSplitButtonProps = { variant: 'primary' }
`;
    const output = transform(input);
    expect(output).toContain("const props: SplitButton.Props = ");
    expect(output).not.toContain("DeprecatedSplitButtonProps");
    expect(output).not.toContain("TODO");
  });

  test("transforms DeprecatedSplitButtonProps in type annotation", () => {
    const input = `
import { DeprecatedSplitButton, DeprecatedSplitButtonProps } from '@reapit/elements'

const props: DeprecatedSplitButtonProps = { variant: 'primary' }
`;
    const output = transform(input);
    expect(output).toContain("const props: SplitButton.Props = { variant: 'primary' }");
    expect(output).not.toContain("DeprecatedSplitButtonProps");
  });

  test("transforms DeprecatedSplitButtonProps in generics", () => {
    const input = `
import { DeprecatedSplitButton, DeprecatedSplitButtonProps } from '@reapit/elements'

type PropsWithId = WithId<DeprecatedSplitButtonProps>
`;
    const output = transform(input);
    expect(output).toContain("type PropsWithId = WithId<SplitButton.Props>");
    expect(output).not.toContain("DeprecatedSplitButtonProps");
  });

  test("transforms DeprecatedSplitButtonProps in heritage clause", () => {
    const input = `
import { DeprecatedSplitButton, DeprecatedSplitButtonProps } from '@reapit/elements'

interface MyProps extends DeprecatedSplitButtonProps {
  customProp: string
}
`;
    const output = transform(input);
    expect(output).toContain("interface MyProps extends SplitButton.Props {");
    expect(output).not.toContain("DeprecatedSplitButtonProps");
  });

  test("transforms multiple DeprecatedSplitButtonProps references", () => {
    const input = `
import { DeprecatedSplitButton, DeprecatedSplitButtonProps } from '@reapit/elements'

const props1: DeprecatedSplitButtonProps = { variant: 'primary' }
const props2: DeprecatedSplitButtonProps = { variant: 'secondary' }
`;
    const output = transform(input);
    expect(output).toContain("const props1: SplitButton.Props = { variant: 'primary' }");
    expect(output).toContain("const props2: SplitButton.Props = { variant: 'secondary' }");
    expect(output).not.toContain("DeprecatedSplitButtonProps");
  });
});

describe("JSX element transformations", () => {
  test("transforms DeprecatedSplitButton to SplitButton", () => {
    const input = `
import { DeprecatedSplitButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedSplitButton>content</DeprecatedSplitButton>
}
`;
    const output = transform(input);
    expect(output).toContain("<SplitButton>");
    expect(output).toContain("</SplitButton>");
    expect(output).not.toContain("DeprecatedSplitButton");
  });

  test("transforms DeprecatedSplitButton.Action to SplitButton.Action", () => {
    const input = `
import { DeprecatedSplitButton } from '@reapit/elements'

function MyComponent() {
  return (
    <DeprecatedSplitButton>
      <DeprecatedSplitButton.Action>Save</DeprecatedSplitButton.Action>
    </DeprecatedSplitButton>
  )
}
`;
    const output = transform(input);
    expect(output).toContain("<SplitButton.Action>");
    expect(output).toContain("</SplitButton.Action>");
    expect(output).not.toContain("DeprecatedSplitButton.Action");
  });

  test("transforms DeprecatedSplitButton.Menu to SplitButton.Menu", () => {
    const input = `
import { DeprecatedSplitButton } from '@reapit/elements'

function MyComponent() {
  return (
    <DeprecatedSplitButton>
      <DeprecatedSplitButton.Menu />
    </DeprecatedSplitButton>
  )
}
`;
    const output = transform(input);
    expect(output).toContain("<SplitButton.Menu");
    expect(output).not.toContain("DeprecatedSplitButton.Menu");
  });

  test("transforms standalone DeprecatedActionButton to SplitButtonAction", () => {
    const input = `
import { DeprecatedActionButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedActionButton>Save</DeprecatedActionButton>
}
`;
    const output = transform(input);
    expect(output).toContain("<SplitButtonAction>");
    expect(output).toContain("</SplitButtonAction>");
    expect(output).not.toContain("DeprecatedActionButton");
  });

  test("transforms standalone DeprecatedMenuButton to SplitButtonMenuButton", () => {
    const input = `
import { DeprecatedMenuButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedMenuButton />
}
`;
    const output = transform(input);
    expect(output).toContain("<SplitButtonMenuButton");
    expect(output).not.toContain("DeprecatedMenuButton");
  });

  test("transforms self-closing DeprecatedSplitButton", () => {
    const input = `
import { DeprecatedSplitButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedSplitButton />
}
`;
    const output = transform(input);
    expect(output).toContain("<SplitButton />");
    expect(output).not.toContain("DeprecatedSplitButton");
  });

  test("preserves aliased JSX usage", () => {
    const input = `
import { DeprecatedSplitButton as MySplitBtn } from '@reapit/elements'

function MyComponent() {
  return <MySplitBtn>content</MySplitBtn>
}
`;
    const output = transform(input);
    expect(output).toContain("import { SplitButton as MySplitBtn }");
    expect(output).toContain("<MySplitBtn>");
    expect(output).toContain("</MySplitBtn>");
    // Should NOT rename to <SplitButton> since it's aliased
    expect(output).not.toMatch(/<SplitButton>/);
  });
});

describe("TODO comments", () => {
  test("adds TODO comment above <SplitButton> usage", () => {
    const input = `
import { DeprecatedSplitButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedSplitButton>content</DeprecatedSplitButton>
}
`;
    const output = transform(input);
    expect(output).toContain("// TODO(upgrade-deprecated-split-button)");
    expect(output).toContain("Children must be moved into `action` and `menu` props");
  });

  test("does not add TODO comment for import-only files", () => {
    const input = `import { DeprecatedSplitButton } from '@reapit/elements'`;
    const output = transform(input);
    expect(output).not.toContain("TODO");
  });

  test("does not add TODO comment for DeprecatedActionButton JSX", () => {
    const input = `
import { DeprecatedActionButton } from '@reapit/elements'

function MyComponent() {
  return <DeprecatedActionButton>Save</DeprecatedActionButton>
}
`;
    const output = transform(input);
    expect(output).not.toContain("TODO");
  });

  test("does not add TODO comment for aliased usage", () => {
    const input = `
import { DeprecatedSplitButton as MySplitBtn } from '@reapit/elements'

function MyComponent() {
  return <MySplitBtn>content</MySplitBtn>
}
`;
    const output = transform(input);
    expect(output).not.toContain("TODO");
  });

  test("adds TODO comment for each SplitButton occurrence", () => {
    const input = `
import { DeprecatedSplitButton } from '@reapit/elements'

function MyComponent() {
  return (
    <div>
      <DeprecatedSplitButton>first</DeprecatedSplitButton>
      <DeprecatedSplitButton>second</DeprecatedSplitButton>
    </div>
  )
}
`;
    const output = transform(input);
    const todoMatches = output.match(/TODO\(upgrade-deprecated-split-button\)/g);
    expect(todoMatches?.length).toBe(2);
  });
});

describe("edge cases", () => {
  test("no deprecated split-button usage returns unchanged", () => {
    const input = `
import { Button } from '@reapit/elements/core/button'

function MyComponent() {
  return <Button>Click</Button>
}
`;
    const output = transform(input);
    expect(output).toBe(input);
  });

  test("handles mixed upgraded and deprecated in same file", () => {
    const input = `
import { SplitButton } from '@reapit/elements/core/split-button'
import { DeprecatedActionButton } from '@reapit/elements'

function MyComponent() {
  return (
    <SplitButton action={<SplitButton.Action>Save</SplitButton.Action>} menu={null}>
      <DeprecatedActionButton>Other</DeprecatedActionButton>
    </SplitButton>
  )
}
`;
    const output = transform(input);
    expect(output).toContain("SplitButtonAction");
    expect(output).not.toContain("DeprecatedActionButton");
    // The existing SplitButton import should still be there
    expect(output).toContain(`from '@reapit/elements/core/split-button'`);
  });

  test("handles file with only comments", () => {
    const input = `// This is a comment\n/* Another comment */`;
    const output = transform(input);
    expect(output).toBe(input);
  });

  test("handles multiple occurrences of same identifier", () => {
    const input = `
import { DeprecatedSplitButton } from '@reapit/elements'

function MyComponent() {
  return (
    <div>
      <DeprecatedSplitButton>first</DeprecatedSplitButton>
      <DeprecatedSplitButton>second</DeprecatedSplitButton>
    </div>
  )
}
`;
    const output = transform(input);
    expect(output).not.toContain("DeprecatedSplitButton");
    // Count closing tags: TODO comments don't contain </SplitButton>
    const closingMatches = output.match(/<\/SplitButton>/g);
    expect(closingMatches?.length).toBe(2);
  });
});
