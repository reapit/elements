import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const elAtAGlanceGrid = css`
  display: grid;
  gap: var(--aag-grid-gap, var(--spacing-4));
  /* Ensures the card's outline does not get clipped by the scroll container */
  padding: var(--border-width-double);
  margin: calc(0 - var(--border-width-double));
  list-style: none;

  &,
  &[data-layout='template'] {
    grid-auto-flow: row;
  }
  &[data-layout='auto'] {
    grid-auto-flow: column;
    overflow: auto;
    scroll-snap-type: x mandatory;
    /* Account for grid container padding when scroll snapping */
    scroll-padding: var(--border-width-double);
  }
`

export const ElAtAGlanceGridItem = styled.li`
  display: grid;
  padding: 0;
  margin: 0;

  scroll-snap-align: start;
`
