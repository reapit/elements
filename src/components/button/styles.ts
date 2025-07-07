import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { font } from '../text'

export const elButton = css`
  display: inline-flex;
  place-items: center;
  place-content: center;
  gap: var(--spacing-1);

  border: none;
  border-radius: var(--comp-button-border-radius-default);

  text-decoration: none;
  cursor: pointer;

  /* NOTE: we don't want the button's label to wrap */
  white-space: nowrap;

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }

  &:disabled,
  &[aria-disabled='true'] {
    cursor: not-allowed;
  }

  /* Sizes */
  &[data-size='small'] {
    height: var(--size-8);
    padding-inline: var(--spacing-3);

    ${font('sm', 'medium')}

    &[data-is-icon-only='true'] {
      padding: 0;
      width: var(--size-8);
    }
  }

  &[data-size='medium'] {
    height: var(--size-9);
    padding-inline: var(--spacing-4);

    ${font('sm', 'medium')}

    &[data-is-icon-only='true'] {
      padding: 0;
      width: var(--size-9);
    }
  }

  &[data-size='large'] {
    height: var(--size-10);
    padding-inline: var(--spacing-4);

    ${font('base', 'medium')}

    &[data-is-icon-only='true'] {
      padding: 0;
      width: var(--size-10);
    }
  }

  /* Variants */
  &[data-variant='primary'] {
    background: var(--comp-button-colour-fill-primary-default);
    color: var(--comp-button-colour-text-primary-default);

    &:hover {
      background: var(--comp-button-colour-fill-primary-hover);
      color: var(--comp-button-colour-text-primary-hover);
    }

    &[data-is-destructive='true'] {
      background: var(--comp-button-colour-fill-primary-destructive-default);
      color: var(--comp-button-colour-text-primary-destructive-default);

      &:hover {
        background: var(--comp-button-colour-fill-primary-destructive-hover);
        color: var(--comp-button-colour-text-primary-destructive-hover);
      }
    }

    &:disabled,
    &:disabled:hover,
    &[aria-disabled='true'],
    &[aria-disabled='true']:hover {
      background: var(--comp-button-colour-fill-primary-disabled);
      color: var(--comp-button-colour-text-primary-disabled);
    }
  }

  &[data-variant='secondary'] {
    border: var(--comp-button-border-width-default) solid var(--comp-button-colour-border-secondary-default);
    background: var(--comp-button-colour-fill-secondary-default);
    color: var(--comp-button-colour-text-secondary-default);

    &:hover {
      border: var(--comp-button-border-width-default) solid var(--comp-button-colour-border-secondary-hover);
      background: var(--comp-button-colour-fill-secondary-hover);
      color: var(--comp-button-colour-text-secondary-hover);
    }

    &[data-is-destructive='true'] {
      border: var(--comp-button-border-width-default) solid
        var(--comp-button-colour-border-secondary-destructive-default);
      background: var(--comp-button-colour-fill-secondary-destructive-default);
      color: var(--comp-button-colour-text-secondary-destructive-default);

      &:hover {
        border: var(--comp-button-border-width-default) solid
          var(--comp-button-colour-border-secondary-destructive-hover);
        background: var(--comp-button-colour-fill-secondary-destructive-hover);
        color: var(--comp-button-colour-text-secondary-destructive-hover);
      }
    }

    &:disabled,
    &:disabled:hover,
    &[aria-disabled='true'],
    &[aria-disabled='true']:hover {
      border-color: transparent;
      background: var(--comp-button-colour-fill-secondary-disabled);
      color: var(--comp-button-colour-text-secondary-disabled);
    }
  }

  &[data-variant='tertiary'] {
    background: var(--comp-button-colour-fill-tertiary-default);
    color: var(--comp-button-colour-text-tertiary-default);

    &:hover {
      background: var(--comp-button-colour-fill-tertiary-hover);
      color: var(--comp-button-colour-text-tertiary-hover);
    }

    &[data-has-no-padding='true'] {
      height: auto;
      padding: 0;

      &[data-is-icon-only='true'] {
        width: auto;
      }
    }

    &[data-use-link-style='true'] {
      color: var(--comp-button-colour-text-tertiary-link);

      &:hover {
        color: var(--comp-button-colour-text-tertiary-link_hover);
      }
    }

    /* NOTE: data-is-destructive must come after data-use-link-style to be consistent with the specificity of the same
    * attributes on the icon container. */
    &[data-is-destructive='true'] {
      background: var(--comp-button-colour-fill-tertiary-destructive-default);
      color: var(--comp-button-colour-text-tertiary-destructive-default);

      &:hover {
        background: var(--comp-button-colour-fill-tertiary-destructive-hover);
        color: var(--comp-button-colour-text-tertiary-destructive-hover);
      }
    }

    /* NOTE: disabled styles come last so they override the other styles. This is necessary because they have the
    * same specificity as the other styles. */
    &:disabled,
    &:disabled:hover,
    &[aria-disabled='true'],
    &[aria-disabled='true']:hover {
      background: var(--comp-button-colour-fill-tertiary-disabled);
      color: var(--comp-button-colour-text-tertiary-disabled);
    }
  }
`

export const ElButtonIconContainer = styled.span`
  box-sizing: content-box;

  display: flex;
  place-items: center;
  place-content: center;

  /* Sizes */
  [data-size='small'] & {
    padding: var(--spacing-half);
    width: var(--icon_size-s);
    height: var(--icon_size-s);
  }

  [data-size='medium'] & {
    padding: var(--spacing-half);
    width: var(--icon_size-s);
    height: var(--icon_size-s);
  }

  [data-size='large'] & {
    padding: var(--spacing-half);
    width: var(--icon_size-m);
    height: var(--icon_size-m);
  }

  /* Variants */
  ${generateElButtonIconContainerVariantStyles('primary')}

  ${generateElButtonIconContainerVariantStyles('secondary')}

  ${generateElButtonIconContainerVariantStyles('tertiary')}
`

function generateElButtonIconContainerVariantStyles(variant: 'primary' | 'secondary' | 'tertiary') {
  return `
  [data-variant='${variant}'] & {
    color: var(--comp-button-colour-icon-${variant}-default);
  }

  [data-variant='${variant}']:hover & {
    color: var(--comp-button-colour-icon-${variant}-hover);
  }

  /* NOTE: data-use-link-style is only supported by tertiary buttons. */
  ${
    variant === 'tertiary'
      ? `
  [data-variant='tertiary'][data-use-link-style='true'] & {
    color: var(--comp-button-colour-icon-tertiary-link);
  }

  [data-variant='tertiary'][data-use-link-style='true']:hover & {
    color: var(--comp-button-colour-icon-tertiary-link_hover);
  }`
      : ''
  }

  /* NOTE: data-is-destructive must come after data-use-link-style to be consistent with the specificity of the same
   * attributes on the parent element. */
  [data-variant='${variant}'][data-is-destructive='true'] & {
    color: var(--comp-button-colour-icon-${variant}-destructive-default);
  }

  [data-variant='${variant}'][data-is-destructive='true']:hover & {
    color: var(--comp-button-colour-icon-${variant}-destructive-hover);
  }

  /* NOTE: disabled styles come last so they override the other styles. This is necessary because they have the
   * same specificity as the other styles. */
  [data-variant='${variant}']:disabled &,
  [data-variant='${variant}']:disabled:hover &,
  [data-variant='${variant}'][aria-disabled='true'] &,
  [data-variant='${variant}'][aria-disabled='true']:hover & {
    color: var(--comp-button-colour-icon-${variant}-disabled);
  }
  `
}

export const elButtonSpinner = css`
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
