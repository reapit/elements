import { styled } from '@linaria/react'
import { ElIcon } from '../icon'

export const ElNavDropdownButton = styled.button`
  cursor: pointer;
  border: none !important;
  height: 32px;
  display: inline-flex;
  padding: var(--spacing-1) var(--spacing-3);
  gap: var(--spacing-1);
  border-radius: var(--comp-navigation-border-radius-nav_item-desktop);
  background-color: var(--fill-white);
  color: var(--comp-navigation-colour-text-nav_item-default);
  align-items: center;
  font-family: var(--font-sm-medium-family);
  font-size: var(--font-sm-medium-size);
  font-weight: var(--font-sm-medium-weight);
  line-height: var(--font-sm-medium-line_height);
  letter-spacing: var(--font-sm-medium-letter_spacing);

  ${ElIcon} {
    pointer-events: none;
    margin-left: 0;
  }

  &:focus {
    justify-content: center;
    background-color: var(--fill-white);
    outline: var(--border-width-double) solid var(--colour-border-focus);
  }

  &:hover {
    background: var(--comp-navigation-colour-fill-nav_item-hover);
  }
`
