import { styled } from '@linaria/react'
import { CSSProperties } from 'react'

interface ExperimentalTableCellCSSProps extends CSSProperties {
  // NOTE: These are public CSS variables that we use to allow CSS-only consumers
  // We do this ourselves instead of leveraging Linaria's dynamic styles because
  // that approach results in randomly-named CSS variables, which would not provide
  // a friendly interface for CSS-only consumers.
  '--tablecell-width'?: string
  '--tablecell-min-width'?: string
  '--tablecell-max-width'?: string
}

interface ElExperimentalTableCellProps {
  style?: ExperimentalTableCellCSSProps
}

interface ElExperimentalTableCellContentProps {
  'data-alignment': string
}

export const ElExperimentalTableCell = styled.td<ElExperimentalTableCellProps>`
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

export const ElExperimentalAvatarContent = styled.div`
  display: flex;
  padding: var(--spacing-1) 0;
  align-items: center;
  gap: var(--spacing-4);
`

export const ElExperimentalCellContent = styled.div`
  display: inline-flex;
  padding: var(--spacing-2) 0;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--spacing-1);
  flex: 1 0 0;
`

export const ElExperimentalMediaItemContent = styled.div`
  display: flex;
  align-items: flex-start;

  img {
    width: var(--size-12);
    height: var(--size-10);
  }
`

export const ElExperimentalDoubleLineContent = styled.div`
  display: inline-flex;
  padding: var(--spacing-1) 0;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--spacing-1);
`

export const ElExperimentalFirstLine = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  align-self: stretch;
`

export const ElExperimentalSecondLine = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  align-self: stretch;
`

export const ElExperimentalTableCellContent = styled.div<ElExperimentalTableCellContentProps>`
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
    & ${ElExperimentalFirstLine}, ${ElExperimentalSecondLine}, ${ElExperimentalMediaItemContent} {
      text-align: left;
      justify-content: start;
    }
  }
  &[data-alignment='center'] {
    text-align: center;
    justify-content: center;
    & ${ElExperimentalFirstLine}, ${ElExperimentalSecondLine}, ${ElExperimentalMediaItemContent} {
      justify-content: center;
      text-align: center;
    }
  }
  &[data-alignment='right'] {
    text-align: right;
    justify-content: right;
    & ${ElExperimentalFirstLine}, ${ElExperimentalSecondLine}, ${ElExperimentalMediaItemContent} {
      text-align: center;
      justify-content: right;
    }
  }
`
