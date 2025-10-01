import { styled } from '@linaria/react'

export type ElInputSizesEnum = 'small' | 'medium' | 'large'
export type ElInputVariantEnum = 'default' | 'with-prefix' | 'with-suffix'

interface ElInputFieldProps {
  'data-size'?: ElInputSizesEnum
  'data-variant'?: ElInputVariantEnum
}

interface ElInputFieldWrapperProps {
  'data-is-error'?: boolean
}

export const ElTextInput = styled.div<ElInputFieldWrapperProps>`
  width: auto;
  display: inline-flex;
  padding: var(--spacing-2) var(--spacing-3);
  align-items: center;
  gap: var(--spacing-2);

  border-radius: var(--comp-input-border-radius);
  border: var(--comp-input-border-width) solid var(--comp-input-colour-border-default);
  background: var(--comp-input-colour-fill-default-background);

  &:has(input:focus) {
    &:not(:has(input:read-only)) {
      border: var(--comp-input-border-width) solid var(--comp-input-colour-border-focused);
      background: var(--comp-input-colour-fill-focused-background);
    }
  }

  &:has(input:disabled) {
    border: var(--comp-input-border-width) solid var(--comp-input-colour-border-disabled);
    background: var(--comp-input-colour-fill-disabled-background);
    cursor: not-allowed;
    * {
      cursor: not-allowed;
    }
  }

  &:has(input:read-only) {
    background: var(--comp-input-colour-fill-read_only-background);
    border: var(--comp-input-border-width) solid var(--comp-input-colour-fill-read_only-background);
  }

  &[data-is-error='true'] {
    &:not(:has(input:disabled)):not(:has(input:read-only)) {
      border: var(--comp-input-border-width) solid var(--comp-input-colour-border-error);
      background: var(--comp-input-colour-fill-error-background);
    }
  }

  &:has(input[type='time']),
  &:has(input[type='date']),
  &:has(input[type='datetime-local']),
  &:has(input[type='week']),
  &:has(input[type='month']) {
    padding-right: calc(var(--spacing-3) * 2) !important;
  }

  &:has(input[data-size='small']) {
    padding: var(--spacing-2);
    input {
      font-family: var(--font-xs-regular-family);
      font-size: var(--font-xs-regular-size);
      font-weight: var(--font-xs-regular-weight);
      line-height: var(--font-xs-regular-line_height);
      letter-spacing: var(--font-xs-regular-letter_spacing);
      &::-webkit-calendar-picker-indicator {
        width: var(--icon_size-s);
        height: var(--icon_size-s);
      }
    }
  }
  &:has(input[data-size='medium']) {
    input {
      font-family: var(--font-sm-regular-family);
      font-size: var(--font-sm-regular-size);
      font-weight: var(--font-sm-regular-weight);
      line-height: var(--font-sm-regular-line_height);
      letter-spacing: var(--font-sm-regular-letter_spacing);
      &::-webkit-calendar-picker-indicator {
        width: var(--icon_size-s);
        height: var(--icon_size-s);
      }
    }
  }
  &:has(input[data-size='large']) {
    input {
      font-family: var(--font-base-regular-family);
      font-size: var(--font-base-regular-size);
      font-style: normal;
      font-weight: var(--font-base-regular-weight);
      line-height: var(--font-base-regular-line_height);
      letter-spacing: var(--font-base-regular-letter_spacing);
      &::-webkit-calendar-picker-indicator {
        width: var(--icon_size-m);
        height: var(--icon_size-m);
      }
    }
  }

  svg {
    fill: var(--colour-icon-primary);
  }
`

export const ElInputField = styled.input<ElInputFieldProps>`
  background-color: inherit;
  display: flex;
  flex: 1;
  text-align: left;
  outline: none;
  border: none;
  margin: 0;
  color: var(--comp-input-colour-text-default-input);
  font-family: var(--font-base-regular-family);
  font-size: var(--font-base-regular-size);
  font-style: normal;
  font-weight: var(--font-base-regular-weight);
  line-height: var(--font-base-regular-line_height);
  letter-spacing: var(--font-base-regular-letter_spacing);

  &[data-variant='with-suffix'] {
    text-align: right;
  }

  &::placeholder {
    color: var(--comp-input-colour-text-default-placeholder);
  }

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button,
  &[type='number'] {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    appearance: none;
    margin: 0;
  }

  &:disabled {
    cursor: not-allowed;
    * {
      cursor: not-allowed;
    }
    &::-webkit-calendar-picker-indicator {
      opacity: 1 !important;
      pointer-events: auto; /* Allow interaction */
    }
  }

  &::-webkit-calendar-picker-indicator {
    border-radius: var(--border-radius-m);
    position: absolute;
    right: var(--spacing-4);
    width: var(--icon_size-m);
    height: var(--icon_size-m);
    cursor: pointer;
    opacity: 0.6;
    outline: none;
    &:focus {
      box-shadow:
        0px 0px 0px 1px #fff,
        0px 0px 0px 4px var(--colour-border-focus);
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
    &:focus {
      background-color: var(--fill-action-light);
      outline: red;
    }
  }
`
