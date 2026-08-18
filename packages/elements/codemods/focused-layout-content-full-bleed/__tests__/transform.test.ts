import transform from "../transform";

describe("namespaced component usage (FocusedLayout.Content)", () => {
  test("adds isFullBleed and wraps children in MainContainer", () => {
    const input = "<FocusedLayout.Content><Form /></FocusedLayout.Content>";
    const output = transform(input);
    expect(output).toContain(
      '<FocusedLayout.Content isFullBleed><MainContainer size="wide"><Form /></MainContainer></FocusedLayout.Content>',
    );
    expect(output).toContain(
      "import { MainContainer } from '@reapit/elements/core/main-container'",
    );
  });

  test("preserves existing props on FocusedLayout.Content", () => {
    const input = '<FocusedLayout.Content className="content"><Form /></FocusedLayout.Content>';
    const output = transform(input);
    expect(output).toContain(
      '<FocusedLayout.Content isFullBleed className="content"><MainContainer size="wide"><Form /></MainContainer></FocusedLayout.Content>',
    );
  });

  test("wraps multiple children in a single MainContainer", () => {
    const input = "<FocusedLayout.Content><Heading>Title</Heading><Form /></FocusedLayout.Content>";
    const output = transform(input);
    expect(output).toContain(
      '<FocusedLayout.Content isFullBleed><MainContainer size="wide"><Heading>Title</Heading><Form /></MainContainer></FocusedLayout.Content>',
    );
  });

  test("reuses an existing MainContainer import alias", () => {
    const input = [
      "import { MainContainer as Container } from '@reapit/elements/core/main-container'",
      "<FocusedLayout.Content><Form /></FocusedLayout.Content>",
    ].join("\n");
    const output = transform(input);
    expect(output).toContain(
      '<FocusedLayout.Content isFullBleed><Container size="wide"><Form /></Container></FocusedLayout.Content>',
    );
    expect(output).not.toContain('MainContainer size="wide"');
  });

  test("adds a MainContainer import when one is not already present", () => {
    const input = [
      "import { FocusedLayout } from '@reapit/elements/core/focused-layout'",
      "<FocusedLayout.Content><Form /></FocusedLayout.Content>",
    ].join("\n");
    const output = transform(input);
    expect(output).toContain(
      "import { MainContainer } from '@reapit/elements/core/main-container'",
    );
  });

  test("does not duplicate a MainContainer import that is already present", () => {
    const input = [
      "import { MainContainer } from '@reapit/elements/core/main-container'",
      "<FocusedLayout.Content><Form /></FocusedLayout.Content>",
    ].join("\n");
    const output = transform(input);
    expect(output.match(/import \{ MainContainer \}/g)).toHaveLength(1);
  });

  test("leaves elements that already pass isFullBleed untouched", () => {
    const input =
      '<FocusedLayout.Content isFullBleed><MainContainer size="wide"><Form /></MainContainer></FocusedLayout.Content>';
    const output = transform(input);
    expect(output).toBe(input);
  });

  test("leaves isFullBleed={false} untouched (explicit opt-out)", () => {
    const input = "<FocusedLayout.Content isFullBleed={false}><Form /></FocusedLayout.Content>";
    const output = transform(input);
    expect(output).toBe(input);
  });

  test("adds isFullBleed but does not double-wrap when already nesting an Elements MainContainer", () => {
    const input = [
      "import { MainContainer } from '@reapit/elements/core/main-container'",
      '<FocusedLayout.Content><MainContainer size="wide"><Form /></MainContainer></FocusedLayout.Content>',
    ].join("\n");
    const output = transform(input);
    expect(output).toContain(
      '<FocusedLayout.Content isFullBleed><MainContainer size="wide"><Form /></MainContainer></FocusedLayout.Content>',
    );
  });

  test("wraps in an aliased MainContainer when the existing one is not from Elements", () => {
    const input = [
      "import { MainContainer } from './local-main-container'",
      '<FocusedLayout.Content><MainContainer size="wide"><Form /></MainContainer></FocusedLayout.Content>',
    ].join("\n");
    const output = transform(input);
    expect(output).toContain(
      '<FocusedLayout.Content isFullBleed><ElementsMainContainer size="wide"><MainContainer size="wide"><Form /></MainContainer></ElementsMainContainer></FocusedLayout.Content>',
    );
    expect(output).toContain(
      "import { MainContainer as ElementsMainContainer } from '@reapit/elements/core/main-container'",
    );
  });

  test("leaves self-closing FocusedLayout.Content untouched", () => {
    const input = "<FocusedLayout.Content />";
    const output = transform(input);
    expect(output).toBe(input);
  });

  test("still transforms an element with a spread attribute, and flags it for review", () => {
    const input = "<FocusedLayout.Content {...contentProps}><Form /></FocusedLayout.Content>";
    const output = transform(input);
    expect(output).toContain(
      '<FocusedLayout.Content isFullBleed {...contentProps}><MainContainer size="wide"><Form /></MainContainer></FocusedLayout.Content>',
    );
    expect(output).toContain("// TODO: FocusedLayout.Content has a spread attribute here");
  });

  test("does not flag a spread attribute when isFullBleed is already a named prop", () => {
    const input =
      "<FocusedLayout.Content isFullBleed {...contentProps}><Form /></FocusedLayout.Content>";
    const output = transform(input);
    expect(output).toBe(input);
  });

  test("promotes an existing declaration-level type-only MainContainer import to a value import", () => {
    const input = [
      "import type { MainContainer } from '@reapit/elements/core/main-container'",
      "<FocusedLayout.Content><Form /></FocusedLayout.Content>",
    ].join("\n");
    const output = transform(input);
    expect(output).toContain(
      "import { MainContainer } from '@reapit/elements/core/main-container'",
    );
    expect(output).not.toContain("import type { MainContainer }");
    expect(output).toContain('<MainContainer size="wide"><Form /></MainContainer>');
  });

  test("promotes an existing specifier-level type-only MainContainer import to a value import", () => {
    const input = [
      "import { type MainContainer } from '@reapit/elements/core/main-container'",
      "<FocusedLayout.Content><Form /></FocusedLayout.Content>",
    ].join("\n");
    const output = transform(input);
    expect(output).toContain(
      "import { MainContainer } from '@reapit/elements/core/main-container'",
    );
    expect(output).not.toContain("type MainContainer");
    expect(output).toContain('<MainContainer size="wide"><Form /></MainContainer>');
  });

  test("preserves a sibling type-only import when promoting a multi-specifier declaration", () => {
    const input = [
      "import type { Button, MainContainer } from '@reapit/elements'",
      "<FocusedLayout.Content><Form /></FocusedLayout.Content>",
    ].join("\n");
    const output = transform(input);
    expect(output).toContain("import { type Button, MainContainer } from '@reapit/elements'");
  });

  test("promotes an empty type-only import declaration when adding MainContainer", () => {
    const input = [
      "import type {} from '@reapit/elements/core/main-container'",
      "<FocusedLayout.Content><Form /></FocusedLayout.Content>",
    ].join("\n");
    const output = transform(input);
    expect(output).toContain(
      "import { MainContainer } from '@reapit/elements/core/main-container'",
    );
    expect(output).not.toContain("import type");
  });

  test("falls back to a numbered alias when the first fallback alias is also in use", () => {
    const input = [
      "import { MainContainer } from './local-main-container'",
      "import { ElementsMainContainer } from './another-container'",
      '<FocusedLayout.Content><MainContainer size="wide"><Form /></MainContainer></FocusedLayout.Content>',
    ].join("\n");
    const output = transform(input);
    expect(output).toContain(
      "import { MainContainer as ElementsMainContainer2 } from '@reapit/elements/core/main-container'",
    );
    expect(output).toContain(
      '<ElementsMainContainer2 size="wide"><MainContainer size="wide"><Form /></MainContainer></ElementsMainContainer2>',
    );
  });
});

describe("direct component usage (FocusedLayoutContent)", () => {
  test("adds isFullBleed and wraps children when imported directly", () => {
    const input = [
      "import { FocusedLayoutContent } from '@reapit/elements/core/focused-layout'",
      "<FocusedLayoutContent><Form /></FocusedLayoutContent>",
    ].join("\n");
    const output = transform(input);
    expect(output).toContain(
      '<FocusedLayoutContent isFullBleed><MainContainer size="wide"><Form /></MainContainer></FocusedLayoutContent>',
    );
  });

  test("respects a local alias for FocusedLayoutContent", () => {
    const input = [
      "import { FocusedLayoutContent as Content } from '@reapit/elements/core/focused-layout'",
      "<Content><Form /></Content>",
    ].join("\n");
    const output = transform(input);
    expect(output).toContain(
      '<Content isFullBleed><MainContainer size="wide"><Form /></MainContainer></Content>',
    );
  });
});

describe("no-op cases", () => {
  test("returns source unchanged when FocusedLayout is not used", () => {
    const input = "<SomeOtherComponent><Form /></SomeOtherComponent>";
    const output = transform(input);
    expect(output).toBe(input);
  });

  test("does not touch other FocusedLayout subcomponents", () => {
    const input = "<FocusedLayout.TopBar><Title>Hello</Title></FocusedLayout.TopBar>";
    const output = transform(input);
    expect(output).toBe(input);
  });
});
