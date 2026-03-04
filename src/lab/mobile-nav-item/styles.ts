import { font } from '#src/utils/font'
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
    background: var(--colour-fill-neutral-light);
  }

  &:focus-visible {
    border: 4px solid var(--colour-fill-action-light);
  }

  &:active,
  &[aria-current='true'],
  &[aria-current='page'] {
    color: var(--colour-text-action);
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
  background-color: var(--colour-icon-error);
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
  background: var(--colour-fill-white);
  border-radius: var(--border-radius-l);

  &[data-is-expanded='true'] {
    background: var(--colour-fill-neutral-lightest);

    > ${ElExperimentalMobileNavItemExpanderButton} {
      border-radius: var(--border-radius-l) var(--border-radius-l) var(--border-radius-none) var(--border-radius-none);
    }
    ${ElExperimentalMobileNavSubItemUnorderedList} > * {
      background: var(--colour-fill-neutral-lightest);
      border-radius: var(--border-radius-none);
    }
    ${ElExperimentalMobileNavSubItemUnorderedList} > :last-child {
      border-radius: var(--border-radius-none) var(--border-radius-none) var(--border-radius-l) var(--border-radius-l);
    }
    ${ElExperimentalMobileNavItemAnchor}, ${ElExperimentalMobileNavItemExpanderButton} {
      &:hover {
        background: var(--colour-fill-neutral-light);
      }
    }
  }
`
