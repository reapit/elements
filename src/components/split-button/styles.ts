import { styled } from '@linaria/react'
import { Button } from '../button'
import { ElIcon } from '../icon'

export const ElSplitButtonActionButton = styled(Button)``
export const ElSplitButtonMenuButton = styled(Button)``

export const ElSplitButton = styled.div`
  display: inline-flex;
  height: var(--size-9);
  align-items: flex-start;

  ${ElSplitButtonActionButton} {
    border-radius: var(--comp-button-border-radius-default) var(--comp-button-border-radius-none)
      var(--comp-button-border-radius-none) var(--comp-button-border-radius-default);
    border-right: var(--comp-button-border-width-none) solid var(--comp-button-colour-border-secondary-default);

    // Added this style to hide the iconRight from split action button
    .el-button-label + ${ElIcon}{
      display:none;
    }

    // Added this style to override the all the other button varients to default secondary
    &:not([data-variant='primary']):not([data-variant='busy']):not(&[aria-disabled='true']):not(&[disabled]) {
      background: var(--comp-button-colour-fill-secondary-default);
      color: var(--comp-button-colour-text-secondary-default);
      border: var(--comp-button-border-width-default) solid var(--comp-button-colour-border-secondary-default);
      border-right: var(--comp-button-border-width-none) solid var(--comp-button-colour-border-secondary-default);
    }
  }

  ${ElSplitButtonMenuButton} {
    border-radius: var(--comp-button-border-radius-none) var(--comp-button-border-radius-default)
      var(--comp-button-border-radius-default) var(--comp-button-border-radius-none);
    border-left: var(--comp-button-border-width-none) solid var(--comp-button-colour-border-secondary-default);

    &:before {
      content: '';
      position: absolute;
      top: 6px;
      bottom: 6px;
      left: 0;
      width: var(--comp-button-border-width-default);
      background-color: var(--comp-button-colour-border-secondary-default);
      pointer-events: none;
    }

    ${ElIcon} {
      display: contents;
      color: inherit;
      align-items: center;
      padding: var(--spacing-none);

      svg {
        width: var(--icon_size-s);
        height: var(--icon_size-s);
      }
    }

    // Added this style to hide the iconRight from split menu button
    & > .el-button-spinner + ${ElIcon} + ${ElIcon} {
      display: none;
    }

    // Added this style to override the all the other button varients to default secondary
    &:not([data-variant='primary']):not([data-variant='busy']):not(&[aria-disabled='true']):not(&[disabled]) {
      background: var(--comp-button-colour-fill-secondary-default);
      color: var(--comp-button-colour-text-secondary-default);
      border:  var(--comp-button-border-width-default) solid var(--comp-button-colour-border-secondary-default);
      border-left: var(--comp-button-border-width-none) solid var(--comp-button-colour-border-secondary-default);
    }

    &[data-variant='primary'] {
      &:before {
        background-color: var(--comp-button-colour-border-primary-default);
      }
    }

    &[data-variant='busy'],
    &[disabled],
    &[aria-disabled='true'] {
      &:before {
        background-color: var(--comp-button-colour-border-primary-disabled);
      }
    }
  }

  .el-button-size-large {
    &${ElSplitButtonActionButton} {
      height: var(--size-10);
    }

    &${ElSplitButtonMenuButton} {
      width: var(--size-10);
      height: var(--size-10);

      ${ElIcon} svg {
        width: var(--icon_size-m);
        height: var(--icon_size-m);
      }
    }
  }

  .el-button-size-small {
    &${ElSplitButtonMenuButton} {
      width: var(--size-8);
      height: var(--size-8);
    }
  }
}
`
