import { styled } from '@linaria/react'

export const ElAtAGlanceCard = styled.article`
  /* Allows descendants like ElAtAGlanceCardLink to absolutely position themselves within the card. */
  position: relative;
  /* 1x1 grid layout ensures content fills the card's available space. */
  display: grid;
  grid: 1fr / 1fr;
  padding: 0;
  background-color: var(--colour-fill-white);
  border: var(--border-width-default) solid var(--colour-border-neutral-light_default);
  border-radius: var(--border-radius-l);
`
