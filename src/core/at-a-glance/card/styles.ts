import { css } from '@linaria/core'

/**
 * Base card styling applied to all card variants.
 */
export const elAtAGlanceCard = css`
  --aag-card-background-colour-default: var(--colour-fill-white);
  --aag-card-background-colour-hover: var(--colour-fill-neutral-lightest);
  --aag-card-background-colour-selected: var(--colour-fill-action-lightest);
  --aag-card-background-colour: var(--aag-card-background-colour-default);

  --aag-card-outline-selected: var(--border-width-double) solid var(--colour-border-action-default);
  --aag-card-outline: none;

  --aag-card-value-colour-default: var(--colour-text-primary);
  --aag-card-value-colour-interactive: var(--colour-text-action);
  --aag-card-value-colour: var(--aag-card-value-colour-default);

  /* Reset default styling */
  margin: 0;
  font: inherit;
  color: inherit;
  background: none;
  cursor: default;

  /* Card styling */
  position: relative;
  display: grid;
  grid: 1fr / 1fr;
  align-self: stretch;

  background-color: var(--aag-card-background-colour);
  outline: var(--aag-card-outline);
  text-align: start;

  border: var(--border-width-default) solid var(--colour-border-neutral-light_default);
  border-radius: var(--border-radius-l);

  padding: var(--spacing-5);

  width: 100%;

  /* Built-in layout styles */
  &[data-layout='vertical'] {
    grid:
      'icon' min-content
      'label' min-content
      'description' min-content
      'value' auto / 1fr;

    --aag-card-icon-padding: 0 0 var(--spacing-2) 0;
    --aag-card-value-align-self: end;
    --aag-card-value-padding: var(--spacing-1) 0 0 0;
  }

  &[data-layout='compact'] {
    grid:
      'icon label' min-content
      'icon description' minmax(0, min-content)
      '. value' auto / min-content 1fr;

    --aag-card-icon-padding: 0 var(--spacing-4) 0 0;
    --aag-card-value-align-self: end;
    --aag-card-value-padding: var(--spacing-1) 0 0 0;
  }

  &[data-layout='horizontal'] {
    grid:
      'icon label value' min-content
      'icon description value' minmax(0, min-content) / min-content 1fr auto;
    align-items: center;
    align-content: center;

    --aag-card-icon-padding: 0 var(--spacing-4) 0 0;
    --aag-card-value-align-self: auto;
    --aag-card-value-padding: 0 0 0 var(--spacing-1);
  }

  /* Anchor-specific styling */
  &:is(a) {
    --aag-card-value-colour: var(--aag-card-value-colour-interactive);

    text-decoration: none;

    &[aria-current='page'] {
      --aag-card-background-colour: var(--aag-card-background-colour-selected);
      --aag-card-outline: var(--aag-card-outline-selected);
    }
  }

  /* Button-specific styling */
  &:is(button) {
    --aag-card-value-colour: var(--aag-card-value-colour-interactive);

    &[aria-checked='true'],
    &[aria-pressed='true'],
    &[aria-selected='true'] {
      --aag-card-background-colour: var(--aag-card-background-colour-selected);
      --aag-card-outline: var(--aag-card-outline-selected);
    }
  }

  &:is(a, button) {
    cursor: pointer;

    &:is(:hover, :focus-visible) {
      --aag-card-background-colour: var(--aag-card-background-colour-hover);
    }
  }
`
