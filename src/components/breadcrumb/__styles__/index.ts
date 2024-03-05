import { unstyledAnchor } from '../../../styles/unstyled.anchor'
import { styled } from '@linaria/react'

export const ElBreadCrumbItem = styled(unstyledAnchor)`
  border-radius: 0.5rem;
  font-size: var(--font-size-small);
  color: var(--intent-default);
  margin-right: 0.375rem;
`

export const ElBreadCrumbContainer = styled.div`
  display: flex;
  width: 100%;
`
