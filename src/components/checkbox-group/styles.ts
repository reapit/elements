import { styled } from '@linaria/react'

export const ElLegend = styled.legend`
  display: flex;
  align-items: center;
  gap: var(--spacing-1);

  color: var(--text-colour-text-secondary);
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  font-style: normal;
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-xs);
  letter-spacing: var(--letter-spacing-xs);
`

export const ElCheckboxGroup = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  &[aria-orientation='horizontal'] {
    flex-wrap: wrap;
    flex-direction: row;

    .el-checkbox-supplementary-info {
      display: none;
    }
  }
`
