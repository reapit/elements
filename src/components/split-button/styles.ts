import { styled } from '@linaria/react'
import { ElIcon } from '../icon'

export const ElSplitButtonIcon = styled.span``
export const ElActionButtonLabel = styled.span``

export const ElActionButton = styled.button`
  display: flex;
  height: var(--size-9);
  padding: 0 var(--spacing-4);
  justify-content: center;
  align-items: center;
  gap: var(--spacing-1);
  border-radius: var(--corner-default) var(--corner-none) var(--corner-none) var(--corner-default);
  border: unset;
  background: var(--fill-action-dark);
  color: var(--text-white);

  ${ElActionButtonLabel} {
    display: flex;
    padding: var(--spacing-none) var(--spacing-half);
    align-items: flex-start;
    font-family: var(--font-family);
    font-size: var(--font-size-sm);
    font-style: normal;
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-sm);
    letter-spacing: var(--letter-spacing-sm);
  }

  &:hover:not([disabled]),
  &:hover:not([aria-disabled='true']) {
    background: var(--fill-button-primary-hover);
  }

  &:focus:not([disabled]),
  &:focus:not([aria-disabled='true']) {
    box-shadow:
      0px 0px 0px 1px #fff,
      0px 0px 0px 4px var(--purple-300);
  }

  &[disabled],
  &[aria-disabled='true'] {
    border: var(--border-default) solid var(--fill-default-light);
    border-right: var(--border-none) solid var(--fill-default-light);
    background: var(--fill-default-light);
    color: var(--text-placeholder);

    &:hover {
      background: var(--fill-default-light);
      color: var(--text-placeholder);
    }
  }
`

export const ElMenuButton = styled.button`
  display: flex;
  width: var(--size-9);
  height: var(--size-9);
  padding: var(--spacing-none);
  justify-content: center;
  align-items: center;
  gap: var(--spacing-none);
  border-radius: var(--corner-none) var(--corner-default) var(--corner-default) var(--corner-none);
  border: unset;
  background: var(--fill-action-dark);
  color: var(--text-white);

  &:hover {
    background: var(--fill-button-primary-hover);
  }

  &:focus {
    box-shadow:
      0px 0px 0px 1px #fff,
      0px 0px 0px 4px var(--purple-300);
  }

  ${ElSplitButtonIcon} {
    display: flex;
    padding: var(--spacing-1) var(--spacing-none);
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    color: var(--icon-white);
    border-left: var(--border-default) solid var(--outline-split_button-primary, #7e9bfa); // Remove the fallback once variable is available

    ${ElIcon} {
      width: var(--icon-sm);
      height: var(--icon-sm);
      color: inherit;
      align-items: center;
    }
  }
`
export const ElSplitButton = styled.div`
  display: inline-flex;
  height: var(--size-size-9);
  align-items: flex-start;

  &[data-variant='secondary'] {
    ${ElActionButton} {
      border: var(--border-default) solid var(--outline-default);
      border-right: var(--border-none) solid var(--outline-default);
      background: var(--fill-white);
      color: var(--text-secondary);

      &:hover:not([disabled]),
      &:hover:not([aria-disabled='true']) {
        border-radius: var(--corner-default) var(--corner-none) var(--corner-none) var(--corner-default);
        border: var(--border-default) solid var(--outline-button-secondary-hover);
      }

      &:focus:not([disabled]),
      &:focus:not([aria-disabled='true']) {
        border-radius: var(--corner-default) var(--corner-none) var(--corner-none) var(--corner-default);
        border: var(--border-default) solid var(--outline-button-secondary-hover);

        box-shadow:
          0px 0px 0px 1px #fff,
          0px 0px 0px 4px var(--purple-300);
      }

      &[disabled],
      &[aria-disabled='true'] {
        border: var(--border-default) solid var(--fill-default-light);
        border-right: var(--border-none) solid var(--fill-default-light);
        background: var(--fill-default-light);
        color: var(--text-placeholder);

        &:hover {
          background: var(--fill-default-light);
          color: var(--text-placeholder);
        }
      }
    }

    ${ElMenuButton} {
      border: var(--border-default) solid var(--outline-default);
      border-left: var(--border-none) solid var(--outline-default);
      background: var(--fill-white);
      color: var(--text-secondary);

      ${ElSplitButtonIcon} {
        border-left: var(--border-default) solid var(--outline-default);
        color: var(--icon-secondary);
      }

      &:hover {
        border-radius: var(--corner-none) var(--corner-default) var(--corner-default) var(--corner-none);
        border: var(--border-default) solid var(--outline-button-secondary-hover);
      }

      &:focus {
        border-radius: var(--corner-none) var(--corner-default) var(--corner-default) var(--corner-none);
        border: var(--border-default) solid var(--outline-button-secondary-hover);
        box-shadow:
          0px 0px 0px 1px #fff,
          0px 0px 0px 4px var(--purple-300);
      }
    }
  }

  &[data-size='small'] {
    height: var(--size-8);

    ${ElActionButton} {
      padding: 0 var(--spacing-3);
      height: var(--size-8);
    }

    ${ElMenuButton} {
      width: var(--size-8);
      height: var(--size-8);
    }
  }

  &[data-size='large'] {
    height: var(--size-10);

    ${ElActionButton} {
      height: var(--size-10);
    }

    ${ElActionButtonLabel} {
      font-size: var(--font-size-base);
      line-height: var(--line-height-base);
      letter-spacing: var(--letter-spacing-base);
    }

    ${ElMenuButton} {
      width: var(--size-10);
      height: var(--size-10);
    }

    ${ElIcon} {
      width: var(--icon-md);
      height: var(--icon-md);
    }
  }
`
