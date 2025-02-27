import { styled } from '@linaria/react'

export type ElInputSizesEnum = 'small' | 'medium' | 'large'

interface ElInputFieldProps {
  'data-size'?: ElInputSizesEnum
  'data-is-error'?: boolean
}

export const ElDateTimeInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-2);
`


export const ElInputField = styled.input<ElInputFieldProps>`
  position: relative;
  padding: var(--spacing-2) var(--spacing-3);
  padding-right:  var(--icon-md);
  gap: var(--spacing-2);
  border-radius: var(--corner-sm);
  border: var(--border-default) solid var(--outline-text_input-default);
  background: var(--fill-white);
  text-align: left;
  color: var(--text-primary);
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-xs);
  letter-spacing: var(--letter-spacing-xs);
  outline: none;
  margin: 0;
  appearance: auto;

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

  &::placeholder {
    color: var(--text-placeholder);
    font-family: var(--font-sans-serif);
    font-size: var(--font-size-small);
  }

  &:focus {
    border-color: var(--outline-text_input-focus);
  }

  &:disabled {
    background-color: var(--fill-default-light);
    border-color: var(--fill-default-light);
    cursor: not-allowed;
    * {
      cursor: not-allowed;
    }
  }

  &:read-only {
    background-color: var(--fill-default-lightest);
    border-color: var(--fill-default-lightest);
  }

  &[data-is-error='true'] {
    border-color: var(--outline-error);
    background-color: var(--fill-error-light);
  }

  &::-webkit-calendar-picker-indicator {
    border-radius: var(--corner-default);
    position: absolute;
    right: 5px;
    width: var(--icon-sm);
    height: var(--icon-sm);
    cursor: pointer;
    opacity: 0.6;
    outline: none;
    &:focus {
      box-shadow: 0px 0px 0px 1px #FFF, 0px 0px 0px 4px var(--purple-300);
    }
  }
  &::-webkit-datetime-edit-ampm-field,
  &::-webkit-datetime-edit-day-field,
  &::-webkit-datetime-edit-hour-field,
  &::-webkit-datetime-edit-millisecond-field,
  &::-webkit-datetime-edit-minute-field,
  &::-webkit-datetime-edit-month-field,
  &::-webkit-datetime-edit-second-field,
  &::-webkit-datetime-edit-week-field,
  &::-webkit-datetime-edit-year-field,
  &::-webkit-datetime-edit-text { 
    &:focus{
      background-color: var(--fill-action-light);
      outline: red;
    }
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
