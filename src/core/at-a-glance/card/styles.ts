import { css } from "@linaria/core";

/**
 * Base card styling applied to all card variants.
 */
export const elAtAGlanceCard = css`
  @layer elements.main {
    --aag-card-background-colour-default: var(--colour-fill-white);
    --aag-card-background-colour-selected: var(--colour-fill-action-lightest);
    --aag-card-background-colour: var(--aag-card-background-colour-default);

    --aag-card-value-colour-default: var(--colour-text-primary);
    --aag-card-value-colour-interactive: var(--colour-text-action);
    --aag-card-value-colour: var(--aag-card-value-colour-default);

    /* Card styling */
    position: relative;
    display: grid;
    grid: 1fr / 1fr;
    align-self: stretch;

    background-color: var(--aag-card-background-colour);
    text-align: start;

    border-radius: var(--border-radius-l);
    padding: var(--spacing-5);
    width: 100%;

    /* Built-in layout styles */
    &[data-layout="vertical"] {
      grid:
        "icon" min-content
        "label" min-content
        "description" min-content
        "value" auto / 1fr;

      --aag-card-icon-padding: 0 0 var(--spacing-2) 0;
      --aag-card-value-align-self: end;
      --aag-card-value-padding: var(--spacing-1) 0 0 0;
    }

    &[data-layout="compact"] {
      grid:
        "icon label" min-content
        "icon description" minmax(0, min-content)
        ". value" auto / min-content 1fr;

      --aag-card-icon-padding: 0 var(--spacing-4) 0 0;
      --aag-card-value-align-self: end;
      --aag-card-value-padding: var(--spacing-1) 0 0 0;
    }

    &[data-layout="horizontal"] {
      grid:
        "icon label value" min-content
        "icon description value" minmax(0, min-content) / min-content 1fr auto;
      align-items: center;
      align-content: center;

      --aag-card-icon-padding: 0 var(--spacing-4) 0 0;
      --aag-card-value-align-self: auto;
      --aag-card-value-padding: 0 0 0 var(--spacing-1);
    }

    /* Anchor-specific styling */
    &:is(a) {
      --aag-card-value-colour: var(--aag-card-value-colour-interactive);

      &[aria-current="page"] {
        --aag-card-background-colour: var(--aag-card-background-colour-selected);
      }
    }

    /* Button-specific styling */
    &:is(button) {
      --aag-card-value-colour: var(--aag-card-value-colour-interactive);

      &[aria-checked="true"],
      &[aria-pressed="true"],
      &[aria-selected="true"] {
        --aag-card-background-colour: var(--aag-card-background-colour-selected);
      }
    }

    /* Keyboard-active state: shown when this card is the aria-activedescendant target.
       Uses an outline (not elevation) to communicate focus position without implying hover. */
    &[data-is-active="true"] {
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: var(--border-width-default);
    }
  }
`;
