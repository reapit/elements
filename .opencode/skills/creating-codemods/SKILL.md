---
name: creating-codemods
description: Create codemods to automate API migrations for breaking changes. Use when implementing breaking changes that require migration paths (component renames, prop changes, import path changes, or pattern migrations).
---

# Creating a Codemod

Use this skill when implementing breaking API changes that require automated migration.

**Comprehensive guideline:** [guidelines/codemods.md](../../guidelines/codemods.md)

---

## Pre-flight Check

Before creating a codemod, verify it's actually needed:

- [ ] **Breaking change confirmed** - Component renames, prop changes, import path changes, or pattern migrations
- [ ] **Not a skip case** - Not a new feature, bug fix, internal change, or CSS-only update
- [ ] **Migration value justified** - Users would benefit from automation vs manual updates

If all checks pass → proceed. Otherwise, skip the codemod.

---

## Implementation Workflow

### Step 1: Create Directory Structure

```bash
codemods/
  [codemod-name]/
    transform.ts           # Transform function
    README.md              # Documentation with front matter
    __tests__/
      transform.test.ts    # Test suite
```

- [ ] Directory created with correct structure
- [ ] Name is kebab-case and descriptive

### Step 2: Write Transform Function

Create `transform.ts`:

```typescript
/**
 * Transforms source code per migration rules.
 *
 * @param source - Source code to transform
 * @param filePath - Path to file being transformed
 * @returns Transformed source code
 */
export default function transform(source: string, filePath: string): string {
  // Early return for unchanged code
  if (!source.includes('OldComponent')) {
    return source
  }

  // Perform transformation
  let result = source
  result = result.replace(/<OldComponent(\s|>|\/)/g, '<NewComponent$1')

  return result
}
```

**Implementation checklist:**

- [ ] Default export function signature: `(source: string, filePath: string): string`
- [ ] Early return if no changes needed (performance optimisation)
- [ ] Precise pattern matching (not overly aggressive)
- [ ] Edge cases handled (props, children, multiple occurrences)
- [ ] TypeScript types used
- [ ] Comments preserved
- [ ] Formatting maintained

**Avoid common mistakes:**

- ❌ Overly aggressive: `source.replace(/Button/g, 'NewButton')` transforms too much
- ✅ Precise: `source.replace(/<Button(\s|>|\/)/g, '<NewButton$1')` targets JSX only
- ❌ Simple patterns: `replace('<OldComponent />', '<NewComponent />')` misses variations
- ✅ Flexible: `replace(/<OldComponent(\s|\/)/g, '<NewComponent$1')` handles props

### Step 3: Write Documentation

Create `README.md` with **required front matter**:

```markdown
---
description: Brief one-line description for list command
---

# Codemod Title

Full description of what this codemod does and why it exists.

## Usage

[Standard usage commands - see guideline]

## Background

- What changed in the API
- Why the change was necessary
- What this codemod automates

## Transformations

| Before             | After              |
| ------------------ | ------------------ |
| `<OldComponent />` | `<NewComponent />` |

## Limitations

Document what cannot be automated and requires manual intervention.
```

**Documentation checklist:**

- [ ] YAML front matter with `description` field
- [ ] Title and overview
- [ ] Usage section with example commands
- [ ] Background section explaining context
- [ ] Transformations table with before/after examples
- [ ] Limitations section (if applicable)
- [ ] All examples are accurate and tested

### Step 4: Write Tests

Create `__tests__/transform.test.ts`:

```typescript
import transform from '../transform'

test('transforms primary case', () => {
  const input = `<OldComponent />`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(`<NewComponent />`)
})

test('handles multiple occurrences', () => {
  const input = `<OldComponent />\n<OldComponent prop="value" />`
  const output = transform(input, 'test.tsx')
  expect(output).toContain('<NewComponent />')
  expect(output).toContain('<NewComponent prop="value" />')
})

test('returns unchanged when no matches', () => {
  const input = `<SomeOtherComponent />`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(input)
})

test('handles edge case with children', () => {
  const input = `<OldComponent><span>Content</span></OldComponent>`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(`<NewComponent><span>Content</span></NewComponent>`)
})
```

**Test coverage checklist:**

- [ ] Primary transformation tested
- [ ] Multiple occurrences tested
- [ ] Unchanged code returns as-is
- [ ] Edge cases covered (props, children, nesting)
- [ ] Complex real-world scenarios included
- [ ] Both positive and negative cases
- [ ] All tests pass: `yarn test codemods/[name]`

### Step 5: Generate Manifest

**Critical step - do not skip.**

```bash
yarn generate:codemod-manifest
```

This regenerates `codemods/manifest.json` and `codemods/transforms.ts` from the filesystem. No other files need to be updated manually.

- [ ] Manifest regenerated
- [ ] `codemods/manifest.json` updated with new codemod metadata
- [ ] No errors from generation script

### Step 6: Test Locally

Test against real code before committing:

```bash
# Dry run to preview changes
yarn dlx @reapit/elements@beta codemod apply [name] /path/to/test/project --dry-run

# Apply changes to test project
yarn dlx @reapit/elements@beta codemod apply [name] /path/to/test/project
```

**Local testing checklist:**

- [ ] Dry run shows expected changes only
- [ ] Applied changes compile without TypeScript errors
- [ ] No unintended side effects in transformed code
- [ ] Formatting and comments preserved
- [ ] Edge cases transform correctly
- [ ] Tested against realistic codebase (Storybook or downstream project)

### Step 7: Commit

Commit the codemod and generated files together:

```bash
git add codemods/[name]/
git add codemods/manifest.json
git add codemods/transforms.ts
git commit -m "Add codemod for [migration description]"
```

- [ ] Codemod directory added
- [ ] Manifest included in commit
- [ ] `codemods/transforms.ts` included in commit
- [ ] Commit message describes the migration

---

## Quality Gates

Before considering the codemod complete:

- [ ] All unit tests pass
- [ ] Local testing against real project successful
- [ ] Documentation is clear and complete
- [ ] Limitations are documented
- [ ] No overly aggressive transformations
- [ ] Performance optimised (early returns)
- [ ] Manifest and transforms generated and committed

---

## Advanced Considerations

### When to Use AST Transformations

For complex cases (renaming imports accurately, modifying prop values, restructuring hierarchies), consider using `ts-morph`:

```typescript
import { Project, SyntaxKind } from 'ts-morph'

export default function transform(source: string, filePath: string): string {
  if (!source.includes('OldComponent')) {
    return source
  }

  const project = new Project({ useInMemoryFileSystem: true })
  const sourceFile = project.createSourceFile('temp.tsx', source)

  sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement).forEach((element) => {
    const tagName = element.getOpeningElement().getTagNameNode()
    if (tagName.getText() === 'OldComponent') {
      tagName.replaceWithText('NewComponent')
    }
  })

  return sourceFile.getFullText()
}
```

Use AST when regex cannot safely handle the transformation.

### Handling Imports

When removing unused components, clean up imports:

- Check if old component still referenced before removing import
- Handle comma-separated imports correctly
- Preserve other imports in the same statement

See [guidelines/codemods.md](../../guidelines/codemods.md#handling-imports) for examples.

---

## Resources

- **Comprehensive guideline**: [guidelines/codemods.md](../../guidelines/codemods.md)
- **Example codemod**: `codemods/at-a-glance-article-card/`
- **Testing**: Vitest (globals enabled)
- **AST manipulation**: `ts-morph` package
