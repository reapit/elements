import { Badge } from './badge'
import figma from '@figma/code-connect'

figma.connect(Badge, '<BADGE_URL>', {
  variant: { Label: true },
  props: {
    children: figma.string('Label text'),
    colour: figma.enum('Style', {
      Neutral: 'neutral',
      Success: 'success',
      Pending: 'pending',
      Warning: 'warning',
      Danger: 'danger',
      Inactive: 'inactive',
      'Accent 1': 'accent_1',
      'Accent 2': 'accent_2',
    }),
    iconLeft: figma.instance('Icon left'),
    iconRight: figma.instance('Icon right'),
    variant: figma.enum('Variant', {
      Default: 'default',
      Reversed: 'reversed',
    }),
  },
  example: ({ children, ...rest }) => <Badge {...rest}>{children}</Badge>,
})

figma.connect(Badge, '<BADGE_URL>', {
  variant: { Label: false },
  props: {
    colour: figma.enum('Style', {
      Neutral: 'neutral',
      Success: 'success',
      Pending: 'pending',
      Warning: 'warning',
      Danger: 'danger',
      Inactive: 'inactive',
      'Accent 1': 'accent_1',
      'Accent 2': 'accent_2',
    }),
    iconLeft: figma.instance('Icon'),
    variant: figma.enum('Variant', {
      Default: 'default',
      Reversed: 'reversed',
    }),
  },
  example: (props) => <Badge aria-label="Label" {...props} />,
})
