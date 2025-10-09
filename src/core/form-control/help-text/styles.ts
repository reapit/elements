import { font } from '#src/core/text'
import { styled } from '@linaria/react'

export const ElFormControlHelpText = styled.p`
  display: inline-block;
  color: var(--comp-input-colour-text-info-helper);

  font: inherit;

  padding: 0;
  /* Block start margin set here because the parent form control can't reliably use a flex layout. */
  margin: var(--spacing-2) 0 0 0;

  /* By default, we simply inherit from the parent FormControl's font styles. These styles allow for
   * that sizing to be overriden. */
  &[data-size='small'],
  &[data-size='medium'] {
    ${font('xs', 'regular')}
  }
  &[data-size='large'] {
    ${font('sm', 'regular')}
  }
`
