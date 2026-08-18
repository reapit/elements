import transform from "../transform";

describe("autoFlow migration", () => {
  test('transforms autoFlow="column" to orientation="horizontal"', () => {
    const input = `
import { ButtonGroup } from '@reapit/elements'
<ButtonGroup autoFlow="column" />
`;
    expect(transform(input, "test.tsx")).toContain('orientation="horizontal"');
    expect(transform(input, "test.tsx")).not.toContain("autoFlow");
  });

  test('transforms autoFlow="row" to orientation="vertical"', () => {
    const input = `
import { ButtonGroup } from '@reapit/elements'
<ButtonGroup autoFlow="row" />
`;
    expect(transform(input, "test.tsx")).toContain('orientation="vertical"');
    expect(transform(input, "test.tsx")).not.toContain("autoFlow");
  });

  test("leaves dynamic autoFlow unchanged", () => {
    const input = `
import { ButtonGroup } from '@reapit/elements'
<ButtonGroup autoFlow={direction} />
`;
    const output = transform(input, "test.tsx");
    expect(output).toContain("autoFlow={direction}");
  });

  test("leaves dynamic ternary autoFlow unchanged", () => {
    const input = `
import { ButtonGroup } from '@reapit/elements'
<ButtonGroup autoFlow={isVertical ? 'row' : 'column'} />
`;
    const output = transform(input, "test.tsx");
    expect(output).toContain("autoFlow=");
  });
});

describe("justifyContent migration", () => {
  test("renames justifyContent to align", () => {
    const input = `
import { ButtonGroup } from '@reapit/elements'
<ButtonGroup justifyContent="start" />
`;
    const output = transform(input, "test.tsx");
    expect(output).toContain('align="start"');
    expect(output).not.toContain("justifyContent");
  });

  test("preserves justifyContent value — end", () => {
    const input = `
import { ButtonGroup } from '@reapit/elements'
<ButtonGroup justifyContent="end" />
`;
    expect(transform(input, "test.tsx")).toContain('align="end"');
  });

  test("preserves justifyContent value — center", () => {
    const input = `
import { ButtonGroup } from '@reapit/elements'
<ButtonGroup justifyContent="center" />
`;
    expect(transform(input, "test.tsx")).toContain('align="center"');
  });

  test("preserves justifyContent value — stretch", () => {
    const input = `
import { ButtonGroup } from '@reapit/elements'
<ButtonGroup justifyContent="stretch" />
`;
    expect(transform(input, "test.tsx")).toContain('align="stretch"');
  });
});

describe("replacement prop already present", () => {
  test("removes justifyContent when align is already present", () => {
    const input = `
import { ButtonGroup } from '@reapit/elements'
<ButtonGroup justifyContent="end" align="start" />
`;
    const output = transform(input, "test.tsx");
    expect(output).toContain('align="start"');
    expect(output).not.toContain("justifyContent");
    expect(output).not.toContain('align="end"');
  });

  test("removes autoFlow when orientation is already present", () => {
    const input = `
import { ButtonGroup } from '@reapit/elements'
<ButtonGroup autoFlow="column" orientation="vertical" />
`;
    const output = transform(input, "test.tsx");
    expect(output).toContain('orientation="vertical"');
    expect(output).not.toContain("autoFlow");
    expect(output).not.toContain('orientation="horizontal"');
  });

  test("removes both deprecated props when both replacements are present", () => {
    const input = `
import { ButtonGroup } from '@reapit/elements'
<ButtonGroup autoFlow="row" justifyContent="center" orientation="horizontal" align="end" />
`;
    const output = transform(input, "test.tsx");
    expect(output).toContain('orientation="horizontal"');
    expect(output).toContain('align="end"');
    expect(output).not.toContain("autoFlow");
    expect(output).not.toContain("justifyContent");
  });
});

describe("combined migration", () => {
  test("transforms both props on the same element", () => {
    const input = `
import { ButtonGroup } from '@reapit/elements'
<ButtonGroup autoFlow="column" justifyContent="end" size="medium" />
`;
    const output = transform(input, "test.tsx");
    expect(output).toContain('orientation="horizontal"');
    expect(output).toContain('align="end"');
    expect(output).toContain('size="medium"');
    expect(output).not.toContain("autoFlow");
    expect(output).not.toContain("justifyContent");
  });

  test("handles multiple ButtonGroup elements in the same file", () => {
    const input = `
import { ButtonGroup } from '@reapit/elements'
<ButtonGroup autoFlow="column" justifyContent="start" />
<ButtonGroup autoFlow="row" justifyContent="end" />
`;
    const output = transform(input, "test.tsx");
    expect(output).toContain('orientation="horizontal"');
    expect(output).toContain('orientation="vertical"');
    expect(output).toContain('align="start"');
    expect(output).toContain('align="end"');
  });

  test("handles opening element with children", () => {
    const input = `
import { ButtonGroup } from '@reapit/elements'
<ButtonGroup autoFlow="row" justifyContent="center">
  <ButtonGroup.Item variant="primary">Save</ButtonGroup.Item>
</ButtonGroup>
`;
    const output = transform(input, "test.tsx");
    expect(output).toContain('orientation="vertical"');
    expect(output).toContain('align="center"');
    expect(output).toContain("ButtonGroup.Item");
  });
});

describe("no-op cases", () => {
  test("returns source unchanged when neither prop is present", () => {
    const input = `
import { ButtonGroup } from '@reapit/elements'
<ButtonGroup size="medium" />
`;
    expect(transform(input, "test.tsx")).toBe(input);
  });

  test("returns source unchanged when ButtonGroup not imported from elements", () => {
    const input = `
import { ButtonGroup } from 'some-other-library'
<ButtonGroup autoFlow="column" />
`;
    expect(transform(input, "test.tsx")).toBe(input);
  });

  test("does not transform ButtonGroup.Item elements", () => {
    const input = `
import { ButtonGroup } from '@reapit/elements'
<ButtonGroup autoFlow="column">
  <ButtonGroup.Item variant="primary">Save</ButtonGroup.Item>
</ButtonGroup>
`;
    const output = transform(input, "test.tsx");
    expect(output).not.toContain("ButtonGroup.Item orientation=");
    expect(output).not.toContain("ButtonGroup.Item align=");
  });

  test("does not change imports", () => {
    const input = `
import { ButtonGroup } from '@reapit/elements'
<ButtonGroup autoFlow="column" />
`;
    const output = transform(input, "test.tsx");
    expect(output).toContain("from '@reapit/elements'");
  });
});

describe("aliased import", () => {
  test("handles aliased ButtonGroup import", () => {
    const input = `
import { ButtonGroup as BG } from '@reapit/elements'
<BG autoFlow="column" justifyContent="start" />
`;
    const output = transform(input, "test.tsx");
    expect(output).toContain('orientation="horizontal"');
    expect(output).toContain('align="start"');
  });
});

describe("facade package support", () => {
  test("transforms props when importing from a facade package", () => {
    const input = `
import { ButtonGroup } from '@company/ui'
<ButtonGroup autoFlow="row" justifyContent="end" />
`;
    const output = transform(input, "test.tsx", { facadePackage: "@company/ui" });
    expect(output).toContain('orientation="vertical"');
    expect(output).toContain('align="end"');
  });
});
