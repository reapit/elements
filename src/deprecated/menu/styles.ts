import { css } from '@linaria/core'
import { styled } from '@linaria/react'

/** @deprecated */
export const ElDeprecatedMenuPopover = styled.div`
  position: absolute;
  z-index: 100;
`

/** @deprecated */
export const ElDeprecatedMenu = styled.div`
  position: relative;

  &[data-alignment='left'] {
    > ${ElDeprecatedMenuPopover} {
      left: 0;
    }
  }
  &[data-alignment='right'] {
    > ${ElDeprecatedMenuPopover} {
      right: 0;
    }
  }
`

/** @deprecated */
export const ElDeprecatedMenuItemSupplementaryInfo = styled.span`
  color: var(--comp-menu-colour-text-hover-secondary);
  font-family: var(--font-xs-regular-family);
  font-size: var(--font-xs-regular-size);
  font-weight: var(--font-xs-regular-weight);
  line-height: var(--font-xs-regular-line_height);
  letter-spacing: var(--font-xs-regular-letter_spacing);
`

/** @deprecated */
export const ElDeprecatedMenuItemLabelContainer = styled.span`
  text-align: left;
`

/** @deprecated */
export const ElDeprecatedMenuItemLabel = styled.span`
  font-family: var(--font-sm-regular-family);
  font-size: var(--font-sm-regular-size);
  font-weight: var(--font-sm-regular-weight);
  line-height: var(--font-sm-regular-line_height);
  letter-spacing: var(--font-sm-regular-letter_spacing);
  text-align: left;
  white-space: nowrap;
  margin-right: var(--spacing-2);
`

/** @deprecated */
export const ElDeprecatedMenuItemContent = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: var(--spacing-1);
  flex: 1 0 0;
`

/** @deprecated */
export const ElDeprecatedMenuItemIcon = styled.div`
  &,
  svg {
    width: var(--icon_size-m);
    height: var(--icon_size-m);
    color: var(--comp-menu-colour-icon-default-right);
  }
`

/** @deprecated */
export const elDeprecatedMenuItemLeftIcon = css`
  &,
  svg {
    color: var(--comp-menu-colour-icon-default-left);
  }
`

const baseMenuItemStyles = `
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  padding: var(--spacing-3);
  gap: var(--spacing-3);
  border-radius: var(--comp-menu-border-radius);
  background: var(--comp-menu-colour-fill-default);
  color: var(--comp-menu-colour-text-default-primary);
  text-decoration: none;

  &:hover {
    background: var(--comp-menu-colour-fill-hover);
  }

  &:focus-visible {
    outline: none;
  }

  &:focus {
    outline: var(--border-width-double) solid var(--colour-border-focus);

    /* prevent the outline to be hidden behind next item */
    position: relative;
    z-index: 1;
  }

  &[aria-current="true"], &[aria-current="page"] {
    background: var(--comp-menu-colour-fill-highlighted);
  }

  &[aria-disabled="true"] {
    cursor: not-allowed;
    background: var(--comp-menu-colour-fill-default);
    color: var(--comp-menu-colour-text-disabled);
  }
`

/** @deprecated */
export const ElDeprecatedMenuItemButton = styled.button`
  ${baseMenuItemStyles}
  &[aria-current="true"], &[aria-current="page"] {
    ${ElDeprecatedMenuItemLabel} {
      color: var(--comp-menu-colour-text-default-action);
    }

    .${elDeprecatedMenuItemLeftIcon} {
      &,
      svg {
        color: var(--comp-menu-colour-icon-default-action);
      }
    }
  }

  &[aria-disabled='true'] {
    ${ElDeprecatedMenuItemLabel} {
      color: var(--comp-menu-colour-text-disabled-primary);
    }
  }

  /* customize html button */
  background-color: transparent;
  border: none;
`

/** @deprecated */
export const ElDeprecatedMenuItemAnchor = styled.a`
  ${baseMenuItemStyles}
  &[aria-current="true"], &[aria-current="page"] {
    ${ElDeprecatedMenuItemLabel} {
      color: var(--comp-menu-colour-text-default-action) !important;
    }
  }
`

/** @deprecated */
export const ElDeprecatedMenuItemGroupTitle = styled.div`
  font-family: var(--font-family);
  font-size: var(--font-size-2xs);
  font-style: normal;
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-2xs);
  letter-spacing: var(--letter-spacing-2xs);
  color: var(--text-placeholder);
  text-transform: uppercase;
  display: flex;
  height: 32px;
  padding: var(--spacing-none) var(--spacing-4);
  align-items: center;
  align-self: stretch;
`
/** @deprecated */
export const ElDeprecatedMenuItemGroup = styled.div`
  padding-inline: var(--spacing-2);
`

/** @deprecated */
export const ElDeprecatedMenuItemGroupList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;
`

/** @deprecated */
export const ElDeprecatedMenuList = styled.div`
  width: max-content;
  padding: var(--spacing-2) 0;
  border-radius: var(--corner-default);
  background-color: var(--fill-white);
  box-shadow: 0 4px 16px 0 #222b3329;
  overflow: auto;

  &[data-has-max-width='true'] {
    ${ElDeprecatedMenuItemLabel} {
      white-space: normal;
    }
  }

  ${ElDeprecatedMenuItemGroup}:not(:last-child) {
    border-bottom: 1px solid var(--comp-divider-colour-border-solid);
    padding-bottom: var(--spacing-2);
    margin-bottom: var(--spacing-2);
  }
`
