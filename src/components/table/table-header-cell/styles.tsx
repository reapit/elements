import { styled } from '@linaria/react'
import { CSSProperties } from 'react'

interface TableHeaderCellCSSProperties extends CSSProperties {
  // NOTE: These are public CSS variables that we use to allow CSS-only consumers
  // We do this ourselves instead of leveraging Linaria's dynamic styles because
  // that approach results in randomly-named CSS variables, which would not provide
  // a friendly interface for CSS-only consumers.
  '--tablecell-header-width'?: string
  '--tablecell-header-min-width'?: string
  '--tablecell-header-max-width'?: string
}

interface ElTableHeaderCellProps {
  style?: TableHeaderCellCSSProperties
}

interface ElTableHeaderCellContentProps {
  'data-alignment': string
}

export const ElTableHeaderCell = styled.th<ElTableHeaderCellProps>`
  --tablecell-header-width: auto;
  --tablecell-header-min-width: auto;
  --tablecell-header-max-width: 100%;

  width: var(--tablecell-header-width);
  min-width: var(--tablecell-header-min-width);
  max-width: var(--tablecell-header-max-width);
  gap: var(--spacing-1);
  vertical-align: middle;
  padding: var(--spacing-2);
`
export const ElTableHeaderCellContent = styled.div<ElTableHeaderCellContentProps>`
  width: auto;
  padding: var(--spacing-2) 0px;
  gap: var(--spacing-1);
  color: var(--text-secondary);
  flex: auto;
  align-items: center;
  flex-wrap: wrap;
  display: flex;
  font-family: var(--font-2xs-bold-family, Inter);
  font-size: var(--font-2xs-bold-size);
  font-style: normal;
  font-weight: var(--font-2xs-bold-weight);
  line-height: var(--font-2xs-bold-line_height);
  letter-spacing: var(--font-2xs-bold-letter_spacing);

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
