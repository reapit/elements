import { styled } from '@linaria/react'
import {
  DeprecatedButton,
  elDeprecatedButtonSizeLarge,
  elDeprecatedButtonSizeSmall,
  ElDeprecatedButtonSpinner,
} from '#src/deprecated/button'
import { ElDeprecatedIcon } from '#src/deprecated/icon'

/** @deprecated */
export const ElDeprecatedSplitButtonActionButton = styled(DeprecatedButton)`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`

/** @deprecated */
export const ElDeprecatedSplitButtonMenuButton = styled(DeprecatedButton)`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`

/** @deprecated */
export const ElDeprecatedSplitButton = styled.div`
  display: inline-flex;
  height: var(--size-9);
  align-items: flex-start;

  ${ElDeprecatedSplitButtonActionButton} {
    border-radius: var(--comp-button-border-radius-default) var(--comp-button-border-radius-none)
      var(--comp-button-border-radius-none) var(--comp-button-border-radius-default);
    border-right: var(--comp-button-border-width-none) solid var(--comp-button-colour-border-secondary-default);

    /* Added this style to hide the iconRight from split action button */
    .el-button-label + ${ElDeprecatedIcon} {
      display: none;
    }

    /* Added this style to override the all the other button varients to default secondary */
    &:not([data-variant='primary']):not([data-variant='busy']):not(&[aria-disabled='true']):not(&[disabled]) {
      background: var(--comp-button-colour-fill-secondary-default);
      color: var(--comp-button-colour-text-secondary-default);
      border: var(--comp-button-border-width-default) solid var(--comp-button-colour-border-secondary-default);
      border-right: var(--comp-button-border-width-none) solid var(--comp-button-colour-border-secondary-default);
    }
  }

  ${ElDeprecatedSplitButtonMenuButton} {
    border-radius: var(--comp-button-border-radius-none) var(--comp-button-border-radius-default)
      var(--comp-button-border-radius-default) var(--comp-button-border-radius-none);
    border-left: var(--comp-button-border-width-none) solid var(--comp-button-colour-border-secondary-default);

    /* This is to add the border-left in the SplitMenuButton to support busy state */
    &::before {
      content: '';
      position: absolute;
      top: 6px; /* Note: No varibale available for 6px */
      bottom: 6px; /* Note: No varibale available for 6px */
      left: var(--spacing-none);
      width: var(--comp-button-border-width-default);
      background-color: var(--comp-button-colour-border-secondary-default);
      pointer-events: none;
    }

    ${ElDeprecatedIcon} {
      display: contents;
      color: inherit;
      align-items: center;
      padding: var(--spacing-none);

      svg {
        width: var(--icon_size-s);
        height: var(--icon_size-s);
      }
    }

    /* Added this style to hide the iconRight from split menu button */
    & > ${ElDeprecatedButtonSpinner} + ${ElDeprecatedIcon} + ${ElDeprecatedIcon} {
      display: none;
    }

    /* Added this style to override the all the other button varients to default secondary */
    &:not([data-variant='primary']):not([data-variant='busy']):not(&[aria-disabled='true']):not(&[disabled]) {
      background: var(--comp-button-colour-fill-secondary-default);
      color: var(--comp-button-colour-text-secondary-default);
      border: var(--comp-button-border-width-default) solid var(--comp-button-colour-border-secondary-default);
      border-left: var(--comp-button-border-width-none) solid var(--comp-button-colour-border-secondary-default);
    }

    &[data-variant='primary'] {
      &::before {
        background-color: var(--comp-button-colour-border-primary-default);
      }
    }

    &[data-variant='busy'],
    &[disabled],
    &[aria-disabled='true'] {
      &::before {
        background-color: var(--comp-button-colour-border-primary-disabled);
      }
    }
  }

  ${elDeprecatedButtonSizeLarge} {
    &${ElDeprecatedSplitButtonActionButton} {
      height: var(--size-10);
    }

    &${ElDeprecatedSplitButtonMenuButton} {
      width: var(--size-10);
      height: var(--size-10);

      ${ElDeprecatedIcon} svg {
        width: var(--icon_size-m);
        height: var(--icon_size-m);
      }
    }
  }

  ${elDeprecatedButtonSizeSmall} {
    &${ElDeprecatedSplitButtonMenuButton} {
      width: var(--size-8);
      height: var(--size-8);
    }
  }
`
