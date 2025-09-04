import { font } from '#src/core/text/index'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const ElSelectCustom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-2);
  align-self: stretch;

  .el-chip-group-list {
    padding-top: var(--spacing-2);
  }

  .el-label-text[data-error='true'] {
    color: var(--comp-input-colour-text-info-error);
  }
`
export const elInputField = css`
  display: flex;
  height: var(--size-8);
  padding: var(--spacing-2);
  align-items: center;
  gap: var(--spacing-2);
  align-self: stretch;
  border-radius: var(--comp-input-border-radius);
  border: var(--comp-input-border-width) solid var(--comp-input-colour-border-default);
  background: var(--comp-input-colour-fill-default-background);

  &.el-button.el-input-field[aria-invalid='true'] {
    border-radius: var(--comp-input-border-radius);
    border: var(--comp-input-border-width) solid var(--comp-input-colour-border-error);
    background: var(--comp-input-colour-fill-error-background);
  }
`

export const ElContent = styled.div`
  display: flex;
  padding: var(--spacing-none);
  align-items: center;
  gap: var(--spacing-none);
  flex: 1 0 0;
  overflow: hidden;
`

export const ElPlaceholder = styled.div`
  display: flex;
  padding: var(--spacing-none);
  align-items: center;
  gap: var(--spacing-none);
  flex: 1 0 0;
`

export const elPopover = css`
  padding: var(--spacing-2) var(--spacing-none);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-1);

  border-radius: var(--comp-menu-border-radius);
  background: var(--comp-menu-colour-fill-background);
  /* elevation-xl */
  box-shadow: 0 var(--size-1) var(--size-4) 0 rgba(34, 43, 51, 0.16);

  [role='listbox'] {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;

    .el-option-group {
      padding: var(--spacing-none) var(--spacing-2);
    }
  }

  [role='listbox']:not(:has(.el-option-group)) {
    padding: var(--spacing-none) var(--spacing-2);
  }

  [role='listbox'] .el-option-group:not(:last-child)::after {
    content: '';
    display: flex;
    height: var(--size-px, 1px);
    max-height: var(--size-px, 1px);
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: calc(var(--spacing-3) - 2px);
    align-self: stretch;
    border-bottom: var(--comp-divider-border-width) solid var(--comp-divider-colour-border-solid);
    margin: var(--spacing-2) var(--spacing-none);
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;

    option {
      display: flex;
      padding: var(--spacing-2) var(--spacing-3);
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: var(--spacing-half);
      align-self: stretch;
      border-radius: var(--comp-menu-border-radius);
    }
  }
`

export const ElOptionGroup = styled.div`
  display: flex;
  padding: 0 var(--spacing-2);
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  .el-option {
    padding: var(--spacing-none);
  }

  .el-label-text {
    display: flex;
    padding: var(--spacing-2) var(--spacing-3);
    align-items: center;
    align-self: stretch;

    &[data-variant='soft'] {
      color: var(--comp-menu-colour-text-group_title);
    }
  }
`

export const elGroupTitle = css`
  display: flex;
  padding: var(--spacing-2) var(--spacing-3);
  align-items: center;
  align-self: stretch;

  &[data-variant='soft'] {
    color: var(--comp-menu-colour-text-group_title);
  }
`

export const ElOption = styled.li`
  display: flex;
  padding: var(--spacing-2) var(--spacing-3);
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--spacing-half);
  align-self: stretch;

  .el-label-text {
    display: block;
    white-space: normal;
    overflow: visible;

    &[data-variant='soft'] {
      color: var(--comp-menu-colour-text-default-primary);
    }
  }

  &:focus-visible {
    border-radius: var(--border-radius-m);
    border: var(--border-width-double) solid var(--colour-border-focus);
    padding: calc(var(--spacing-2) - 2px) calc(var(--spacing-3) - 2px);
  }

  &:hover {
    cursor: pointer;
    border-radius: var(--comp-menu-border-radius);
    background: var(--comp-menu-colour-fill-hover);
  }

  &[aria-selected='true'] {
    .el-label-container {
      .el-label-text {
        ${font('sm', 'medium')}
        &[data-variant='soft'] {
          color: var(--comp-menu-colour-text-default-action);
        }
      }

      .el-icon {
        color: var(--comp-menu-colour-text-default-action);
      }
    }
  }
`

export const ElLabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  align-self: stretch;
`

export const ElLabelItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  flex: 1 0 0;
`

export const ElAdditionalInfo1 = styled.div`
  display: flex;
  height: var(--size-5);
  align-items: center;
  gap: var(--spacing-2);
  align-self: stretch;
  ${font('xs', 'regular')}
`

export const ElAdditionalInfo2 = styled.div`
  display: flex;
  height: var(--size-5);
  align-items: center;
  gap: var(--spacing-2);
  align-self: stretch;
  ${font('xs', 'regular')}
`
