import { styled } from '@linaria/react'

export const getIconSize = (size?: ElInputSizesEnum): { width: string; height: string } => {
  if (size == 'large')
    return {
      width: 'var(--icon-md)',
      height: 'var(--icon-md)',
    }
  return {
    width: 'var(--icon-sm)',
    height: 'var(--icon-sm)',
  }
}

export type ElInputSizesEnum = 'small' | 'medium' | 'large'
export type ElInputVariantEnum = 'default' | 'with-prefix' | 'with-suffix'

interface ElInputFieldProps {
  'data-size'?: ElInputSizesEnum
  'data-variant'?: ElInputVariantEnum
}

interface ElInputFieldWrapperProps {
  'data-is-error'?: boolean
}

export const ElTextInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-2);
`

export const ElInputFieldWrapper = styled.div<ElInputFieldWrapperProps>`
  width: 100%;
  display: inline-flex;
  padding: var(--spacing-2) var(--spacing-3);
  align-items: center;
  gap: var(--spacing-2);
  border-radius: var(--corner-sm);
  border: var(--border-default) solid var(--outline-text_input-default);
  background: var(--fill-white);
  border: var(--component-input-border);

  &:has(input:focus) {
    border-color: var(--outline-text_input-focus);
  }

  &:has(input:disabled) {
    background-color: var(--fill-default-light);
    border-color: var(--fill-default-light);
    cursor: not-allowed;
    * {
      cursor: not-allowed;
    }
  }

  &:has(input:read-only) {
    background-color: var(--fill-default-lightest);
    border-color: var(--fill-default-lightest);
  }

  &[data-is-error='true'] {
    border-color: var(--outline-error);
    background-color: var(--fill-error-light);
  }
`

export const ElInputField = styled.input<ElInputFieldProps>`
  display: flex;
  flex: 1;
  text-align: left;
  color: var(--text-primary);
  background: inherit;
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-xs);
  letter-spacing: var(--letter-spacing-xs);
  outline: none;
  border: none;
  margin: 0;

  &[data-size='small'] {
    font-size: var(--font-size-xs);
    line-height: var(--line-height-xs);
    letter-spacing: var(--letter-spacing-xs);
  }
  &[data-size='medium'] {
    font-size: var(--font-size-sm);
    line-height: var(--line-height-sm);
    letter-spacing: var(--letter-spacing-sm);
  }
  &[data-size='large'] {
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
    letter-spacing: var(--letter-spacing-base);
  }
  &[data-variant='with-suffix'] {
    text-align: right;
  }

  &::placeholder {
    color: var(--text-placeholder);
    font-family: var(--font-sans-serif);
    font-size: var(--font-size-small);
  }
`

export interface ElInputErrorTextProps {
  'data-size'?: ElInputSizesEnum
}

export const ElInputErrorText = styled.p<ElInputErrorTextProps>`
  color: var(--intent-danger);
  font-size: var(--font-size-small);
  text-align: left;
  color: var(--text-error);
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-style: normal;
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-xs);
  letter-spacing: var(--letter-spacing-xs);

  &[data-size='small'] {
    font-size: var(--font-size-xs);
  }
  &[data-size='medium'] {
    font-size: var(--font-size-sm);
  }
`
