import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const ElRadioInputContainer = styled.div`
  @layer elements.main {
    /* We need relative positioning to allow the input to be absolutely positioned covers
     * the whole container. */
    position: relative;

    /* By default, we want the container to "shrinkwrap" its content so that the sizing is
     * determined by the radio button icons */
    width: min-content;
    height: min-content;
  }
`

interface ElRadioInputProps {
  'data-show-validity': boolean
}

export const ElRadioInput = styled.input<ElRadioInputProps>`
  @layer elements.main {
    /* We absolutely position the radio button input so that it covers the whole container.
     * this ensures any padding applied to the container by a consumer is "included" in
     * the input's "hit area". */
    position: absolute;
    inset: 0;

    width: 100%;
    height: 100%;

    margin: 0;
    padding: 0;
    opacity: 0;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }
`

export const elRadioInputIcon = css`
  @layer elements.main {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    /* We don't want any pointer events for these icons. Rather, we want the pointer events
     * to be received by the input element. */
    pointer-events: none;

    width: var(--icon_size-l);
    height: var(--icon_size-l);

    /* Unchecked colours */
    color: var(--comp-select-colour-icon-default-unchecked);

    /* NOTE: we only use the invalid styles if the input is invalid AND has the data-show-validity
     * attribute set to true. This allows consumers to control when the invalid styles are applied,
     * such as only when the form control has been "touched". aria-invalid="true" is also supported
     * as an alternative to the native :invalid pseudo-class, for cases where the element is not
     * natively invalid (e.g. server-side validation). */
    input:invalid:where([data-show-validity='true']) ~ &,
    input:user-invalid:where([data-show-validity='true']) ~ &,
    input:where([aria-invalid='true'][data-show-validity='true']) ~ & {
      color: var(--comp-select-colour-icon-error-unchecked);
    }

    input:disabled ~ & {
      color: var(--comp-select-colour-icon-disabled-unchecked);
    }

    /* Focus outline */
    input:focus-visible ~ & {
      border-radius: var(--border-radius-m);
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: var(--border-width-default);
    }

    /* Checked colours */
    input:checked ~ & {
      color: var(--comp-select-colour-icon-default-checked);
    }

    /* When the radio button is not checked, hide the checked icon */
    input:not(:checked) ~ &:not([data-show-when='unchecked']) {
      display: none;
    }

    input:invalid:where([data-show-validity='true']):checked ~ &,
    input:user-invalid:where([data-show-validity='true']):checked ~ &,
    input:where([aria-invalid='true'][data-show-validity='true']):checked ~ & {
      color: var(--comp-select-colour-icon-error-checked);
    }

    input:disabled:checked ~ & {
      color: var(--comp-select-colour-icon-disabled-checked);
    }

    /* When the radio button is checked, hide the unchecked icon */
    input:checked ~ &:not([data-show-when='checked']) {
      display: none;
    }
  }
`
