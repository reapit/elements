import { styled } from '@linaria/react'

export const ElTagGroupList = styled.ul`
  all: unset;
  box-sizing: border-box;

  display: inline-flex;
  flex-flow: row wrap;
  gap: var(--spacing-1);

  /* NOTE: necessary when used in an inline or inline-block layout */
  vertical-align: middle;
`

export const ElTagGroupListItem = styled.li`
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
`
