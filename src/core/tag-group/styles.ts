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
  /* We don't want it to automatically fill the whole width of its container, but we do want to constraint it */
  max-width: 100%;

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
    scrollbar-width: none;
  }
`

export const ElTagGroupListItem = styled.li`
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
`
