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
  padding: var(--spacing-2) 0px;

  &[data-alignment='left'] {
    * {
      text-align: left;
      justify-content: flex-start;
    }
  }
  &[data-alignment='center'] {
    * {
      text-align: center;
      justify-content: center;
    }
  }
  &[data-alignment='right'] {
    * {
      text-align: right;
      justify-content: flex-end;
    }
  }
`
