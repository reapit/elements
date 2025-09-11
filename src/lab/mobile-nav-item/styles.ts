import { ElDeprecatedIcon } from '#src/deprecated/icon'
import { font } from '#src/core/text'
import { styled } from '@linaria/react'

const baseStyles = `
  cursor: pointer;
  color: inherit;
  display: flex;
  border: none;
  outline: none;
  width: 100%;
  border-radius: inherit;
  border: 4px solid transparent;
  background: inherit;
  padding: var(--spacing-2) var(--spacing-4);
  ${font('base', 'regular')}
  text-decoration: none;

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
    ${font('base', 'medium')}
  }
`

export const ElExperimentalMobileNavItemAnchor = styled.a`
  ${baseStyles}
`

export const ElExperimentalMobileNavItemButton = styled.button`
  ${baseStyles}
`

export const ElExperimentalMobileNavItemExpanderButton = styled.button`
  ${baseStyles}

  ${ElDeprecatedIcon} {
    color: var(--icon-primary);
  }
`

export const ElExperimentalMobileNavItemContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--spacing-2);
  flex-grow: 1;
`

export const ElExperimentalMobileNavItemBadge = styled.span`
  display: block;
  width: var(--size-2);
  height: var(--size-2);
  background-color: var(--icon-error);
  border-radius: 100%;
`

export const ElExperimentalMobileNavSubItemUnorderedList = styled.ul`
  list-style: none;

  margin-block: 0;
  padding-inline: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  &[aria-hidden='true'] {
    display: none;
  }
`

export const ElExperimentalMobileNavItemListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  align-items: flex-start;
  background: var(--fill-white);
  border-radius: var(--corner-lg);

  &[data-is-expanded='true'] {
    background: var(--fill-default-lightest);

    > ${ElExperimentalMobileNavItemExpanderButton} {
      border-radius: var(--corner-lg) var(--corner-lg) var(--corner-none) var(--corner-none);
    }
    ${ElExperimentalMobileNavSubItemUnorderedList} > * {
      background: var(--fill-default-lightest);
      border-radius: var(--corner-none);
    }
    ${ElExperimentalMobileNavSubItemUnorderedList} > :last-child {
      border-radius: var(--corner-none) var(--corner-none) var(--corner-lg) var(--corner-lg);
    }
    ${ElExperimentalMobileNavItemAnchor}, ${ElExperimentalMobileNavItemExpanderButton} {
      &:hover {
        background: var(--fill-default-light);
      }
    }
  }
`
