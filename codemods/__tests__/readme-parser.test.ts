import { parseFrontMatter } from "../readme-parser";

describe("parseFrontMatter", () => {
  test("parses front matter with description", () => {
    const content = `---
description: My description
---
# My Content

Some body text.`;

    const result = parseFrontMatter(content);

    expect(result).toEqual({
      description: "My description",
      body: "# My Content\n\nSome body text.",
    });
  });

  test("parses front matter with multiple fields, extracting only description", () => {
    const content = `---
description: Transform components
author: John Doe
version: 1.0.0
---
# Documentation

This is the body.`;

    const result = parseFrontMatter(content);

    expect(result).toEqual({
      description: "Transform components",
      body: "# Documentation\n\nThis is the body.",
    });
  });

  test("returns body only when no front matter exists", () => {
    const content = `# My Content

This has no front matter.`;

    const result = parseFrontMatter(content);

    expect(result).toEqual({
      body: content,
    });
  });

  test("returns body only when front matter has no description", () => {
    const content = `---
author: Jane Smith
---
# Content

Body text here.`;

    const result = parseFrontMatter(content);

    expect(result).toEqual({
      description: undefined,
      body: "# Content\n\nBody text here.",
    });
  });

  test("handles empty body after front matter", () => {
    const content = `---
description: Empty body
---
`;

    const result = parseFrontMatter(content);

    expect(result).toEqual({
      description: "Empty body",
      body: "",
    });
  });

  test("handles empty content", () => {
    const content = "";

    const result = parseFrontMatter(content);

    expect(result).toEqual({
      body: "",
    });
  });

  test("trims whitespace from body", () => {
    const content = `---
description: Test
---


# Header

Content


`;

    const result = parseFrontMatter(content);

    expect(result.body).toBe("# Header\n\nContent");
  });

  test("handles description with special characters", () => {
    const content = `---
description: Transforms @reapit/elements v4 -> v5
---
Body content`;

    const result = parseFrontMatter(content);

    expect(result.description).toBe("Transforms @reapit/elements v4 -> v5");
  });

  test("handles description with quotes", () => {
    const content = `---
description: "Quoted description"
---
Body`;

    const result = parseFrontMatter(content);

    expect(result.description).toBe('"Quoted description"');
  });

  test("handles multiline content in body", () => {
    const content = `---
description: Short desc
---
# Heading 1

Paragraph 1

## Heading 2

Paragraph 2

\`\`\`typescript
code here
\`\`\`

Final paragraph.`;

    const result = parseFrontMatter(content);

    expect(result.body).toContain("# Heading 1");
    expect(result.body).toContain("## Heading 2");
    expect(result.body).toContain("```typescript");
    expect(result.body).toContain("Final paragraph.");
  });

  test("does not parse invalid front matter format", () => {
    const content = `--
description: Invalid
--
Body`;

    const result = parseFrontMatter(content);

    expect(result).toEqual({
      body: content,
    });
  });

  test("handles front matter without closing delimiter", () => {
    const content = `---
description: No closing
Body content`;

    const result = parseFrontMatter(content);

    expect(result).toEqual({
      body: content,
    });
  });

  test("extracts first description when multiple exist", () => {
    const content = `---
description: First description
description: Second description
---
Body`;

    const result = parseFrontMatter(content);

    expect(result.description).toBe("First description");
  });

  test("handles description with colons in value", () => {
    const content = `---
description: Transform: Old API to New API
---
Body`;

    const result = parseFrontMatter(content);

    expect(result.description).toBe("Transform: Old API to New API");
  });

  test("preserves newlines in body", () => {
    const content = `---
description: Test
---
Line 1

Line 2

Line 3`;

    const result = parseFrontMatter(content);

    expect(result.body).toBe("Line 1\n\nLine 2\n\nLine 3");
  });
});
