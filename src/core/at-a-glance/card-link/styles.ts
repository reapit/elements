import { styled } from '@linaria/react'

export const ElAtAGlanceCardLink = styled.a`
  /* --aag-card-content-value-colour is consumed by AtAGlanceCardContent */
  --aag-card-content-value-colour: var(--colour-text-action);
  --aag-card-link-background-colour: var(--colour-fill-white);
  --aag-card-link-outline: none;

  /* Align to AtAGlanceCard's grid layout */
  display: grid;
  grid: subgrid / subgrid;
  background-color: var(--aag-card-link-background-colour);
  text-decoration: none;

  outline: var(--aag-card-radio-outline);
  border-radius: var(--border-radius-l);

  &[aria-current='true'] {
    --aag-card-link-background-colour: var(--colour-fill-action-lightest);
    --aag-card-radio-outline: var(--border-width-double) solid var(--colour-border-action-default);
  }

  &:is(:hover, :focus-visible) {
    --aag-card-link-background-colour: var(--colour-fill-neutral-lightest);
  }
`
