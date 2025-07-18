import { font } from '#src/core/text/index'
import { styled } from '@linaria/react'

interface ElSecondaryTabProps {
  'aria-current': 'page' | false
}

export const ElSecondaryTab = styled.a<ElSecondaryTabProps>`
  display: inline-flex;
  align-items: center;
  height: var(--size-6);
  width: min-content;

  color: var(--comp-tab-colour-text-secondary-default);

  cursor: pointer;
  text-decoration: none;

  &:focus-visible {
    outline: var(--border-width-double) solid var(--colour-border-focus);
    outline-offset: var(--border-width-default);
  }

  &:hover {
    color: var(--comp-tab-colour-text-secondary-hover);
  }

  &[aria-current='page'] {
    color: var(--comp-tab-colour-text-secondary-selected);
  }
`

export const ElSecondaryTabLabel = styled.span`
  white-space: nowrap;
  ${font('base', 'medium')}

  color: inherit;
`
