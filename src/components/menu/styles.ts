import { styled } from '@linaria/react'

export const ElMenu = styled.div`
  position: relative;
  width: fit-content;
`

export const ElMenuPopover = styled.div`
  position: absolute;
  z-index: 98;
`

export const ElMenuList = styled.div`
  min-width: 200px;
  width: fit-content;
  padding: var(--spacing-2) var(--spacing-none);
  border-radius: var(--corner-default);
  background-color: var(--fill-white);
  box-shadow: 0px 4px 16px 0px #222b3329;
`
