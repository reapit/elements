import { css } from '@linaria/core'

export const elAtAGlanceButtonCard = css`
  --aag-card-value-colour: var(--aag-card-value-colour-interactive);

  width: 100%;

  &[aria-checked='true'],
  &[aria-pressed='true'],
  &[aria-selected='true'] {
    --aag-card-background-colour: var(--aag-card-background-colour-selected);
    --aag-card-outline: var(--aag-card-outline-selected);
  }

  &:is(:hover, :focus-visible) {
    --aag-card-background-colour: var(--aag-card-background-colour-hover);
  }
`
