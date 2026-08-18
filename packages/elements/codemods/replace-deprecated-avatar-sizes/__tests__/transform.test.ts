import transform from "../transform";

describe("Avatar size migration", () => {
  test('transforms size="small" to size="sm"', () => {
    const input = `
import { Avatar } from '@reapit/elements'
<Avatar size="small" />
`;
    const output = transform(input, "test.tsx");
    expect(output).toContain('size="sm"');
    expect(output).not.toContain('size="small"');
  });

  test('transforms size="medium" to size="md"', () => {
    const input = `
import { Avatar } from '@reapit/elements'
<Avatar size="medium" />
`;
    const output = transform(input, "test.tsx");
    expect(output).toContain('size="md"');
    expect(output).not.toContain('size="medium"');
  });

  test("leaves dynamic size unchanged", () => {
    const input = `
import { Avatar } from '@reapit/elements'
<Avatar size={someSize} />
`;
    const output = transform(input, "test.tsx");
    expect(output).toContain("size={someSize}");
  });

  test("leaves already-current sizes unchanged", () => {
    const input = `
import { Avatar } from '@reapit/elements'
<Avatar size="lg" />
`;
    expect(transform(input, "test.tsx")).toBe(input);
  });
});

describe("AvatarButton and AvatarAnchor", () => {
  test('transforms AvatarButton size="small"', () => {
    const input = `
import { AvatarButton } from '@reapit/elements'
<AvatarButton aria-label="Edit" size="small" />
`;
    const output = transform(input, "test.tsx");
    expect(output).toContain('size="sm"');
  });

  test('transforms AvatarAnchor size="medium"', () => {
    const input = `
import { AvatarAnchor } from '@reapit/elements'
<AvatarAnchor aria-label="Profile" href="/profile" size="medium" />
`;
    const output = transform(input, "test.tsx");
    expect(output).toContain('size="md"');
  });
});

describe("multiple elements", () => {
  test("handles multiple Avatar elements in the same file", () => {
    const input = `
import { Avatar } from '@reapit/elements'
<Avatar size="small" />
<Avatar size="medium" />
`;
    const output = transform(input, "test.tsx");
    expect(output).toContain('size="sm"');
    expect(output).toContain('size="md"');
  });
});

describe("no-op cases", () => {
  test("returns source unchanged when size is not deprecated", () => {
    const input = `
import { Avatar } from '@reapit/elements'
<Avatar size="xl" />
`;
    expect(transform(input, "test.tsx")).toBe(input);
  });

  test("returns source unchanged when Avatar not imported from elements", () => {
    const input = `
import { Avatar } from 'some-other-library'
<Avatar size="small" />
`;
    expect(transform(input, "test.tsx")).toBe(input);
  });

  test("does not change imports", () => {
    const input = `
import { Avatar } from '@reapit/elements'
<Avatar size="small" />
`;
    const output = transform(input, "test.tsx");
    expect(output).toContain("from '@reapit/elements'");
  });
});

describe("aliased import", () => {
  test("handles aliased Avatar import", () => {
    const input = `
import { Avatar as UserAvatar } from '@reapit/elements'
<UserAvatar size="small" />
`;
    const output = transform(input, "test.tsx");
    expect(output).toContain('size="sm"');
  });
});

describe("facade package support", () => {
  test("transforms size when importing from a facade package", () => {
    const input = `
import { Avatar } from '@company/ui'
<Avatar size="medium" />
`;
    const output = transform(input, "test.tsx", { facadePackage: "@company/ui" });
    expect(output).toContain('size="md"');
  });
});
