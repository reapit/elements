import { styled } from '@linaria/react'
import { Button } from '../button'
import { ElIcon } from '../icon'
import { ElButtonSpinner } from '../button/styles'

export const ElSplitButtonActionButton = styled(Button)``
export const ElSplitButtonMenuButton = styled(Button)``
export const ElSplitButtonIcon = styled.span``

export const ElSplitButton = styled.div`
  display: inline-flex;
  height: var(--size-size-9);
  align-items: flex-start;

  ${ElSplitButtonActionButton} {
    border-radius: var(--comp-button-border-radius-default) var(--comp-button-border-radius-none)
      var(--comp-button-border-radius-none) var(--comp-button-border-radius-default);
    border-right: var(--comp-button-border-width-none) solid var(--comp-button-colour-border-secondary-default);
  }

  ${ElSplitButtonMenuButton} {
    border-radius: var(--comp-button-border-radius-none) var(--comp-button-border-radius-default)
      var(--comp-button-border-radius-default) var(--comp-button-border-radius-none);
    border-left: var(--comp-button-border-width-none) solid var(--comp-button-colour-border-secondary-default);

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
          width: var(--icon_size-s);
          height: var(--icon_size-s);
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
      ${ElSplitButtonIcon} {
        ${ElIcon} {
          display: none;
        }
      }
    }
  }

  .el-button-size-large {

    &${ElSplitButtonActionButton} {
      height: var(--size-10);

      ${ElButtonSpinner} {
        height: var(--icon_size-m);
        width: var(--icon_size-m);
      }
    }

    &${ElSplitButtonMenuButton} {
      width: var(--size-10);
      height: var(--size-10);

      ${ElButtonSpinner} {
        height: var(--icon_size-m);
        width: var(--icon_size-m);
      }

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
