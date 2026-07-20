import { styled } from '@linaria/react'
import { Loader } from '../../loader'

/** @deprecated */
export const ElSearchableDropdownLabel = styled.label`
  font-size: 0.875rem /* was --font-size-small */;
  color: var(--colour-text-secondary);
`

/** @deprecated */
export const ElSearchableDropdownContainer = styled.div`
  display: flex;
  position: relative;
  flex-grow: 1;
  color: var(--colour-text-primary);
`

/** @deprecated */
export const ElSearchableDropdownResult = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 2rem;
  font-size: 0.875rem /* was --font-size-small */;

  &:hover {
    background-color: var(--colour-fill-action-dark);
    color: var(--colour-text-white);
    cursor: pointer;
  }
`

/** @deprecated */
export const ElSearchableDropdownResultsContainer = styled.div`
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  z-index: 11;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #cccccc;
  border-top: none;
  border-radius: 4px;
  background: var(--colour-fill-white);
  box-shadow: 0 4px 16px 0 rgb(34 43 51 / 0.16);
`

/** @deprecated */
export const ElSearchableDropdownSearchInputAddOn = styled.span`
  position: absolute;
  margin-top: 10px;
  padding-left: 10px;
`

/** @deprecated */
export const ElSearchableDropdownSearchInput = styled.input`
  display: flex;
  flex-grow: 1;
  color: var(--colour-text-primary);
  background: #ffffff /* was --component-input-bg */;
  padding: 0.5rem 0.6875rem;
  padding-left: 32px;
  margin: 0;
  font-family:
    'Inter',
    /* was --font-sans-serif */ Helvetica,
    Arial,
    sans-serif;
  font-size: 0.875rem /* was --font-size-small */;
  border-radius: 0.125rem;
  border: 1px solid #d8dee4 /* was --component-input-border */;
  height: 2.25rem;
  min-width: 0;

  &:focus {
    outline: none;
    border: 1px solid #4e56ea /* was --component-input-border-focus */;
  }

  &::placeholder {
    color: var(--colour-text-placeholder);
    font-family:
      'Inter',
      /* was --font-sans-serif */ Helvetica,
      Arial,
      sans-serif;
    font-size: 0.875rem /* was --font-size-small */;
  }

  &:disabled {
    background-color: var(--colour-fill-neutral-light);
    color: var(--colour-text-secondary);
    cursor: not-allowed;

    &::placeholder {
      color: var(--colour-text-secondary);
    }
  }
`

/** @deprecated */
export const ElSearchableDropdownSearchLabel = styled(ElSearchableDropdownLabel)`
  margin-left: 0.25rem;
  margin-bottom: 0.125rem;
  display: inline-block;
`

/** @deprecated */
export const ElSearchableDropdownSearchLoader = styled(Loader)`
  position: absolute;
  margin-left: -88px;
`
