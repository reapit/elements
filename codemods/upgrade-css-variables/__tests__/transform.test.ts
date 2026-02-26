import transform from '../transform'

// ---------------------------------------------------------------------------
// Early exit
// ---------------------------------------------------------------------------

describe('early exit', () => {
  test('returns source unchanged when no var(-- references present', () => {
    const input = 'color: red; background: blue;'
    expect(transform(input)).toBe(input)
  })

  test('returns source unchanged when only non-legacy vars are present', () => {
    const input = 'color: var(--colour-text-primary); background: var(--spacing-4);'
    expect(transform(input)).toBe(input)
  })
})

// ---------------------------------------------------------------------------
// Direct mappings — font
// ---------------------------------------------------------------------------

describe('direct mapping — font family', () => {
  test('replaces --font-sans-serif with --font-family', () => {
    const input = 'font-family: var(--font-sans-serif);'
    expect(transform(input)).toBe('font-family: var(--font-family);')
  })
})

describe('direct mapping — font sizes', () => {
  test('replaces --font-size-heading with --font-size-2xl', () => {
    expect(transform('font-size: var(--font-size-heading);')).toBe('font-size: var(--font-size-2xl);')
  })

  test('replaces --font-size-subheading with --font-size-xl', () => {
    expect(transform('font-size: var(--font-size-subheading);')).toBe('font-size: var(--font-size-xl);')
  })

  test('replaces --font-size-small-subheading with --font-size-lg', () => {
    expect(transform('font-size: var(--font-size-small-subheading);')).toBe('font-size: var(--font-size-lg);')
  })

  test('replaces --font-size-default with --font-size-base', () => {
    expect(transform('font-size: var(--font-size-default);')).toBe('font-size: var(--font-size-base);')
  })

  test('replaces --font-size-small with --font-size-sm', () => {
    expect(transform('font-size: var(--font-size-small);')).toBe('font-size: var(--font-size-sm);')
  })

  test('replaces --font-size-smallest with --font-size-xs', () => {
    expect(transform('font-size: var(--font-size-smallest);')).toBe('font-size: var(--font-size-xs);')
  })
})

describe('direct mapping — font weights', () => {
  test('replaces --font-weight-default with --font-weight-regular', () => {
    expect(transform('font-weight: var(--font-weight-default);')).toBe('font-weight: var(--font-weight-regular);')
  })

  test('replaces --font-weight-bold with --font-weight-semibold', () => {
    expect(transform('font-weight: var(--font-weight-bold);')).toBe('font-weight: var(--font-weight-semibold);')
  })

  test('replaces --font-weight-medium with --font-weight-medium (unchanged)', () => {
    expect(transform('font-weight: var(--font-weight-medium);')).toBe('font-weight: var(--font-weight-medium);')
  })
})

// ---------------------------------------------------------------------------
// Direct mappings — layout sizes
// ---------------------------------------------------------------------------

describe('direct mapping — layout sizes', () => {
  test('replaces --layout-size-base with --spacing-4', () => {
    expect(transform('padding: var(--layout-size-base);')).toBe('padding: var(--spacing-4);')
  })

  test('replaces --layout-size-molecule with --spacing-5', () => {
    expect(transform('gap: var(--layout-size-molecule);')).toBe('gap: var(--spacing-5);')
  })

  test('replaces --layout-size-atom with --spacing-3', () => {
    expect(transform('margin: var(--layout-size-atom);')).toBe('margin: var(--spacing-3);')
  })

  test('replaces --layout-size-1_2 with --spacing-2', () => {
    expect(transform('padding: var(--layout-size-1_2);')).toBe('padding: var(--spacing-2);')
  })

  test('replaces --layout-size-1_4 with --spacing-1', () => {
    expect(transform('padding: var(--layout-size-1_4);')).toBe('padding: var(--spacing-1);')
  })

  test('replaces --layout-size-3_4 with --spacing-3', () => {
    expect(transform('padding: var(--layout-size-3_4);')).toBe('padding: var(--spacing-3);')
  })

  test('replaces --layout-size-2 with --spacing-8', () => {
    expect(transform('margin: var(--layout-size-2);')).toBe('margin: var(--spacing-8);')
  })

  test('replaces --layout-size-3 with --spacing-12', () => {
    expect(transform('margin: var(--layout-size-3);')).toBe('margin: var(--spacing-12);')
  })
})

// ---------------------------------------------------------------------------
// Best-effort mappings — intent colours
// ---------------------------------------------------------------------------

describe('best-effort mapping — intent colours', () => {
  const TODO_SUFFIX = (varName: string) =>
    `/* TODO: ${varName} has no direct v5 equivalent — verify this replacement is correct for your context */`

  test('replaces --intent-primary and adds TODO comment', () => {
    const input = 'background: var(--intent-primary);'
    const output = transform(input)
    expect(output).toContain('var(--colour-fill-action-dark)')
    expect(output).toContain(TODO_SUFFIX('--intent-primary'))
  })

  test('replaces --intent-primary-light and adds TODO comment', () => {
    const output = transform('background: var(--intent-primary-light);')
    expect(output).toContain('var(--colour-fill-action-light)')
    expect(output).toContain(TODO_SUFFIX('--intent-primary-light'))
  })

  test('replaces --intent-neutral and adds TODO comment', () => {
    const output = transform('color: var(--intent-neutral);')
    expect(output).toContain('var(--colour-fill-info-dark)')
    expect(output).toContain(TODO_SUFFIX('--intent-neutral'))
  })

  test('replaces --intent-success and adds TODO comment', () => {
    const output = transform('color: var(--intent-success);')
    expect(output).toContain('var(--colour-fill-success-dark)')
    expect(output).toContain(TODO_SUFFIX('--intent-success'))
  })

  test('replaces --intent-pending and adds TODO comment', () => {
    const output = transform('color: var(--intent-pending);')
    expect(output).toContain('var(--colour-fill-pending-dark)')
    expect(output).toContain(TODO_SUFFIX('--intent-pending'))
  })

  test('replaces --intent-warning and adds TODO comment', () => {
    const output = transform('color: var(--intent-warning);')
    expect(output).toContain('var(--colour-fill-warning-dark)')
    expect(output).toContain(TODO_SUFFIX('--intent-warning'))
  })

  test('replaces --intent-danger and adds TODO comment', () => {
    const output = transform('color: var(--intent-danger);')
    expect(output).toContain('var(--colour-fill-error-dark)')
    expect(output).toContain(TODO_SUFFIX('--intent-danger'))
  })

  test('replaces --intent-default and adds TODO comment', () => {
    const output = transform('color: var(--intent-default);')
    expect(output).toContain('var(--colour-fill-neutral-dark)')
    expect(output).toContain(TODO_SUFFIX('--intent-default'))
  })
})

// ---------------------------------------------------------------------------
// Best-effort mappings — neutral aliases
// ---------------------------------------------------------------------------

describe('best-effort mapping — neutral aliases', () => {
  const TODO_SUFFIX = (varName: string) =>
    `/* TODO: ${varName} has no direct v5 equivalent — verify this replacement is correct for your context */`

  test('replaces --white and adds TODO comment', () => {
    const output = transform('background: var(--white);')
    expect(output).toContain('var(--colour-fill-white)')
    expect(output).toContain(TODO_SUFFIX('--white'))
  })

  test('replaces --black and adds TODO comment', () => {
    const output = transform('color: var(--black);')
    expect(output).toContain('var(--colour-fill-neutral-darkest)')
    expect(output).toContain(TODO_SUFFIX('--black'))
  })

  test('replaces --neutral-darkest and adds TODO comment', () => {
    const output = transform('color: var(--neutral-darkest);')
    expect(output).toContain('var(--colour-fill-neutral-darkest)')
    expect(output).toContain(TODO_SUFFIX('--neutral-darkest'))
  })

  test('replaces --neutral-light and adds TODO comment', () => {
    const output = transform('background: var(--neutral-light);')
    expect(output).toContain('var(--colour-fill-neutral-light)')
    expect(output).toContain(TODO_SUFFIX('--neutral-light'))
  })
})

// ---------------------------------------------------------------------------
// Best-effort mappings — deprecated aliases
// ---------------------------------------------------------------------------

describe('best-effort mapping — deprecated intent aliases', () => {
  const TODO_SUFFIX = (varName: string) =>
    `/* TODO: ${varName} has no direct v5 equivalent — verify this replacement is correct for your context */`

  test('replaces --blue-light and adds TODO comment', () => {
    const output = transform('border-color: var(--blue-light);')
    expect(output).toContain('var(--colour-fill-action-light)')
    expect(output).toContain(TODO_SUFFIX('--blue-light'))
  })

  test('replaces --blue-dark and adds TODO comment', () => {
    const output = transform('color: var(--blue-dark);')
    expect(output).toContain('var(--colour-fill-action-dark)')
    expect(output).toContain(TODO_SUFFIX('--blue-dark'))
  })

  test('replaces --intent-secondary and adds TODO comment', () => {
    const output = transform('color: var(--intent-secondary);')
    expect(output).toContain('var(--colour-fill-action-dark)')
    expect(output).toContain(TODO_SUFFIX('--intent-secondary'))
  })

  test('replaces --intent-critical and adds TODO comment', () => {
    const output = transform('color: var(--intent-critical);')
    expect(output).toContain('var(--colour-fill-action-dark)')
    expect(output).toContain(TODO_SUFFIX('--intent-critical'))
  })
})

// ---------------------------------------------------------------------------
// Fallback value preservation
// ---------------------------------------------------------------------------

describe('fallback value preservation', () => {
  test('preserves existing fallback for direct mapping', () => {
    const input = 'font-size: var(--font-size-heading, 1.5rem);'
    const output = transform(input)
    expect(output).toBe('font-size: var(--font-size-2xl, 1.5rem);')
  })

  test('preserves existing fallback for best-effort mapping', () => {
    const input = 'color: var(--intent-primary, #4e56ea);'
    const output = transform(input)
    expect(output).toContain('var(--colour-fill-action-dark, #4e56ea)')
  })

  test('preserves fallback with whitespace', () => {
    const input = 'color: var(--intent-primary, blue);'
    const output = transform(input)
    expect(output).toContain('var(--colour-fill-action-dark, blue)')
  })

  test('does not add fallbacks when none existed', () => {
    const input = 'color: var(--intent-primary);'
    const output = transform(input)
    expect(output).toContain('var(--colour-fill-action-dark)')
    expect(output).not.toMatch(/var\(--colour-fill-action-dark,[^)]+\)/)
  })
})

// ---------------------------------------------------------------------------
// Unmapped variables
// ---------------------------------------------------------------------------

describe('unmapped variables', () => {
  test('leaves --component-input-bg unchanged', () => {
    const input = 'background: var(--component-input-bg);'
    expect(transform(input)).toBe(input)
  })

  test('leaves --nav-menu-text unchanged', () => {
    const input = 'color: var(--nav-menu-text);'
    expect(transform(input)).toBe(input)
  })

  test('leaves --z-index-sticky unchanged', () => {
    const input = 'z-index: var(--z-index-sticky);'
    expect(transform(input)).toBe(input)
  })

  test('leaves --util-border-grey unchanged', () => {
    const input = 'border: var(--util-border-grey);'
    expect(transform(input)).toBe(input)
  })

  test('leaves --default-border-radius unchanged', () => {
    const input = 'border-radius: var(--default-border-radius);'
    expect(transform(input)).toBe(input)
  })

  test('leaves v5 tokens unchanged', () => {
    const input = 'color: var(--colour-text-primary);'
    expect(transform(input)).toBe(input)
  })
})

// ---------------------------------------------------------------------------
// Multiple replacements in a single source string
// ---------------------------------------------------------------------------

describe('multiple replacements', () => {
  test('replaces multiple legacy variables in one pass', () => {
    const input = `
      font-family: var(--font-sans-serif);
      font-size: var(--font-size-default);
      padding: var(--layout-size-base);
    `
    const output = transform(input)
    expect(output).toContain('var(--font-family)')
    expect(output).toContain('var(--font-size-base)')
    expect(output).toContain('var(--spacing-4)')
    expect(output).not.toContain('var(--font-sans-serif)')
    expect(output).not.toContain('var(--font-size-default)')
    expect(output).not.toContain('var(--layout-size-base)')
  })

  test('handles a mix of mapped and unmapped variables', () => {
    const input = 'color: var(--intent-primary); z-index: var(--z-index-sticky);'
    const output = transform(input)
    expect(output).toContain('var(--colour-fill-action-dark)')
    expect(output).toContain('var(--z-index-sticky)')
  })

  test('replaces multiple occurrences of the same variable', () => {
    const input = 'color: var(--intent-primary); border-color: var(--intent-primary);'
    const output = transform(input)
    const matches = output.match(/var\(--colour-fill-action-dark\)/g)
    expect(matches).toHaveLength(2)
  })
})

// ---------------------------------------------------------------------------
// File type / content type variety
// ---------------------------------------------------------------------------

describe('file type variety', () => {
  test('transforms CSS property declarations', () => {
    const input = `.btn { background-color: var(--intent-primary); color: var(--white); }`
    const output = transform(input)
    expect(output).toContain('var(--colour-fill-action-dark)')
    expect(output).toContain('var(--colour-fill-white)')
  })

  test('transforms Linaria tagged template literals', () => {
    const input = `
      const styles = css\`
        color: var(--intent-neutral);
        font-size: var(--font-size-default);
      \`
    `
    const output = transform(input)
    expect(output).toContain('var(--colour-fill-info-dark)')
    expect(output).toContain('var(--font-size-base)')
  })

  test('transforms inline style strings in TSX', () => {
    const input = `const el = <div style={{ color: 'var(--intent-danger)' }} />`
    const output = transform(input)
    expect(output).toContain('var(--colour-fill-error-dark)')
    expect(output).not.toContain('var(--intent-danger)')
  })

  test('transforms SCSS content', () => {
    const input = `
      .element {
        padding: var(--layout-size-base);
        &:hover {
          background: var(--intent-primary-light);
        }
      }
    `
    const output = transform(input)
    expect(output).toContain('var(--spacing-4)')
    expect(output).toContain('var(--colour-fill-action-light)')
  })
})

// ---------------------------------------------------------------------------
// Draft --color-* variables
// ---------------------------------------------------------------------------

describe('draft --color-* palette variables', () => {
  const TODO_SUFFIX = (varName: string) =>
    `/* TODO: ${varName} has no direct v5 equivalent — verify this replacement is correct for your context */`

  test('replaces --color-grey-900 and adds TODO comment', () => {
    const output = transform('color: var(--color-grey-900);')
    expect(output).toContain('var(--colour-text-primary)')
    expect(output).toContain(TODO_SUFFIX('--color-grey-900'))
  })

  test('replaces --color-purple-500 and adds TODO comment', () => {
    const output = transform('background: var(--color-purple-500);')
    expect(output).toContain('var(--colour-fill-action-dark)')
    expect(output).toContain(TODO_SUFFIX('--color-purple-500'))
  })

  test('replaces --color-red-500 and adds TODO comment', () => {
    const output = transform('color: var(--color-red-500);')
    expect(output).toContain('var(--colour-fill-error-dark)')
    expect(output).toContain(TODO_SUFFIX('--color-red-500'))
  })
})

// ---------------------------------------------------------------------------
// Nested parentheses in fallback values
// ---------------------------------------------------------------------------

describe('nested parentheses in fallback values', () => {
  test('preserves rgba() fallback for a direct mapping', () => {
    const input = 'font-size: var(--font-size-heading, calc(1rem + 2px));'
    expect(transform(input)).toBe('font-size: var(--font-size-2xl, calc(1rem + 2px));')
  })

  test('preserves rgba() function fallback', () => {
    const input = 'color: var(--intent-primary, rgba(0, 0, 0, 0.5));'
    const output = transform(input)
    expect(output).toContain('var(--colour-fill-action-dark, rgba(0, 0, 0, 0.5))')
  })

  test('preserves nested var() fallback', () => {
    const input = 'color: var(--intent-primary, var(--colour-fill-action-dark));'
    const output = transform(input)
    expect(output).toContain('var(--colour-fill-action-dark, var(--colour-fill-action-dark))')
  })

  test('leaves unmapped var() with nested fallback unchanged', () => {
    const input = 'color: var(--z-index-sticky, var(--some-other));'
    expect(transform(input)).toBe(input)
  })
})

// ---------------------------------------------------------------------------
// Facade package option (should be accepted, no effect on output)
// ---------------------------------------------------------------------------

describe('facade package option', () => {
  test('accepts facadePackage option without changing behaviour', () => {
    const input = 'color: var(--intent-primary);'
    const withFacade = transform(input, 'file.tsx', { facadePackage: '@company/ui' })
    const withoutFacade = transform(input)
    expect(withFacade).toBe(withoutFacade)
  })
})
