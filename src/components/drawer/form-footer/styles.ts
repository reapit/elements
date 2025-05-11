import { styled } from '@linaria/react'

export const ElDrawerFormFooter = styled.div`
  align-items: center;
  background: var(--fill-white);
  border-top: var(--border-default) solid var(--outline-default);
  display: grid;
  grid-area: footer;
  grid-template-areas: 'supplementary-action primary-actions';
  grid-template-columns: auto auto;
  padding: var(--spacing-3) var(--spacing-7);
  justify-content: space-between;
`

export const ElDrawerFormFooterPrimaryActions = styled.div`
  grid-area: primary-actions;
`

export const ElDrawerFormFooterSupplementaryAction = styled.div`
  grid-area: supplementary-action;
`
