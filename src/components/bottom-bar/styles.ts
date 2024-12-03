import { styled } from '@linaria/react'
import { ElMenu, ElMenuList, ElMenuPopover } from '../menu'

export const ElBottomBar = styled.div`
  display: flex;
  padding: var(--spacing-2, 8px);
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-top: var(--border-default, 1px) solid var(--outline-default, #e5e9ed);
  background: var(--fill-white, #fff);

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

  &[data-slide-direction='up'] {
    transform: translateY(0);
    visibility: visible;
  }

  &[data-slide-direction='down'] {
    transform: translateY(100%);
    visibility: hidden;
  }

  ${ElMenu} {
    display: flex;
    flex: 1 1 0;
    justify-content: center;
  }

  ${ElMenuList} {
    min-width: 109px;
  }

  ${ElMenuPopover} {
    right: 0;
  }
`
