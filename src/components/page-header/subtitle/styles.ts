import { font } from '../../text'
import { styled } from '@linaria/react'

export const ElPageHeaderSubtitle = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: var(--spacing-2);

  padding-block: var(--spacing-half);
`

export const ElPageHeaderSubtitleText = styled.p`
  display: inline;
  margin: 0;

  color: var(--colour-text-primary);

  ${font('base', 'bold')}
`

export const ElPageHeaderSubtitleAdditionalInfo = styled.p`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: var(--spacing-2);
  margin: 0;
`
