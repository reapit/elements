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
  &,
  & svg {
    width: var(--icon_size-xs);
    height: var(--icon_size-xs);
  }
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

  &:focus {
    box-shadow:
      0px 0px 0px 1px #fff,
      0px 0px 0px var(--vertical-shadow-size) var(--purple-300);
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

  /*
  * to make the vertical shadow visible while in mobile/scrollable state
  * we need to add a padding the same size as shadow size
  */
  --vertical-shadow-size: 4px;
  --vertical-shadow-size-negative: calc(-1 * var(--vertical-shadow-size));

  ${isMobile} {
    /* Enable horizontal scrolling in mobile */
    overflow-x: auto;
    flex-wrap: nowrap;

    /* workaround to make the vertical shadow visible while in mobile/scrollable state */
    padding: var(--vertical-shadow-size) 0 var(--vertical-shadow-size) var(--vertical-shadow-size);
    margin: var(--vertical-shadow-size-negative) 0 var(--vertical-shadow-size-negative)
      var(--vertical-shadow-size-negative);

    /* hide scrollbar */
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none; // for firefox
  }
`

export const ElBreadcrumbs = styled.nav``
