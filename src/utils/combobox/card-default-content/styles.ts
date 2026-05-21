import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

export const ElComboboxCardDefaultContent = styled.span`
  @layer elements.main {
    display: grid;
    grid: 'label' auto 'additionalInfo' auto / 1fr;
    grid-auto-flow: row;
    grid-auto-rows: auto;
    align-items: center;
    justify-content: start;
    gap: var(--spacing-1);

    padding: 0 0 var(--spacing-half) var(--spacing-half);
  }
`

export const ElComboboxCardDefaultContentLabel = styled.span`
  @layer elements.main {
    grid-area: label;

    /* ComboboxCard sets the font styles */
    font: inherit;
    margin: 0;
    color: var(--comp-input-colour-text-default-input);
  }
`

export const ElComboboxCardDefaultContentAdditionalInfo = styled.span`
  @layer elements.main {
    grid-area: additionalInfo;
    display: contents;

    ${font('xs', 'regular')}
    color: var(--colour-text-secondary);
  }
`
