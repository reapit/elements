import { styled } from '@linaria/react'
import { Menu } from '../menu'

export const ElBottomBar = styled.div`
  display: flex;
  padding: var(--spacing-2);
  justify-content: space-evenly;
  align-items: center;
  align-self: stretch;
  border-top: var(--border-default) solid var(--outline-default);
  background: var(--fill-white);

  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;
  overflow: visible;
  margin-top: auto;
  width: 100%;
  transition:
    transform 0.3s ease-in-out,
    visibility 0.3s ease-in-out;

  &[data-is-open='true'] {
    transform: translateY(0);
    visibility: visible;
  }

  &[data-is-open='false'] {
    transform: translateY(100%);
    visibility: hidden;
  }
`

export const ElBottomBarMoreMenu = styled(Menu)`
  width: 100%;
`
