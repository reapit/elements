import { styled } from '@linaria/react'
import { css } from '@linaria/core'

/** @deprecated */
export const elHasGreyBg = css`
  /* https://github.com/Anber/wyw-in-js/issues/144 */
`

/** @deprecated */
export const ElToggleItem = styled.span`
  width: 50%;
  height: 100%;
  text-align: center;
  border-radius: 1.2rem;
  font-size: var(--font-size-small);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.75rem;
  color: var(--neutral-500);
`

/** @deprecated */
export const ElToggleRadioItem = styled.span`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: var(--font-size-small);
  padding: 0 0.75rem;
  border-radius: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

/** @deprecated */
export const elToggleFullWidth = css`
  width: 100%;
  justify-content: space-evenly;
`

/** @deprecated */
export const ElToggleCheckbox = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  position: absolute;
  color: var(--neutral-500);

  + label ${ElToggleItem} {
    transition: all 0.2s linear;

    &:first-child {
      margin-right: 0.375rem;
    }
  }

  &:not(:checked) + label ${ElToggleItem} {
    &:last-child {
      background: var(--intent-primary);
      color: var(--white);
    }
  }

  &:checked + label ${ElToggleItem} {
    &:first-child {
      background: var(--intent-primary);
      color: var(--white);
    }
  }
`

/** @deprecated */
export const ElToggleLabel = styled.label`
  cursor: pointer;
  width: fit-content;
  height: 2rem;
  background: var(--white);
  border-radius: 1.5rem;
  border: var(--component-input-border);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.25rem;

  &.${elHasGreyBg} {
    background: var(--purple-050);
    border: 1px solid var(--purple-050);
  }

  &.${elToggleFullWidth} {
    width: 100%;
  }
`

/** @deprecated */
export const ElToggleRadio = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  position: absolute;
  color: var(--neutral-500);

  + label ${ElToggleRadioItem} {
    transition: all 0.2s linear;
  }

  &:checked + label ${ElToggleRadioItem} {
    background: var(--intent-primary);
    color: var(--white);
  }

  &:disabled + label ${ElToggleRadioItem} {
    opacity: 0.35;
  }
`

/** @deprecated */
export const ElToggleRadioLabel = styled.label`
  cursor: pointer;
  width: fit-content;
  background: var(--white);
  display: flex;
  align-items: center;
  height: 100%;
  border-radius: 1.5rem;
  margin-right: 0.375rem;

  &.${elHasGreyBg} {
    background: var(--purple-050);
  }
`

/** @deprecated */
export const ElToggleRadioWrap = styled.div`
  display: flex;
  border: var(--component-input-border);
  background: var(--white);
  border-radius: 1rem;
  overflow: hidden;
  padding: 0.25rem 0 0.25rem 0.25rem;
  width: fit-content;
  align-items: center;
  height: 2rem;
  position: relative;

  &.${elToggleFullWidth} {
    width: 100%;
  }

  &.${elHasGreyBg} {
    background: var(--purple-050);
    border: 1px solid var(--purple-050);
  }
`
