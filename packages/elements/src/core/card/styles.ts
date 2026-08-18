import { css } from "@linaria/core";

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

    &[data-is-borderless="true"] {
      border: none;
    }

    &:focus-visible {
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: var(--border-width-default);
    }
  }
`;

/**
 * Interactive state styles shared by ButtonCard and AnchorCard.
 *
 * Applied alongside `elCard`. Kept separate so the base surface can be composed
 * without interactive behaviour (e.g. Card).
 */
export const elInteractiveCard = css`
  @layer elements.base {
    text-decoration: none;
    cursor: pointer;
    padding: max(0px, calc(var(--card-padding, var(--spacing-4)) + var(--border-width-default)));

    @media (prefers-reduced-motion: no-preference) {
      transition: box-shadow 150ms ease-out;
    }

    &:not(:is(:disabled, [aria-disabled="true"])):hover {
      box-shadow: var(--shadow-down-md);
    }

    &:not(:is(:disabled, [aria-disabled="true"])):active {
      box-shadow: var(--shadow-down-sm);
    }

    &:where(:disabled, [aria-disabled="true"]) {
      cursor: not-allowed;
    }

    /* button: aria-pressed/aria-selected */
    &[aria-pressed='true'],
    &[aria-selected='true'],
    /* anchor: aria-current */
    &[aria-current]:not([aria-current='false']) {
      /* selection styles are split across the 1px border and an inset 1px box-shadow to avoid
         layout shifts caused by a normal border width increasing from 1px to 2px. */
      border-color: var(--colour-border-action-default);
      box-shadow: inset 0 0 0 1px var(--colour-border-action-default);
      padding: var(--card-padding, var(--spacing-4));

      &:hover {
        box-shadow:
          inset 0 0 0 1px var(--colour-border-action-default),
          var(--shadow-down-md);
      }

      &:active {
        box-shadow:
          inset 0 0 0 1px var(--colour-border-action-default),
          var(--shadow-down-sm);
      }
    }
  }
`;
