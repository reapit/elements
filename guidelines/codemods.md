# Codemods

This guide defines the process for creating and maintaining codemods in Reapit Elements.

## What is a Codemod?

A codemod automates code transformation to migrate users from one API to another. Codemods allow breaking changes to be introduced with a migration path that minimises manual effort.

## When to Create a Codemod

Create a codemod when breaking API changes:

- **Component renames** - Renaming a component or namespace property
- **Prop changes** - Renaming, removing, or restructuring props
- **Import path changes** - Changing where components are exported from
- **Pattern migrations** - Moving from one usage pattern to another

**Skip codemods for:**

- New features that preserve existing code
- Bug fixes that maintain the same API
- Internal implementation changes
- CSS or styling updates that preserve the API

## Creating a New Codemod

### 1. Create the Directory Structure

```bash
codemods/
  my-codemod-name/
    transform.ts       # Transform function
    README.md          # Documentation
    __tests__/
      transform.test.ts # Test suite
```

### 2. Write the Transform Function

Create `transform.ts` with a default export:

```typescript
/**
 * Transforms source code per migration rules.
 *
 * @param source - Source code to transform
 * @param filePath - Path to file being transformed
 * @returns Transformed source code
 */
export default function transform(source: string, filePath: string): string {
  // Return early if unchanged
  if (!source.includes('OldComponent')) {
    return source
  }

  // Perform transformation
  let result = source
  result = result.replace(/OldComponent/g, 'NewComponent')

  return result
}
```

**Guidelines:**

- Export as default function
- Accept `(source: string, filePath: string)` parameters
- Return transformed source or original if unchanged
- Handle edge cases gracefully
- Use TypeScript for type safety
- Keep transformations focused and predictable

### 3. Write Documentation

Create `README.md` with this structure:

```markdown
---
description: Brief one-line description for the list command
---

# Codemod Title

Full description of what this codemod does and why it exists.

## Usage

\`\`\`bash

# List available codemods

yarn codemod list

# Show detailed info about this codemod

yarn codemod info my-codemod-name

# Run on a directory

yarn codemod apply my-codemod-name src/

# Preview changes without writing files

yarn codemod apply my-codemod-name src/ --dry-run
\`\`\`

## Background

Explain context:

- What changed in the API
- Why the change was necessary
- What this codemod automates

## Transformations

Document all transformations with before/after examples:

| Before                          | After                              |
| ------------------------------- | ---------------------------------- |
| `<OldComponent />`              | `<NewComponent />`                 |
| `<OldComponent prop="value" />` | `<NewComponent newProp="value" />` |

## Limitations

Document what the codemod cannot handle:

- Complex dynamic patterns
- Cases requiring manual intervention
- Scenarios where code review is needed
```

**Required elements:**

- Front matter with `description` field
- Usage section with example commands
- Background section explaining context
- Transformations table with examples
- Limitations section (if applicable)

### 4. Write Tests

Create `__tests__/transform.test.ts`:

```typescript
import transform from '../index'

test('transforms component name', () => {
  const input = `<OldComponent />`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(`<NewComponent />`)
})

test('handles multiple occurrences', () => {
  const input = `
    <OldComponent />
    <OldComponent prop="value" />
  `
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

**Test coverage guidelines:**

- Test the primary transformation
- Test edge cases (children, props, multiple occurrences)
- Test that unchanged code returns as-is
- Test complex real-world scenarios
- Include both positive and negative cases

### 5. Generate the Manifest

After creating your codemod, regenerate the manifest:

```bash
yarn generate:codemod-manifest
```

This updates `codemods/manifest.json` with your new codemod's metadata.

### 6. Test Locally

Test your codemod against real code:

```bash
# Dry run to preview changes
node --experimental-strip-types codemods/bin.ts apply my-codemod-name /path/to/test/project --dry-run

# Apply changes
node --experimental-strip-types codemods/bin.ts apply my-codemod-name /path/to/test/project
```

**Testing checklist:**

- [ ] Dry run shows expected changes
- [ ] Applied changes compile without errors
- [ ] No unintended side effects
- [ ] Edge cases are handled correctly
- [ ] Code review confirms transformations are safe

### 7. Commit

Commit both your codemod and the updated manifest:

```bash
git add codemods/my-codemod-name/
git add codemods/manifest.json
git commit -m "Add codemod for [migration description]"
```

## Advanced Patterns

### Using AST Transformations

For complex transformations, use an AST parser like `ts-morph`:

```typescript
import { Project, SyntaxKind } from 'ts-morph'

export default function transform(source: string, filePath: string): string {
  const project = new Project({ useInMemoryFileSystem: true })
  const sourceFile = project.createSourceFile('temp.tsx', source)

  // Find all JSX elements
  sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement).forEach((element) => {
    const openingElement = element.getOpeningElement()
    const tagName = openingElement.getTagNameNode()

    if (tagName.getText() === 'OldComponent') {
      tagName.replaceWithText('NewComponent')
    }
  })

  return sourceFile.getFullText()
}
```

**When to use AST:**

- Renaming imports with accuracy
- Modifying prop names or values
- Restructuring component hierarchies
- Complex pattern matching that regex cannot handle

### Handling Imports

Clean up imports when removing unused components:

```typescript
export default function transform(source: string, filePath: string): string {
  let result = source

  // Transform components
  result = result.replace(/<OldComponent /g, '<NewComponent ')

  // Update imports only if old component no longer used
  if (!result.includes('OldComponent')) {
    result = result.replace(
      /import\s*{\s*([^}]*\bOldComponent\b[^}]*)\s*}\s*from\s*'([^']+)'/g,
      (match, imports, from) => {
        const updatedImports = imports
          .split(',')
          .map((imp: string) => imp.trim())
          .filter((imp: string) => imp !== 'OldComponent')
          .join(', ')

        return updatedImports ? `import { ${updatedImports} } from '${from}'` : `import {} from '${from}'`
      },
    )
  }

  return result
}
```

### Preserving Formatting

Maintain code formatting and comments:

```typescript
export default function transform(source: string, filePath: string): string {
  // Use precise regex to avoid breaking formatting
  return source.replace(/(<)OldComponent(\s|>|\/)/g, '$1NewComponent$2')
}
```

**Best practices:**

- Preserve whitespace where possible
- Keep comments intact
- Match indentation of replaced code
- Use capture groups in regex to maintain structure

## Security Considerations

Codemods execute user-provided file operations. The CLI enforces security:

- **Name validation** - Codemod names are validated against the static manifest
- **Path validation** - Directory paths are validated with `isPathSafe()`
- **No dynamic loading** - Only codemods in the manifest can be executed

**You need not implement security checks in your transform function.** Focus on correctness and safety of the transformation itself.

## Testing Strategy

### Unit Tests

Test the transform function in isolation:

```typescript
test('description of transformation', () => {
  const input = `/* source code */`
  const expected = `/* transformed code */`
  const output = transform(input, 'test.tsx')
  expect(output).toBe(expected)
})
```

### Integration Tests

Run the codemod against real project files during development:

```bash
# Create test fixtures
mkdir -p /tmp/codemod-test/src
echo '<OldComponent />' > /tmp/codemod-test/src/App.tsx

# Run codemod
node --experimental-strip-types codemods/bin.ts apply my-codemod-name /tmp/codemod-test/src --dry-run
```

### Manual Verification

Before releasing, complete these steps:

1. Test against the Reapit Elements Storybook
2. Test against real downstream projects
3. Review transformed code for correctness
4. Verify TypeScript compilation succeeds
5. Confirm linting passes

## Common Mistakes

**Overly aggressive transformations**

```typescript
// ❌ Bad: Transforms too much
source.replace(/Button/g, 'NewButton')
// Transforms: "Button", "ButtonGroup", "submitButton", "//Button comment"

// ✅ Good: Precise pattern matching
source.replace(/<Button(\s|>|\/)/g, '<NewButton$1')
// Only transforms JSX component usage
```

**Ignoring edge cases**

```typescript
// ❌ Bad: Assumes simple usage
source.replace('<OldComponent />', '<NewComponent />')
// Misses: <OldComponent prop="value" />

// ✅ Good: Handles variations
source.replace(/<OldComponent(\s|\/)/g, '<NewComponent$1')
```

**Breaking code**

```typescript
// ❌ Bad: Removes necessary code
source.replace(/oldProp="[^"]*"/g, '')
// Might break code that depends on the prop

// ✅ Good: Transform or document limitation
// If automatic transformation is unsafe, document in README that manual review is needed
```

**Poor performance**

```typescript
// ❌ Bad: Unnecessary work
export default function transform(source: string) {
  const project = new Project() // Always parses AST
  // ... transformation
}

// ✅ Good: Early return
export default function transform(source: string) {
  if (!source.includes('OldComponent')) {
    return source // Skip expensive operations
  }
  const project = new Project()
  // ... transformation
}
```

## Maintenance

### Updating Existing Codemods

When fixing bugs in codemods:

1. Add a failing test demonstrating the issue
2. Fix the transform function
3. Verify all tests pass
4. Update documentation if behavior changed
5. Regenerate manifest: `yarn generate:codemod-manifest`

### Deprecating Codemods

When a codemod is no longer needed:

1. Add deprecation notice to README
2. Keep the codemod available for historical migrations
3. Document in release notes that the migration is complete

Do not remove codemods from the repository - they serve as historical record and may be needed by late adopters.

## Release Process

1. **Create the codemod** following this guide
2. **Write comprehensive tests** covering all transformations
3. **Test locally** against real projects
4. **Update manifest** with `yarn generate:codemod-manifest`
5. **Commit changes** including manifest.json
6. **Document in release notes** with migration instructions
7. **Announce** with example usage and links to docs

## Checklist for New Codemods

Use this checklist when creating a codemod:

- [ ] Directory created: `codemods/[name]/`
- [ ] Transform function in `transform.ts` with default export
- [ ] Documentation in `README.md` with front matter
- [ ] Tests in `__tests__/transform.test.ts`
- [ ] All tests pass (`yarn test codemods/[name]`)
- [ ] Manifest regenerated (`yarn generate:codemod-manifest`)
- [ ] Tested locally with dry run
- [ ] Tested locally with real application
- [ ] Edge cases documented in README
- [ ] Limitations documented if any
- [ ] Both codemod and manifest committed together

## Resources

- **Testing library**: Vitest (globals enabled, no imports needed)
- **AST manipulation**: `ts-morph` package (if needed)
- **Existing codemods**: See `codemods/at-a-glance-article-card/` for reference
- **Codemod CLI**: `codemods/bin.ts` and `codemods/runner.ts`

## Getting Help

If you need assistance creating a codemod:

1. Review existing codemods in `codemods/` for patterns
2. Check unit tests for transformation examples
3. Consult the team for complex AST transformations
4. Test early and often with real-world code
