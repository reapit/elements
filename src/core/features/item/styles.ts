import { styled } from '@linaria/react'
import { font } from '../../text'

export const ElFeaturesItem = styled.div`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: var(--spacing-1);
`

export const ElFeaturesItemIcon = styled.dt`
  display: inline-flex;
  place-items: center;

  color: var(--comp-features-colour-icon);

  width: var(--icon_size-s);
  height: var(--icon_size-s);
`

export const ElFeaturesItemValue = styled.dd`
  margin: 0;

  color: var(--comp-features-colour-text);

  /* NOTE: There may be abbreviations used in the value and we don't want user-agent styles changing their
   * appearance. Hence, we inherit font and ensure there's no text decoration. */
  abbr {
    font: inherit;
    text-decoration: none;
  }

  &,
  [data-size='2xs'] & {
    ${font('2xs', 'regular')}
  }

  [data-size='xs'] & {
    ${font('xs', 'regular')}
  }

  [data-size='sm'] & {
    ${font('sm', 'regular')}
  }

  [data-size='base'] & {
    ${font('base', 'regular')}
  }
`
