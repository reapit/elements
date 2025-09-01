import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElLegend = styled.span`
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  color: var(--text-colour-text-secondary);
  ${font('xs', 'regular')}
`

export const ElRadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-2);

  &[data-error='true'] {
    [data-style='error'] {
      color: var(--comp-select-colour-text-info-error);
    }
  }
`

export const ElRadioContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-2);

  &[aria-orientation='horizontal'] {
    flex-flow: row wrap;
    align-items: center;
    gap: var(--spacing-6);

    .el-radio {
      gap: var(--spacing-none) var(--spacing-2);
    }

    .el-radio-supplementary-info {
      display: none;
    }
  }
`
