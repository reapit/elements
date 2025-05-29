import { styled } from '@linaria/react'

export const ElSideBarCollapseButton = styled.button`
  display: flex;
  padding: var(--spacing-2);
  align-items: center;
  gap: var(--spacing-3);
  width: 100%;
  cursor: pointer;

  background: var(--fill-white);
  border: none;
  border-radius: var(--comp-navigation-border-radius-menu_item);

  &:hover {
    background: var(--fill-default-lightest);
  }

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }
`

export const ElSideBarCollapseButtonIcon = styled.span`
  display: flex;
  padding: var(--spacing-half);
  align-items: center;

  color: var(--comp-navigation-colour-icon-sidebar-default);

  /* TODO: The collapse icon is not part of the Icon component yet; we're just importing a
   * custom SVG directly. When Icon supports it, we should remove our custom SVG. */
  svg {
    color: inherit;
    fill: currentColor;
    width: var(--icon_size-m);
    height: var(--icon_size-m);
  }

  [aria-expanded='false'] & {
    transform: rotate(180deg);
  }
`

export const ElSideBarCollapseLabel = styled.span`
  overflow: hidden;
  color: var(--comp-navigation-colour-text-sidebar-default);
  text-overflow: ellipsis;

  /* text-sm/Regular */
  font-family: var(--font-sm-regular-family);
  font-size: var(--font-sm-regular-size);
  font-style: normal;
  font-weight: var(--font-sm-regular-weight);
  line-height: var(--font-sm-regular-line_height);
  letter-spacing: var(--font-sm-regular-letter_spacing);
`
