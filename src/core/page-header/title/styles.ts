import { font } from '../../text'
import { styled } from '@linaria/react'

export const ElPageHeaderTitle = styled.div`
  display: grid;
  align-items: start;
  gap: var(--spacing-2);
  grid-template: 'content actions' / 1fr auto;

  padding-block: var(--spacing-half);

  background-color: var(--page-header-title-background_colour);

  container-name: page-header-title;
  container-type: inline-size;
`

export const ElPageHeaderTitleContent = styled.div`
  grid-area: content;

  display: flex;
  flex-flow: row wrap;
  gap: var(--spacing-2);

  padding-block: var(--spacing-1);
`

export const ElPageHeaderTitleText = styled.h1`
  display: inline;
  margin: 0;
  color: var(--colour-text-primary);

  ${font('xl', 'bold')}
`

export const ElPageHeaderTitleAdditionalInfo = styled.p`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: var(--spacing-2);
  margin: 0;
`

export const ElPageHeaderTitleActions = styled.div`
  grid-area: actions;

  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  flex-shrink: 0;
`
