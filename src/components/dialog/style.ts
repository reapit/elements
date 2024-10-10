import { DialogHTMLAttributes } from 'react'

import { styled } from '@linaria/react'

export type SmallDialogSize = 'small'
export type MediumDialogSize = 'medium'

// Extended version of the `DialogHTMLAttributes` interface, which includes
// the 'data-size' attribute that used as the controller of the dialog size.
export type ElDialogContainerProps = DialogHTMLAttributes<HTMLDialogElement> & {
  /**
   * The size of the dialog. The small size is used by default.
   * - 'small' will render the dialog in a small size
   * - 'medium' will render the dialog in a medium size
   *
   * @default 'small'
   */
  'data-size'?: SmallDialogSize | MediumDialogSize
}

export const ElDialogContainer = styled.dialog<ElDialogContainerProps>`
  // NOTE: private CSS variables that deliberated used by the dialog component
  --__dialog-box-shadow: 0px 4px 16px 0px rgba(96, 120, 144, 0.16);

  z-index: 99;
  overflow: auto;
  border: none;
  box-shadow: var(--__dialog-box-shadow);
  border-radius: var(--corner-radius-corner-lg, 8px);
  padding: var(--spacing-spacing-5, 20px) var(--spacing-spacing-6, 24px);
  min-width: 300px;
  max-height: 100%;

  // calculate the width of the dialog based on the size of the container
  width: calc(100% - var(--unit-16, 64px));
  max-width: 20rem;

  &[data-size='medium'] {
    width: calc(100% - var(--unit-8, 32px));
    max-width: 30rem;
  }

  &::backdrop {
    opacity: 0.5;
    animation: dialogBackdropFadeIn 225ms cubic-bezier(0.4, 0, 0.2, 1);
    background: var(--black);
  }

  &[open] {
    animation: dialogContainerFadeIn 225ms ease-in forwards;
  }

  @keyframes dialogContainerFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes dialogBackdropFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.5;
    }
  }
`

/**
 * HTML element that renders the title of the dialog
 * It is intended to be used as a child of the `Dialog` component.
 * it doesn't have the maximum lines or truncation.
 */
export const ElDialogTitle = styled.h2`
  color: var(--text-primary, #222b33);
  font-family: var(--font-family, Inter);
  font-size: var(--font-size-lg, 18px);
  font-style: normal;
  font-weight: 600;
  line-height: var(--line-height-lg, 24px);
  letter-spacing: var(--letter-spacing-lg, -0.18px);
  padding-bottom: var(--spacing-4, 12px);
  word-wrap: break-word;
`

/**
 * HTML element that renders the body of the dialog
 */
export const ElDialogBody = styled.div`
  font-size: var(--font-size-default);
`

export const ElDialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: var(--spacing-5, 20px);
`
