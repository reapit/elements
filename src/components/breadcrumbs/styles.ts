import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { Icon } from '../icon'
import { isMobile } from '#src/styles/media'

export const ElBreadcrumbsItem = styled.li`
  display: flex;
  align-items: center;
  min-width: 0; /* Ensures flex children can shrink */

  ${isMobile} {
    // dissalow shrink on mobile
    min-width: auto;
  }
`

export const ElBreadcrumbsItemChevron = styled(Icon)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px var(--spacing-1);

  box-sizing: content-box;
  width: var(--icon-xs);
  height: var(--icon-xs);
  color: var(--icon-primary);
`

export const elBreadcrumbsLink = css`
  color: var(--text-secondary);

  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-style: normal;
  font-weight: 400;
  line-height: var(--line-height-sm);
  letter-spacing: var(--letter-spacing-sm);

  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:focus {
    box-shadow:
      0px 0px 0px 1px #fff,
      0px 0px 0px 4px var(--purple-300);
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
    scrollbar-width: none; // for firefox
  }
`

export const ElBreadcrumbs = styled.nav``
