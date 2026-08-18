import { createMigrationTestSuite } from "../../shared/test-helpers.js";
import transform from "../transform";

createMigrationTestSuite(transform, {
  oldName: "Radio",
  newName: "RadioButton",
  targetSpecifier: "@reapit/elements/core/radio-group-control",
  oldPropsName: "RadioProps",
  newPropsType: "RadioButton.Props",
  propRenames: {
    isRequired: "required",
  },
  propsToRemove: ["hasError"],
  facadePackage: "@company/ui",
  jsxSnippet: `<Radio label="Opt" />`,
});

describe("import rewrites (extended)", () => {
  test("rewrites Radio import from @reapit/elements/lab/radio to core/radio-group-control", () => {
    const input = [
      `import { Radio } from '@reapit/elements/lab/radio'`,
      `<Radio label="Opt" />`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain("from '@reapit/elements/core/radio-group-control'");
    expect(output).not.toContain("from '@reapit/elements/lab/radio'");
  });

  test("rewrites RadioProps alias-only import", () => {
    const input = [`import { RadioProps as RP } from '@reapit/elements'`, `type Props = RP`].join(
      "\n",
    );
    const output = transform(input, "file.tsx");
    expect(output).toContain(
      "import { RadioButton } from '@reapit/elements/core/radio-group-control'",
    );
    expect(output).toContain("type Props = RadioButton.Props");
    expect(output).not.toContain("RadioProps");
    expect(output).not.toContain("= RP");
  });

  test("preserves component alias alongside props alias", () => {
    const input = [
      `import { Radio as R, RadioProps as RP } from '@reapit/elements'`,
      `type Props = RP`,
      `<R label="Opt" />`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain(
      "import { RadioButton as R, RadioButton } from '@reapit/elements/core/radio-group-control'",
    );
    expect(output).toContain("type Props = RadioButton.Props");
    expect(output).toContain("<R");
  });

  test("merges rewrites from multiple deprecated source specifiers", () => {
    const input = [
      `import { Radio } from '@reapit/elements'`,
      `import { RadioProps } from '@reapit/elements/lab/radio'`,
      `type Props = RadioProps`,
      `<Radio label="Opt" />`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    const matches = output.match(/from '@reapit\/elements\/core\/radio-group-control'/g);
    expect(matches).toHaveLength(1);
    expect(output).toContain("type Props = RadioButton.Props");
    expect(output).toContain("<RadioButton");
    expect(output).not.toContain("from '@reapit/elements/lab/radio'");
  });
});

describe("export behaviour (extended)", () => {
  test("does not rewrite re-export declarations", () => {
    const input = `export { Radio } from '@reapit/elements/lab/radio'`;
    expect(transform(input, "file.tsx")).toBe(input);
  });

  test("rewrites local export specifiers safely", () => {
    const input = [`import { Radio } from '@reapit/elements'`, `export { Radio }`].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain(
      `import { RadioButton } from '@reapit/elements/core/radio-group-control'`,
    );
    expect(output).toContain("export { RadioButton }");
    expect(output).not.toContain("export { Radio }");
  });
});

describe("facade package behaviour (extended)", () => {
  test("keeps facade subpath specifier unchanged", () => {
    const input = [`import { Radio } from '@company/ui/lab/radio'`, `<Radio label="Opt" />`].join(
      "\n",
    );
    const output = transform(input, "file.tsx", { facadePackage: "@company/ui" });
    expect(output).toContain(`import { RadioButton } from '@company/ui/lab/radio'`);
    expect(output).not.toContain("@reapit/elements/core/radio-group-control");
  });
});

describe("jsx and identifier rewrites (extended)", () => {
  test("rewrites non-JSX value references", () => {
    const input = [`import { Radio } from '@reapit/elements'`, `const R = Radio`].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain("const R = RadioButton");
    expect(output).not.toMatch(/= Radio[^B]/);
  });

  test("does not rewrite non-JSX value references for aliased imports", () => {
    const input = [`import { Radio as R } from '@reapit/elements'`, `const C = R`].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain(
      "import { RadioButton as R } from '@reapit/elements/core/radio-group-control'",
    );
    expect(output).toContain("const C = R");
    expect(output).not.toContain("const C = RadioButton");
  });

  test("does not rewrite object property keys named Radio", () => {
    const input = [
      `import { Radio } from '@reapit/elements'`,
      `const map = { Radio }`,
      `const picked = map.Radio`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain("const map = { RadioButton }");
    expect(output).toContain("const picked = map.Radio");
  });

  test("rewrites type references in heritage clauses and generics", () => {
    const input = [
      `import { RadioProps } from '@reapit/elements'`,
      `interface Foo extends RadioProps {}`,
      `type Bar = Partial<RadioProps>`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain("interface Foo extends RadioButton.Props {}");
    expect(output).toContain("type Bar = Partial<RadioButton.Props>");
  });
});

describe("prop renames and removals (extended)", () => {
  test("renames isRequired and removes hasError in the same element", () => {
    const input = [
      `import { Radio } from '@reapit/elements'`,
      `<Radio label="Opt" isRequired hasError />`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain("required");
    expect(output).not.toContain("isRequired");
    expect(output).not.toContain("hasError");
  });

  test("renames props with expression values", () => {
    const input = [
      `import { Radio } from '@reapit/elements'`,
      `<Radio label="Opt" isRequired={isRequired} hasError={hasError} />`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain("required={isRequired}");
    expect(output).not.toContain("isRequired=");
    expect(output).not.toContain("hasError");
  });

  test("preserves unchanged props alongside renamed and removed ones", () => {
    const input = [
      `import { Radio } from '@reapit/elements'`,
      `<Radio label="Opt" supplementaryInfo="Extra" isRequired hasError />`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain('label="Opt"');
    expect(output).toContain('supplementaryInfo="Extra"');
    expect(output).toContain("required");
    expect(output).not.toContain("isRequired");
    expect(output).not.toContain("hasError");
  });
});

describe("TODO comment", () => {
  test("inserts a TODO comment before each migrated JSX statement", () => {
    const input = [
      `import { Radio } from '@reapit/elements'`,
      `const el = <Radio label="Opt" />`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain(
      "// TODO: Consider using RadioGroupControl rather than RadioButton directly.",
    );
    const todoIndex = output.indexOf("// TODO:");
    const elIndex = output.indexOf("const el =");
    expect(todoIndex).toBeLessThan(elIndex);
  });

  test("inserts only one TODO comment per statement even when element appears once", () => {
    const input = [
      `import { Radio } from '@reapit/elements'`,
      `const el = <Radio label="Opt" />`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    const matches = output.match(/\/\/ TODO:/g);
    expect(matches).toHaveLength(1);
  });

  test("inserts a TODO comment before each of multiple migrated statements", () => {
    const input = [
      `import { Radio } from '@reapit/elements'`,
      `const a = <Radio label="A" />`,
      `const b = <Radio label="B" />`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    const matches = output.match(/\/\/ TODO:/g);
    expect(matches).toHaveLength(2);
  });

  test("inserts only one TODO comment when multiple Radio elements share a statement", () => {
    const input = [
      `import { Radio } from '@reapit/elements'`,
      `const els = [<Radio label="A" />, <Radio label="B" />]`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    const matches = output.match(/\/\/ TODO:/g);
    expect(matches).toHaveLength(1);
  });

  test("does not insert a TODO comment when no JSX elements are migrated", () => {
    const input = [`import { Radio } from '@reapit/elements'`, `const R = Radio`].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).not.toContain("// TODO:");
  });

  test("preserves indentation of the migrated statement after inserting the TODO comment", () => {
    const input = [
      `import { Radio } from '@reapit/elements'`,
      `function foo() {`,
      `  const el = <Radio label="Opt" />`,
      `}`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    const lines = output.split("\n");
    const todoLine = lines.find((l) => l.includes("// TODO:"))!;
    const stmtLine = lines.find((l) => l.includes("const el ="))!;
    expect(todoLine).toBeDefined();
    expect(stmtLine).toBeDefined();
    expect(todoLine.match(/^\s*/)?.[0]).toBe(stmtLine.match(/^\s*/)?.[0]);
  });
});

describe("import safety", () => {
  test("preserves namespace imports when removing deprecated named imports", () => {
    const input = [
      `import * as Elements from '@reapit/elements'`,
      `import { Radio } from '@reapit/elements'`,
      `<Radio label="Opt" />`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain(`import * as Elements from '@reapit/elements'`);
    expect(output).toContain(
      `import { RadioButton } from '@reapit/elements/core/radio-group-control'`,
    );
  });

  test("does not migrate local Radio symbols when there are no imports", () => {
    const input = [`const Radio = () => null`, `<Radio />`].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toBe(input);
  });

  test("does not migrate local RadioProps symbols when there are no imports", () => {
    const input = [`type RadioProps = { a: string }`, `type Props = RadioProps`].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toBe(input);
  });

  test("removes RadioProps import and adds no RadioButton import when RadioProps is imported but unused", () => {
    const input = `import { RadioProps } from '@reapit/elements'`;
    const output = transform(input, "file.tsx");
    expect(output).not.toContain("RadioProps");
    expect(output).not.toContain("RadioButton");
    expect(output).not.toContain("from '@reapit/elements/core/radio-group-control'");
  });
});
