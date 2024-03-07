import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const ElProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 3px;
  background-color: var(--color-grey-100);
`

export const ElProgressBarLabel = styled.div`
  font-size: var(--font-size-small);
  flex-shrink: 0;
  margin-top: 0.5rem;
`

export const ElProgressBarInner = styled.div`
  width: 0;
  display: flex;
  transition: width 0.5s linear;
  margin-right: 0.75rem;
`

export const ElProgressBarItem = styled.div`
  width: 100%;
  height: 3px;
  background-color: var(--color-purple-500);
`

export const elProgressBarLabelRight = css`
  margin-right: auto;
`

export const elProgressBarLabelLeft = css`
  margin-left: auto;
`
