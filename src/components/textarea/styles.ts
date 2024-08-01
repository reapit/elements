import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const elTextAreaHasError = css``

export interface TextAreaCSSProperties {
  '--textarea-max-rows': number
  '--textarea-min-rows': number
}

export const ElTextArea = styled.textarea`
  // NOTE: These are public CSS variables that we use to allow CSS-only consumers
  // to define the maximum and minimum rows the text area should resize between.
  // We do this ourselves instead of leveraging Linaria's dynamic styles because
  // that approach results in randomly-named CSS variables, which would not provide
  // a friendly interface for CSS-only consumers.
  --textarea-max-rows: infinity;
  --textarea-min-rows: 2;

  // NOTE: These are "private" CSS variables that we use to avoid repetition. They
  // should never be overridden by consumers.
  --__textarea-border-width: var(--border-default);
  --__textarea-padding-x: var(--spacing-3);
  --__textarea-padding-y: var(--spacing-2);

  background: var(--component-input-bg); // TODO: use correct design token
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

  // NOTE: field-sizing property is currently experimental
  // @see https://drafts.csswg.org/css-ui/#field-sizing
  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing
  @supports (field-sizing: content) {
    field-sizing: content;
  }

  // We use CSS to calulate the max/min block size (or max/min height) of the text area based on the
  // max/min number of rows that have been specified.
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
