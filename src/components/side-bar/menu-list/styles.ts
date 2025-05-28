import { styled } from '@linaria/react'

export const ElSideBarMenuList = styled.ul`
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  padding-block-end: var(--spacing-2);
  width: 100%;
`

export const ElSideBarMenuListItem = styled.li`
  display: block;
`
