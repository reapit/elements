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
  // Bare palette aliases (without `color-` prefix)
  // Legacy code uses e.g. `--purple-050` directly (not `--color-purple-050`).
  // These are identical mappings to the `color-*` entries above.
  // ---------------------------------------------------------------------------

  // Purples
  'purple-050': { v5: '--colour-fill-action-lightest', kind: 'best_effort' },
  'purple-100': { v5: '--colour-fill-action-lightest', kind: 'best_effort' },
  'purple-200': { v5: '--colour-fill-action-light', kind: 'best_effort' },
  'purple-300': { v5: '--colour-fill-action-light', kind: 'best_effort' },
  'purple-400': { v5: '--colour-fill-action-dark', kind: 'best_effort' },
  'purple-500': { v5: '--colour-fill-action-dark', kind: 'best_effort' },
  'purple-600': { v5: '--colour-fill-action-dark', kind: 'best_effort' },
  'purple-700': { v5: '--colour-fill-action-dark', kind: 'best_effort' },
  'purple-800': { v5: '--colour-fill-action-dark', kind: 'best_effort' },
  'purple-900': { v5: '--colour-fill-action-dark', kind: 'best_effort' },

  // Blues
  'blue-050': { v5: '--colour-fill-info-lightest', kind: 'best_effort' },
  'blue-100': { v5: '--colour-fill-info-lightest', kind: 'best_effort' },
  'blue-200': { v5: '--colour-fill-info-light', kind: 'best_effort' },
  'blue-300': { v5: '--colour-fill-info-light', kind: 'best_effort' },
  'blue-400': { v5: '--colour-fill-info-dark', kind: 'best_effort' },
  'blue-500': { v5: '--colour-fill-info-dark', kind: 'best_effort' },
  'blue-600': { v5: '--colour-fill-info-dark', kind: 'best_effort' },
  'blue-700': { v5: '--colour-fill-info-dark', kind: 'best_effort' },
  'blue-800': { v5: '--colour-fill-info-dark', kind: 'best_effort' },
  'blue-900': { v5: '--colour-fill-info-dark', kind: 'best_effort' },

  // Greens
  'green-050': { v5: '--colour-fill-success-lightest', kind: 'best_effort' },
  'green-100': { v5: '--colour-fill-success-lightest', kind: 'best_effort' },
  'green-200': { v5: '--colour-fill-success-light', kind: 'best_effort' },
  'green-300': { v5: '--colour-fill-success-light', kind: 'best_effort' },
  'green-400': { v5: '--colour-fill-success-dark', kind: 'best_effort' },
  'green-500': { v5: '--colour-fill-success-dark', kind: 'best_effort' },
  'green-600': { v5: '--colour-fill-success-dark', kind: 'best_effort' },
  'green-700': { v5: '--colour-fill-success-dark', kind: 'best_effort' },
  'green-800': { v5: '--colour-fill-success-dark', kind: 'best_effort' },
  'green-900': { v5: '--colour-fill-success-dark', kind: 'best_effort' },

  // Yellows
  'yellow-050': { v5: '--colour-fill-pending-lightest', kind: 'best_effort' },
  'yellow-100': { v5: '--colour-fill-pending-lightest', kind: 'best_effort' },
  'yellow-200': { v5: '--colour-fill-pending-light', kind: 'best_effort' },
  'yellow-300': { v5: '--colour-fill-pending-light', kind: 'best_effort' },
  'yellow-400': { v5: '--colour-fill-pending-dark', kind: 'best_effort' },
  'yellow-500': { v5: '--colour-fill-pending-dark', kind: 'best_effort' },
  'yellow-600': { v5: '--colour-fill-pending-dark', kind: 'best_effort' },
  'yellow-700': { v5: '--colour-fill-pending-dark', kind: 'best_effort' },
  'yellow-800': { v5: '--colour-fill-pending-dark', kind: 'best_effort' },
  'yellow-900': { v5: '--colour-fill-pending-dark', kind: 'best_effort' },

  // Oranges
  'orange-050': { v5: '--colour-fill-warning-lightest', kind: 'best_effort' },
  'orange-100': { v5: '--colour-fill-warning-lightest', kind: 'best_effort' },
  'orange-200': { v5: '--colour-fill-warning-light', kind: 'best_effort' },
  'orange-300': { v5: '--colour-fill-warning-light', kind: 'best_effort' },
  'orange-400': { v5: '--colour-fill-warning-dark', kind: 'best_effort' },
  'orange-500': { v5: '--colour-fill-warning-dark', kind: 'best_effort' },
  'orange-600': { v5: '--colour-fill-warning-dark', kind: 'best_effort' },
  'orange-700': { v5: '--colour-fill-warning-dark', kind: 'best_effort' },
  'orange-800': { v5: '--colour-fill-warning-dark', kind: 'best_effort' },
  'orange-900': { v5: '--colour-fill-warning-dark', kind: 'best_effort' },

  // Reds
  'red-050': { v5: '--colour-fill-error-lightest', kind: 'best_effort' },
  'red-100': { v5: '--colour-fill-error-lightest', kind: 'best_effort' },
  'red-200': { v5: '--colour-fill-error-light', kind: 'best_effort' },
  'red-300': { v5: '--colour-fill-error-light', kind: 'best_effort' },
  'red-400': { v5: '--colour-fill-error-dark', kind: 'best_effort' },
  'red-500': { v5: '--colour-fill-error-dark', kind: 'best_effort' },
  'red-600': { v5: '--colour-fill-error-dark', kind: 'best_effort' },
  'red-700': { v5: '--colour-fill-error-dark', kind: 'best_effort' },
  'red-800': { v5: '--colour-fill-error-dark', kind: 'best_effort' },
  'red-900': { v5: '--colour-fill-error-dark', kind: 'best_effort' },

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

  // ---------------------------------------------------------------------------
  // Semantic text colour tokens  (legacy-reapit/tokens.css → v5 reapit.css)
  // All are exact 1-to-1 renames: prefix legacy `--text-*` tokens with `--colour-`
  //   (for example, `--text-primary` → `--colour-text-primary`).
  // ---------------------------------------------------------------------------
  'text-primary': { v5: '--colour-text-primary', kind: 'direct' },
  'text-secondary': { v5: '--colour-text-secondary', kind: 'direct' },
  'text-tertiary': { v5: '--colour-text-tertiary', kind: 'direct' },
  'text-placeholder': { v5: '--colour-text-placeholder', kind: 'direct' },
  'text-action': { v5: '--colour-text-action', kind: 'direct' },
  'text-error': { v5: '--colour-text-error', kind: 'direct' },
  'text-success': { v5: '--colour-text-success', kind: 'direct' },
  'text-warning': { v5: '--colour-text-warning', kind: 'direct' },
  'text-info': { v5: '--colour-text-info', kind: 'direct' },
  'text-white': { v5: '--colour-text-white', kind: 'direct' },
  'text-pending': { v5: '--colour-text-pending', kind: 'direct' },
  'text-accent_1': { v5: '--colour-text-accent_1', kind: 'direct' },
  'text-accent_2': { v5: '--colour-text-accent_2', kind: 'direct' },
  // These two component-specific tokens changed value in v5 (reversed button
  // now uses alpha-blended white). Inline the legacy hex so consumers preserve
  // the old visual appearance.
  'text-button_reversed-secondary-label-default': { kind: 'inline', inlinedValue: '#e5e9ed' },
  'text-button_reversed-secondary-label-disabled': { kind: 'inline', inlinedValue: '#798da1' },

  // ---------------------------------------------------------------------------
  // Semantic fill colour tokens  (legacy-reapit/tokens.css → v5 reapit.css)
  // ---------------------------------------------------------------------------
  // 'default' category renamed to 'neutral' in v5.
  'fill-default-lightest': { v5: '--colour-fill-neutral-lightest', kind: 'direct' },
  'fill-default-light': { v5: '--colour-fill-neutral-light', kind: 'direct' },
  'fill-default-medium': { v5: '--colour-fill-neutral-medium', kind: 'direct' },
  'fill-default-dark': { v5: '--colour-fill-neutral-dark', kind: 'direct' },
  'fill-default-darkest': { v5: '--colour-fill-neutral-darkest', kind: 'direct' },
  // Exact renames: add '--colour-' prefix.
  'fill-white': { v5: '--colour-fill-white', kind: 'direct' },
  'fill-action-lightest': { v5: '--colour-fill-action-lightest', kind: 'direct' },
  'fill-action-light': { v5: '--colour-fill-action-light', kind: 'direct' },
  'fill-action-dark': { v5: '--colour-fill-action-dark', kind: 'direct' },
  'fill-success-lightest': { v5: '--colour-fill-success-lightest', kind: 'direct' },
  'fill-success-light': { v5: '--colour-fill-success-light', kind: 'direct' },
  'fill-success-dark': { v5: '--colour-fill-success-dark', kind: 'direct' },
  'fill-warning-lightest': { v5: '--colour-fill-warning-lightest', kind: 'direct' },
  'fill-warning-light': { v5: '--colour-fill-warning-light', kind: 'direct' },
  'fill-warning-dark': { v5: '--colour-fill-warning-dark', kind: 'direct' },
  'fill-error-lightest': { v5: '--colour-fill-error-lightest', kind: 'direct' },
  'fill-error-light': { v5: '--colour-fill-error-light', kind: 'direct' },
  'fill-error-dark': { v5: '--colour-fill-error-dark', kind: 'direct' },
  'fill-info-lightest': { v5: '--colour-fill-info-lightest', kind: 'direct' },
  'fill-info-light': { v5: '--colour-fill-info-light', kind: 'direct' },
  'fill-info-dark': { v5: '--colour-fill-info-dark', kind: 'direct' },
  'fill-pending-lightest': { v5: '--colour-fill-pending-lightest', kind: 'direct' },
  'fill-pending-light': { v5: '--colour-fill-pending-light', kind: 'direct' },
  'fill-pending-dark': { v5: '--colour-fill-pending-dark', kind: 'direct' },
  'fill-accent_1-lightest': { v5: '--colour-fill-accent_1-lightest', kind: 'direct' },
  'fill-accent_1-light': { v5: '--colour-fill-accent_1-light', kind: 'direct' },
  'fill-accent_1-dark': { v5: '--colour-fill-accent_1-dark', kind: 'direct' },
  'fill-accent_2-lightest': { v5: '--colour-fill-accent_2-lightest', kind: 'direct' },
  'fill-accent_2-light': { v5: '--colour-fill-accent_2-light', kind: 'direct' },
  'fill-accent_2-dark': { v5: '--colour-fill-accent_2-dark', kind: 'direct' },
  // Component-specific fill tokens that moved to --comp-* level in v5 (no
  // semantic equivalent). Inline the legacy hex values to preserve appearance.
  'fill-button-primary-hover': { kind: 'inline', inlinedValue: '#4036c8' },
  'fill-button-danger-hover': { kind: 'inline', inlinedValue: '#a21020' },
  'fill-switch-hover': { kind: 'inline', inlinedValue: '#4036c8' },
  // Value changed in v5 (reversed button now uses alpha-blended white).
  'fill-reversed_button-secondary-disabled': { kind: 'inline', inlinedValue: '#415161' },

  // ---------------------------------------------------------------------------
  // Semantic icon colour tokens  (legacy-reapit/tokens.css → v5 reapit.css)
  // ---------------------------------------------------------------------------
  // Exact renames: add '--colour-' prefix.
  'icon-primary': { v5: '--colour-icon-primary', kind: 'direct' },
  'icon-secondary': { v5: '--colour-icon-secondary', kind: 'direct' },
  'icon-disabled': { v5: '--colour-icon-disabled', kind: 'direct' },
  'icon-action': { v5: '--colour-icon-action', kind: 'direct' },
  'icon-error': { v5: '--colour-icon-error', kind: 'direct' },
  'icon-success': { v5: '--colour-icon-success', kind: 'direct' },
  'icon-warning': { v5: '--colour-icon-warning', kind: 'direct' },
  'icon-info': { v5: '--colour-icon-info', kind: 'direct' },
  'icon-white': { v5: '--colour-icon-white', kind: 'direct' },
  'icon-star': { v5: '--colour-icon-star', kind: 'direct' },
  'icon-pending': { v5: '--colour-icon-pending', kind: 'direct' },
  'icon-accent_1': { v5: '--colour-icon-accent_1', kind: 'direct' },
  'icon-accent_2': { v5: '--colour-icon-accent_2', kind: 'direct' },
  // Checkbox and radio hover icons were consolidated into a single generic
  // hover token in v5.
  'icon-checkbox-hover': { v5: '--colour-icon-hover', kind: 'direct' },
  'icon-radio_button-hover': { v5: '--colour-icon-hover', kind: 'direct' },
  // Component-specific icon tokens that moved to --comp-* level (or had their
  // values changed) in v5. Inline legacy hex values to preserve appearance.
  'icon-app_bar-default': { kind: 'inline', inlinedValue: '#798da1' },
  'icon-button_primary-default': { kind: 'inline', inlinedValue: '#d6e1ff' },
  'icon-button_primary-hover': { kind: 'inline', inlinedValue: '#7e9bfa' },
  'icon-button_danger-default': { kind: 'inline', inlinedValue: '#fcd9dd' },
  'icon-button_danger-hover': { kind: 'inline', inlinedValue: '#f67482' },
  // Value changed in v5 (reversed button icons now use alpha-blended white).
  'icon-reversed_button-hover': { kind: 'inline', inlinedValue: '#607890' },
  'icon-reversed_button-disabled': { kind: 'inline', inlinedValue: '#798da1' },
  'icon-split_button-secondary-hover': { kind: 'inline', inlinedValue: '#415161' },

  // ---------------------------------------------------------------------------
  // Semantic outline / border tokens  (legacy-reapit/tokens.css → v5 reapit.css)
  // 'outline' category renamed to 'border' in v5; status tokens gained '-default' suffix.
  // ---------------------------------------------------------------------------
  'outline-primary': { v5: '--colour-border-action-default', kind: 'direct' },
  'outline-warning': { v5: '--colour-border-warning-default', kind: 'direct' },
  'outline-error': { v5: '--colour-border-error-default', kind: 'direct' },
  'outline-info': { v5: '--colour-border-info-default', kind: 'direct' },
  'outline-success': { v5: '--colour-border-success-default', kind: 'direct' },
  'outline-white': { v5: '--colour-border-white', kind: 'direct' },
  'outline-pending': { v5: '--colour-border-pending-default', kind: 'direct' },
  'outline-accent_1': { v5: '--colour-border-accent_1-default', kind: 'direct' },
  'outline-accent_2': { v5: '--colour-border-accent_2-default', kind: 'direct' },
  'outline-input_chip-orange': { v5: '--colour-border-warning-light', kind: 'direct' },
  // The semantic name in v5 is different enough that manual review is warranted.
  'outline-default': { v5: '--colour-border-neutral-light_default', kind: 'best_effort' },
  'outline-dashed': { v5: '--colour-border-neutral-light_darker', kind: 'best_effort' },
  'outline-text_input-default': { v5: '--colour-border-neutral-light_darker', kind: 'best_effort' },
  'outline-button-secondary-hover': { v5: '--colour-fill-neutral-medium', kind: 'best_effort' },
  // These values changed in v5. Inline the legacy hex to preserve appearance.
  'outline-text_input-focus': { kind: 'inline', inlinedValue: '#0080ff' },
  'outline-button_reversed-secondary-default': { kind: 'inline', inlinedValue: '#415161' },

  // ---------------------------------------------------------------------------
  // Raw neutral palette  (legacy-reapit/tokens.css)
  // v5 exposes no raw palette scale — map to the nearest semantic token.
  // All are best_effort because the correct semantic token is context-dependent.
  // ---------------------------------------------------------------------------
  'neutral-900': { v5: '--colour-text-primary', kind: 'best_effort' },
  // #323e4b was removed from the v5 palette entirely — inline the hex value.
  'neutral-800': { kind: 'inline', inlinedValue: '#323e4b' },
  'neutral-700': { v5: '--colour-text-tertiary', kind: 'best_effort' },
  // #506478 has no semantic v5 equivalent — inline the hex value.
  'neutral-600': { kind: 'inline', inlinedValue: '#506478' },
  'neutral-500': { v5: '--colour-fill-neutral-dark', kind: 'best_effort' },
  'neutral-400': { v5: '--colour-fill-neutral-medium', kind: 'best_effort' },
  'neutral-300': { v5: '--colour-fill-neutral-medium', kind: 'best_effort' },
  // #c5ced6 has no semantic v5 equivalent — inline the hex value.
  'neutral-200': { kind: 'inline', inlinedValue: '#c5ced6' },
  'neutral-150': { v5: '--colour-border-neutral-light_darker', kind: 'best_effort' },
  'neutral-100': { v5: '--colour-fill-neutral-light', kind: 'best_effort' },
  'neutral-050': { v5: '--colour-fill-neutral-lightest', kind: 'best_effort' },

  // ---------------------------------------------------------------------------
  // Corner radius tokens  (legacy-reapit/tokens.css → v5 reapit.css)
  // 'corner' category renamed to 'border-radius' in v5.
  // Tier names: none→none, sm→s, default→m, lg→l, xl→xl, 2xl→2xl, 3xl→3xl.
  // ---------------------------------------------------------------------------
  'corner-none': { v5: '--border-radius-none', kind: 'direct' },
  'corner-sm': { v5: '--border-radius-s', kind: 'direct' },
  'corner-default': { v5: '--border-radius-m', kind: 'direct' },
  'corner-lg': { v5: '--border-radius-l', kind: 'direct' },
  'corner-xl': { v5: '--border-radius-xl', kind: 'direct' },
  'corner-2xl': { v5: '--border-radius-2xl', kind: 'direct' },
  'corner-3xl': { v5: '--border-radius-3xl', kind: 'direct' },

  // ---------------------------------------------------------------------------
  // Typography scale tokens  (legacy-reapit/tokens.css → v5 composite tokens)
  // v5 uses --font-{tier}-{weight}-{property} composites. Map to the 'regular'
  // weight variant as the baseline. Weight-specific usages should be updated
  // by hand. Tier names are preserved; only the token structure changes.
  // ---------------------------------------------------------------------------
  // Font sizes
  'font-size-3xl': { v5: '--font-3xl-regular-size', kind: 'direct' },
  'font-size-2xl': { v5: '--font-2xl-regular-size', kind: 'direct' },
  'font-size-xl': { v5: '--font-xl-regular-size', kind: 'direct' },
  'font-size-lg': { v5: '--font-lg-regular-size', kind: 'direct' },
  'font-size-base': { v5: '--font-base-regular-size', kind: 'direct' },
  'font-size-sm': { v5: '--font-sm-regular-size', kind: 'direct' },
  'font-size-xs': { v5: '--font-xs-regular-size', kind: 'direct' },
  'font-size-2xs': { v5: '--font-2xs-regular-size', kind: 'direct' },
  'font-size-3xs': { v5: '--font-3xs-regular-size', kind: 'direct' },
  // Line heights
  'line-height-3xl': { v5: '--font-3xl-regular-line_height', kind: 'direct' },
  'line-height-2xl': { v5: '--font-2xl-regular-line_height', kind: 'direct' },
  'line-height-xl': { v5: '--font-xl-regular-line_height', kind: 'direct' },
  'line-height-lg': { v5: '--font-lg-regular-line_height', kind: 'direct' },
  'line-height-base': { v5: '--font-base-regular-line_height', kind: 'direct' },
  'line-height-sm': { v5: '--font-sm-regular-line_height', kind: 'direct' },
  'line-height-xs': { v5: '--font-xs-regular-line_height', kind: 'direct' },
  'line-height-2xs': { v5: '--font-2xs-regular-line_height', kind: 'direct' },
  // Letter spacings
  'letter-spacing-3xl': { v5: '--font-3xl-regular-letter_spacing', kind: 'direct' },
  'letter-spacing-2xl': { v5: '--font-2xl-regular-letter_spacing', kind: 'direct' },
  'letter-spacing-xl': { v5: '--font-xl-regular-letter_spacing', kind: 'direct' },
  'letter-spacing-lg': { v5: '--font-lg-regular-letter_spacing', kind: 'direct' },
  'letter-spacing-base': { v5: '--font-base-regular-letter_spacing', kind: 'direct' },
  'letter-spacing-sm': { v5: '--font-sm-regular-letter_spacing', kind: 'direct' },
  'letter-spacing-xs': { v5: '--font-xs-regular-letter_spacing', kind: 'direct' },
  'letter-spacing-2xs': { v5: '--font-2xs-regular-letter_spacing', kind: 'direct' },
  // Font family and weights — no standalone v5 tokens; inline concrete values.
  'font-family': { kind: 'inline', inlinedValue: 'Inter' },
  'font-weight-regular': { kind: 'inline', inlinedValue: '400' },
  // Legacy Reapit only exposes standalone font-weight tokens for regular and semibold here;
  // the medium weight is already mapped earlier in this file via the globals.ts tokens.
  'font-weight-semibold': { kind: 'inline', inlinedValue: '600' },
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
