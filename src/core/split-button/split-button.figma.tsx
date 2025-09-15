import figma from '@figma/code-connect'
import { SplitButton } from './split-button'

figma.connect(SplitButton, '<SPLIT_BUTTON_URL>', {
  props: {
    action: figma.children('Main action button'),
    menu: figma.children('Dropdown menu button'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
    }),
  },
  example: (props) => <SplitButton action={props.action} menu={props.menu} size={props.size} variant={props.variant} />,
})
