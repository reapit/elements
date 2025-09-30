import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const ElCheckboxInputContainer = styled.div`
  /* We need relative positioning to allow the input to be absolutely positioned covers
   * the whole container. */
  position: relative;

  /* We place these styles inside a layer to allow them to be easily overridden by a
    * consumer-supplied class that would otherwise have a lower specificity and therefore
    * have no effect or require the use of !important */
  @layer {
    /* By default, We want the container to "shrinkwrap" its content so that the sizing is
     * determined by the checkbox icons */
    width: min-content;
    height: min-content;
  }
`

interface ElCheckboxInputProps {
  'data-is-touched': boolean
}

export const ElCheckboxInput = styled.input<ElCheckboxInputProps>`
  /* We absolutely position the checkbox input so that it covers the whole container.
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
`

export const elCheckboxInputIcon = css`
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

  /* NOTE: we only use the invalid styles if the input is invalid AND has the data-is-touched
   * attribute set to true. This allows consumers to control when the invalid styles are applied,
   * such as only when the form control has been "touched" */
  input:invalid[data-is-touched='true'] ~ &,
  input:user-invalid[data-is-touched='true'] ~ & {
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

  /* Checked/indeterminate colours */
  input:is(:checked, :indeterminate) ~ & {
    color: var(--comp-select-colour-icon-default-checked);
  }

  /* When the checkbox is neither checked nor indeterminate, hide all but the unchecked icon */
  input:not(:checked, :indeterminate) ~ &:not([data-show-when='unchecked']) {
    display: none;
  }

  /* When the checkbox is indeterminate, hide all but the indeterminate icon */
  input:indeterminate ~ &:not([data-show-when='indeterminate']) {
    display: none;
  }

  input:invalid[data-is-touched='true']:is(:checked, :indeterminate) ~ &,
  input:user-invalid[data-is-touched='true']:is(:checked, :indeterminate) ~ & {
    color: var(--comp-select-colour-icon-error-checked);
  }

  input:disabled:is(input:checked, input:indeterminate) ~ & {
    color: var(--comp-select-colour-icon-disabled-checked);
  }

  /* When the checkbox is checked, but not indeterminate, hide all but the checked icon */
  input:checked:not(:indeterminate) ~ &:not([data-show-when='checked']) {
    display: none;
  }
`
