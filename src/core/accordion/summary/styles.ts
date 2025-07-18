import { font } from '#src/core/text/index'
import { styled } from '@linaria/react'

export const ElAccordionSummary = styled.summary`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: var(--spacing-3);
  width: 100%;

  padding-inline: 0 var(--spacing-2);
  padding-block: var(--spacing-4);

  cursor: pointer;

  color: var(--comp-accordion-colour-text);
  ${font('base', 'medium')}

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }
`

export const ElAccordionSummaryTitle = styled.div`
  flex: 1;
  min-width: 0;
`

export const ElAccordionSummaryRightInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;

  color: var(--comp-accordion-colour-text);
  ${font('xs', 'regular')}
`

export const ElAccordionSummaryIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: var(--icon_size-m);
  height: var(--icon_size-m);

  color: var(--comp-accordion-colour-icon);

  details:open &,
  details[open] & {
    transform: rotate(180deg);
  }
`
