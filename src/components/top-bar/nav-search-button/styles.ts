import { font } from '#src/components/text'
import SearchIcon from './icons/search-icon.svg?react'
import { styled } from '@linaria/react'

export const ElTopBarNavSearchButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--spacing-2);
  gap: var(--spacing-2);

  overflow: hidden;

  border-radius: var(--comp-navigation-border-radius-nav_search);
  background: var(--comp-navigation-colour-fill-nav_search-default);

  &:focus {
    outline: var(--border-width-double) solid var(--colour-border-focus);
  }

  &:hover {
    background: var(--comp-navigation-colour-fill-nav_search-hover);
  }

  border: none;
  outline: none;
`

export const ElTopBarNavSearchButtonIcon = styled(SearchIcon)`
  width: var(--icon-sm);
  height: var(--icon-sm);
  flex-shrink: 0;
  color: var(--comp-navigation-colour-icon-nav_search);
`

export const ElTopBarNavSearchButtonPlaceholder = styled.span`
  color: var(--comp-navigation-colour-text-nav_search-placeholder);
  ${font('xs', 'regular')}

  flex: 1;
  text-align: left;
`

export const ElTopBarNavSearchButtonShortcutText = styled.kbd`
  color: var(--comp-navigation-colour-text-nav_search-placeholder);
  font-family: var(--font-family);
  font-style: normal;
  font-size: var(--font-2xs-medium-size);
  font-weight: var(--font-2xs-medium-weight);
  line-height: var(--font-2xs-medium-line_height);
  letter-spacing: var(--font-2xs-medium-letter_spacing);
`
