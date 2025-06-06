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

interface ElSingleLineCellProps {
  style?: TableCellCSSProps
}

interface ElTableCellContentProps {
  'data-alignment': string
}

export const ElSingleLineCell = styled.td<ElSingleLineCellProps>`
  --tablecell-width: auto;
  --tablecell-min-width: auto;
  --tablecell-max-width: 100%;

  width: var(--tablecell-width);
  min-width: var(--tablecell-min-width);
  max-width: var(--tablecell-max-width);
  gap: var(--spacing-1);
  padding: var(--spacing-2);
  vertical-align: middle;
`

// export const ElSingleLineCell = styled.div`
// display: flex;
// padding: 0px var(--spacing-2);
// align-items: center;
// flex: 1 0 0;
// gap: var(--spacing-1);
// `

export const ElSingleLineCellContent = styled.div<ElTableCellContentProps>`
  width: auto;
  gap: var(--spacing-1);
  color: var(--text-primary);
  display: flex;
  /* padding: 0px var(--spacing-2); */
  align-items: center;
  gap: var(--spacing-1);
  text-overflow: ellipsis;
  font-family: var(--font-sm-medium-family, Inter);
  font-size: var(--font-sm-medium-size);
  font-style: normal;
  font-weight: var(--font-sm-medium-weight);
  line-height: var(--font-sm-medium-line_height);
  letter-spacing: var(--font-sm-medium-letter_spacing);

  &[data-alignment='left'] {
    text-align: left;
    justify-content: start;
  }
  &[data-alignment='center'] {
    text-align: center;
    justify-content: center;
  }
  &[data-alignment='right'] {
    text-align: right;
    justify-content: right;
  }
`
