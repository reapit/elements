import { css } from '@linaria/core'

export const elToastOutlet = css`
  @layer elements.main {
    /* Reset popover UA styles */
    border: none;
    padding: 0;
    margin: 0;
    background: transparent;
    inset: unset;
    color: inherit;
    overflow: visible;
  }
`

export const elToastList = css`
  @layer elements.main {
    --toaster-gutter: var(--spacing-5);

    /* Reset list styles */
    list-style: none;
    margin: 0;
    padding: 0;

    position: fixed;
    bottom: var(--toaster-gutter);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: max-content;
    max-width: 100vw;

    /* Pointer events: only the toasts themselves are interactive */
    pointer-events: none;

    &[data-position='bottom-left'] {
      left: var(--toaster-gutter);
      transform: none;
      align-items: flex-start;
    }

    &[data-position='bottom-right'] {
      left: auto;
      right: var(--toaster-gutter);
      transform: none;
      align-items: flex-end;
    }

    &[data-position='top-center'] {
      bottom: auto;
      top: var(--toaster-gutter);
      flex-direction: column-reverse;
    }

    &[data-position='top-left'] {
      bottom: auto;
      top: var(--toaster-gutter);
      left: var(--toaster-gutter);
      transform: none;
      flex-direction: column-reverse;
      align-items: flex-start;
    }

    &[data-position='top-right'] {
      inset: var(--toaster-gutter) var(--toaster-gutter) auto auto;
      transform: none;
      flex-direction: column-reverse;
      align-items: flex-end;
    }
  }
`

export const elToastItem = css`
  @layer elements.main {
    /* Height animation uses the grid-template-rows 0fr→1fr trick rather than
     * calc-size(auto) or interpolate-size: allow-keywords, which would be more
     * ergonomic but are Baseline 2025. This project targets Baseline 2024.
     *
     * The grid approach is also preferable to max-height because max-height
     * cannot transition to 'auto'. A fixed upper bound (e.g. max-height: 500px)
     * distorts the easing curve — the visible portion of the transition completes
     * in a fraction of the total duration, proportional to the ratio of actual
     * height to the bound. The grid trick scales correctly at any content height
     * because 0fr→1fr maps directly to 0→content height.
     *
     * Visual transitions (transform, opacity) live on the inner elToastItemContent
     * div rather than here. This separation means the layout collapse and the
     * visual exit animation do not interact. */
    display: grid;

    /* Slide direction: 1 for bottom-positioned toasters (slide toward the bottom
     * edge), -1 for top-positioned (slide toward the top edge). Set here and
     * inherited by the inner elToastItemContent div. */
    --toast-dir: 1;

    &[data-position^='top'] {
      --toast-dir: -1;
    }

    /* Spacing between toasts uses margin-block-start rather than gap on the
     * container so it can be animated alongside the height transition.
     * In column-reverse (top-* positions) :last-child is visually nearest the
     * edge and needs no margin; :first-child is no longer the edge item. */
    margin-block-start: var(--spacing-2);

    &:first-child {
      margin-block-start: 0;
    }

    &[data-position^='top'] {
      margin-block-start: var(--spacing-2);

      &:last-child {
        margin-block-start: 0;
      }
    }

    /* Shared transition timing for layout properties only.
     * Reduced-motion-first: transitions are disabled by default and only enabled
     * when the user has not requested reduced motion. */
    transition-duration: 0s;

    @media (prefers-reduced-motion: no-preference) {
      transition-duration: 200ms;
      transition-timing-function: ease-out;
    }

    /* ------------------------------------------------------------------ */
    /* Entry — layout                                                      */
    /* ------------------------------------------------------------------ */

    /* Pending: collapsed with no transition. The toast is in the DOM but not
     * yet visible. The settle() call transitions this to 'visible', at which
     * point the CSS transition animates the expansion. */
    &[data-state='pending'] {
      grid-template-rows: 0fr;
      margin-block-start: 0;
    }

    /* Visible / paused: expanded with transitions enabled. Transitioning from
     * 'pending' animates the entry. Inserted directly as 'visible' (e.g. after
     * a portal remount) renders immediately at rest with no transition.
     * Paused toasts (hovered, swiped, or page-hidden) are visually identical to
     * visible toasts. */
    &:is([data-state='visible'], [data-state='paused']) {
      grid-template-rows: 1fr;
      transition-property: grid-template-rows, margin-block-start;
    }

    /* ------------------------------------------------------------------ */
    /* Exit — layout                                                       */
    /* ------------------------------------------------------------------ */

    &[data-state='dismissing'] {
      grid-template-rows: 0fr;
      margin-block-start: 0;
      transition-property: grid-template-rows, margin-block-start;
    }
  }
`

/** Inner wrapper for the toast content. Handles all visual transitions
 * (transform, opacity) independently from the layout collapse on the parent
 * <li>. This separation ensures:
 *
 * - The exit slide and height collapse do not interfere visually.
 * - Swipe-to-dismiss inline styles (--swipe-offset) never conflict with
 *   CSS class transition declarations.
 *
 * Entry animation: when state transitions from 'pending' to 'visible', the
 * content slides from off-screen to its resting position. The --toast-height
 * CSS variable (set by a ref callback via scrollHeight) is used instead of
 * 100%, because the parent grid row's 0fr clamping would otherwise resolve
 * 100% to 0 while the toast is pending.
 *
 * On portal remount, the toast is inserted directly with data-state='visible'
 * and no 'pending' phase — so no entry transition replays.
 *
 * min-height: 0 allows the grid row to collapse below content height.
 * overflow: visible keeps the toast rendered outside the collapsed row
 * during the slide-in entry. */
export const elToastItemContent = css`
  @layer elements.main {
    min-height: 0;
    overflow: visible;
    pointer-events: auto;
    touch-action: none;

    /* Shared transition timing for visual properties.
     * Reduced-motion-first: transitions and will-change are disabled by default
     * and only enabled when the user has not requested reduced motion. */
    transition-duration: 0s;

    @media (prefers-reduced-motion: no-preference) {
      transition-duration: 300ms;
      transition-timing-function: cubic-bezier(0.21, 1.02, 0.73, 1);
      will-change: transform, opacity;
    }

    /* ------------------------------------------------------------------ */
    /* Entry — visual                                                      */
    /* ------------------------------------------------------------------ */

    /* Pending: off-screen starting position, no transition. */
    [data-state='pending'] > & {
      transform: translateY(calc(var(--toast-dir) * (var(--toast-height, 100%) + var(--toaster-gutter))));
      transition: none;
    }

    /* Visible / paused: resting position, transitions enabled. Transitioning
     * from 'pending' slides the toast into view. Inserted directly as 'visible'
     * renders at rest with no animation. */
    :is([data-state='visible'], [data-state='paused']) > & {
      transform: translateY(var(--swipe-offset, 0));
      transition-property: transform;
    }

    /* ------------------------------------------------------------------ */
    /* Exit — visual                                                       */
    /* ------------------------------------------------------------------ */

    /* Non-edge toasts: fade + slide toward the edge. */
    [data-state='dismissing'] > & {
      opacity: 0;
      transform: translateY(calc(var(--toast-dir) * var(--spacing-6)));
      transition-property: opacity, transform;
      transition-duration: 200ms;
      transition-timing-function: ease-in;
    }

    /* Edge toast (:last-child in both column and column-reverse is visually
     * nearest the viewport edge): slide off-screen, no fade. */
    [data-state='dismissing']:last-child > & {
      opacity: 1;
      transform: translateY(calc(var(--toast-dir) * (var(--toast-height, 100%) + var(--toaster-gutter))));
      transition-property: transform;
      transition-duration: 200ms;
      transition-timing-function: ease-in;
    }

    /* ------------------------------------------------------------------ */
    /* Swipe                                                               */
    /* ------------------------------------------------------------------ */

    /* While swiping, apply the drag offset directly and disable transitions
     * so the element tracks the pointer with no lag. Scoped under
     * [data-state='visible'] / [data-state='paused'] so it has sufficient
     * specificity to override the visible rule's transition-property
     * declaration. */
    :is([data-state='visible'], [data-state='paused']) > &[data-swiping='true'] {
      transform: translateY(var(--swipe-offset, 0));
      transition: none;
    }

    /* ------------------------------------------------------------------ */
    /* Masked — visual                                                     */
    /* ------------------------------------------------------------------ */

    /* Toasts beyond the visible limit fade out while remaining in the DOM. */
    [data-is-masked] > & {
      opacity: 0;
      transition-property: opacity;
      transition-duration: 200ms;
      transition-timing-function: ease-out;
    }
  }
`
