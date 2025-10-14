import { styled } from '@linaria/react'

interface ElCheckboxGroupProps {
  'data-orientation': 'vertical' | 'horizontal'
}

export const ElCheckboxGroup = styled.div<ElCheckboxGroupProps>`
  display: flex;
  align-items: flex-start;

  &,
  &[data-orientation='vertical'] {
    flex-flow: column nowrap;
    gap: var(--spacing-2);
  }
  &[data-orientation='horizontal'] {
    flex-flow: row wrap;
    gap: var(--spacing-6);
  }
`
