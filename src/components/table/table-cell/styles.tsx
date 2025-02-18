import { styled } from '@linaria/react'
interface TableCellConfiguration {
  width?: string
  minWidth?: string
  maxWidth?: string
}

interface ElTableCellContentConfiguration {
  isFlexWrap?: boolean
}

const getFlexWrap = (isFlexWrap?: boolean): string => {
  return isFlexWrap ? 'wrap' : 'nowrap'
}

export const ElTableCell = styled.td<TableCellConfiguration>`
  width: ${({ width }) => width || 'auto'};
  min-width: ${({ minWidth }) => minWidth || 'auto'};
  max-width: ${({ maxWidth }) => maxWidth || 'auto'};
  gap: var(--spacing-1);
  flex: auto;
  vertical-align: middle;

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
export const ElTableCellContent = styled.div<ElTableCellContentConfiguration>`
  width: 100%;
  padding: var(--spacing-2);
  gap: var(--spacing-1);
  color: var(--text-secondary);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  font-style: normal;
  line-height: var(--line-height-2xs);
  letter-spacing: var(--letter-spacing-2xs);
  min-height: 40px;
  flex: 1;
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
