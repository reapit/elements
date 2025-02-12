import { styled } from '@linaria/react'
import SearchIcon from './icons/search-icon.svg?react'
import { ElButtonNavIconItem } from '../nav-icon-item'
import { isMobile } from '#src/styles/media'

export const ElNavSearchButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--spacing-2);
  gap: var(--spacing-2);
  border-radius: var(--corner-default);
  background: var(--fill-default-lightest);

  &:focus {
    box-shadow:
      0px 0px 0px 1px #fff,
      0px 0px 0px 4px var(--purple-300);
  }

  &:hover {
    background: var(--fill-default-light);
  }

  border: none;
  outline: none;
`

export const ElNavSearchButtonContainer = styled.div`
  ${ElButtonNavIconItem} {
    display: none;
  }

  ${isMobile} {
    ${ElNavSearchButton} {
      display: none;
    }
    ${ElButtonNavIconItem} {
      display: inline-block;
    }
  }
`

export const ElNavSearchButtonIcon = styled(SearchIcon)`
  width: var(--icon-sm);
  height: var(--icon-sm);
  flex-shrink: 0;
  color: var(--icon-primary);
`

const basePlaceholderStyle = `
  color: var(--text-placeholder);
  font-family: var(--font-family);
  font-style: normal;
`

export const ElNavSearchButtonPlaceholder = styled.span`
  ${basePlaceholderStyle}
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-xs);
  letter-spacing: var(--letter-spacing-xs);

  flex: 1;
  text-align: left;
`

export const ElNavSearchButtonShortcutText = styled.span`
  ${basePlaceholderStyle}
  font-size: var(--font-size-2xs);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-2xs);
  letter-spacing: var(--letter-spacing-2xs);
`
