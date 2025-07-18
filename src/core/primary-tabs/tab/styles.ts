import { font } from '#src/core/text/index'
import { styled } from '@linaria/react'

interface ElPrimaryTabProps {
  'aria-current': 'page' | false
}

export const ElPrimaryTab = styled.a<ElPrimaryTabProps>`
  display: inline-flex;
  align-items: center;
  height: var(--size-12);
  width: min-content;
  padding-block: var(--spacing-3);

  border-bottom: var(--comp-tab-border-width-primary) solid transparent;
  color: var(--comp-tab-colour-text-primary-default);

  cursor: pointer;
  text-decoration: none;

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }

  &:hover {
    color: var(--comp-tab-colour-text-primary-hover);
    border-bottom-color: var(--comp-tab-colour-border-primary-hover);
  }

  &[aria-current='page'] {
    color: var(--comp-tab-colour-text-primary-selected);
    border-bottom-color: var(--comp-tab-colour-border-primary-selected);
  }
`

export const ElPrimaryTabLabel = styled.span`
  white-space: nowrap;
  ${font('base', 'medium')}

  color: inherit;
`
