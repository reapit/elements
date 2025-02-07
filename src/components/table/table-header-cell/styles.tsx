import { styled } from '@linaria/react'
interface ITableCellConfiguration {
  width?: string
  minWidth?: string
  maxWidth?: string
}

export const ElTableHeaderCell = styled.th<ITableCellConfiguration>`
  width: ${({ width }) => width || 'auto'};
  minwidth: ${({ minWidth }) => minWidth || 'auto'};
  maxwidth: ${({ maxWidth }) => maxWidth || 'auto'};
  gap: var(--spacing-spacing-1);
  flex: auto;
  align-items: center;
  &[data-alignment='left'] {
    text-align: left;
  }
  &[data-alignment='center'] {
    text-align: center;
  }
  &[data-alignment='right'] {
    text-align: right;
  }
`
export const ElTableHeaderCellContent = styled.div`
  width: 100%;
  padding: var(--spacing-2);
  gap: var(--spacing-spacing-1);
  color: var(--text-secondary);
  font-family: var(--font-family);
  font-size: var(--font-size-2xs);
  font-style: normal;
  font-weight: var(--font-weight-semibold, 600);
  line-height: var(--line-height-2xs);
  letter-spacing: var(--letter-spacing-2xs);
  min-height: 40px;
  flex: 1 0 0;
  justify-content: center;
  display: flex;
  flex-direction: column;
  display: flex;
`
