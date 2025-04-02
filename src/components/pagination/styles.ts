import { styled } from '@linaria/react'
import { Button } from '../button'

export const ElPagination = styled.nav``

export const ElPaginationList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-6) var(--spacing-none) var(--spacing-2) var(--spacing-none);
  gap: var(--spacing-6);
`

export const ElPaginationItem = styled.li``

export const ElPaginationText = styled.span`
  text-align: center;
  min-width: var(--size-12);

  color: var(--colour-text-primary);
  font-family: var(--font-base-regular-family);
  font-size: var(--font-base-regular-size);
  font-style: normal;
  font-weight: var(--font-base-regular-weight);
  line-height: var(--font-base-regular-line_height);
  letter-spacing: var(--font-base-regular-letter_spacing);
`

export const ElPaginationButton = styled(Button)`
  border-radius: var(--comp-button-border-radius-default);
  &[aria-disabled='true'] {
    background: var(--comp-button-colour-fill-tertiary-disabled);
  }
`
