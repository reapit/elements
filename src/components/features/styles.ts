import { styled } from '@linaria/react'
import { ElDeprecatedIcon } from '../deprecated-icon'

export const ElFeaturesItemIcon = styled.span`
  color: var(--icon-primary);
  width: var(--icon-sm);
  height: var(--icon-sm);
  font-size: var(--size-4);
`

export const ElFeaturesItem = styled.li`
  display: inline-flex;
  align-items: flex-start;
  gap: var(--spacing-1);

  color: var(--text-primary);
  font-family: var(--font-family);
  font-size: var(--font-size-2xs);
  font-style: normal;
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-2xs);
  letter-spacing: var(--letter-spacing-2xs);

  ${ElDeprecatedIcon} {
    font-size: inherit;
  }
`

export const ElFeatures = styled.ul`
  display: inline-flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  flex-wrap: wrap;
`
