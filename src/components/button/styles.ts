import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { isMobile } from '#src/styles/media'

export const elButtonSizeSmall = css``
export const elButtonSizeMedium = css``
export const elButtonSizeLarge = css``

export const elButtonLabel = css``
export const elIcon = css``
export const elButtonIconOnly = css``
export const elButtonSpinner = css``
export const elButtonRemovePadding = css``

/** @deprecated - Will be removed from future version */
export const elFloatingButton = css``
/** @deprecated */
export const elButtonGroupAlignLeft = css``
/** @deprecated */
export const elButtonGroupAlignRight = css``
/** @deprecated */
export const elButtonGroupAlignCenter = css``

export const ElButtonSpinner = styled.div`
  @keyframes spinAround {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  color: transparent !important;
  pointer-events: none;
  animation: spinAround 800ms infinite linear;
  border: 1px solid var(--text-placeholder);
  margin-right: 0.25rem;
  border-radius: 290486px;
  border-color: transparent transparent var(--text-placeholder) var(--text-placeholder);
  display: none;
  height: 1rem;
  width: 1rem;
`

// Shared Base styles for buttons
const baseButtonStyles = `
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: inline-flex;
  position: relative;
  text-align: left;
  color: var(--text-secondary);
  background: var(--fill-white);
  height: var(--size-9);
  padding: 0px var(--spacing-4);
  gap: var(--spacing-1);
  border-radius: var(--corner-default);
  border: 1px solid var(--outline-default);
  text-decoration: none; /* For anchors */
  
  .${elIcon} {
    padding: var(--spacing-half);
    color: var(--icon-primary);
  }

  &:hover {
    color: var(--text-tertiary);
    border: 1px solid var(--outline-button-secondary-hover);
    .${elIcon} {
      color: var(--icon-secondary);
    }
  }

  &.${elButtonIconOnly} {
    padding: 0px;
    width: var(--size-9);
    .${elButtonSpinner} {
      margin: 0 0.125rem;
    }
  }

  &.${elButtonSizeSmall} {
    padding: 0px var(--spacing-3);
    height: var(--size-8);
    &.${elButtonIconOnly} {
      padding: 0px;
      width: var(--size-8);
      .${elIcon} {
          padding: var(--spacing-1);
      }
    }
  }

  &.${elButtonSizeLarge} {
    height: var(--size-10);
    &.${elButtonIconOnly} {
      width: var(--size-10);
    }
    .${elButtonLabel} {
      font-size: var(--font-size-base);
      line-height: var(--line-height-base);
      letter-spacing: var(--letter-spacing-base);
    }
    .${elButtonSpinner} {
      height: 1.125rem;
      width: 1.125rem;
    }
  }

  &[data-variant='primary'] {
    background: var(--fill-action-dark);
    color: var(--text-white);
    border: unset;

    .${elIcon} {
      color: var(--icon-button_primary-default);
    }

    &:hover {
      background: var(--fill-button-primary-hover);
      .${elIcon} {
        color: var(--icon-button_primary-hover);
      }
    }
  }

  &[data-variant='seconday'] {
    &:hover {
      color: var(--text-tertiary);
      border: 1px solid var(--outline-button-secondary-hover);
      .${elIcon} {
        color: var(--icon-secondary);
      }
    }
  }

  &[data-variant='tertiary'] {
    border: unset;
    &:hover {
      color: var(--text-tertiary);
      .${elIcon} {
        color: var(--icon-secondary);
      }
    }
    &.${elButtonRemovePadding} {
      height: unset;
      width: unset; /* To unset width for iconOnly button */
      padding: 0px;
    }
  }

  &[data-variant='destructive'] {
    background: var(--fill-error-dark);
    color: var(--text-white);
    border: unset;
    .${elIcon} {
      color: var(--icon-button_danger-default);
    }
    &:hover {
      background: var(--fill-button-danger-hover);
      .${elIcon} {
        color: var(--icon-button_danger-hover);
      }
    }
  }

  &[disabled],
  &[aria-disabled="true"],
  &[data-variant='busy'],
  &[disabled][data-variant='primary'],
  &[disabled][data-variant='secondary'],
  &[disabled][data-variant='tertiary'],
  &[disabled][data-variant='destructive'] {
    color: var(--text-placeholder);
    background: var(--fill-default-light);
    cursor: not-allowed;
    border: unset;

    .${elIcon} {
      color: var(--icon-primary);
    }

    &:hover {
      background: var(--fill-default-light);
      color: var(--text-placeholder);
      .${elIcon} {
        color: var(--icon-primary);
      }
    }
  }

  &:focus-visible {
    box-shadow:
      0 0 0 1px white,
      0px 0px 0px 4px var(--purple-300);
    outline: 0;
  }
  
  &.${elFloatingButton} {
    border-radius: 100%;
    height: 3.75rem;
    width: 3.75rem;
    margin: 0.5rem;
    max-height: unset;
    padding: 0.4rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    ${isMobile} {
      width: 2.5rem;
      height: 2.5rem;
      margin: 0.5rem;
      .${elIcon} {
        font-size: 1rem;
      }
    }

    ${elIcon} {
      color: var(--neutral-400);

      &:hover {
        color: var(--neutral-700);
      }
    }

    &[data-variant='destructive'], &[data-variant='primary'] {
      > .${elIcon} {
        color: var(--white);
      }
    }

    &[data-variant='busy'] {
      & ${elButtonSpinner} {
        left: inherit;
        top: inherit;
      }

      > .${elIcon} {
        visibility: hidden;
      }
    }
  }
`

// Button Label style
export const ElButtonLabel = styled.span`
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-sm);
  letter-spacing: var(--letter-spacing-sm);
  padding: 0 var(--spacing-half);
`

// Apply shared styles to button component
export const ElButton = styled.button`
  ${baseButtonStyles}
  &[data-variant='busy'] {
    ${ElButtonSpinner} {
      display: block;
    }
  }
`

// Apply shared styles to anchor component
export const ElAnchorButton = styled.a`
  ${baseButtonStyles}
`

/** @deprecated **/
export const DeprecatedElButtonGroup = styled.div`
  display: grid;
`
/** @deprecated */
export const ElButtonGroupInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-auto-flow: column;
  column-gap: 0.75rem;
  row-gap: 0.75rem;
  width: fit-content;
  height: fit-content;

  &.${elButtonGroupAlignLeft} {
    margin-right: auto;
    justify-content: flex-start;
  }

  &.${elButtonGroupAlignRight} {
    margin-left: auto;
    justify-content: flex-end;
  }

  &.${elButtonGroupAlignCenter} {
    margin: 0 auto;
    justify-content: center;
  }

  ${isMobile} {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 0.8rem;
    row-gap: 0.8rem;
    grid-auto-flow: inherit;
  }
`
