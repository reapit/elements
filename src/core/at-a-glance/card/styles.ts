import { styled } from '@linaria/react'

export const ElAtAGlanceCard = styled.article`
  --aag-card-background-colour: var(--colour-fill-white);

  /* Allows descendants like ElAtAGlanceCardLink to absolutely position themselves within the card. */
  position: relative;
  /* 1x1 grid layout ensures content fills the card's available space. */
  display: grid;
  grid: 1fr / 1fr;
  padding: var(--spacing-5);
  background-color: var(--aag-card-background-colour);
  border: var(--border-width-default) solid var(--colour-border-neutral-light_default);
  border-radius: var(--border-radius-l);
  overflow: clip;

  &:has(a:hover, a:focus) {
    --aag-card-background-colour: var(--colour-fill-neutral-lightest);
  }
`
