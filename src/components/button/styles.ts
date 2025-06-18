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
  
  .${elIcon} {
    padding: var(--spacing-half);
    color: var(--comp-button-colour-icon-secondary-defaul);
  }

  &:hover {
    color: var(--comp-button-colour-text-secondary-hover);
    border: var(--comp-button-border-width-default) solid var(--comp-button-colour-border-secondary-hover);
    .${elIcon} {
      color: var(--comp-button-colour-icon-secondary-hover);
    }
  }

  &:focus {
    border: var(--border-width-double) solid var(--colour-border-focus);
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
      font-family: var(--font-base-medium-family);
      font-size: var(--font-base-medium-size);
      font-weight: var(--font-base-medium-weight);
      line-height: var(--font-base-medium-line_height);
      letter-spacing: var(--font-base-medium-letter_spacing);
      
    }
    .${elButtonSpinner} {
      height: 1.125rem;
      width: 1.125rem;
    }
  }

  &[data-variant='primary'] {
    background: var(--comp-button-colour-fill-primary-default);
    color: var(--comp-button-colour-text-primary-default);
    border: unset;

    .${elIcon} {
      color: var(--comp-button-colour-icon-primary-default);
    }

    &:hover {
       background: var(--comp-button-colour-fill-primary-hover);
      .${elIcon} {
         color: var(--comp-button-colour-icon-primary-hover);
      }
    }
  }

  &[data-variant='seconday'] {
    &:hover {
      color: var(--comp-button-colour-text-secondary-hover);
      border: var(--comp-button-border-width-default) solid var(--comp-button-colour-border-secondary-default);
      .${elIcon} {
        color: var(--comp-button-colour-icon-secondary-hover);
      }
    }
  }

  &[data-variant='tertiary'] {
    border: unset;
    &:hover {
      color: var(--comp-button-colour-text-tertiary-hover);
      .${elIcon} {
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
    .${elIcon} {
      color: var(--comp-button-colour-icon-destructive-default);
    }
    &:hover {
      background: var(--comp-button-colour-fill-destructive-hover);
      color: var(--comp-button-colour-text-destructive-hover);
      .${elIcon} {
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

    .${elIcon} {
      color: var(--comp-button-colour-icon-primary-disabled);
    }

    &:hover {
      background: var(--comp-button-colour-fill-primary-disabled);
      color: var(--comp-button-colour-text-primary-disabled);
      .${elIcon} {
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
  font-family: var(--font-sm-medium-family);
  font-size: var(--font-sm-medium-size);
  font-weight: var(--font-sm-medium-weight);
  line-height: var(--font-sm-medium-line_height);
  letter-spacing: var(--font-sm-medium-letter_spacing);
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
