import { styled } from '@linaria/react'

interface ElChipGroupListProps {
  'data-flow': 'wrap' | 'nowrap'
  'data-overflow': 'auto' | 'visible'
}

export const ElChipGroupList = styled.ul<ElChipGroupListProps>`
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

export const ElChipGroupListItem = styled.li`
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  max-width: 100%;
`
