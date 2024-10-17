import { styled } from '@linaria/react'
import { Text2XS } from '../typography'

export const ElMenuPopover = styled.div`
  position: absolute;
  white-space: nowrap;
  z-index: 98;
`

export const ElMenu = styled.div`
  overflow: hidden;
  display: flex;
  min-width: 200px;
  width: fit-content;
  padding: var(--spacing-2) var(--spacing-none);
  border-radius: var(--corner-default);
  background-color: var(--fill-white);
  box-shadow: 0px 4px 16px 0px #222b3329;
`

export const ElMenuItemContainer = styled.li`
  a,
  button {
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
    text-align: left;
    color: var(--text-primary);

    &:hover {
      color: var(--text-white);
      background: var(--fill-action-dark);
    }
  }

  /* customize html default button */
  button {
    background-color: transparent;
    cursor: pointer;
    border: none;
    border-radius: 0;
  }
`

export const ElMenuItemGroup = styled.ul`
  &,
  & li > * {
    width: 100%;
  }
`

export const ElMenuItemGroupTitle = styled(Text2XS)`
  display: flex;
  align-items: center;
  height: 32px;
  padding: var(--spacing-none) var(--spacing-4) var(--spacing-none) var(--spacing-4);
  color: var(--text-placeholder);
  font-weight: 600;
  text-transform: uppercase;
`
