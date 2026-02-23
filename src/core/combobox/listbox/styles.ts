import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

export const ElComboboxListbox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
`

export const ElComboboxListboxPlaceholder = styled.div`
  box-sizing: border-box;

  display: grid;
  place-items: center;
  place-content: center;
  padding: var(--spacing-4) var(--spacing-2);
  margin: 0;
  height: 100%;

  color: var(--comp-menu-colour-text-placeholder);
  text-align: center;

  &,
  &[data-size='medium'] {
    ${font('sm', 'regular')}
  }

  &[data-size='large'] {
    ${font('base', 'regular')}
  }
`
