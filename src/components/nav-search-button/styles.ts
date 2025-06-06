import { styled } from '@linaria/react'
import SearchIcon from './icons/search-icon.svg?react'
import { isTablet } from '#src/styles/media'
import { NavIconItem } from '../nav-icon-item'

export const ElNavSearchButtonContainer = styled.div`
  width: 100%;
  container-name: nav-search-button-container;
  container-type: inline-size;
`

export const ElNavSearchIconItem = styled(NavIconItem)`
  @supports not (container: inline-size) {
    ${isTablet} {
      display: none;
    }
  }

  @supports (container: inline-size) {
    @container nav-search-button-container (width >= 150px) {
      display: none;
    }
  }
`

export const ElNavSearchButton = styled.button`
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 200px;
  padding: var(--spacing-2);
  gap: var(--spacing-2);

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

  display: none;
  @supports not (container: inline-size) {
    ${isTablet} {
      display: flex;
    }
  }

  @supports (container: inline-size) {
    @container nav-search-button-container (width >= 150px) {
      display: flex;
    }
  }
`

export const ElNavSearchButtonIcon = styled(SearchIcon)`
  width: var(--icon-sm);
  height: var(--icon-sm);
  flex-shrink: 0;
  color: var(--comp-navigation-colour-icon-nav_search);
`

const basePlaceholderStyle = `
  color: var(--comp-navigation-colour-text-nav_search-placeholder);
  font-family: var(--font-family);
  font-style: normal;
`

export const ElNavSearchButtonPlaceholder = styled.span`
  ${basePlaceholderStyle}
  font-size: var(--font-xs-regular-size);
  font-weight: var(--font-xs-regular-weight);
  line-height: var(--font-xs-regular-line_height);
  letter-spacing: var(--font-xs-regular-letter_spacing);

  flex: 1;
  text-align: left;
`

export const ElNavSearchButtonShortcutText = styled.span`
  ${basePlaceholderStyle}
  font-size: var(--font-2xs-medium-size);
  font-weight: var(--font-2xs-medium-weight);
  line-height: var(--font-2xs-medium-line_height);
  letter-spacing: var(--font-2xs-medium-letter_spacing);

  @supports (container: inline-size) {
    @container nav-search-button-container (width < 150px) {
      display: none;
    }
  }
`
