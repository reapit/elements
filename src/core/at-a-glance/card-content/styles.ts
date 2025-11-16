import { styled } from '@linaria/react'
import { font } from '#src/core/text'

interface ElAtAGlanceCardContentProps {
  'data-layout': 'vertical' | 'horizontal' | 'compact'
}

export const ElAtAGlanceCardContent = styled.div<ElAtAGlanceCardContentProps>`
  display: grid;
  align-self: stretch;

  &[data-layout='vertical'] {
    grid:
      'icon' min-content
      'label' min-content
      'description' min-content
      'value' auto / 1fr;

    --aag-icon-padding: 0 0 var(--spacing-2) 0;
    --aag-value-align-self: end;
    --aag-value-padding: var(--spacing-1) 0 0 0;
  }

  &[data-layout='compact'] {
    grid:
      'icon label' min-content
      'icon description' minmax(0, min-content)
      '. value' auto / min-content 1fr auto;

    --aag-icon-padding: 0 var(--spacing-4) 0 0;
    --aag-value-align-self: end;
    --aag-value-padding: var(--spacing-1) 0 0 0;
  }

  &[data-layout='horizontal'] {
    grid:
      'icon label value' min-content
      'icon description value' minmax(0, min-content) / min-content 1fr;
    align-items: center;

    --aag-icon-padding: 0 var(--spacing-4) 0 0;
    --aag-value-align-self: auto;
    --aag-value-padding: 0 0 0 var(--spacing-1);
  }
`

export const ElAtAGlanceCardContentIcon = styled.div`
  grid-area: icon;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--icon_size-l);
  height: var(--icon_size-l);
  padding: var(--aag-icon-padding);
  color: var(--colour-icon-primary);
`

export const ElAtAGlanceCardContentLabel = styled.h1`
  grid-area: label;

  color: var(--colour-text-primary);
  ${font('base', 'medium')}

  margin: 0;
  padding: 0;
`

export const ElAtAGlanceCardContentDescription = styled.p`
  grid-area: description;

  color: var(--colour-text-secondary);
  ${font('sm', 'regular')}

  margin: 0;
  padding: 0;
`

export const ElAtAGlanceCardContentValue = styled.p`
  grid-area: value;
  align-self: var(--aag-value-align-self);

  color: var(--colour-text-primary);
  ${font('2xl', 'bold')}
  white-space: nowrap;

  margin: 0;
  padding: var(--aag-value-padding);
`
