import transform from "../transform";

describe("no-op", () => {
  test("returns source unchanged when table symbols are absent", () => {
    const input = `import { Button } from '@reapit/elements/core/button'\n<Button>ok</Button>`;
    expect(transform(input, "file.tsx")).toBe(input);
  });
});

describe("import rewrites", () => {
  test("rewrites supported imports to core/table", () => {
    const input = [
      `import { TableBody, TableHead, TableHeaderCell, TableRow, TableToolbar } from '@reapit/elements'`,
      `<TableBody />`,
      `<TableHead />`,
      `<TableHeaderCell />`,
      `<TableRow />`,
      `<TableToolbar />`,
    ].join("\n");

    const output = transform(input, "file.tsx");

    expect(output).toContain(`import { Table } from '@reapit/elements/core/table'`);
    expect(output).not.toContain("TableBody");
    expect(output).toContain("<Table.Body />");
    expect(output).toContain("<Table.Head />");
    expect(output).toContain("<Table.HeaderCell />");
    expect(output).toContain("<Table.BodyRow />");
    expect(output).toContain("<Table.Toolbar />");
  });

  test("preserves unrelated imports", () => {
    const input = [
      `import { TableBody, Input } from '@reapit/elements'`,
      `<TableBody />`,
      `<Input />`,
    ].join("\n");

    const output = transform(input, "file.tsx");

    expect(output).toContain(`import { Input } from '@reapit/elements'`);
    expect(output).toContain(`import { Table } from '@reapit/elements/core/table'`);
  });

  test("migrates from lab/table subpath imports", () => {
    const input = [`import { TableBody } from '@reapit/elements/lab/table'`, `<TableBody />`].join(
      "\n",
    );

    const output = transform(input, "file.tsx");

    expect(output).toContain(`import { Table } from '@reapit/elements/core/table'`);
    expect(output).not.toContain(`from '@reapit/elements/lab/table'`);
    expect(output).toContain("<Table.Body />");
  });

  test("keeps facade package specifier unchanged", () => {
    const input = [`import { TableBody } from '@company/ui'`, `<TableBody />`].join("\n");
    const output = transform(input, "file.tsx", { facadePackage: "@company/ui" });

    expect(output).toContain(`import { Table } from '@company/ui'`);
    expect(output).not.toContain("@reapit/elements/core/table");
  });

  test("keeps facade subpath specifier unchanged", () => {
    const input = [`import { TableBody } from '@company/ui/lab/table'`, `<TableBody />`].join("\n");
    const output = transform(input, "file.tsx", { facadePackage: "@company/ui" });

    expect(output).toContain(`import { Table } from '@company/ui'`);
    expect(output).not.toContain("@reapit/elements/core/table");
  });

  test("reuses aliased Table namespace from existing target import", () => {
    const input = [
      `import { Table as CoreTable } from '@reapit/elements/core/table'`,
      `import { TableBody } from '@reapit/elements'`,
      `<TableBody />`,
    ].join("\n");

    const output = transform(input, "file.tsx");

    expect(output).toContain(`import { Table as CoreTable } from '@reapit/elements/core/table'`);
    expect(output).toContain("<CoreTable.Body />");
    expect(output).not.toContain("<Table.Body />");
  });

  test("keeps source import when symbol has non-JSX usage", () => {
    const input = [
      `import { TableBody } from '@reapit/elements'`,
      `const ref = TableBody`,
      `const el = <TableBody />`,
    ].join("\n");

    const output = transform(input, "file.tsx");

    expect(output).toContain(`import { TableBody } from '@reapit/elements'`);
    expect(output).toContain(`const ref = TableBody`);
    expect(output).toContain(`const el = <Table.Body />`);
    expect(output).toContain(`import { Table } from '@reapit/elements/core/table'`);
  });
});

describe("component rewrites", () => {
  test("rewrites toolbar props", () => {
    const input = [
      `import { TableToolbar } from '@reapit/elements'`,
      `<TableToolbar description="3 selected" actions={<button>Go</button>} />`,
    ].join("\n");

    const output = transform(input, "file.tsx");
    expect(output).toContain("<Table.Toolbar");
    expect(output).toContain('leftContent="3 selected"');
    expect(output).toContain("rightContent={<button>Go</button>}");
    expect(output).not.toContain("description=");
    expect(output).not.toContain("actions=");
  });

  test("rewrites TableContainer to div", () => {
    const input = [
      `import { TableContainer } from '@reapit/elements'`,
      `<TableContainer id="x">A</TableContainer>`,
    ].join("\n");

    const output = transform(input, "file.tsx");
    expect(output).toContain('<div id="x">A</div>');
    expect(output).not.toContain("TableContainer");
  });

  test("rewrites TableText to Table.PrimaryData", () => {
    const input = [
      `import { TableText } from '@reapit/elements'`,
      `<TableText iconLeft={<i/>}>Name</TableText>`,
    ].join("\n");
    const output = transform(input, "file.tsx");
    expect(output).toContain("<Table.PrimaryData iconLeft={<i/>}>Name</Table.PrimaryData>");
  });

  test("rewrites SingleLineCell and alignment prop", () => {
    const input = [
      `import { SingleLineCell } from '@reapit/elements'`,
      `<SingleLineCell alignment="right">A</SingleLineCell>`,
    ].join("\n");
    const output = transform(input, "file.tsx");

    expect(output).toContain('<Table.BodyCell justifySelf="end">A</Table.BodyCell>');
    expect(output).not.toContain("alignment=");
  });

  test("maps left alignment to start on TableHeaderCell", () => {
    const input = [
      `import { TableHeaderCell } from '@reapit/elements'`,
      `<TableHeaderCell alignment="left">A</TableHeaderCell>`,
    ].join("\n");
    const output = transform(input, "file.tsx");

    expect(output).toContain('<Table.HeaderCell justifySelf="start">A</Table.HeaderCell>');
  });

  test("rewrites DoubleLineCell to BodyCell and DoubleLineLayout", () => {
    const input = [
      `import { DoubleLineCell } from '@reapit/elements'`,
      `<DoubleLineCell mediaItem={avatar} firstLine={name} secondLine={email} alignment="center" data-id="x" />`,
    ].join("\n");

    const output = transform(input, "file.tsx");

    expect(output).toContain('<Table.BodyCell justifySelf="center" data-id="x">');
    expect(output).toContain(
      "<Table.DoubleLineLayout mediaItem={avatar} supplementaryData={email}>{name}</Table.DoubleLineLayout>",
    );
  });

  test("adds alignment TODO for dynamic alignment expressions", () => {
    const input = [
      `import { SingleLineCell } from '@reapit/elements'`,
      `<SingleLineCell alignment={align}>A</SingleLineCell>`,
    ].join("\n");
    const output = transform(input, "file.tsx");

    expect(output).toContain("TODO: alignment uses dynamic expression");
    expect(output).toContain("<Table.BodyCell justifySelf={align}>A</Table.BodyCell>");
  });
});

describe("todo comments", () => {
  test("adds TODO for migrated TableRow", () => {
    const input = [`import { TableRow } from '@reapit/elements'`, `const row = <TableRow />`].join(
      "\n",
    );
    const output = transform(input, "file.tsx");

    expect(output).toContain("TODO: TableRow was migrated to Table.BodyRow");
    expect(output).toContain("const row = <Table.BodyRow />");
  });

  test("adds TODO for width props on SingleLineCell", () => {
    const input = [
      `import { SingleLineCell } from '@reapit/elements'`,
      `<SingleLineCell width="20rem" minWidth={min} maxWidth={max}>A</SingleLineCell>`,
    ].join("\n");
    const output = transform(input, "file.tsx");

    expect(output).toContain("TODO: width, minWidth, and maxWidth were removed");
    expect(output).not.toContain("width=");
    expect(output).not.toContain("minWidth=");
    expect(output).not.toContain("maxWidth=");
  });

  test("adds TODO for width props on TableHeaderCell", () => {
    const input = [
      `import { TableHeaderCell } from '@reapit/elements'`,
      `<TableHeaderCell width={w}>A</TableHeaderCell>`,
    ].join("\n");
    const output = transform(input, "file.tsx");

    expect(output).toContain("TODO: width, minWidth, and maxWidth were removed");
    expect(output).toContain("<Table.HeaderCell>A</Table.HeaderCell>");
  });

  test("adds TODO for width props on DoubleLineCell", () => {
    const input = [
      `import { DoubleLineCell } from '@reapit/elements'`,
      `<DoubleLineCell firstLine={name} secondLine={email} width={w} />`,
    ].join("\n");
    const output = transform(input, "file.tsx");

    expect(output).toContain("TODO: width, minWidth, and maxWidth were removed");
    expect(output).not.toContain(" width={w}");
  });

  test("de-duplicates TODO comments per statement", () => {
    const input = [
      `import { TableRow, TableHeaderCell } from '@reapit/elements'`,
      `const el = <><TableRow /><TableHeaderCell width={w}>X</TableHeaderCell></>`,
    ].join("\n");
    const output = transform(input, "file.tsx");

    const rowTodos = output.match(/TableRow was migrated to Table\.BodyRow/g);
    const widthTodos = output.match(/width, minWidth, and maxWidth were removed/g);
    expect(rowTodos).toHaveLength(1);
    expect(widthTodos).toHaveLength(1);
  });
});

describe("exclusions", () => {
  test("does not rewrite TableProvider", () => {
    const input = [`import { TableProvider } from '@reapit/elements'`, `<TableProvider />`].join(
      "\n",
    );
    expect(transform(input, "file.tsx")).toBe(input);
  });

  test("does not rewrite TableRowSelection", () => {
    const input = [
      `import { TableRowSelection } from '@reapit/elements'`,
      `<TableRowSelection />`,
    ].join("\n");
    expect(transform(input, "file.tsx")).toBe(input);
  });
});
