import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const elDropdownIcon = css`
  width: 24px;
  height: 24px;
  display: flex;
  padding: var(--spacing-1);
  justify-content: center;
  align-items: center;
  color: var(--neutral-400);
`

export const ElSideBarMenuGroupItemText = styled.span`
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-style: normal;
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-sm);
  letter-spacing: var(--letter-spacing-sm);
`

export const ElSideBarMenuGroupTriggerIcon = styled.span`
  // override elIcon and custom icon
  svg,
  & {
    width: var(--icon-md);
    height: var(--icon-md);
    color: var(--neutral-400);
    box-sizing: content-box;
  }

  padding: var(--spacing-half);
`

export const ElSideBarMenuGroupListItem = styled.li``

export const ElSideBarMenuGroupItemTrigger = styled.button`
  // button override
  cursor: pointer;
  background: none;
  border: none;

  display: flex;
  height: 40px;
  padding: var(--spacing-none) var(--spacing-2);
  align-items: center;
  gap: var(--spacing-3);
  align-self: stretch;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;

  &[data-expanded='false'] {
    border-radius: inherit;
  }

  color: var(--component-text-colour-text-side-bar-menu-item-default, #506478);

  &[aria-current='page'] {
    & ${ElSideBarMenuGroupItemText}, ${ElSideBarMenuGroupTriggerIcon} svg {
      color: var(--text-action);
      font-weight: var(--font-weight-medium);
    }
  }

  &:hover {
    &,
    ${ElSideBarMenuGroupTriggerIcon} svg {
      background: var(--fill-default-light);
    }
  }
`

export const ElSideBarMenuGroup = styled.li`
  display: flex;
  flex-direction: column;
  border-radius: var(--corner-lg);
  background: var(--fill-default-lightest);
`

export const ElSideBarMenuGroupList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-1);
  padding-bottom: var(--spacing-2);
  background: var(--fill-default-lightest);
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
`

export const elSideBarMenuGroupItemAnchor = css`
  display: flex;
  align-items: center;
  text-align: start;
  color: var(--component-text-colour-text-side-bar-menu-item-default, #506478);

  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-style: normal;
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-sm);
  letter-spacing: var(--letter-spacing-sm);
  padding: var(--spacing-none) var(--spacing-3) var(--spacing-none) 44px;
  height: var(--size-8);

  &:hover {
    background: var(--fill-default-light);
  }

  &[aria-current='page'] {
    color: var(--text-action);
    font-weight: var(--font-weight-medium);
  }
`

export const ElSideBarMenuGroupItem = styled.a``
