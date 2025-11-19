import { css } from '@linaria/core'

export const elAtAGlanceAnchorCard = css`
  --aag-card-value-colour: var(--aag-card-value-colour-interactive);

  cursor: pointer;
  text-decoration: none;

  &[aria-current='page'] {
    --aag-card-background-colour: var(--aag-card-background-colour-selected);
    --aag-card-outline: var(--aag-card-outline-selected);
  }

  &:is(:hover, :focus-visible) {
    --aag-card-background-colour: var(--aag-card-background-colour-hover);
  }
`
