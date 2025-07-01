import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { isMobile } from '#src/styles/media'
import { ElDeprecatedIcon } from '../deprecated-icon'

/** @deprecated */
export const elDeprecatedButtonSizeSmall = css``
/** @deprecated */
export const elDeprecatedButtonSizeMedium = css``
/** @deprecated */
export const elDeprecatedButtonSizeLarge = css``

/** @deprecated */
export const elDeprecatedButtonLabel = css``
/** @deprecated */
export const elDeprecatedIcon = ElDeprecatedIcon
/** @deprecated */
export const elDeprecatedButtonIconOnly = css``
/** @deprecated */
export const elDeprecatedButtonSpinner = css``

/** @deprecated - Will be removed from future version */
export const elDeprecatedFloatingButton = css``
/** @deprecated */
export const elDeprecatedButtonGroupAlignLeft = css``
/** @deprecated */
export const elDeprecatedButtonGroupAlignRight = css``
/** @deprecated */
export const elDeprecatedButtonGroupAlignCenter = css``

/** @deprecated */
export const ElDeprecatedButtonSpinner = styled.div`
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
  border: 1px solid var(--comp-button-colour-text-busy-default);
  margin-right: 0.25rem;
  border-radius: 290486px;
  border-color: transparent transparent var(--comp-button-colour-text-busy-default)
    var(--comp-button-colour-text-busy-default);
  display: none;
  height: 1rem;
  width: 1rem;
`

// Shared Base styles for buttons
/** @deprecated */
const baseButtonStyles = `
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: inline-flex;
  position: relative;
  text-align: left;
  color: var(--comp-button-colour-text-secondary-default);
  background: var(--comp-button-colour-fill-secondary-default);
  height: var(--size-9);
  padding: 0px var(--spacing-4);
  gap: var(--spacing-1);
  border-radius: var(--comp-button-border-radius-default);
  border: var(--comp-button-border-width-default) solid var(--comp-button-colour-border-secondary-default);
  text-decoration: none; /* For anchors */
  
  .${elDeprecatedIcon} {
    padding: var(--spacing-half);
    color: var(--comp-button-colour-icon-secondary-defaul);
  }

  &:hover {
    color: var(--comp-button-colour-text-secondary-hover);
    border: var(--comp-button-border-width-default) solid var(--comp-button-colour-border-secondary-hover);
    .${elDeprecatedIcon} {
      color: var(--comp-button-colour-icon-secondary-hover);
    }
  }

  &:focus {
    border: var(--border-width-double) solid var(--colour-border-focus);
  }

  &.${elDeprecatedButtonIconOnly} {
    padding: 0px;
    width: var(--size-9);
    .${elDeprecatedButtonSpinner} {
      margin: 0 0.125rem;
    }
  }

  &.${elDeprecatedButtonSizeSmall} {
    padding: 0px var(--spacing-3);
    height: var(--size-8);
    &.${elDeprecatedButtonIconOnly} {
      padding: 0px;
      width: var(--size-8);
      .${elDeprecatedIcon} {
          padding: var(--spacing-1);
      }
    }
  }

  &.${elDeprecatedButtonSizeLarge} {
    height: var(--size-10);
    &.${elDeprecatedButtonIconOnly} {
      width: var(--size-10);
    }
    .${elDeprecatedButtonLabel} {
      font-family: var(--font-base-medium-family);
      font-size: var(--font-base-medium-size);
      font-weight: var(--font-base-medium-weight);
      line-height: var(--font-base-medium-line_height);
      letter-spacing: var(--font-base-medium-letter_spacing);
      
    }
    .${elDeprecatedButtonSpinner} {
      height: 1.125rem;
      width: 1.125rem;
    }
  }

  &[data-variant='primary'] {
    background: var(--comp-button-colour-fill-primary-default);
    color: var(--comp-button-colour-text-primary-default);
    border: unset;

    .${elDeprecatedIcon} {
      color: var(--comp-button-colour-icon-primary-default);
    }

    &:hover {
       background: var(--comp-button-colour-fill-primary-hover);
      .${elDeprecatedIcon} {
         color: var(--comp-button-colour-icon-primary-hover);
      }
    }
  }

  &[data-variant='seconday'] {
    &:hover {
      color: var(--comp-button-colour-text-secondary-hover);
      border: var(--comp-button-border-width-default) solid var(--comp-button-colour-border-secondary-default);
      .${elDeprecatedIcon} {
        color: var(--comp-button-colour-icon-secondary-hover);
      }
    }
  }

  &[data-variant='tertiary'] {
    border: unset;
    &:hover {
      color: var(--comp-button-colour-text-tertiary-hover);
      .${elDeprecatedIcon} {
        color: var(--comp-button-colour-icon-tertiary-hover);
      }
    }
    &[data-has-no-padding='true'] {
      height: unset;
      width: unset; /* To unset width for iconOnly button */
      padding: 0px;
    }
  }

  &[data-variant='destructive'] {
    border: unset;
    background: var(--comp-button-colour-fill-destructive-default);
    color: var(--comp-button-colour-text-destructive-default);
    .${elDeprecatedIcon} {
      color: var(--comp-button-colour-icon-destructive-default);
    }
    &:hover {
      background: var(--comp-button-colour-fill-destructive-hover);
      color: var(--comp-button-colour-text-destructive-hover);
      .${elDeprecatedIcon} {
        color: var(--comp-button-colour-icon-destructive-hover);
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
    cursor: not-allowed;
    border: unset;
    background: var(--comp-button-colour-fill-primary-disabled);
    color: var(--comp-button-colour-text-primary-disabled);

    .${elDeprecatedIcon} {
      color: var(--comp-button-colour-icon-primary-disabled);
    }

    &:hover {
      background: var(--comp-button-colour-fill-primary-disabled);
      color: var(--comp-button-colour-text-primary-disabled);
      .${elDeprecatedIcon} {
        color: var(--comp-button-colour-icon-primary-disabled);
      }
    }
  }

  &:focus-visible {
    box-shadow:
      0 0 0 1px white,
      0px 0px 0px 4px var(--purple-300);
    outline: 0;
  }
  
  // TO DO: no the token variable names not updated, since no design guide in figma
  &.${elDeprecatedFloatingButton} {
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
      .${elDeprecatedIcon} {
        font-size: 1rem;
      }
    }

    ${elDeprecatedIcon} {
      color: var(--neutral-400);

      &:hover {
        color: var(--neutral-700);
      }
    }

    &[data-variant='destructive'], &[data-variant='primary'] {
      > .${elDeprecatedIcon} {
        color: var(--white);
      }
    }

    &[data-variant='busy'] {
      & ${elDeprecatedButtonSpinner} {
        left: inherit;
        top: inherit;
      }

      > .${elDeprecatedIcon} {
        visibility: hidden;
      }
    }
  }
`

// Button Label style
/** @deprecated */
export const ElDeprecatedButtonLabel = styled.span`
  font-family: var(--font-sm-medium-family);
  font-size: var(--font-sm-medium-size);
  font-weight: var(--font-sm-medium-weight);
  line-height: var(--font-sm-medium-line_height);
  letter-spacing: var(--font-sm-medium-letter_spacing);
  padding: 0 var(--spacing-half);
`

// Apply shared styles to button component
/** @deprecated */
export const ElDeprecatedButton = styled.button`
  ${baseButtonStyles}
  &[data-variant='busy'] {
    ${ElDeprecatedButtonSpinner} {
      display: block;
    }
  }
`

// Apply shared styles to anchor component
/** @deprecated */
export const ElDeprecatedAnchorButton = styled.a`
  ${baseButtonStyles}
`

/** @deprecated **/
export const DeprecatedElButtonGroup = styled.div`
  display: grid;
`
/** @deprecated */
export const ElDeprecatedButtonGroupInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-auto-flow: column;
  gap: 0.75rem;
  width: fit-content;
  height: fit-content;

  &.${elDeprecatedButtonGroupAlignLeft} {
    margin-right: auto;
    justify-content: flex-start;
  }

  &.${elDeprecatedButtonGroupAlignRight} {
    margin-left: auto;
    justify-content: flex-end;
  }

  &.${elDeprecatedButtonGroupAlignCenter} {
    margin: 0 auto;
    justify-content: center;
  }

  ${isMobile} {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.8rem;
    grid-auto-flow: inherit;
  }
`
