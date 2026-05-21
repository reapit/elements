import { ElDialogFooter } from '../footer/styles'
import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

export const ElDialogHeader = styled.header`
  @layer elements.main {
    position: sticky;
    inset-block-start: 0;

    container-type: scroll-state;
    container-name: dialog-header;

    &:has(~ ${ElDialogFooter}) {
      position: relative;
    }
  }
`

export const ElDialogHeaderContentContainer = styled.div`
  @layer elements.main {
    box-sizing: content-box;

    height: var(--size-16);

    display: grid;
    grid-template: 'title close' auto / 1fr auto;
    align-items: center;

    background: var(--colour-fill-white);
    padding-block: 0;

    @container dialog-header scroll-state(stuck: top) {
      border-block-end: var(--border-width-default, 1px) solid var(--colour-border-neutral-light_default);
    }

    &,
    :not([data-size='full-screen']) & {
      padding-inline: var(--spacing-6) var(--spacing-3);
    }

    [data-size='full-screen'] & {
      padding-inline: var(--spacing-5) var(--spacing-3);
    }
  }
`

export const ElDialogHeaderAction = styled.div`
  @layer elements.main {
    grid-area: close;
    color: var(--colour-text-secondary);
  }
`

export const ElDialogHeaderTitle = styled.h2`
  color: var(--colour-text-primary);
  grid-area: title;

  ${font('xl', 'bold')}

  margin: 0;
  padding: 0;
`
