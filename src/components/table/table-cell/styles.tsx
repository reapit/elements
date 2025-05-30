import { styled } from '@linaria/react'
import { CSSProperties } from 'react'

interface TableCellCSSProps extends CSSProperties {
  // NOTE: These are public CSS variables that we use to allow CSS-only consumers
  // We do this ourselves instead of leveraging Linaria's dynamic styles because
  // that approach results in randomly-named CSS variables, which would not provide
  // a friendly interface for CSS-only consumers.
  '--tablecell-width'?: string
  '--tablecell-min-width'?: string
  '--tablecell-max-width'?: string
}

interface ElTableCellProps {
  style?: TableCellCSSProps
  'data-alignment': string
}

export const ElTableCell = styled.td<ElTableCellProps>`
  --tablecell-width: auto;
  --tablecell-min-width: auto;
  --tablecell-max-width: 100%;

  width: var(--tablecell-width);
  min-width: var(--tablecell-min-width);
  max-width: var(--tablecell-max-width);
  gap: var(--spacing-1);
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
export const ElTableCellContent = styled.div`
  width: auto;
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
  flex: auto;
  display: inline-flex;
  flex-wrap: wrap;
`
