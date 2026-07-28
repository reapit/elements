import { createMigrationTestSuite } from "../../shared/test-helpers.js";
import transform from "../transform";

createMigrationTestSuite(transform, {
  oldName: "RadioGroup",
  newName: "RadioGroupControl",
  targetSpecifier: "@reapit/elements/core/radio-group-control",
  oldPropsName: "RadioGroupProps",
  newPropsType: "RadioGroupControl.Props",
  propRenames: {
    isRequired: "required",
    errorMessage: "errorText",
  },
  facadePackage: "@company/ui",
  jsxSnippet: `<RadioGroup><option /></RadioGroup>`,
});

describe("import rewrites (extended)", () => {
  test("rewrites RadioGroup import from @reapit/elements/lab/radio-group to core/radio-group-control", () => {
    const input = [
      `import { RadioGroup } from '@reapit/elements/lab/radio-group'`,
      `<RadioGroup><option /></RadioGroup>`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain("from '@reapit/elements/core/radio-group-control'");
    expect(output).not.toContain("from '@reapit/elements/lab/radio-group'");
  });

  test("rewrites RadioGroupProps alias-only import", () => {
    const input = [
      `import { RadioGroupProps as RGP } from '@reapit/elements'`,
      `type Props = RGP`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain(
      "import { RadioGroupControl } from '@reapit/elements/core/radio-group-control'",
    );
    expect(output).toContain("type Props = RadioGroupControl.Props");
    expect(output).not.toContain("RadioGroupProps");
    expect(output).not.toContain("RGP");
  });

  test("preserves component alias alongside props alias", () => {
    const input = [
      `import { RadioGroup as RG, RadioGroupProps as RGP } from '@reapit/elements'`,
      `type Props = RGP`,
      `<RG><option /></RG>`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain(
      "import { RadioGroupControl as RG, RadioGroupControl } from '@reapit/elements/core/radio-group-control'",
    );
    expect(output).toContain("type Props = RadioGroupControl.Props");
    expect(output).toContain("<RG>");
  });

  test("merges rewrites from multiple deprecated source specifiers", () => {
    const input = [
      `import { RadioGroup } from '@reapit/elements'`,
      `import { RadioGroupProps } from '@reapit/elements/lab/radio-group'`,
      `type Props = RadioGroupProps`,
      `<RadioGroup><option /></RadioGroup>`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    const matches = output.match(/from '@reapit\/elements\/core\/radio-group-control'/g);
    expect(matches).toHaveLength(1);
    expect(output).toContain("type Props = RadioGroupControl.Props");
    expect(output).toContain("<RadioGroupControl>");
    expect(output).not.toContain("from '@reapit/elements/lab/radio-group'");
  });
});

describe("export behaviour (extended)", () => {
  test("does not rewrite re-export declarations", () => {
    const input = `export { RadioGroup } from '@reapit/elements/lab/radio-group'`;
    expect(transform(input, "file.tsx")).toBe(input);
  });

  test("rewrites local export specifiers safely", () => {
    const input = [`import { RadioGroup } from '@reapit/elements'`, `export { RadioGroup }`].join(
      "\n",
    );
    const output = transform(input, "file.tsx");
    expect(output).toContain(
      `import { RadioGroupControl } from '@reapit/elements/core/radio-group-control'`,
    );
    expect(output).toContain("export { RadioGroupControl }");
    expect(output).not.toContain("export { RadioGroup }");
  });
});

describe("facade package behaviour (extended)", () => {
  test("keeps facade subpath specifier unchanged", () => {
    const input = [
      `import { RadioGroup } from '@company/ui/lab/radio-group'`,
      `<RadioGroup><option /></RadioGroup>`,
    ].join("\n");
    const output = transform(input, "file.tsx", { facadePackage: "@company/ui" });
    expect(output).toContain(`import { RadioGroupControl } from '@company/ui/lab/radio-group'`);
    expect(output).not.toContain("@reapit/elements/core/radio-group-control");
  });
});

describe("jsx and identifier rewrites (extended)", () => {
  test("rewrites non-JSX value references", () => {
    const input = [`import { RadioGroup } from '@reapit/elements'`, `const RG = RadioGroup`].join(
      "\n",
    );
    const output = transform(input, "file.tsx");
    expect(output).toContain("const RG = RadioGroupControl");
    expect(output).not.toMatch(/= RadioGroup[^C]/);
  });

  test("does not rewrite non-JSX value references for aliased imports", () => {
    const input = [`import { RadioGroup as RG } from '@reapit/elements'`, `const C = RG`].join(
      "\n",
    );
    const output = transform(input, "file.tsx");
    expect(output).toContain(
      "import { RadioGroupControl as RG } from '@reapit/elements/core/radio-group-control'",
    );
    expect(output).toContain("const C = RG");
    expect(output).not.toContain("const C = RadioGroupControl");
  });

  test("does not rewrite object property keys named RadioGroup", () => {
    const input = [
      `import { RadioGroup } from '@reapit/elements'`,
      `const map = { RadioGroup }`,
      `const picked = map.RadioGroup`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain("const map = { RadioGroupControl }");
    expect(output).toContain("const picked = map.RadioGroup");
  });

  test("rewrites type references in heritage clauses and generics", () => {
    const input = [
      `import { RadioGroupProps } from '@reapit/elements'`,
      `interface Foo extends RadioGroupProps {}`,
      `type Bar = Partial<RadioGroupProps>`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain("interface Foo extends RadioGroupControl.Props {}");
    expect(output).toContain("type Bar = Partial<RadioGroupControl.Props>");
  });
});

describe("import safety", () => {
  test("preserves namespace imports when removing deprecated named imports", () => {
    const input = [
      `import * as Elements from '@reapit/elements'`,
      `import { RadioGroup } from '@reapit/elements'`,
      `<RadioGroup><option /></RadioGroup>`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain(`import * as Elements from '@reapit/elements'`);
    expect(output).toContain(
      `import { RadioGroupControl } from '@reapit/elements/core/radio-group-control'`,
    );
  });

  test("does not migrate local RadioGroup symbols when there are no imports", () => {
    const input = [`const RadioGroup = () => null`, `<RadioGroup />`].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toBe(input);
  });

  test("does not migrate local RadioGroupProps symbols when there are no imports", () => {
    const input = [`type RadioGroupProps = { a: string }`, `type Props = RadioGroupProps`].join(
      "\n",
    );
    const output = transform(input, "file.tsx");
    expect(output).toBe(input);
  });
});
