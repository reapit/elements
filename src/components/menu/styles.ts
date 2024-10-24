import { styled } from '@linaria/react'

export const ElMenu = styled.div`
  position: relative;
  width: fit-content;
`

export const ElMenuPopover = styled.div`
  position: absolute;
  z-index: 100;
`

export const ElMenuList = styled.div`
  min-width: 200px;
  width: fit-content;
  padding: var(--spacing-2) var(--spacing-none);
  border-radius: var(--corner-default);
  background-color: var(--fill-white);
  box-shadow: 0px 4px 16px 0px #222b3329;
`
export const ElMenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: start;
  height: var(--size-7);
  padding: var(--spacing-none) var(--spacing-4);
  gap: var(--spacing-4);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: 400;
  line-height: var(--line-height-sm);
  letter-spacing: var(--letter-spacing-sm);
  color: var(--text-primary);
  &:hover,
  &:focus {
    color: var(--text-white);
    background: var(--fill-action-dark);
  }
`

export const ElMenuItemGroupTitle = styled.span`
  font-family: var(--font-family);
  font-size: var(--font-size-2xs);
  font-style: normal;
  font-weight: 600;
  line-height: var(--line-height-2xs);
  letter-spacing: var(--letter-spacing-2xs);
  color: var(--text-placeholder);
  text-transform: uppercase;
  display: flex;
  height: 32px;
  padding: var(--spacing-none, 0px) var(--spacing-4, 16px);
  align-items: center;
  align-self: stretch;
`
export const ElMenuItemGroup = styled.div``
