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
  padding: var(--spacing-2);

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
export const ElTableCellContent = styled.div`
  width: 100%;
  flex: 1;
  display: inline-flex;
  flex-wrap: wrap;
  padding: var(--spacing-2) 0px;
  align-items: center;
  gap: var(--spacing-4);
  overflow: hidden;
  color: var(--colour-text-primary);
  text-overflow: ellipsis;
  font-family: var(--font-sm-regular-family);
  font-size: var(--font-sm-regular-size);
  font-style: normal;
  font-weight: var(--font-sm-regular-weight);
  line-height: var(--font-sm-regular-line_height);
  letter-spacing: var(--font-sm-regular-letter_spacing);
`
