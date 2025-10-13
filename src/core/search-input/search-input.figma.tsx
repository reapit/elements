import figma from '@figma/code-connect'
import { SearchInput } from './search-input'

figma.connect(SearchInput, '<SEARCH_INPUT_URL>', {
  props: {
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    placeholder: figma.string('Placeholder text'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
  },
  example: ({ disabled, placeholder, size }) => (
    <SearchInput disabled={disabled} placeholder={placeholder} size={size} />
  ),
})
