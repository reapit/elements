import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const ElInputCheckboxContainer = styled.div`
  position: relative;

  /* We want the container to "shrinkwrap" its content so that the sizing is determined by
   * out checkbox icons */
  width: min-content;
  height: min-content;
`

export const ElInputCheckbox = styled.input`
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

export const elInputCheckboxIcon = css`
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

  input:invalid ~ & {
    color: var(--comp-select-colour-icon-error-unchecked);
  }

  input:disabled ~ & {
    color: var(--comp-select-colour-icon-disabled-unchecked);
  }

  /* Checked/indeterminate colours */
  input:is(:checked, :indeterminate) ~ & {
    color: var(--comp-select-colour-icon-default-checked);
  }

  input:invalid:is(:checked, :indeterminate) ~ & {
    color: var(--comp-select-colour-icon-error-checked);
  }

  input:disabled:is(input:checked, input:indeterminate) ~ & {
    color: var(--comp-select-colour-icon-disabled-checked);
  }

  /* Focus outline */
  input:focus-visible ~ & {
    border-radius: var(--border-radius-m);
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: -1px;
  }

  /* When the checkbox is indeterminate, hide all but the indeterminate icon */
  input:indeterminate ~ &:not([data-show-when='indeterminate']) {
    display: none;
  }

  /* When the checkbox is checked, but not indeterminate, hide all but the checked icon */
  input:checked:not(:indeterminate) ~ &:not([data-show-when='checked']) {
    display: none;
  }

  /* When the checkbox is neither checked nor indeterminate, hide all but the unchecked icon */
  input:not(:checked, :indeterminate) ~ &:not([data-show-when='unchecked']) {
    display: none;
  }
`
