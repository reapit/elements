import { styled } from '@linaria/react'

interface ElButtonGroupProps {
  'data-auto-flow'?: 'row' | 'column'
  'data-justify-content'?: 'start' | 'end' | 'center' | 'stretch'
}

export const ElButtonGroup = styled.div<ElButtonGroupProps>`
  display: grid;
  gap: var(--spacing-2);

  &,
  &[data-auto-flow='column'] {
    grid-auto-flow: column;
  }

  &[data-auto-flow='row'] {
    grid-auto-flow: row;
  }

  &,
  &[data-justify-content='start'] {
    justify-content: start;
  }

  &[data-justify-content='end'] {
    justify-content: end;
  }

  &[data-justify-content='center'] {
    justify-content: center;
  }

  &[data-justify-content='stretch'] {
    justify-content: stretch;
  }
`
