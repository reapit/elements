import { ElDialogFooter } from '../footer'
import { font } from '../../text'
import { styled } from '@linaria/react'

export const ElDialogHeader = styled.header`
  position: sticky;
  inset-block-start: 0;

  container-type: scroll-state;
  container-name: dialog-header;

  &:has(~ ${ElDialogFooter}) {
    position: relative;
  }
`

export const ElDialogHeaderContentContainer = styled.div`
  box-sizing: content-box;

  height: var(--size-16);

  display: grid;
  grid-template: 'title close' auto / 1fr auto;
  align-items: center;

  background: var(--fill-white);
  padding-block: 0;

  @container dialog-header scroll-state(stuck: top) {
    border-block-end: var(--border-width-default, 1px) solid var(--colour-border-light_default);
  }

  &,
  :not([data-size='full-screen']) & {
    padding-inline: var(--spacing-6) var(--spacing-3);
  }

  [data-size='full-screen'] & {
    padding-inline: var(--spacing-5) var(--spacing-3);
  }
`

export const ElDialogHeaderAction = styled.div`
  grid-area: close;
  color: var(--text-secondary);
`

export const ElDialogHeaderTitle = styled.h2`
  color: var(--text-primary);
  grid-area: title;

  ${font('xl', 'bold')}

  margin: 0;
  padding: 0;
`
