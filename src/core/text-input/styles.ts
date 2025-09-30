import { css } from '@linaria/core'
import { font } from '#src/core/text'
import { styled } from '@linaria/react'

import type { CSSProperties } from 'react'

interface ElTextInputContainerProps {
  // NOTE: We use a CSS variable for the max-width rather than simply using the max-width inline
  // style because we want the max-width to be available to both the container and input elements.
  style?: CSSProperties & {
    '--input-max-width'?: string
  }
}

export const ElTextInputContainer = styled.div<ElTextInputContainerProps>`
  display: inline-flex;
  align-items: center;
  max-width: var(--input-max-width, 100%);
  width: 100%;

  padding: 0;

  background: var(--comp-input-colour-fill-default-background);
  border-radius: var(--comp-input-border-radius);
  border: var(--comp-input-border-width) solid var(--comp-input-colour-border-default);
  --input-affix-colour: var(--comp-input-colour-text-default-placeholder);
  --input-icon-colour: var(--comp-input-colour-icon-default);
  --input-placeholder-colour: var(--comp-input-colour-text-default-placeholder);
  --input-text-colour: var(--comp-input-colour-text-default-input);

  &[data-size='small'] {
    ${font('xs', 'regular')}
    height: var(--size-8);
    --input-affix-inline_padding: var(--spacing-2);
    --input-icon-inline_padding: var(--spacing-2);
    --input-icon-size: var(--icon_size-s);
  }
  /* NOTE: medium is the default size */
  &,
  &[data-size='medium'] {
    ${font('sm', 'regular')}
    height: var(--size-9);
    --input-affix-inline_padding: var(--spacing-3);
    --input-icon-inline_padding: var(--spacing-3);
    --input-icon-size: var(--icon_size-s);
  }
  &[data-size='large'] {
    ${font('base', 'regular')}
    height: var(--size-10);
    --input-affix-inline_padding: var(--spacing-3);
    --input-icon-inline_padding: var(--spacing-3);
    --input-icon-size: var(--icon_size-m);
  }

  /* NOTE: we only use the invalid styles if the input is invalid AND has the data-is-touched
   * attribute set to true. This ensures the invalid styles are only visually communicated communicated
   * the form control has been touched. Further, we use :where to ensure data-is-touched does not increase
   * the specificity of our selector, otherwise these styles would override our focus styles. */
  &:has(input:invalid:where([data-is-touched='true'])),
  &:has(input:user-invalid:where([data-is-touched='true'])) {
    background: var(--comp-input-colour-fill-error-background);
    border-color: var(--comp-input-colour-border-error);
    --input-affix-colour: var(--comp-input-colour-text-error-placeholder);
    --input-icon-colour: var(--comp-input-colour-icon-error);
    --input-placeholder-colour: var(--comp-input-colour-text-error-placeholder);
    --input-text-colour: var(--comp-input-colour-text-error-input);
  }

  /* NOTE: focus styles come after invalid styles to ensure they take precedence */
  &:has(input:focus-visible) {
    background: var(--comp-input-colour-fill-focused-background);
    border-color: var(--comp-input-colour-border-focused);
    --input-affix-colour: var(--comp-input-colour-text-focused-placeholder);
    --input-icon-colour: var(--comp-input-colour-icon-focused);
    --input-placeholder-colour: var(--comp-input-colour-text-focused-placeholder);
    --input-text-colour: var(--comp-input-colour-text-focused-input);
  }

  &[aria-busy='true'] {
    background: var(--comp-input-colour-fill-busy-background);
    border-color: var(--comp-input-colour-border-busy);
    --input-affix-colour: var(--comp-input-colour-text-busy-placeholder);
    --input-icon-colour: var(--comp-input-colour-icon-busy);
    --input-placeholder-colour: var(--comp-input-colour-text-busy-placeholder);
    --input-text-colour: var(--comp-input-colour-text-busy-input);
  }

  &:has(input:disabled) {
    background: var(--comp-input-colour-fill-disabled-background);
    border-color: var(--comp-input-colour-border-disabled);
    --input-affix-colour: var(--comp-input-colour-text-disabled-placeholder);
    --input-icon-colour: var(--comp-input-colour-icon-disabled);
    --input-placeholder-colour: var(--comp-input-colour-text-disabled-placeholder);
    --input-text-colour: var(--comp-input-colour-text-disabled-input);
  }

  &:has(input:read-only:not(:disabled)) {
    background: var(--comp-input-colour-fill-read_only-background);
    border-color: var(--comp-input-colour-fill-read_only-background);
    --input-affix-colour: var(--comp-input-colour-text-read_only-placeholder);
    --input-icon-colour: var(--comp-input-colour-icon-read_only);
    --input-placeholder-colour: var(--comp-input-colour-text-read_only-placeholder);
    --input-text-colour: var(--comp-input-colour-text-read_only-input);
  }
`

interface ElTextInputProps {
  'data-text-align': 'left' | 'right' | undefined
  'data-is-touched': boolean
}

export const ElTextInput = styled.input<ElTextInputProps>`
  appearance: none;
  background: transparent;

  width: 100%;
  /* NOTE: --input-max-width comes from ElTextInputContainer */
  max-width: var(--input-max-width, 100%);

  height: 100%;
  border: none;
  outline: none;

  font: inherit;

  color: var(--input-text-colour);
  &::placeholder {
    color: var(--input-placeholder-colour);
  }

  /* NOTE: WebKit browsers display a calendar icon for date inputs that we need to hide */
  &::-webkit-calendar-picker-indicator,
  &::-webkit-search-cancel-button,
  &::-webkit-time-picker-indicator {
    display: none;
  }

  /* NOTE: Safari on iOS applies default styling to the internal elements of date/time inputs.
   * We need to encourage those to inherit our preferred alignment according to data-text-align */
  &::-webkit-date-and-time-value {
    text-align: inherit;
  }

  /* No icons/affixes */
  &:only-child {
    padding-inline: var(--spacing-3);
  }

  /* Trailing icon or suffix */
  &:first-child:not(:only-child) {
    padding-inline: var(--spacing-3) var(--spacing-2);
  }

  /* Leading icon or prefix */
  &:last-child:not(:only-child) {
    padding-inline: var(--spacing-2) var(--spacing-3);
  }

  /* Leading and trailing icons/affixes */
  &:not(:only-child) {
    padding-inline: var(--spacing-2);
  }

  &,
  &[data-text-align='left'] {
    text-align: left;
  }
  &[data-text-align='right'] {
    text-align: right;
  }
`

export const ElTextInputIconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  box-sizing: content-box;
  height: var(--input-icon-size);
  width: var(--input-icon-size);

  color: var(--input-icon-colour);

  &:first-child {
    padding-inline-start: var(--input-icon-inline_padding);
  }
  &:last-child {
    padding-inline-end: var(--input-icon-inline_padding);
  }
`

export const ElTextInputAffixContainer = styled.span`
  font: inherit;

  color: var(--input-affix-colour);

  &:first-child {
    padding-inline-start: var(--input-affix-inline_padding);
  }
  &:last-child {
    padding-inline-end: var(--input-affix-inline_padding);
  }
`

export const elTextInputSpinner = css`
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
