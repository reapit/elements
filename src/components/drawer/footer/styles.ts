import { DRAWER_WIDTH_MD_2XL } from '../constants'
import { styled } from '@linaria/react'

export const ElDrawerFooter = styled.div`
  position: sticky;
  inset-block-end: 0;

  display: grid;
  grid-area: footer;
  grid-template-areas: 'supplementary-action primary-actions';
  grid-template-columns: auto max-content;
  align-items: center;
  justify-content: space-between;

  background: var(--colour-fill-white);
  border-block-start: var(--border-width-default, 1px) solid var(--colour-border-light_default);

  /* XS-SM container size */
  padding: var(--spacing-3) var(--spacing-6);

  @container (width >= ${DRAWER_WIDTH_MD_2XL}) {
    padding: var(--spacing-3) var(--spacing-8);
  }
`

export const ElDrawerFooterPrimaryActions = styled.div`
  grid-area: primary-actions;
`

export const ElDrawerFooterSupplementaryAction = styled.div`
  grid-area: supplementary-action;
`
