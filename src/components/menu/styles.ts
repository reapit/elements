import { styled } from '@linaria/react'

export const ElMenuPopover = styled.div`
  position: absolute;
  z-index: 100;
`

export const ElMenu = styled.div`
  position: relative;
  width: fit-content;

  &[data-alignment='left'] {
    > ${ElMenuPopover} {
      left: 0;
    }
  }
  &[data-alignment='right'] {
    > ${ElMenuPopover} {
      right: 0;
    }
  }
`

export const ElMenuList = styled.div`
  min-width: 200px;
  width: fit-content;
  padding: var(--spacing-2) var(--spacing-2);
  border-radius: var(--corner-default);
  background-color: var(--fill-white);
  box-shadow: 0px 4px 16px 0px #222b3329;
`

export const ElMenuItemContent = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: var(--spacing-1);
  flex: 1 0 0;
`

export const ElMenuItemLabel = styled.span`
  font-family: var(--font-sm-regular-family);
  font-size: var(--font-sm-regular-size);
  font-weight: var(--font-sm-regular-weight);
  line-height: var(--font-sm-regular-line_height);
  letter-spacing: var(--font-sm-regular-letter_spacing);
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

export const ElMenuItemButton = styled.button`
  ${baseMenuItemStyles}
  &[aria-current="true"], &[aria-current="page"] {
    ${ElMenuItemLabel} {
      color: var(--comp-menu-colour-text-default-action) !important;
    }
  }

  &[aria-disabled='true'] {
    ${ElMenuItemLabel} {
      color: var(--comp-menu-colour-text-disabled-primary);
    }
  }

  /* customize html button */
  background-color: transparent;
  border: none;
`

export const ElMenuItemAnchor = styled.a`
  ${baseMenuItemStyles}
  &[aria-current="true"], &[aria-current="page"] {
    ${ElMenuItemLabel} {
      color: var(--comp-menu-colour-text-default-action) !important;
    }
  }
`

export const ElMenuItemGroupTitle = styled.div`
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
export const ElMenuItemGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
