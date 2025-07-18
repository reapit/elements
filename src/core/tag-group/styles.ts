import { styled } from '@linaria/react'

export const ElTagGroupList = styled.ul`
  display: inline-flex;
  flex-flow: row wrap;
  gap: var(--spacing-1);

  list-style: none;
  margin: 0;
  padding: 0;

  /* NOTE: necessary when used in an inline or inline-block layout */
  vertical-align: middle;
`

export const ElTagGroupListItem = styled.li`
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
`
