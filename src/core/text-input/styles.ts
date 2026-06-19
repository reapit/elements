import { css } from '@linaria/core'
import { font } from '#src/utils/font'
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
  @layer elements.main {
    position: relative;
    display: inline-grid;
    grid-template-areas: 'before input after';
    grid-template-columns: auto 1fr auto;
    align-items: center;
    max-width: var(--input-max-width, 100%);
    width: 100%;

    --input-padding-start: var(--spacing-3);
    --input-padding-end: var(--spacing-3);

    &:has(> [data-position='before']) {
      --input-padding-start: 0;
    }
    &:has(> [data-position='after']) {
      --input-padding-end: 0;
    }

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
      /* Padding between an addon (affix text or icon) and the container border */
      --input-addon-outer-padding: var(--spacing-2);
      --input-icon-size: var(--icon_size-sm);
    }
    /* NOTE: medium is the default size */
    &,
    &[data-size='medium'] {
      ${font('sm', 'regular')}
      height: var(--size-9);
      --input-addon-outer-padding: var(--spacing-3);
      --input-icon-size: var(--icon_size-sm);
    }
    &[data-size='large'] {
      ${font('base', 'regular')}
      height: var(--size-10);
      --input-addon-outer-padding: var(--spacing-3);
      --input-icon-size: var(--icon_size-md);
    }

    &[data-variant='borderless'] {
      border-style: none;
    }

    /* NOTE: we only use the invalid styles if the input is invalid AND has the data-show-validity
     * attribute set to true. Further, we use :where to ensure data-show-validity does not increase
     * the specificity of our selector, otherwise these styles would override our focus styles.
     * aria-invalid="true" is also supported as an alternative to the native :invalid pseudo-class,
     * for cases where the element is not natively invalid (e.g. server-side validation). */
    &:has(input:invalid:where([data-show-validity='true'])),
    &:has(input:user-invalid:where([data-show-validity='true'])),
    &:has(input:where([aria-invalid='true'][data-show-validity='true'])) {
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

    /* NOTE: the borderless variant hides the border via border-style: none, which persists
     * through state-based border-color changes. We restore the border only on focus so the
     * focus ring is visible. */
    &[data-variant='borderless']:has(input:focus-visible) {
      border-style: solid;
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
      --input-affix-colour: var(--comp-input-colour-text-default-placeholder);
      --input-icon-colour: var(--comp-input-colour-icon-read_only);
      --input-placeholder-colour: var(--comp-input-colour-text-default-placeholder);
      --input-text-colour: var(--comp-input-colour-text-read_only-input);
    }

    /* When a formatted overlay is present and the input is not focused,
     * show the overlay and make the raw input text transparent. */
    &:not(:focus-within):has([data-formatted-overlay]) {
      [data-formatted-overlay] {
        display: flex;
      }

      input {
        color: transparent;
      }
    }
  }
`

interface ElTextInputProps {
  'data-show-validity': boolean
  'data-text-align': 'left' | 'right' | undefined
}

export const ElTextInput = styled.input<ElTextInputProps>`
  @layer elements.main {
    grid-area: input;
    min-width: 0;

    appearance: none;
    background: transparent;

    padding-inline: var(--input-padding-start) var(--input-padding-end);

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
    &::-webkit-search-cancel-button {
      display: none;
    }

    /* NOTE: Safari on iOS applies default styling to the internal elements of date/time inputs.
     * We need to encourage those to inherit our preferred alignment according to data-text-align */
    &::-webkit-date-and-time-value {
      text-align: inherit;
    }

    &,
    &[data-text-align='left'] {
      text-align: left;
    }
    &[data-text-align='right'] {
      text-align: right;
    }
  }
`

export const ElTextInputIconContainer = styled.span`
  @layer elements.main {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    box-sizing: content-box;
    height: var(--input-icon-size);
    width: var(--input-icon-size);

    color: var(--input-icon-colour);

    &[data-position='before'] {
      grid-area: before;
      padding-inline: var(--input-addon-outer-padding) var(--spacing-2);
    }
    &[data-position='after'] {
      grid-area: after;
      padding-inline: var(--spacing-2) var(--input-addon-outer-padding);
    }
  }
`

export const ElTextInputAffixContainer = styled.span`
  @layer elements.main {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;

    font: inherit;
    white-space: nowrap;

    color: var(--input-affix-colour);

    &[data-position='before'] {
      grid-area: before;
      padding-inline: var(--input-addon-outer-padding) var(--spacing-2);
    }
    &[data-position='after'] {
      grid-area: after;
      padding-inline: var(--spacing-2) var(--input-addon-outer-padding);
    }
  }
`

export const elTextInputSpinner = css`
  @layer elements.main {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

interface ElTextInputOverlayProps {
  'data-text-align': 'left' | 'right'
}

export const ElTextInputOverlay = styled.span<ElTextInputOverlayProps>`
  @layer elements.main {
    grid-area: input;
    align-self: stretch;
    min-width: 0;

    display: none;
    align-items: center;

    padding-inline: var(--input-padding-start) var(--input-padding-end);

    &,
    &[data-text-align='left'] {
      justify-content: flex-start;
    }
    &[data-text-align='right'] {
      justify-content: flex-end;
    }

    font: inherit;
    color: var(--input-text-colour);
    pointer-events: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`
