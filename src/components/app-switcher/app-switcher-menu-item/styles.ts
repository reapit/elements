import { styled } from '@linaria/react'

// (AA)TODO: Make sure these are valid for this
// If we don't have the transparent border, the component will move a slight bit, which is not what we want
export const ElAppSwitcherMenuItemAnchor = styled.a`
  color: var(--text-primary);
  cursor: pointer;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-3);
  padding: var(--spacing-3) var(--spacing-4) var(--spacing-3) var(--spacing-3);
  border-radius: var(--border-radius-l);
  border: var(--border-width-double) solid transparent;);

  &[data-focused='true'] {
    border: var(--border-width-double) solid var(--colour-border-focus);
  }

  &:hover {
    background-color: var(--comp-menu-colour-fill-hover);
    cursor: pointer;
  }
`

export const ElAppSwitcherMenuItemLogo = styled.div`
  width: var(--size-10);
  height: var(--size-10);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }
`

export const ElMenuItemTextWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: var(--spacing-1);
`

export const ElAppSwitcherMenuItemName = styled.div`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`

export const ElAppSwitcherMenuItemDescription = styled.div`
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
`
