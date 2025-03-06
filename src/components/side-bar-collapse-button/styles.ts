import { styled } from '@linaria/react'
import CollapseIcon from './icons/collapse.svg?react'

export const ElSideBarCollapseButtonContainer = styled.div`
  padding-top: var(--spacing-3);
  width: 100%;

  &[data-is-expanded='false'] {
    width: fit-content;
  }
`

export const ElSideBarCollapseButton = styled.button`
  background: var(--fill-white);
  border: none;
  cursor: pointer;

  border-radius: var(--corner-lg);
  display: flex;
  flex-direction: row;
  gap: var(--spacing-3);

  width: 100%;
  display: flex;
  align-self: stretch;
  align-items: center;
  height: 40px;
  padding: var(--spacing-none) var(--spacing-2);
  gap: var(--spacing-3);
  color: var(--neutral-600);
  border-radius: var(--corner-lg);

  &:hover {
    background: var(--fill-default-lightest);
    font-weight: 500;
  }
`

export const ElCollapseIcon = styled(CollapseIcon)`
  width: var(--icon-md);
  height: var(--icon-md);
  padding: var(--spacing-half);
  box-sizing: content-box;
  &[data-is-expanded='false'] {
    transform: rotate(180deg);
  }
`

export const ElSideBarCollapseText = styled.span`
  color: var(--neutral-600);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-sm);
  letter-spacing: var(--letter-spacing-sm);
`
