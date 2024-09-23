import { styled } from '@linaria/react'
import { elTextSM, Text2XS } from '../typography'

export const ElMenu = styled.div`
  overflow: hidden;
  display: flex;
  width: fit-content;
  padding: var(--spacing-2) var(--spacing-none);
  flex-direction: column;
  align-items: flex-start;
  border-radius: var(--corner-default);
  background-color: var(--fill-white);
  box-shadow: 0px 4px 16px 0px rgba(34, 43, 51, 0.16);
`

export const ElMenuItemContainer = styled.li``

export const ElMenuItemLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: start;

  &:hover {
    div {
      color: var(--text-white);
    }
    background-color: var(--fill-action-dark);
  }
  height: var(--size-7);
  padding: var(--spacing-none) var(--spacing-4);
  gap: var(--spacing-4);
`

export const ElMenuItemButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: start;

  &:hover {
    div {
      color: var(--text-white);
    }
    background-color: var(--fill-action-dark);
  }
  height: var(--size-7);
  padding: var(--spacing-none) var(--spacing-4);
  gap: var(--spacing-4);

  /* customize html default button */
  background-color: transparent;
  border: none;
  cursor: pointer;

  .${elTextSM} {
    text-align: left;
  }
`

export const ElMenuItemGroup = styled.ul`
  width: 100%;
  li,
  a,
  button {
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const ElMenuItemGroupTitle = styled(Text2XS)`
  display: flex;
  align-items: center;
  height: 32px;
  padding: var(--spacing-none) var(--spacing-4) var(--spacing-none) var(--spacing-4);
  margin-bottom: 0;
  color: var(--text-placeholder);
  font-weight: 600;
  text-align: left;
  text-transform: uppercase;
`
