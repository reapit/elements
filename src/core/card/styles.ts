import { css } from '@linaria/core'

/**
 * Base card surface styles shared by all card variants.
 *
 * Uses `elements.base` so that components which compose Card (e.g. AtAGlance)
 * can reliably override surface properties from `elements.main` without
 * specificity hacks, regardless of stylesheet chunk load order.
 */
export const elCard = css`
  @layer elements.base {
    /* Surface */
    --card-padding: var(--spacing-4);
    background-color: var(--colour-fill-white);
    border: var(--border-width-default) solid var(--colour-border-neutral-light_default);
    border-radius: var(--border-radius-xl);
    padding: var(--card-padding, var(--spacing-4));

    /* Layout */
    display: block;
    width: 100%;
    overflow: clip;

    /* Remove browser default element styles so the element renders consistently
       regardless of whether it is a div, article, button, or anchor. */
    margin: 0;
    font: inherit;
    color: inherit;
    background-image: none;
    text-align: start;
    text-decoration: none;
    cursor: default;

    &[data-is-borderless='true'] {
      border: none;
    }

    &:focus-visible {
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: var(--border-width-default);
    }
  }
`

/**
 * Interactive state styles shared by ButtonCard and AnchorCard.
 *
 * Applied alongside `elCard`. Kept separate so the base surface can be composed
 * without interactive behaviour (e.g. Card).
 */
export const elInteractiveCard = css`
  @layer elements.base {
    cursor: pointer;

    @media (prefers-reduced-motion: no-preference) {
      transition: box-shadow 150ms ease-out;
    }

    &:not(:disabled):not([aria-disabled='true']):hover {
      box-shadow: var(--shadow-down-md);
    }

    &:not(:disabled):not([aria-disabled='true']):active {
      box-shadow: var(--shadow-down-sm);
    }

    &:disabled,
    &[aria-disabled='true'] {
      cursor: not-allowed;
    }

    /* button: aria-pressed */
    &[aria-pressed='true'],
    /* anchor: aria-current */
    &[aria-current]:not([aria-current='false']) {
      border: var(--border-width-double) solid var(--colour-border-action-default);
      padding: max(0px, calc(var(--card-padding, var(--spacing-4)) - var(--border-width-default)));
    }
  }
`
