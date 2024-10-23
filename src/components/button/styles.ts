import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { Icon } from '../icon'
import { isMobile } from '@/styles/media'

export const elButtonSizeSmall = css``
export const elButtonSizeMedium = css``
export const elButtonSizeLarge = css``

export const elButtonPrimary = css``
export const elButtonSecondary = css``
export const elButtonTertiary = css``
export const elButtonDestructive = css``
export const elButtonBusy = css``
export const elButtonDisabled = css``

export const elButtonIcon = css``
export const elButtonSpinner = css``

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
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-sm);
  letter-spacing: var(--letter-spacing-sm);
  text-align: left;
  color: var(--text-secondary);
  background: var(--fill-white);
  padding: var(--spacing-2) var(--spacing-4);
  gap: var(--spacing-1);
  border-radius: var(--corner-default);
  border: 1px solid var(--outline-default);
  text-decoration: none; /* For anchors */

  &:hover {
    color: var(--text-tertiary);
    border: 1px solid var(--outline-button-secondary-hover);
    .${elButtonIcon} {
      color: var(--icon-secondary);
    }
  }

  &.${elButtonSizeSmall} {
    padding: var(--spacing-1) var(--spacing-3);
  }

  &.${elButtonSizeLarge} {
    font-size: var(--font-size-base);
    .${elButtonSpinner} {
      height: 1.125rem;
      width: 1.125rem;
    }
  }

  &.${elButtonPrimary} {
    background: var(--fill-action-dark);
    color: var(--text-white);
    border: unset;

    .${elButtonIcon} {
      color: var(--icon-button_primary-default);
    }

    &:hover {
      background: var(--fill-button-primary-hover);
      .${elButtonIcon} {
        color: var(--icon-button_primary-hover);
      }
    }
  }

  &.${elButtonSecondary} {
    &:hover {
      color: var(--text-tertiary);
      border: 1px solid var(--outline-button-secondary-hover);
      .${elButtonIcon} {
        color: var(--icon-secondary);
      }
    }
  }

  &.${elButtonTertiary} {
    border: unset;
    &:hover {
      color: var(--text-tertiary);
      .${elButtonIcon} {
        color: var(--icon-secondary);
      }
    }
  }

  &.${elButtonDestructive} {
    background: var(--fill-error-dark);
    color: var(--text-white);
    border: unset;
    .${elButtonIcon} {
      color: var(--icon-button_danger-default);
    }
    &:hover {
      background: var(--fill-button-danger-hover);
      .${elButtonIcon} {
        color: var(--icon-button_danger-hover);
      }
    }
  }

  &[disabled],
  &.${elButtonDisabled},
  &.${elButtonBusy},
  &[disabled].${elButtonPrimary},
  &[disabled].${elButtonSecondary},
  &[disabled].${elButtonTertiary},
  &[disabled].${elButtonDestructive},
  &.${elButtonBusy}
    .${elButtonPrimary},
  &.${elButtonBusy}
    .${elButtonSecondary},
  &.${elButtonBusy}
    .${elButtonTertiary},
  &.${elButtonBusy}
    .${elButtonDestructive} {
    color: var(--text-placeholder);
    background-image: linear-gradient(to right, var(--neutral-100), var(--neutral-100));
    cursor: not-allowed;
    border: unset;

    &:hover {
      .${elButtonIcon} {
        color: var(--text-placeholder);
      }
    }
  }

  &:focus {
    box-shadow:
      0 0 0 1px white,
      0px 0px 0px 4px var(--blue-300);
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
    }

    ${elButtonIcon} {
      color: var(--neutral-400);

      &:hover {
        color: var(--neutral-700);
      }
    }

    &.${elButtonDestructive}, &.${elButtonPrimary} {
      > .${elButtonIcon} {
        color: var(--white);
      }
    }

    &.${elButtonBusy} {
      & ${elButtonSpinner} {
        left: inherit;
        top: inherit;
      }

      > .${elButtonIcon} {
        visibility: hidden;
      }
    }
  }
`

// Apply shared styles to button component
export const ElButton = styled.button`
  ${baseButtonStyles}
  &.${elButtonBusy} {
    ${ElButtonSpinner} {
      display: block;
    }
  }
`

// Apply shared styles to anchor component
export const ElAnchorButton = styled.a`
  ${baseButtonStyles}
  &.${elButtonBusy} {
    ${ElButtonSpinner} {
      display: block;
    }
  }
`

// Button icon styling
export const ElButtonIcon = styled(Icon)`
  padding: var(--spacing-half);
  color: var(--icon-primary);
`

export const elButtonIconOnly = css`
  padding: var(--spacing-2);
  ${ElButtonSpinner} {
    margin: 0 0.125rem;
  }
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
