// import { font } from '#src/core/text/index'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { LabelText } from '#src/core/label-text'

export const ElSelectCustom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-2);
  align-self: stretch;
`
export const elInputField = css`
  display: flex;
  height: var(--size-8);
  padding: var(--spacing-2);
  align-items: center;
  gap: var(--spacing-2);
  align-self: stretch;
  border-radius: var(--comp-input-border-radius);
  border: var(--comp-input-border-width) solid var(--comp-input-colour-border-default);
  background: var(--comp-input-colour-fill-default-background);
`

export const ElContent = styled(LabelText)`
  display: flex;
  padding: var(--spacing-none);
  align-items: center;
  gap: var(--spacing-none);
  flex: 1 0 0;
  &[data-variant='soft'] {
    color: var(--comp-input-colour-text-focused-input);
  }
`

export const elPopover = css`
  padding: var(--spacing-2) var(--spacing-none);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-1);

  border-radius: var(--comp-menu-border-radius);
  background: var(--comp-menu-colour-fill-background);
  /* elevation-xl */
  box-shadow: 0 var(--size-1) var(--size-4) 0 rgba(34, 43, 51, 0.16);

  [role='listbox'] {
    display: flex;
    padding: 0 var(--spacing-2);
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`

export const elGroupTitle = css`
  display: flex;
  padding: var(--spacing-2) var(--spacing-3);
  align-items: center;
  align-self: stretch;
`

export const ElOption = styled.li<{ focused: boolean; selected: boolean }>`
  display: flex;
  padding: var(--spacing-2) var(--spacing-3);
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--spacing-half);
  align-self: stretch;
`

export const elOptionLabel = css`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  align-self: stretch;

  &[data-variant='soft'] {
    color: var(--comp-menu-colour-text-default-primary);
  }
`
