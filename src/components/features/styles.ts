import { styled } from '@linaria/react'

interface ElFeaturesProps {
  'data-size'?: '2xs' | 'xs' | 'sm' | 'base'
  'data-wrap'?: 'wrap' | 'nowrap'
}

export const ElFeatures = styled.dl<ElFeaturesProps>`
  all: unset;
  box-sizing: border-box;

  display: inline-flex;
  align-items: center;
  gap: var(--spacing-3);

  &,
  &[data-wrap='wrap'] {
    flex-wrap: wrap;
  }

  &[data-wrap='nowrap'] {
    flex-wrap: nowrap;
  }
`
