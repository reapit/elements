import { styled } from '@linaria/react'

export const ElSideBarSubmenuList = styled.ul`
  @layer elements.main {
    list-style: none;

    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
    margin-block: 0;
    padding-inline: 0;
    padding-block-end: var(--spacing-2);
  }
`

export const ElSideBarSubmenuListItem = styled.li`
  @layer elements.main {
    display: block;
  }
`
