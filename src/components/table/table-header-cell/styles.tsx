import { styled } from '@linaria/react'
interface TableCellProps {
  width?: string
  minWidth?: string
  maxWidth?: string
}

interface TableHeaderCellContentProps {
  isFlexWrap?: boolean
}

const getFlexWrap = (isFlexWrap?: boolean): string => {
  return isFlexWrap ? 'wrap' : 'nowrap'
}

export const ElTableHeaderCell = styled.th<TableCellProps>`
  width: ${({ width }) => width || 'auto'};
  min-width: ${({ minWidth }) => minWidth || 'auto'};
  max-width: ${({ maxWidth }) => maxWidth || 'auto'};
  gap: var(--spacing-1);
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
export const ElTableHeaderCellContent = styled.div<TableHeaderCellContentProps>`
  width: 100%;
  padding: var(--spacing-2);
  gap: var(--spacing-1);
  color: var(--text-secondary);
  font-family: var(--font-family);
  font-size: var(--font-size-2xs);
  font-style: normal;
  font-weight: var(--font-weight-semibold, 600);
  line-height: var(--line-height-2xs);
  letter-spacing: var(--letter-spacing-2xs);
  min-height: 40px;
  flex: 1 0 0;
  display: flex;
  flex-wrap: ${({ isFlexWrap }) => getFlexWrap(isFlexWrap)};

  &[data-flex-direction='column'] {
    flex-direction: column;
    justify-content: center;
  }

  &[data-flex-direction='row'] {
    flex-direction: row;
  }
`
