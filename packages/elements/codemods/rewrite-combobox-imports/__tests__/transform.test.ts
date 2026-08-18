import transform from "../transform";

// ===== Basic Named Imports =====

test("transforms Combobox import", () => {
  const input = `import { Combobox } from '@reapit/elements/core/combobox'`;
  const output = transform(input, "test.tsx");
  expect(output).toContain(`import { Combobox } from '@reapit/elements/utils/combobox'`);
  expect(output).not.toContain("/core/combobox");
});

test("transforms multiple named imports", () => {
  const input = `import { Combobox, ComboboxPopup } from '@reapit/elements/core/combobox'`;
  const output = transform(input, "test.tsx");
  expect(output).toContain(
    `import { Combobox, ComboboxPopup } from '@reapit/elements/utils/combobox'`,
  );
  expect(output).not.toContain("/core/combobox");
});

// ===== Type Imports =====

test("transforms type-only import declaration", () => {
  const input = `import type { ComboboxProps } from '@reapit/elements/core/combobox'`;
  const output = transform(input, "test.tsx");
  expect(output).toContain(`import type { ComboboxProps } from '@reapit/elements/utils/combobox'`);
  expect(output).not.toContain("/core/combobox");
});

test("transforms inline type import", () => {
  const input = `import { type ComboboxProps } from '@reapit/elements/core/combobox'`;
  const output = transform(input, "test.tsx");
  expect(output).toContain(`import { type ComboboxProps } from '@reapit/elements/utils/combobox'`);
  expect(output).not.toContain("/core/combobox");
});

test("transforms mixed value and type imports", () => {
  const input = `import { Combobox, type ComboboxProps } from '@reapit/elements/core/combobox'`;
  const output = transform(input, "test.tsx");
  expect(output).toContain(
    `import { Combobox, type ComboboxProps } from '@reapit/elements/utils/combobox'`,
  );
  expect(output).not.toContain("/core/combobox");
});

// ===== Aliased Imports =====

test("preserves import alias", () => {
  const input = `import { Combobox as MyCombobox } from '@reapit/elements/core/combobox'`;
  const output = transform(input, "test.tsx");
  expect(output).toContain(
    `import { Combobox as MyCombobox } from '@reapit/elements/utils/combobox'`,
  );
  expect(output).not.toContain("/core/combobox");
});

test("preserves alias on type import", () => {
  const input = `import { type ComboboxProps as Props } from '@reapit/elements/core/combobox'`;
  const output = transform(input, "test.tsx");
  expect(output).toContain(
    `import { type ComboboxProps as Props } from '@reapit/elements/utils/combobox'`,
  );
  expect(output).not.toContain("/core/combobox");
});

// ===== Barrel Imports (No Change) =====

test("does not change barrel import from @reapit/elements", () => {
  const input = `import { Combobox } from '@reapit/elements'`;
  const output = transform(input, "test.tsx");
  expect(output).toBe(input);
});

test("does not change unrelated subpath import", () => {
  const input = `import { Button } from '@reapit/elements/core/button'`;
  const output = transform(input, "test.tsx");
  expect(output).toBe(input);
});

// ===== Unchanged When No Match =====

test("returns unchanged source when no core/combobox imports", () => {
  const input = `import { Button } from '@reapit/elements/core/button'
export const MyButton = () => <Button>Click</Button>`;
  const output = transform(input, "test.tsx");
  expect(output).toBe(input);
});

test("handles empty file", () => {
  const input = ``;
  const output = transform(input, "test.tsx");
  expect(output).toBe(input);
});

// ===== Facade Package Support =====

test("transforms facade package imports", () => {
  const input = `import { Combobox } from '@company/ui-components/core/combobox'`;
  const output = transform(input, "test.tsx", { facadePackage: "@company/ui-components" });
  expect(output).toContain(`import { Combobox } from '@company/ui-components/utils/combobox'`);
  expect(output).not.toContain("/core/combobox");
});

test("does not transform facade package without option", () => {
  const input = `import { Combobox } from '@company/ui/core/combobox'`;
  const output = transform(input, "test.tsx");
  expect(output).toBe(input);
});

// ===== Multi-line Imports =====

test("handles multi-line import", () => {
  const input = `import {
  Combobox,
  ComboboxPopup,
  type ComboboxProps,
} from '@reapit/elements/core/combobox'`;
  const output = transform(input, "test.tsx");
  expect(output).toContain(`from '@reapit/elements/utils/combobox'`);
  expect(output).toContain("Combobox,");
  expect(output).toContain("ComboboxPopup,");
  expect(output).toContain("type ComboboxProps");
  expect(output).not.toContain("/core/combobox");
});

// ===== Real-World Scenarios =====

test("handles complete component file", () => {
  const input = `import { Combobox, type ComboboxProps } from '@reapit/elements/core/combobox'
import { useState } from 'react'

export const MyCombobox = (props: ComboboxProps) => {
  return <Combobox {...props} />
}`;
  const output = transform(input, "test.tsx");
  expect(output).toContain(
    `import { Combobox, type ComboboxProps } from '@reapit/elements/utils/combobox'`,
  );
  expect(output).toContain(`import { useState } from 'react'`);
  expect(output).toContain("export const MyCombobox");
});

test("preserves unrelated imports alongside combobox import", () => {
  const input = `import { Button } from '@reapit/elements/core/button'
import { Combobox } from '@reapit/elements/core/combobox'
import { useState } from 'react'`;
  const output = transform(input, "test.tsx");
  expect(output).toContain(`import { Button } from '@reapit/elements/core/button'`);
  expect(output).toContain(`import { Combobox } from '@reapit/elements/utils/combobox'`);
  expect(output).toContain(`import { useState } from 'react'`);
});

test("handles file with comments", () => {
  const input = `// Import Combobox component
import { Combobox } from '@reapit/elements/core/combobox'

/* Wrap the combobox */
export const MyCombobox = () => <Combobox />`;
  const output = transform(input, "test.tsx");
  expect(output).toContain(`import { Combobox } from '@reapit/elements/utils/combobox'`);
  expect(output).toContain("// Import Combobox component");
  expect(output).toContain("/* Wrap the combobox */");
});
