import { styled } from '@linaria/react'
import { ElIcon } from '../../../icon'

export const ElNavMenuButtonMenuContainer = styled.div`
  position: absolute;
  white-space: nowrap;
  top: 36px;
  z-index: 99;
`

export const ElNavMenuButtonContainer = styled.div`
  position: relative;

  &[data-alignment='left'] {
    > ${ElNavMenuButtonMenuContainer} {
      left: 0;
    }
  }
  &[data-alignment='right'] {
    > ${ElNavMenuButtonMenuContainer} {
      right: 0;
    }
  }
`

export const ElNavMenuButtonToggler = styled.button`
  cursor: pointer;
  border: none !important;
  height: 32px;
  display: inline-flex;
  padding: var(--spacing-1) var(--spacing-3);
  gap: var(--spacing-1);
  border-radius: var(--corner-default);
  background-color: var(--fill-white);
  color: var(--text-secondary);
  align-items: center;
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: 500;
  line-height: var(--line-height-sm);
  letter-spacing: var(--letter-spacing-sm);
  text-align: left;

  ${ElIcon} {
    pointer-events: none;
    margin-left: 0;
  }

  &:focus {
    justify-content: center;
    color: var(--text-secondary);
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
