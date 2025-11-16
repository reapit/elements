import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElAtAGlanceCardLink = styled.a`
  ${font('2xl', 'bold')}
  color: var(--colour-text-action);
  text-decoration: none;
  /* Focus styles are provided by ElAtAGlanceCard. */
  outline: none;

  /* Grows the link to fill its ElAtAGlanceCard parent to make the whole card clickable. */
  &::before {
    position: absolute;
    content: '';
    inset: 0;
  }
`
