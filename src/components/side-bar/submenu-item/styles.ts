import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const ElSideBarSubmenuItemLabel = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  /* text-sm/Regular */
  font-family: var(--font-sm-regular-family);
  font-size: var(--font-sm-regular-size);
  font-style: normal;
  font-weight: var(--font-sm-regular-weight);
  line-height: var(--font-sm-regular-line_height);
  letter-spacing: var(--font-sm-regular-letter_spacing);

  color: var(--comp-navigation-colour-text-sidebar-default);
  [aria-current='page'] > & {
    color: var(--comp-navigation-colour-text-sidebar-select);
    font-weight: var(--font-weight-medium);
  }
`

export const elSideBarSubmenuItem = css`
  display: flex;
  align-items: center;
  text-align: start;
  width: 100%;

  padding: var(--spacing-none) var(--spacing-3) var(--spacing-none) 44px;

  /* NOTE: If the container width is 40px or less, the side bar must be collapsed,
   * so we want to reduce our inline start padding to ensure we aren't overflowing
   * the container. */
  @container (width <= 40px) {
    padding-inline-start: 28px; /* 40px - var(--spacing-3) */
  }

  border-radius: var(--comp-navigation-border-radius-none);
  height: var(--size-8);

  &:hover,
  &:focus-visible {
    background: var(--comp-navigation-colour-fill-sidebar-hover);
  }

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }
`
