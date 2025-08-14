import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElLegend = styled.legend`
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  color: var(--text-colour-text-secondary);
  ${font('xs', 'regular')}
`

export const ElCheckboxGroup = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-2);
  &[aria-orientation='horizontal'] {
    flex-flow: row wrap;
    .el-checkbox-supplementary-info {
      display: none;
    }
  }
`
