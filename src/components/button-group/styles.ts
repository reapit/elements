// import { css } from '@linaria/core'
import { isMobile } from '@/styles/media'
import { styled } from '@linaria/react'

export const ElButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  flex-wrap: wrap;

  ${isMobile} {
    flex-direction: column;
    align-items: stretch;
    & > * {
      margin-left: auto;
      width: 100%;
    }
  }
`
