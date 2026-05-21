import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

export const ElTableToolbar = styled.div`
  @layer elements.main {
    display: grid;
    grid-template: 'left-content right-content' 1fr / auto 1fr;
    align-items: center;
    width: 100%;
    height: var(--size-10);

    padding: 0;

    background: var(--colour-fill-white);
  }
`

export const ElTableToolbarLeftContent = styled.div`
  @layer elements.main {
    grid-area: left-content;
    justify-self: start;
    color: var(--colour-text-primary);

    ${font('sm', 'regular')}
    text-align: left;
  }
`

export const ElTableToolbarRightContent = styled.div`
  @layer elements.main {
    grid-area: right-content;
    justify-self: end;
  }
`
