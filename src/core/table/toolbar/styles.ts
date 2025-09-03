import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElTableToolbar = styled.div`
  display: grid;
  grid-template: 'left-content right-content' 1fr / auto 1fr;
  align-items: center;
  width: 100%;
  height: var(--size-10);

  padding: 0;

  background: var(--fill-white);
`

export const ElTableToolbarLeftContent = styled.div`
  grid-area: left-content;
  justify-self: start;
  color: var(--colour-text-primary);

  ${font('sm', 'regular')}
  text-align: left;
`

export const ElTableToolbarRightContent = styled.div`
  grid-area: right-content;
  justify-self: end;
`
