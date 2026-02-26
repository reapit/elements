/**
 * Mapping of legacy v4 CSS custom properties to their v5 equivalents.
 *
 * DIRECT mappings: unambiguous 1-to-1 replacements applied silently.
 * BEST_EFFORT mappings: applied with an inline TODO comment because the correct
 *   v5 token may depend on usage context (e.g. fill vs. text vs. border).
 * INLINE mappings: the var() call is replaced with the fully-resolved concrete
 *   value and a "was var(--name)" comment. Used for variables that have
 *   no v5 equivalent but whose resolved value is known and stable.
 * --z-index-* variables are left completely untouched — no transformation at all.
 */

/** A direct 1-to-1 replacement with a known v5 token. Applied silently. */
export interface DirectMapping {
  kind: 'direct'
  /** The v5 CSS custom property name to replace the legacy variable with. */
  v5: string
}

/**
 * A best-effort replacement where the correct v5 token is context-dependent.
 * Applied with an inline TODO comment to flag for manual review.
 */
export interface BestEffortMapping {
  kind: 'best_effort'
  /** The v5 CSS custom property name to replace the legacy variable with. */
  v5: string
}

/**
 * An inline replacement for variables with no v5 equivalent.
 * The var() call is replaced with `inlinedValue` plus a `/* was --name *\/` comment.
 * Any existing fallback inside the var() is dropped.
 */
export interface InlineMapping {
  kind: 'inline'
  /** The fully-resolved concrete value to substitute in place of the var() call. */
  inlinedValue: string
}

export type VariableMapping = DirectMapping | BestEffortMapping | InlineMapping

/**
 * A record of legacy CSS variable names (without `var()`, without `--`) mapped
 * to their v5 replacement details.
 */
export const CSS_VARIABLE_MAP: Record<string, VariableMapping> = {
  // ---------------------------------------------------------------------------
  // Font family / monospace
  // These variables exist only in legacy-reapit/tokens.css, not in reapit.css.
  // Inline the concrete values so consumers have no dependency on legacy tokens.
  // ---------------------------------------------------------------------------
  'font-sans-serif': { kind: 'inline', inlinedValue: `'Inter', Helvetica, Arial, sans-serif` },
  'font-monospace': { kind: 'inline', inlinedValue: `'Source Code Pro', monospace` },

  // ---------------------------------------------------------------------------
  // Font sizes
  // The v5 reapit.css uses composite tokens (--font-sm-regular-size etc.) with
  // no simple --font-size-* equivalents. Inline the legacy rem values so
  // consumers are not left pointing at legacy-reapit/ tokens.
  //   --font-size-heading:       1.5rem    (was --font-size-2xl)
  //   --font-size-subheading:    1.25rem   (was --font-size-xl)
  //   --font-size-small-subheading: 1.125rem (was --font-size-lg)
  //   --font-size-default:       0.9375rem (was --font-size-base)
  //   --font-size-small:         0.875rem  (was --font-size-sm)
  //   --font-size-smallest:      0.8125rem (was --font-size-xs)
  // ---------------------------------------------------------------------------
  'font-size-heading': { kind: 'inline', inlinedValue: '1.5rem' },
  'font-size-subheading': { kind: 'inline', inlinedValue: '1.25rem' },
  'font-size-small-subheading': { kind: 'inline', inlinedValue: '1.125rem' },
  'font-size-default': { kind: 'inline', inlinedValue: '0.9375rem' },
  'font-size-small': { kind: 'inline', inlinedValue: '0.875rem' },
  'font-size-smallest': { kind: 'inline', inlinedValue: '0.8125rem' },

  // ---------------------------------------------------------------------------
  // Font weights
  // The v5 reapit.css uses composite tokens with no simple --font-weight-*
  // equivalents. Inline the numeric values.
  // ---------------------------------------------------------------------------
  'font-weight-default': { kind: 'inline', inlinedValue: '400' },
  'font-weight-medium': { kind: 'inline', inlinedValue: '500' },
  'font-weight-bold': { kind: 'inline', inlinedValue: '600' },

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
  // Layout sizes — fractional (no v5 equivalent; inline concrete values)
  // ---------------------------------------------------------------------------
  'layout-size-1_3': { kind: 'inline', inlinedValue: 'calc(1rem / 3)' },
  'layout-size-2_3': { kind: 'inline', inlinedValue: 'calc(2rem / 3)' },

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

  // ---------------------------------------------------------------------------
  // Border radius
  // ---------------------------------------------------------------------------
  'default-border-radius': { kind: 'inline', inlinedValue: '0.25rem' },

  // ---------------------------------------------------------------------------
  // Component — input tokens
  // ---------------------------------------------------------------------------
  'component-input-bg': { kind: 'inline', inlinedValue: '#ffffff' },
  'component-input-focus-bg': { kind: 'inline', inlinedValue: '#e5e9ed' },
  'component-input-shadow': { kind: 'inline', inlinedValue: 'inset 0 -1px 0 #ffffff' },
  'component-input-border': { kind: 'inline', inlinedValue: '1px solid #d8dee4' },
  'component-input-border-focus': { kind: 'inline', inlinedValue: '1px solid #4e56ea' },
  'component-input-border-bottom': { kind: 'inline', inlinedValue: '1px solid #d8dee4' },
  'component-input-border-bottom-focus': { kind: 'inline', inlinedValue: '1px solid #000000' },

  // ---------------------------------------------------------------------------
  // Component — steps
  // ---------------------------------------------------------------------------
  'component-steps-gutter-width': { kind: 'inline', inlinedValue: '12px' },

  // ---------------------------------------------------------------------------
  // Component — table
  // ---------------------------------------------------------------------------
  'component-table-min-column-width': { kind: 'inline', inlinedValue: '3rem' },

  // ---------------------------------------------------------------------------
  // Nav menu tokens
  // ---------------------------------------------------------------------------
  'nav-menu-background-dark': { kind: 'inline', inlinedValue: '#ffffff' },
  'nav-menu-background-accent': { kind: 'inline', inlinedValue: '#ffffff' },
  'nav-menu-text': { kind: 'inline', inlinedValue: '#798da1' },
  'nav-menu-text-hover': { kind: 'inline', inlinedValue: '#607890' },
  'nav-menu-icon-primary-accent': { kind: 'inline', inlinedValue: '#506478' },
  'nav-menu-icon-secondary-accent': { kind: 'inline', inlinedValue: '#798da1' },
  'nav-brand-height': { kind: 'inline', inlinedValue: '1.5rem' },

  // ---------------------------------------------------------------------------
  // Page header tokens
  // ---------------------------------------------------------------------------
  'page-header-bg': { kind: 'inline', inlinedValue: '#ffffff' },
  'page-header-border': { kind: 'inline', inlinedValue: '1px solid #e5e9ed' },

  // ---------------------------------------------------------------------------
  // Pagination tokens
  // ---------------------------------------------------------------------------
  'pagination-bg': { kind: 'inline', inlinedValue: '#ffffff' },

  // ---------------------------------------------------------------------------
  // Utility tokens
  // ---------------------------------------------------------------------------
  'util-border-grey': { kind: 'inline', inlinedValue: '1px solid #e5e9ed' },
  'util-border-purple': { kind: 'inline', inlinedValue: '1px solid #7e9bfa' },
  'util-border-radius': { kind: 'inline', inlinedValue: '0.25rem' },
  'util-box-shadow': { kind: 'inline', inlinedValue: '0 2px 9px rgb(0 0 0 / 0.08)' },
  'util-screen-width': { kind: 'inline', inlinedValue: '100vw' },
  'util-screen-height': { kind: 'inline', inlinedValue: '100vh' },
  'util-0': { kind: 'inline', inlinedValue: '0' },
  'util-auto': { kind: 'inline', inlinedValue: 'auto' },
  'util-percentage-1': { kind: 'inline', inlinedValue: '8.3333%' },
  'util-percentage-2': { kind: 'inline', inlinedValue: '16.6667%' },
  'util-percentage-3': { kind: 'inline', inlinedValue: '25%' },
  'util-percentage-4': { kind: 'inline', inlinedValue: '33.3333%' },
  'util-percentage-5': { kind: 'inline', inlinedValue: '41.6667%' },
  'util-percentage-6': { kind: 'inline', inlinedValue: '50%' },
  'util-percentage-7': { kind: 'inline', inlinedValue: '58.3333%' },
  'util-percentage-8': { kind: 'inline', inlinedValue: '66.6667%' },
  'util-percentage-9': { kind: 'inline', inlinedValue: '75%' },
  'util-percentage-10': { kind: 'inline', inlinedValue: '83.3333%' },
  'util-percentage-11': { kind: 'inline', inlinedValue: '91.6667%' },
  'util-percentage-12': { kind: 'inline', inlinedValue: '100%' },
  'util-rems-1': { kind: 'inline', inlinedValue: '0.25rem' },
  'util-rems-2': { kind: 'inline', inlinedValue: '0.375rem' },
  'util-rems-3': { kind: 'inline', inlinedValue: '0.5rem' },
  'util-rems-4': { kind: 'inline', inlinedValue: '0.625rem' },
  'util-rems-5': { kind: 'inline', inlinedValue: '0.75rem' },
  'util-rems-6': { kind: 'inline', inlinedValue: '1rem' },
  'util-rems-7': { kind: 'inline', inlinedValue: '1.25rem' },
  'util-rems-8': { kind: 'inline', inlinedValue: '1.5rem' },
  'util-rems-9': { kind: 'inline', inlinedValue: '2rem' },
  'util-rems-10': { kind: 'inline', inlinedValue: '2.25rem' },
  'util-rems-11': { kind: 'inline', inlinedValue: '2.5rem' },
  'util-rems-12': { kind: 'inline', inlinedValue: '3rem' },
}

/**
 * Returns the TODO comment text to append for a best-effort mapping.
 */
export function bestEffortComment(legacyVar: string): string {
  return `/* TODO: ${legacyVar} has no direct v5 equivalent — verify this replacement is correct for your context */`
}

/**
 * Returns the inline comment to append for an inline mapping.
 */
export function inlineComment(legacyVar: string): string {
  return `/* was ${legacyVar} */`
}
