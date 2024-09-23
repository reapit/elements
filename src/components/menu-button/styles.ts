import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { Button } from '../button'
import { ElIcon } from '../icon'

export const elHasIntent = css``
export const elHasBorder = css``
export const elHasRightAlignedMenu = css``

export const ElMenuButtonContainer = styled.div`
  position: relative;

  &.${elHasRightAlignedMenu} > button + div {
    right: 0;
  }
`

export const ElMenuButtonMenuContainer = styled.div`
  position: absolute;
  white-space: nowrap;
  top: 36px;
  z-index: 99;
`

export const ElMenuButtonToggler = styled(Button)`
  cursor: pointer;
  border: none !important;

  height: 32px;
  display: inline-flex;
  padding: var(--spacing-1) var(--spacing-3);
  align-items: center;
  gap: var(--spacing-1);
  border-radius: var(--corner-default);
  background-color: var(--fill-white);
  color: var(--text-secondary);

  ${ElIcon} {
    pointer-events: none;
    margin-left: 0;
  }

  &.${elHasBorder} {
    border: 1px solid var(--neutral-100) !important;
    &:hover {
      background-color: var(--fill-white);
      border: 1px solid var(--neutral-400) !important;
    }
  }

  &:focus {
    justify-content: center;
    color: var(--text-secondary);
    &.${elHasIntent} {
      color: white;
    }
    border-radius: var(--corner-default);
    background-color: var(--fill-white);
    box-shadow:
      0px 0px 0px 1px #fff,
      0px 0px 0px 4px #66b2ff;
  }
  &:hover {
    border-radius: var(--corner-default);
    background-color: var(--fill-default-lightest);
    & > span {
      color: var(--color-grey-700);
    }
  }
`
