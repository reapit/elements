import { styled } from '@linaria/react'

import { ElIcon } from '../icon'
import { ElTopBarMenuItemAnchor, ElTopBarMenuItemButton } from '../top-bar-menu-item'

export const ElTopBarMenuItemGroupButton = styled(ElTopBarMenuItemButton)`
  ${ElIcon} {
    color: var(--icon-primary);
  }
`

export const ElTopBarMenuItemGroupContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
`

export const ElTopBarMenuItemGroupList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  &[aria-hidden='true'] {
    display: none;
  }
`

export const ElTopBarMenuItemGroupListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  align-items: flex-start;
  background: var(--fill-white);
  border-radius: var(--corner-lg);

  &[data-is-expanded='true'] {
    background: var(--fill-default-lightest);
    > ${ElTopBarMenuItemGroupButton} {
      border-radius: var(--corner-lg) var(--corner-lg) var(--corner-none) var(--corner-none);
    }
    ${ElTopBarMenuItemGroupList} > * {
      background: var(--fill-default-lightest);
      border-radius: var(--corner-none);
    }
    ${ElTopBarMenuItemGroupList} > :last-child {
      border-radius: var(--corner-none) var(--corner-none) var(--corner-lg) var(--corner-lg);
    }
    ${ElTopBarMenuItemAnchor}, ${ElTopBarMenuItemGroupButton}, ${ElTopBarMenuItemButton} {
      &:hover {
        background: var(--fill-default-light);
      }
    }
  }
`
