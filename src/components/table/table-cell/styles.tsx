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
}

interface ElTableCellContentProps {
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
  padding: var(--spacing-2);
  vertical-align: middle;
`

export const ElAvatarContent = styled.div`
  display: flex;
  padding: var(--spacing-1) 0px;
  align-items: center;
  gap: var(--spacing-4);
`

export const ElCellContent = styled.div`
  display: inline-flex;
  padding: var(--spacing-2) 0px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--spacing-1);
  flex: 1 0 0;
`

export const ElMediaItemContent = styled.div`
  display: flex;
  align-items: flex-start;

  img {
    width: var(--size-12);
    height: var(--size-10);
  }
`

export const ElDoubleLineContent = styled.div`
  display: inline-flex;
  padding: var(--spacing-1) 0px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--spacing-1);
`

export const ElFirstLine = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  align-self: stretch;
`

export const ElSecondLine = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  align-self: stretch;
`

export const ElTableCellContent = styled.div<ElTableCellContentProps>`
  width: auto;
  gap: var(--spacing-1);
  color: var(--text-primary);
  flex: auto;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
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
    & ${ElFirstLine}, ${ElSecondLine}, ${ElMediaItemContent} {
      text-align: left;
      justify-content: start;
    }
  }
  &[data-alignment='center'] {
    text-align: center;
    justify-content: center;
    & ${ElFirstLine}, ${ElSecondLine}, ${ElMediaItemContent} {
      justify-content: center;
      text-align: center;
    }
  }
  &[data-alignment='right'] {
    text-align: right;
    justify-content: right;
    & ${ElFirstLine}, ${ElSecondLine}, ${ElMediaItemContent} {
      text-align: center;
      justify-content: right;
    }
  }
`
