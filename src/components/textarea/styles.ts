import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import type { CSSProperties, TextareaHTMLAttributes } from 'react'

export const elTextAreaHasError = css``

export type ContentFieldSizing = 'content'
export type FixedFieldSizing = 'fixed'
/**
 * @deprecated
 */
export type ManualFieldSizing = 'manual'

// NOTE: We omit the `cols` prop because our text area should always grow to the width of its container.
// We also omit the `rows` prop because only one of our text areas allows for fixed sizing.
interface RestrictedTextareaHTMLAttributes extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'cols' | 'rows'> {}

interface TextAreaCSSProperties extends CSSProperties {
  '--textarea-max-rows': number
  '--textarea-min-rows': number
}

export interface ElTextAreaProps extends RestrictedTextareaHTMLAttributes {
  /**
   * Indicates whether the text area has a form validation error or not. Provided as an escape-hatch
   * for when you cannot rely on the [`:invalid` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid)
   * and need to control the error state manually.
   */
  hasError?: boolean
  /**
   * Determines how the text area will be sized.
   * - `content` will allow the text area to size itself to its content;
   * - `fixed` will size the text area to a specific number of rows;
   * - `manual` **(deprecated)** will allow the user to size the text area themselves.
   */
  'data-field-sizing': ContentFieldSizing | FixedFieldSizing | ManualFieldSizing
  /**
   * Standard style prop that additionally allows the min and max row CSS variables for the text area
   * to be overridden.
   */
  style?: TextAreaCSSProperties
}

export const ElTextArea = styled.textarea<ElTextAreaProps>`
  // NOTE: These are public CSS variables that we use to allow CSS-only consumers
  // to define the maximum and minimum rows the text area should resize between.
  // We do this ourselves instead of leveraging Linaria's dynamic styles because
  // that approach results in randomly-named CSS variables, which would not provide
  // a friendly interface for CSS-only consumers.
  --textarea-max-rows: infinity;
  --textarea-min-rows: 3;

  // NOTE: These are "private" CSS variables that we use to avoid repetition. They
  // should never be overridden by consumers.
  --__textarea-border-width: var(--border-default);
  --__textarea-padding-x: var(--spacing-3);
  --__textarea-padding-y: var(--spacing-2);

  background: var(--fill-white);
  border-color: var(--outline-text_input-default);
  border-radius: var(--corner-default);
  border-width: var(--__textarea-border-width);
  color: var(--text-primary);
  display: flex;
  font-family: var(--font-sans-serif);
  font-size: var(--font-size-small);
  line-height: var(--line-height-sm);
  padding: var(--__textarea-padding-y) var(--__textarea-padding-x);
  resize: none;
  width: 100%;

  &[data-field-sizing='content'] {
    // NOTE: field-sizing property is currently experimental
    // @see https://drafts.csswg.org/css-ui/#field-sizing
    // @see https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing
    @supports (field-sizing: content) {
      field-sizing: content;
    }
  }

  &[data-field-sizing='manual'] {
    resize: both;
  }

  // We use CSS to calulate the max/min block size of the text area based on the max/min number of rows
  // that have been specified. We use block-size instead of height because the latter is not writing-mode aware.
  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode
  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/max-block-size
  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/min-block-size
  max-block-size: calc(
    1lh * var(--textarea-max-rows) + 2 * (var(--__textarea-padding-y) + var(--__textarea-border-width))
  );
  min-block-size: calc(
    1lh * var(--textarea-min-rows) + 2 * (var(--__textarea-padding-y) + var(--__textarea-border-width))
  );

  &:focus {
    outline: none;
    border-color: var(--outline-text_input-focus);
  }

  &:read-only,
  &:disabled {
    background-color: var(--fill-default-lightest);
  }

  &:invalid,
  &:user-invalid,
  &.${elTextAreaHasError} {
    background-color: var(--red-100);
    border-color: var(--outline-error);
  }

  &::placeholder {
    color: var(--text-placeholder);
    font-family: var(--font-sans-serif);
    font-size: var(--font-size-small);
  }
`
