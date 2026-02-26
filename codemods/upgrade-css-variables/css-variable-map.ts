/**
 * Mapping of legacy v4 CSS custom properties to their v5 equivalents.
 *
 * DIRECT mappings: unambiguous 1-to-1 replacements applied silently.
 * BEST_EFFORT mappings: applied with an inline TODO comment because the correct
 *   v5 token may depend on usage context (e.g. fill vs. text vs. border).
 * UNMAPPED variables are left untouched with no comment (they have no v5
 *   equivalent or are component-scoped tokens that should be handled manually).
 */

export type MappingKind = 'direct' | 'best_effort'

export interface VariableMapping {
  /** The v5 CSS custom property name to replace the legacy variable with. */
  v5: string
  kind: MappingKind
}

/**
 * A record of legacy CSS variable names (without `var()`, without `--`) mapped
 * to their v5 replacement details.
 */
export const CSS_VARIABLE_MAP: Record<string, VariableMapping> = {
  // ---------------------------------------------------------------------------
  // Font family / monospace
  // ---------------------------------------------------------------------------
  'font-sans-serif': { v5: '--font-family', kind: 'direct' },
  // --font-monospace has no direct v5 equivalent in reapit.css; leave unmapped.

  // ---------------------------------------------------------------------------
  // Font sizes
  // ---------------------------------------------------------------------------
  'font-size-heading': { v5: '--font-size-2xl', kind: 'direct' },
  'font-size-subheading': { v5: '--font-size-xl', kind: 'direct' },
  'font-size-small-subheading': { v5: '--font-size-lg', kind: 'direct' },
  'font-size-default': { v5: '--font-size-base', kind: 'direct' },
  'font-size-small': { v5: '--font-size-sm', kind: 'direct' },
  'font-size-smallest': { v5: '--font-size-xs', kind: 'direct' },

  // ---------------------------------------------------------------------------
  // Font weights
  // ---------------------------------------------------------------------------
  'font-weight-default': { v5: '--font-weight-regular', kind: 'direct' },
  'font-weight-medium': { v5: '--font-weight-medium', kind: 'direct' },
  'font-weight-bold': { v5: '--font-weight-semibold', kind: 'direct' },

  // ---------------------------------------------------------------------------
  // Layout sizes  (legacy rem-based spacing → v5 spacing scale)
  // Note: the v5 spacing scale uses px, not rem, so the numeric values differ.
  // The mappings below are based on closest equivalent rem values.
  //   --layout-size-base:     1rem    → --spacing-4  (16px)
  //   --layout-size-molecule: 1.25rem → --spacing-5  (20px)
  //   --layout-size-atom:     0.75rem → --spacing-3  (12px)
  //   --layout-size-1_2:      0.5rem  → --spacing-2  (8px)
  //   --layout-size-1_4:      0.25rem → --spacing-1  (4px)
  //   --layout-size-3_4:      0.75rem → --spacing-3  (12px)
  //   --layout-size-2:        2rem    → --spacing-8  (32px) [closest; was 2rem]
  //   --layout-size-3:        3rem    → --spacing-12 (48px) [closest; was 3rem]
  // ---------------------------------------------------------------------------
  'layout-size-base': { v5: '--spacing-4', kind: 'direct' },
  'layout-size-molecule': { v5: '--spacing-5', kind: 'direct' },
  'layout-size-atom': { v5: '--spacing-3', kind: 'direct' },
  'layout-size-1_2': { v5: '--spacing-2', kind: 'direct' },
  'layout-size-1_4': { v5: '--spacing-1', kind: 'direct' },
  'layout-size-3_4': { v5: '--spacing-3', kind: 'direct' },
  'layout-size-2': { v5: '--spacing-8', kind: 'direct' },
  'layout-size-3': { v5: '--spacing-12', kind: 'direct' },

  // ---------------------------------------------------------------------------
  // Neutral colours  (bare aliases defined in globals.ts)
  // ---------------------------------------------------------------------------
  white: { v5: '--colour-fill-white', kind: 'best_effort' },
  black: { v5: '--colour-fill-neutral-darkest', kind: 'best_effort' },
  'neutral-darkest': { v5: '--colour-fill-neutral-darkest', kind: 'best_effort' },
  'neutral-dark': { v5: '--colour-fill-neutral-dark', kind: 'best_effort' },
  'neutral-medium': { v5: '--colour-fill-neutral-medium', kind: 'best_effort' },
  'neutral-medium-light': { v5: '--colour-fill-neutral-light', kind: 'best_effort' },
  'neutral-light': { v5: '--colour-fill-neutral-light', kind: 'best_effort' },
  'neutral-lightest': { v5: '--colour-fill-neutral-lightest', kind: 'best_effort' },

  // ---------------------------------------------------------------------------
  // Intent colours — primary (purple-500 based)
  // ---------------------------------------------------------------------------
  'intent-primary': { v5: '--colour-fill-action-dark', kind: 'best_effort' },
  'intent-primary-light': { v5: '--colour-fill-action-light', kind: 'best_effort' },
  'intent-primary-lightest': { v5: '--colour-fill-action-lightest', kind: 'best_effort' },
  'intent-primary-dark': { v5: '--colour-fill-action-dark', kind: 'best_effort' },

  // Intent — neutral (blue-500 based)
  'intent-neutral': { v5: '--colour-fill-info-dark', kind: 'best_effort' },
  'intent-neutral-light': { v5: '--colour-fill-info-light', kind: 'best_effort' },
  'intent-neutral-lightest': { v5: '--colour-fill-info-lightest', kind: 'best_effort' },
  'intent-neutral-dark': { v5: '--colour-fill-info-dark', kind: 'best_effort' },

  // Intent — success
  'intent-success': { v5: '--colour-fill-success-dark', kind: 'best_effort' },
  'intent-success-light': { v5: '--colour-fill-success-light', kind: 'best_effort' },
  'intent-success-lightest': { v5: '--colour-fill-success-lightest', kind: 'best_effort' },
  'intent-success-dark': { v5: '--colour-fill-success-dark', kind: 'best_effort' },

  // Intent — pending
  'intent-pending': { v5: '--colour-fill-pending-dark', kind: 'best_effort' },
  'intent-pending-light': { v5: '--colour-fill-pending-light', kind: 'best_effort' },
  'intent-pending-lightest': { v5: '--colour-fill-pending-lightest', kind: 'best_effort' },
  'intent-pending-dark': { v5: '--colour-fill-pending-dark', kind: 'best_effort' },

  // Intent — warning
  'intent-warning': { v5: '--colour-fill-warning-dark', kind: 'best_effort' },
  'intent-warning-light': { v5: '--colour-fill-warning-light', kind: 'best_effort' },
  'intent-warning-lightest': { v5: '--colour-fill-warning-lightest', kind: 'best_effort' },
  'intent-warning-dark': { v5: '--colour-fill-warning-dark', kind: 'best_effort' },

  // Intent — danger (error)
  'intent-danger': { v5: '--colour-fill-error-dark', kind: 'best_effort' },
  'intent-danger-light': { v5: '--colour-fill-error-light', kind: 'best_effort' },
  'intent-danger-lightest': { v5: '--colour-fill-error-lightest', kind: 'best_effort' },
  'intent-danger-dark': { v5: '--colour-fill-error-dark', kind: 'best_effort' },

  // Intent — default (neutral-500 based)
  'intent-default': { v5: '--colour-fill-neutral-dark', kind: 'best_effort' },
  'intent-default-light': { v5: '--colour-fill-neutral-light', kind: 'best_effort' },
  'intent-default-lightest': { v5: '--colour-fill-neutral-lightest', kind: 'best_effort' },
  'intent-default-dark': { v5: '--colour-fill-neutral-dark', kind: 'best_effort' },

  // ---------------------------------------------------------------------------
  // Deprecated intent aliases (defined at the bottom of globals.ts)
  // ---------------------------------------------------------------------------
  'blue-light': { v5: '--colour-fill-action-light', kind: 'best_effort' },
  'blue-light2': { v5: '--colour-fill-action-light', kind: 'best_effort' },
  'blue-dark': { v5: '--colour-fill-action-dark', kind: 'best_effort' },
  'blue-dark2': { v5: '--colour-fill-action-dark', kind: 'best_effort' },

  'intent-low': { v5: '--colour-fill-neutral-light', kind: 'best_effort' },

  'intent-secondary': { v5: '--colour-fill-action-dark', kind: 'best_effort' },
  'intent-secondary-light': { v5: '--colour-fill-action-light', kind: 'best_effort' },
  'intent-secondary-dark': { v5: '--colour-fill-action-dark', kind: 'best_effort' },

  'intent-critical': { v5: '--colour-fill-action-dark', kind: 'best_effort' },
  'intent-critical-text': { v5: '--colour-text-white', kind: 'best_effort' },
  'intent-critical-light': { v5: '--colour-fill-action-light', kind: 'best_effort' },
  'intent-critical-light-text': { v5: '--colour-fill-neutral-darkest', kind: 'best_effort' },
  'intent-critical-dark': { v5: '--colour-fill-action-dark', kind: 'best_effort' },
  'intent-critical-dark-text': { v5: '--colour-text-white', kind: 'best_effort' },

  // ---------------------------------------------------------------------------
  // Draft --color-* variables (possible consumer usage from older style guides)
  // These are not defined in the elements codebase but may exist in consumers.
  // ---------------------------------------------------------------------------

  // Greys (mapped to nearest neutral semantic tokens)
  'color-grey-050': { v5: '--colour-fill-neutral-lightest', kind: 'best_effort' },
  'color-grey-100': { v5: '--colour-fill-neutral-lightest', kind: 'best_effort' },
  'color-grey-200': { v5: '--colour-fill-neutral-light', kind: 'best_effort' },
  'color-grey-300': { v5: '--colour-fill-neutral-medium', kind: 'best_effort' },
  'color-grey-400': { v5: '--colour-fill-neutral-medium', kind: 'best_effort' },
  'color-grey-500': { v5: '--colour-fill-neutral-dark', kind: 'best_effort' },
  'color-grey-600': { v5: '--colour-fill-neutral-dark', kind: 'best_effort' },
  'color-grey-700': { v5: '--colour-fill-neutral-darkest', kind: 'best_effort' },
  'color-grey-800': { v5: '--colour-fill-neutral-darkest', kind: 'best_effort' },
  'color-grey-900': { v5: '--colour-text-primary', kind: 'best_effort' },

  // Purples (action/primary in v5)
  'color-purple-050': { v5: '--colour-fill-action-lightest', kind: 'best_effort' },
  'color-purple-100': { v5: '--colour-fill-action-lightest', kind: 'best_effort' },
  'color-purple-200': { v5: '--colour-fill-action-light', kind: 'best_effort' },
  'color-purple-300': { v5: '--colour-fill-action-light', kind: 'best_effort' },
  'color-purple-400': { v5: '--colour-fill-action-dark', kind: 'best_effort' },
  'color-purple-500': { v5: '--colour-fill-action-dark', kind: 'best_effort' },
  'color-purple-600': { v5: '--colour-fill-action-dark', kind: 'best_effort' },
  'color-purple-700': { v5: '--colour-fill-action-dark', kind: 'best_effort' },
  'color-purple-800': { v5: '--colour-fill-action-dark', kind: 'best_effort' },
  'color-purple-900': { v5: '--colour-fill-action-dark', kind: 'best_effort' },

  // Blues (info in v5)
  'color-blue-050': { v5: '--colour-fill-info-lightest', kind: 'best_effort' },
  'color-blue-100': { v5: '--colour-fill-info-lightest', kind: 'best_effort' },
  'color-blue-200': { v5: '--colour-fill-info-light', kind: 'best_effort' },
  'color-blue-300': { v5: '--colour-fill-info-light', kind: 'best_effort' },
  'color-blue-400': { v5: '--colour-fill-info-dark', kind: 'best_effort' },
  'color-blue-500': { v5: '--colour-fill-info-dark', kind: 'best_effort' },
  'color-blue-600': { v5: '--colour-fill-info-dark', kind: 'best_effort' },
  'color-blue-700': { v5: '--colour-fill-info-dark', kind: 'best_effort' },
  'color-blue-800': { v5: '--colour-fill-info-dark', kind: 'best_effort' },
  'color-blue-900': { v5: '--colour-fill-info-dark', kind: 'best_effort' },

  // Greens (success in v5)
  'color-green-050': { v5: '--colour-fill-success-lightest', kind: 'best_effort' },
  'color-green-100': { v5: '--colour-fill-success-lightest', kind: 'best_effort' },
  'color-green-200': { v5: '--colour-fill-success-light', kind: 'best_effort' },
  'color-green-300': { v5: '--colour-fill-success-light', kind: 'best_effort' },
  'color-green-400': { v5: '--colour-fill-success-dark', kind: 'best_effort' },
  'color-green-500': { v5: '--colour-fill-success-dark', kind: 'best_effort' },
  'color-green-600': { v5: '--colour-fill-success-dark', kind: 'best_effort' },
  'color-green-700': { v5: '--colour-fill-success-dark', kind: 'best_effort' },
  'color-green-800': { v5: '--colour-fill-success-dark', kind: 'best_effort' },
  'color-green-900': { v5: '--colour-fill-success-dark', kind: 'best_effort' },

  // Yellows (pending in v5)
  'color-yellow-050': { v5: '--colour-fill-pending-lightest', kind: 'best_effort' },
  'color-yellow-100': { v5: '--colour-fill-pending-lightest', kind: 'best_effort' },
  'color-yellow-200': { v5: '--colour-fill-pending-light', kind: 'best_effort' },
  'color-yellow-300': { v5: '--colour-fill-pending-light', kind: 'best_effort' },
  'color-yellow-400': { v5: '--colour-fill-pending-dark', kind: 'best_effort' },
  'color-yellow-500': { v5: '--colour-fill-pending-dark', kind: 'best_effort' },
  'color-yellow-600': { v5: '--colour-fill-pending-dark', kind: 'best_effort' },
  'color-yellow-700': { v5: '--colour-fill-pending-dark', kind: 'best_effort' },
  'color-yellow-800': { v5: '--colour-fill-pending-dark', kind: 'best_effort' },
  'color-yellow-900': { v5: '--colour-fill-pending-dark', kind: 'best_effort' },

  // Oranges (warning in v5)
  'color-orange-050': { v5: '--colour-fill-warning-lightest', kind: 'best_effort' },
  'color-orange-100': { v5: '--colour-fill-warning-lightest', kind: 'best_effort' },
  'color-orange-200': { v5: '--colour-fill-warning-light', kind: 'best_effort' },
  'color-orange-300': { v5: '--colour-fill-warning-light', kind: 'best_effort' },
  'color-orange-400': { v5: '--colour-fill-warning-dark', kind: 'best_effort' },
  'color-orange-500': { v5: '--colour-fill-warning-dark', kind: 'best_effort' },
  'color-orange-600': { v5: '--colour-fill-warning-dark', kind: 'best_effort' },
  'color-orange-700': { v5: '--colour-fill-warning-dark', kind: 'best_effort' },
  'color-orange-800': { v5: '--colour-fill-warning-dark', kind: 'best_effort' },
  'color-orange-900': { v5: '--colour-fill-warning-dark', kind: 'best_effort' },

  // Reds (error/danger in v5)
  'color-red-050': { v5: '--colour-fill-error-lightest', kind: 'best_effort' },
  'color-red-100': { v5: '--colour-fill-error-lightest', kind: 'best_effort' },
  'color-red-200': { v5: '--colour-fill-error-light', kind: 'best_effort' },
  'color-red-300': { v5: '--colour-fill-error-light', kind: 'best_effort' },
  'color-red-400': { v5: '--colour-fill-error-dark', kind: 'best_effort' },
  'color-red-500': { v5: '--colour-fill-error-dark', kind: 'best_effort' },
  'color-red-600': { v5: '--colour-fill-error-dark', kind: 'best_effort' },
  'color-red-700': { v5: '--colour-fill-error-dark', kind: 'best_effort' },
  'color-red-800': { v5: '--colour-fill-error-dark', kind: 'best_effort' },
  'color-red-900': { v5: '--colour-fill-error-dark', kind: 'best_effort' },
}

/**
 * Returns the TODO comment text to append for a best-effort mapping.
 */
export function bestEffortComment(legacyVar: string): string {
  return `/* TODO: ${legacyVar} has no direct v5 equivalent — verify this replacement is correct for your context */`
}
