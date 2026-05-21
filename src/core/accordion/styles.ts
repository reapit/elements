import { styled } from '@linaria/react'

export const ElAccordion = styled.details`
  @layer elements.main {
    border-bottom: var(--comp-accordion-border-width) solid var(--comp-accordion-colour-border);
    width: 100%;
  }
`

export const ElAccordionContent = styled.div`
  @layer elements.main {
    padding-block: 0 var(--spacing-6);
  }
`
