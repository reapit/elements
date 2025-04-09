import { styled } from '@linaria/react'
import { ElIcon } from '../icon'

const baseStyles = `
  cursor: pointer;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--spacing-2);
  flex-grow: 1;
  border: none;
  outline: none;
  width: 100%;
  border-radius: inherit;
  border: 4px solid transparent;
  background: inherit;
  padding: var(--spacing-2) var(--spacing-4);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  font-style: normal;
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-base);
  letter-spacing: var(--letter-spacing-base);

  &:hover {
    background: var(--fill-default-light);
  }

  &:focus-visible {
    border: 4px solid var(--purple-300);
  }

  &:active,
  &[aria-current='true'],
  &[aria-current='page'] {
    color: var(--text-action);
    font-weight: var(--font-weight-medium);
  }
`

export const ElTopNavMenuItemAnchor = styled.a`
  ${baseStyles}
`

export const ElTopNavMenuItemButton = styled.button`
  ${baseStyles}
`

export const ElTopNavMenuItemExpanderButton = styled.button`
  ${baseStyles}
  ${ElIcon} {
    width: 100%;
    justify-content: end;
    color: var(--icon-primary);
  }
`

export const ElTopNavMenuItemBadge = styled.span`
  display: block;
  width: var(--size-2);
  height: var(--size-2);
  background-color: var(--icon-error);
  border-radius: 100%;
`

export const ElTopNavSubItemUnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  &[aria-hidden='true'] {
    display: none;
  }
`

export const ElTopNavMenuItemListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  align-items: flex-start;
  background: var(--fill-white);
  border-radius: var(--corner-lg);

  &[data-is-expanded='true'] {
    background: var(--fill-default-lightest);

    > ${ElTopNavMenuItemExpanderButton} {
      border-radius: var(--corner-lg) var(--corner-lg) var(--corner-none) var(--corner-none);
    }
    ${ElTopNavSubItemUnorderedList} > * {
      background: var(--fill-default-lightest);
      border-radius: var(--corner-none);
    }
    ${ElTopNavSubItemUnorderedList} > :last-child {
      border-radius: var(--corner-none) var(--corner-none) var(--corner-lg) var(--corner-lg);
    }
    ${ElTopNavMenuItemAnchor}, ${ElTopNavMenuItemExpanderButton} {
      &:hover {
        background: var(--fill-default-light);
      }
    }
  }
`
