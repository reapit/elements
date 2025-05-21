import { styled } from '@linaria/react'

export const ElAppSwitcherNavIconButton = styled.button`
  height: var(--size-9);
  width: var(--size-9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: var(--spacing-1);
  padding-bottom: var(--spacing-1);
  padding-left: var(--spacing-1);
  padding-right: var(--spacing-1);
  border: none;
  border-radius: var(--corner-default);
  color: var(--icon-primary);
  background-color: transparent;

  &:hover {
    background-color: var(--fill-default-light);
    cursor: pointer;
  }

  &[data-selected='true'] {
    background-color: var(--fill-default-lightest);
  }
`
