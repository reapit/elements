import { styled } from '@linaria/react'
import { ElIcon } from '../../icon'

export const ElTopBarNavDropdownButton = styled.button`
  --__padding-block: calc(var(--spacing-half) + var(--spacing-1));
  --__padding-inline: calc(var(--spacing-half) + var(--spacing-3));

  display: flex;
  padding: var(--__padding-block) var(--__padding-inline);
  align-items: center;
  justify-content: center;
  gap: var(--spacing-1);

  border-radius: var(--comp-navigation-border-radius-nav_item-desktop);
  background: var(--comp-navigation-colour-fill-nav_item-default);

  width: min-content;

  cursor: pointer;
  border: none;

  color: var(--comp-navigation-colour-text-nav_item-default);

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }

  &:hover {
    border-radius: var(--comp-navigation-border-radius-nav_item-desktop);
    background: var(--comp-navigation-colour-fill-nav_item-hover);
  }

  ${ElIcon} {
    pointer-events: none;
    margin-left: 0;
  }

  &:hover {
    background: var(--comp-navigation-colour-fill-nav_item-hover);
  }
`

export const ElTopBarNavDropdownButtonLabel = styled.span`
  white-space: nowrap;

  color: var(--comp-navigation-colour-text-nav_item-default);

  /* text-sm/Medium */
  font-family: var(--font-sm-medium-family);
  font-size: var(--font-sm-medium-size);
  font-style: normal;
  font-weight: var(--font-sm-medium-weight);
  line-height: var(--font-sm-medium-line_height);
  letter-spacing: var(--font-sm-medium-letter_spacing);
`

export const ElTopBarNavDropdownButtonIcon = styled.span`
  [aria-expanded='true'] & {
    transform: rotate(180deg);
  }
`
