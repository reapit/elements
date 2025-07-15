import { css } from '@linaria/core'
import { styled } from '@linaria/react'

/** @deprecated */
export const ElProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 3px;
  background-color: var(--neutral-100);
`

/** @deprecated */
export const ElProgressBarLabel = styled.div`
  font-size: var(--font-size-small);
  flex-shrink: 0;
  margin-top: 0.5rem;
`

/** @deprecated */
export const ElProgressBarInner = styled.div`
  width: 0;
  display: flex;
  transition: width 0.5s linear;
  margin-right: 0.75rem;
`

/** @deprecated */
export const ElProgressBarItem = styled.div`
  width: 100%;
  height: 3px;
  background-color: var(--purple-500);
`

/** @deprecated */
export const elProgressBarLabelRight = css`
  margin-right: auto;
`

/** @deprecated */
export const elProgressBarLabelLeft = css`
  margin-left: auto;
`
