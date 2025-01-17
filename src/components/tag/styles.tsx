import { styled } from '@linaria/react'

const baseTagStyle = `
  width: fit-content;
  padding: var(--spacing-half) var(--spacing-3);
  border-radius: var(--corner-xl);
  background: var(--fill-default-light);
  color: var(--text-tertiary);
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-xs);
  letter-spacing: var(--letter-spacing-xs);

  display: list-item;
  &::marker {
    content: '';
  }
`

export const ElStandaloneTag = styled.span`
  ${baseTagStyle}
`
export const ElTag = styled.li`
  ${baseTagStyle}
`

export const ElTagGroup = styled.ul`
  display: inline-flex;
  align-items: flex-start;
  gap: var(--spacing-1);
`
