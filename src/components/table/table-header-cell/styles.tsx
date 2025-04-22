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
  gap: var(--spacing-1);
  color: var(--text-secondary);
  font-family: var(--font-family);
  font-size: var(--font-size-2xs);
  font-style: normal;
  font-weight: var(--font-weight-semibold, 600);
  line-height: var(--line-height-2xs);
  letter-spacing: var(--letter-spacing-2xs);
  min-height: 40px;
  flex: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`
