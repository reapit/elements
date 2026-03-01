import { styled } from '@linaria/react'
import { css } from '@linaria/core'

/** @deprecated */
export const ElTabsItem = styled.span`
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 0.75rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid var(--colour-fill-white);
  white-space: nowrap;
  font-size: 0.9375rem /* was --font-size-default */;
  font-weight: 500 /* was --font-weight-medium */;
  color: var(--colour-text-secondary);
`

/** @deprecated */
export const elTabsFullWidth = css`
  width: 100%;
  justify-content: space-evenly;
`

/** @deprecated */
export const elTabsHasNoBorder = css``

/** @deprecated */
export const ElTab = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  margin: 0;
  position: absolute;

  + label ${ElTabsItem} {
    transition: all 0.1s linear;
  }

  &:not(:checked) + label ${ElTabsItem} {
    &:hover {
      color: var(--colour-text-action);
    }
  }

  &:checked + label ${ElTabsItem} {
    color: var(--colour-text-action);
    border-bottom: 2px solid var(--colour-fill-action-dark);
  }
`

/** @deprecated */
export const ElTabsLabel = styled.label`
  cursor: pointer;
  background: var(--colour-fill-white);
  display: flex;
  align-items: center;
  margin: 0 auto;
  height: 100%;

  &:last-child {
    margin-right: 0;
  }
`

/** @deprecated */
export const ElTabsWrap = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--colour-fill-white);
  overflow: hidden;
  width: fit-content;
  align-items: flex-start;
  height: auto;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &.${elTabsFullWidth} {
    width: 100%;
  }
`

/** @deprecated */
export const ElTabsOptionsWrap = styled.div`
  display: flex;
  gap: 1.5rem;
`

/** @deprecated */
export const ElTabsFooter = styled.div`
  width: 100%;
  height: 1.125rem;
  border-top: 1px solid var(--colour-border-neutral-light_default);

  &.${elTabsFullWidth} {
    width: 100%;
  }

  &.${elTabsHasNoBorder} {
    display: none;
  }
`
