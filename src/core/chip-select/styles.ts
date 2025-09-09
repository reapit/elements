import { styled } from '@linaria/react'

interface ElChipSelectProps {
  'data-flow': 'wrap' | 'nowrap'
  'data-overflow': 'auto' | 'visible'
}

export const ElChipSelect = styled.div<ElChipSelectProps>`
  display: inline-flex;
  gap: var(--spacing-2);

  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;

  &,
  &[data-flow='wrap'] {
    flex-flow: row wrap;
  }

  &[data-flow='nowrap'] {
    flex-flow: row nowrap;
  }

  &,
  &[data-overflow='visible'] {
    overflow: visible;
  }

  &[data-overflow='auto'] {
    overflow: auto;
  }
`
