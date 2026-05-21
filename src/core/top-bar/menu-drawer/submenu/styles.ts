import { styled } from '@linaria/react'

export const ElTopBarMenuDrawerSubmenuList = styled.ul`
  @layer elements.main {
    list-style: none;

    display: flex;
    flex-direction: column;
    margin-block: 0;
    padding-inline: 0;
    padding-block-end: var(--spacing-2);
  }
`

export const ElTopBarMenuDrawerSubmenuListItem = styled.li`
  @layer elements.main {
    display: block;
  }
`
