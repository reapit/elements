import { styled } from '@linaria/react'

interface ElTagGroupListProps {
  'data-flow': 'wrap' | 'nowrap'
  'data-overflow': 'auto' | 'visible'
}

export const ElTagGroupList = styled.ul<ElTagGroupListProps>`
  display: inline-flex;
  gap: var(--spacing-1);

  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;

  /* NOTE: necessary when used in an inline or inline-block layout */
  vertical-align: middle;

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

  &[data-overflow='hidden'] {
    overflow: hidden;
  }

  &[data-overflow='scroll'] {
    overflow: scroll;
  }

  &[data-overflow='auto'],
  &[data-overflow='scroll'] {
    scrollbar-width: 0;
  }
`

export const ElTagGroupListItem = styled.li`
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
`
