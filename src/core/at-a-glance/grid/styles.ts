import { styled } from '@linaria/react'

export const ElAtAGlanceGrid = styled.ul`
  display: grid;
  gap: var(--spacing-4);
  padding: 0;
  margin: 0;
  list-style: none;

  &,
  &[data-layout='template'] {
    grid-auto-flow: row;
  }
  &[data-layout='auto'] {
    grid-auto-flow: column;
  }
`

export const ElAtAGlanceGridItem = styled.li`
  display: grid;
  padding: 0;
  margin: 0;
`
