import { styled } from '@linaria/react'

export const ElBottomBarMenuList = styled.menu`
  @layer elements.main {
    list-style: none;

    display: flex;
    flex-direction: row;
    justify-content: stretch;
    margin-block: 0;
    margin-inline: 0;
    padding-block: 0;
    padding-inline: 0;
    width: 100%;
  }
`

export const ElBottomBarMenuListItem = styled.li`
  @layer elements.main {
    display: block;
    flex-grow: 1;
  }
`
