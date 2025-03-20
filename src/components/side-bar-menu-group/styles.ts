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
  flex: 1;
  text-align: left;
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
  width: 100%;
  justify-content: flex-start;
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

  &:hover,
  &:focus-visible {
    &,
    ${ElSideBarMenuGroupTriggerIcon} svg {
      background: var(--colour-fill-neutral-light);
    }
  }

  &:focus-visible {
    outline: none;
    border: var(--border-width-double) solid var(--colour-border-focus);
  }
`

export const ElSideBarMenuGroup = styled.li`
  border-radius: var(--corner-lg);
  &[data-expanded='true'] {
    background: var(--colour-fill-neutral-lightest);
  }
`

export const ElSideBarMenuGroupList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-1);
  padding-bottom: var(--spacing-2);
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

  &:hover,
  &:focus-visible {
    background: var(--colour-fill-neutral-light);
  }

  &[aria-current='page'] {
    color: var(--text-action);
    font-weight: var(--font-weight-medium);
  }

  &:focus-visible {
    outline: none;
    border: var(--border-width-double) solid var(--colour-border-focus);
  }
`

export const ElSideBarMenuGroupItem = styled.a``
