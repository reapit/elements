import { DeprecatedMenu } from '#src/deprecated/menu'
import { styled } from '@linaria/react'

export const ElBottomBarMenuList = styled.menu`
  list-style: none;

  display: flex;
  flex-direction: row;
  justify-content: stretch;
  margin-block: 0;
  margin-inline: 0;
  padding-block: 0;
  padding-inline: 0;
  width: 100%;
`

export const ElBottomBarMenuListItem = styled.li`
  display: block;
  flex-grow: 1;
`

export const ElBottomBarMenu = styled(DeprecatedMenu)`
  width: 100%;
`
