import { styled } from '@linaria/react'

export const ElMobileNavItemListItem = styled.li`
  border-radius: inherit;
`

export const ElMobileNavSubItemUnorderedList = styled.ul`
  &[aria-hidden='true'] {
    display: none;
  }
`

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
  padding: var(--space-2, 8px) var(--space-4, 16px);

  font-family: var(--font-family, Inter);
  font-size: var(--font-size-base, 15px);
  font-style: normal;
  font-weight: var(--font-weight-regular, Regular);
  line-height: var(--line-height-base, 24px);
  letter-spacing: var(--letter-spacing-base, -0.15px);

  &:hover {
    background: var(--fill-default-light, #e5e9ed);
  }

  &:focus-visible {
    border: 4px solid var(--purple-300, #7e9bfa);
  }

  &:active,
  &[aria-current='true'],
  &[aria-current='page'] {
    color: var(--text-action, #4e56ea);
  }
`

export const ElMobileNavItemAnchor = styled.a`
  ${baseStyles}
`

export const ElMobileNavItemExpanderButton = styled.button`
  ${baseStyles}
`

export const ElMobileNavItemContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--space-2, 8px);

  flex-grow: 1;
`

export const ElMobileNavItemBadge = styled.span`
  display: block;
  width: var(--size-2, 8px);
  height: var(--size-2, 8px);
  background-color: var(--icon-error, #f01830);
  border-radius: 100%;
`

export const ElMobileNavItemUnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  background: var(--fill-white, #fff);
  border-radius: var(--corner-lg, 8px);

  &[data-is-expanded='true'] {
    background: var(--fill-default-lightest, #f2f4f6);

    ${ElMobileNavItemListItem} > ${ElMobileNavItemExpanderButton} {
      border-radius: var(--corner-lg, 8px) var(--corner-lg, 8px) var(--corner-none, 0) var(--corner-none, 0);
    }

    ${ElMobileNavSubItemUnorderedList} > ${ElMobileNavItemListItem}:last-child {
      border-radius: var(--corner-none, 0) var(--corner-none, 0) var(--corner-lg, 8px) var(--corner-lg, 8px);
    }

    ${ElMobileNavItemAnchor}, ${ElMobileNavItemExpanderButton} {
      &:hover {
        background: var(--fill-default-light, #e5e9ed);
      }
    }
  }
`
