import { styled } from '@linaria/react'
import { Button } from '../button'
import { ElIcon } from '../icon'

export const ElSplitButtonActionButton = styled(Button)``
export const ElSplitButtonMenuButton = styled(Button)``
export const ElSplitButtonIcon = styled.span``

export const ElSplitButtonLabelContainer = styled.div`
  display: flex;
  padding: var(--spacing-none, 0px) var(--spacing-half, 2px);
  align-items: flex-start;
`

export const ElSplitButton = styled.div`
  display: inline-flex;
  height: var(--size-size-9);
  align-items: flex-start;

  ${ElSplitButtonActionButton} {
    border-radius: var(--comp-button-border-radius-default) var(--comp-button-border-radius-none)
      var(--comp-button-border-radius-none) var(--comp-button-border-radius-default);
    border-right: var(--comp-button-border-width-none) solid var(--comp-button-colour-border-secondary-default);

    .el-button-label {
      display: flex;
      padding: var(--spacing-none) var(--spacing-half);
      align-items: flex-start;
    }
  }

  ${ElSplitButtonMenuButton} {
    width: var(--size-9);
    height: var(--size-9);
    padding: var(--spacing-none);
    gap: var(--spacing-none);
    border-radius: var(--comp-button-border-radius-none) var(--comp-button-border-radius-default)
      var(--comp-button-border-radius-default) var(--comp-button-border-radius-none);
    border-left: var(--comp-button-border-width-none) solid var(--comp-button-colour-border-secondary-default);

    .el-button-label {
      display: flex;
      padding: var(--spacing-half) var(--spacing-none);
      width: 100%;
      flex: 1 0 0;
    }

    ${ElSplitButtonIcon} {
      display: flex;
      padding: var(--spacing-1) var(--spacing-none);
      justify-content: center;
      align-items: center;
      flex: 1 0 0;
      border-left: var(--comp-button-border-width-default) solid var(--comp-button-colour-border-secondary-default);

      ${ElIcon} {
        color: inherit;
        align-items: center;
        padding: var(--spacing-none);

        svg {
          width: var(--icon-size-s); // Need to update with latest token variable
          height: var(--icon-size-s); // Need to update with latest token variable
        }
      }
    }

    &[data-variant='primary'] {
      ${ElSplitButtonIcon} {
        border-left: var(--comp-button-border-width-default) solid var(--comp-button-colour-border-primary-default);
      }
    }

    &[data-variant='busy'],
    &[disabled],
    &[aria-disabled='true'] {
      ${ElSplitButtonIcon} {
        border-left: var(--comp-button-border-width-default) solid var(--comp-button-colour-border-primary-disabled);
      }
    }

    &[data-variant='busy'] {
      .el-button-spinner {
        display: none;
      }

      ${ElSplitButtonIcon} {
        .el-button-spinner {
          display: block;
          margin: var(--spacing-none);
        }
        ${ElIcon} {
          display: none;
        }
      }
    }
  }

  .el-button-size-large {

    &${ElSplitButtonActionButton} {
      height: var(--size-10);

      .el-button-spinner {
        height: var(--icon-size-m); // Need to update with latest token variable
        width: var(--icon-size-m); // Need to update with latest token variable
      }
    }

    &${ElSplitButtonMenuButton} {
      width: var(--size-10);
      height: var(--size-10);

      .el-button-spinner {
        height: var(--icon-size-m); // Need to update with latest token variable
        width: var(--icon-size-m); // Need to update with latest token variable
      }

      ${ElIcon} svg {
        width: var(--icon-size-m); // Need to update with latest token variable
        height: var(--icon-size-m); // Need to update with latest token variable
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
