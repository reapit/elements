import { styled } from '@linaria/react'

export const ElAtAGlanceCardLink = styled.a`
  /* --aag-card-content-value-colour is consumed by AtAGlanceCardContent */
  --aag-card-content-value-colour: var(--colour-text-action);
  --aag-card-link-background-colour: var(--colour-fill-white);

  /* Align to AtAGlanceCard's grid layout */
  display: grid;
  grid: subgrid / subgrid;
  background-color: var(--aag-card-link-background-colour);
  text-decoration: none;

  outline: none;

  &:is(:hover, :focus-visible) {
    --aag-card-link-background-colour: var(--colour-fill-neutral-lightest);
  }
`
