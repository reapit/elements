import { styled } from '@linaria/react'

export const ElChipGroup = styled.div`
  display: block;

  :has(& > [data-overflow='scroll']) {
    overflow-x: auto;
  }
`

interface ElChipGroupListProps {
  'data-overflow': 'scroll' | 'wrap'
}

export const ElChipGroupList = styled.ul<ElChipGroupListProps>`
  display: flex;
  gap: var(--spacing-2);

  list-style: none;

  margin: 0;
  padding: 0;

  &[data-overflow='scroll'] {
    flex-wrap: nowrap;
    width: max-content;
  }

  &[data-overflow='wrap'] {
    flex-wrap: wrap;
  }
`

export const ElChipGroupListItem = styled.li`
  display: block;
`
