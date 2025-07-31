import { css } from '@linaria/core'
import { ElDeprecatedIcon } from '../../../deprecated/icon'
import { font } from '#src/core/text/index'
import { styled } from '@linaria/react'

// NOTE: We can't use styled.button here because Linaria's styled elements silently drop
// Popover API attributes 😤
export const elTopBarNavDropdownButton = css`
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

  /* TODO: Remove this when DeprecatedIcon is removed. */
  ${ElDeprecatedIcon} {
    pointer-events: none;
    margin-left: 0;
  }
`

export const ElTopBarNavDropdownButtonLabel = styled.span`
  white-space: nowrap;

  color: var(--comp-navigation-colour-text-nav_item-default);
  ${font('sm', 'medium')}
`

export const ElTopBarNavDropdownButtonIcon = styled.span`
  color: var(--comp-navigation-colour-icon-nav_button-default);

  width: var(--icon_size-s);
  height: var(--icon_size-s);

  .${elTopBarNavDropdownButton}:has(~ :popover-open) & {
    transform: rotate(180deg);
  }
`
