import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { DeprecatedIcon } from '../deprecated-icon'
import { isMobile } from '#src/styles/media'

export const ElBreadcrumbsItem = styled.li`
  display: flex;
  align-items: center;
  min-width: 0; /* Ensures flex children can shrink */

  ${isMobile} {
    /* disallow shrink on mobile */
    min-width: auto;
  }
`

export const ElBreadcrumbsItemChevron = styled(DeprecatedIcon)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--spacing-1);

  font-size: var(--icon_size-xs);
  color: var(--icon-primary);
`

export const elBreadcrumbsLink = css`
  color: var(--colour-text-secondary);

  font-family: var(--font-sm-regular-family);
  font-size: var(--font-sm-regular-size);
  font-style: normal;
  font-weight: var(--font-sm-regular-weight);
  line-height: var(--font-sm-regular-line_height);
  letter-spacing: var(--font-sm-regular-letter_spacing);

  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  padding: 1px; /* to imitate the link focus size */
  border: var(--border-width-double) solid transparent;
  &:focus {
    border-color: var(--colour-border-focus);
  }

  &:focus-visible {
    outline: none;
  }

  &:hover {
    text-decoration: underline;
  }
`

export const ElBreadcrumbsList = styled.ul`
  display: flex;

  ${isMobile} {
    /* Enable horizontal scrolling in mobile */
    overflow-x: auto;
    flex-wrap: nowrap;

    /* hide scrollbar */
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none; /* for firefox */
  }
`

export const ElBreadcrumbs = styled.nav``
