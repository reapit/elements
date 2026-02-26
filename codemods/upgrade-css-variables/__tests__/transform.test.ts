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
// Inline mappings — font
// ---------------------------------------------------------------------------

describe('inline mapping — font family', () => {
  test('inlines --font-sans-serif with full font stack', () => {
    const input = 'font-family: var(--font-sans-serif);'
    expect(transform(input)).toBe(`font-family: 'Inter', Helvetica, Arial, sans-serif /* was --font-sans-serif */;`)
  })
})

describe('inline mapping — font sizes', () => {
  test('inlines --font-size-heading with 1.5rem', () => {
    expect(transform('font-size: var(--font-size-heading);')).toBe(`font-size: 1.5rem /* was --font-size-heading */;`)
  })

  test('inlines --font-size-subheading with 1.25rem', () => {
    expect(transform('font-size: var(--font-size-subheading);')).toBe(`font-size: 1.25rem /* was --font-size-subheading */;`)
  })

  test('inlines --font-size-small-subheading with 1.125rem', () => {
    expect(transform('font-size: var(--font-size-small-subheading);')).toBe(`font-size: 1.125rem /* was --font-size-small-subheading */;`)
  })

  test('inlines --font-size-default with 0.9375rem', () => {
    expect(transform('font-size: var(--font-size-default);')).toBe(`font-size: 0.9375rem /* was --font-size-default */;`)
  })

  test('inlines --font-size-small with 0.875rem', () => {
    expect(transform('font-size: var(--font-size-small);')).toBe(`font-size: 0.875rem /* was --font-size-small */;`)
  })

  test('inlines --font-size-smallest with 0.8125rem', () => {
    expect(transform('font-size: var(--font-size-smallest);')).toBe(`font-size: 0.8125rem /* was --font-size-smallest */;`)
  })
})

describe('inline mapping — font weights', () => {
  test('inlines --font-weight-default with 400', () => {
    expect(transform('font-weight: var(--font-weight-default);')).toBe(`font-weight: 400 /* was --font-weight-default */;`)
  })

  test('inlines --font-weight-bold with 600', () => {
    expect(transform('font-weight: var(--font-weight-bold);')).toBe(`font-weight: 600 /* was --font-weight-bold */;`)
  })

  test('inlines --font-weight-medium with 500', () => {
    expect(transform('font-weight: var(--font-weight-medium);')).toBe(`font-weight: 500 /* was --font-weight-medium */;`)
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
  test('drops fallback and inlines value for inline mapping', () => {
    const input = 'font-size: var(--font-size-heading, 1.5rem);'
    const output = transform(input)
    expect(output).toBe('font-size: 1.5rem /* was --font-size-heading */;')
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
  test('leaves --z-index-sticky unchanged', () => {
    const input = 'z-index: var(--z-index-sticky);'
    expect(transform(input)).toBe(input)
  })

  test('leaves v5 tokens unchanged', () => {
    const input = 'color: var(--colour-text-primary);'
    expect(transform(input)).toBe(input)
  })
})

// ---------------------------------------------------------------------------
// Inline mappings — variables with no v5 equivalent but a known concrete value
// ---------------------------------------------------------------------------

describe('inline mapping — component input tokens', () => {
  test('inlines --component-input-bg', () => {
    const input = 'background: var(--component-input-bg);'
    expect(transform(input)).toBe(`background: #ffffff /* was --component-input-bg */;`)
  })

  test('inlines --component-input-border', () => {
    const input = 'border: var(--component-input-border);'
    expect(transform(input)).toBe(`border: 1px solid #d8dee4 /* was --component-input-border */;`)
  })

  test('inlines --component-input-border-focus', () => {
    const input = 'border: var(--component-input-border-focus);'
    expect(transform(input)).toBe(`border: 1px solid #4e56ea /* was --component-input-border-focus */;`)
  })

  test('inlines --component-input-shadow', () => {
    const input = 'box-shadow: var(--component-input-shadow);'
    expect(transform(input)).toBe(`box-shadow: inset 0 -1px 0 #ffffff /* was --component-input-shadow */;`)
  })
})

describe('inline mapping — nav and page tokens', () => {
  test('inlines --nav-menu-text', () => {
    const input = 'color: var(--nav-menu-text);'
    expect(transform(input)).toBe(`color: #798da1 /* was --nav-menu-text */;`)
  })

  test('inlines --page-header-border', () => {
    const input = 'border-bottom: var(--page-header-border);'
    expect(transform(input)).toBe(`border-bottom: 1px solid #e5e9ed /* was --page-header-border */;`)
  })

  test('inlines --nav-brand-height', () => {
    const input = 'height: var(--nav-brand-height);'
    expect(transform(input)).toBe(`height: 1.5rem /* was --nav-brand-height */;`)
  })
})

describe('inline mapping — utility tokens', () => {
  test('inlines --util-border-grey', () => {
    const input = 'border: var(--util-border-grey);'
    expect(transform(input)).toBe(`border: 1px solid #e5e9ed /* was --util-border-grey */;`)
  })

  test('inlines --util-border-purple', () => {
    const input = 'border: var(--util-border-purple);'
    expect(transform(input)).toBe(`border: 1px solid #7e9bfa /* was --util-border-purple */;`)
  })

  test('inlines --util-box-shadow', () => {
    const input = 'box-shadow: var(--util-box-shadow);'
    expect(transform(input)).toBe(`box-shadow: 0 2px 9px rgb(0 0 0 / 0.08) /* was --util-box-shadow */;`)
  })

  test('inlines --util-rems-6', () => {
    const input = 'padding: var(--util-rems-6);'
    expect(transform(input)).toBe(`padding: 1rem /* was --util-rems-6 */;`)
  })

  test('inlines --util-percentage-6', () => {
    const input = 'width: var(--util-percentage-6);'
    expect(transform(input)).toBe(`width: 50% /* was --util-percentage-6 */;`)
  })

  test('inlines --util-screen-width', () => {
    const input = 'width: var(--util-screen-width);'
    expect(transform(input)).toBe(`width: 100vw /* was --util-screen-width */;`)
  })
})

describe('inline mapping — other tokens', () => {
  test('inlines --default-border-radius', () => {
    const input = 'border-radius: var(--default-border-radius);'
    expect(transform(input)).toBe(`border-radius: 0.25rem /* was --default-border-radius */;`)
  })

  test('inlines --font-monospace', () => {
    const input = "font-family: var(--font-monospace);"
    expect(transform(input)).toBe(`font-family: 'Source Code Pro', monospace /* was --font-monospace */;`)
  })

  test('inlines --layout-size-1_3', () => {
    const input = 'margin: var(--layout-size-1_3);'
    expect(transform(input)).toBe(`margin: calc(1rem / 3) /* was --layout-size-1_3 */;`)
  })
})

describe('inline mapping — fallback is dropped', () => {
  test('drops fallback when inlining --component-input-bg', () => {
    const input = 'background: var(--component-input-bg, white);'
    expect(transform(input)).toBe(`background: #ffffff /* was --component-input-bg */;`)
  })

  test('drops nested var() fallback when inlining', () => {
    const input = 'background: var(--component-input-bg, var(--some-other));'
    expect(transform(input)).toBe(`background: #ffffff /* was --component-input-bg */;`)
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
    expect(output).toContain("'Inter', Helvetica, Arial, sans-serif /* was --font-sans-serif */")
    expect(output).toContain('0.9375rem /* was --font-size-default */')
    expect(output).toContain('var(--spacing-4)')
    expect(output).not.toMatch(/(?<!was )var\(--font-sans-serif\)/)
    expect(output).not.toMatch(/(?<!was )var\(--font-size-default\)/)
    expect(output).not.toContain('var(--layout-size-base)')
  })

  test('handles a mix of mapped, inline, and unmapped variables', () => {
    const input = 'color: var(--intent-primary); background: var(--component-input-bg); z-index: var(--z-index-sticky);'
    const output = transform(input)
    expect(output).toContain('var(--colour-fill-action-dark)')
    expect(output).toContain('#ffffff /* was --component-input-bg */')
    expect(output).toContain('var(--z-index-sticky)')
    // The original var() call should be gone; only the comment reference remains.
    expect(output).not.toMatch(/(?<!was )var\(--component-input-bg\)/)
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
    expect(output).toContain('0.9375rem /* was --font-size-default */')
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
  test('drops fallback with nested parens and inlines value for inline mapping', () => {
    const input = 'font-size: var(--font-size-heading, calc(1rem + 2px));'
    expect(transform(input)).toBe('font-size: 1.5rem /* was --font-size-heading */;')
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

// ---------------------------------------------------------------------------
// Idempotency — running the transform twice must produce the same result
// ---------------------------------------------------------------------------

describe('idempotency', () => {
  test('inline mapping: second pass is a no-op', () => {
    const input = 'font-size: var(--font-size-heading);'
    const firstPass = transform(input)
    const secondPass = transform(firstPass)
    expect(secondPass).toBe(firstPass)
  })

  test('best-effort mapping: second pass is a no-op', () => {
    const input = 'color: var(--intent-primary);'
    const firstPass = transform(input)
    const secondPass = transform(firstPass)
    expect(secondPass).toBe(firstPass)
  })

  test('direct mapping: second pass is a no-op', () => {
    const input = 'padding: var(--layout-size-base);'
    const firstPass = transform(input)
    const secondPass = transform(firstPass)
    expect(secondPass).toBe(firstPass)
  })

  test('mixed inline and best-effort: second pass is a no-op', () => {
    const input = `
      font-family: var(--font-sans-serif);
      color: var(--intent-primary);
      border: var(--util-border-purple);
    `
    const firstPass = transform(input)
    const secondPass = transform(firstPass)
    expect(secondPass).toBe(firstPass)
  })
})

// ---------------------------------------------------------------------------
// Bare palette variables (without `color-` prefix)
// ---------------------------------------------------------------------------

describe('best-effort mapping — bare palette variables', () => {
  const TODO_SUFFIX = (varName: string) =>
    `/* TODO: ${varName} has no direct v5 equivalent — verify this replacement is correct for your context */`

  test('replaces --purple-050 and adds TODO comment', () => {
    const output = transform('background: var(--purple-050);')
    expect(output).toContain('var(--colour-fill-action-lightest)')
    expect(output).toContain(TODO_SUFFIX('--purple-050'))
  })

  test('replaces --purple-300 and adds TODO comment', () => {
    const output = transform('color: var(--purple-300);')
    expect(output).toContain('var(--colour-fill-action-light)')
    expect(output).toContain(TODO_SUFFIX('--purple-300'))
  })

  test('replaces --purple-500 and adds TODO comment', () => {
    const output = transform('color: var(--purple-500);')
    expect(output).toContain('var(--colour-fill-action-dark)')
    expect(output).toContain(TODO_SUFFIX('--purple-500'))
  })

  test('replaces --green-600 and adds TODO comment', () => {
    const output = transform('color: var(--green-600);')
    expect(output).toContain('var(--colour-fill-success-dark)')
    expect(output).toContain(TODO_SUFFIX('--green-600'))
  })

  test('replaces --yellow-600 and adds TODO comment', () => {
    const output = transform('color: var(--yellow-600);')
    expect(output).toContain('var(--colour-fill-pending-dark)')
    expect(output).toContain(TODO_SUFFIX('--yellow-600'))
  })

  test('replaces --orange-600 and adds TODO comment', () => {
    const output = transform('color: var(--orange-600);')
    expect(output).toContain('var(--colour-fill-warning-dark)')
    expect(output).toContain(TODO_SUFFIX('--orange-600'))
  })

  test('replaces --red-100 and adds TODO comment', () => {
    const output = transform('background: var(--red-100);')
    expect(output).toContain('var(--colour-fill-error-lightest)')
    expect(output).toContain(TODO_SUFFIX('--red-100'))
  })

  test('replaces --blue-500 and adds TODO comment', () => {
    const output = transform('color: var(--blue-500);')
    expect(output).toContain('var(--colour-fill-info-dark)')
    expect(output).toContain(TODO_SUFFIX('--blue-500'))
  })
})
