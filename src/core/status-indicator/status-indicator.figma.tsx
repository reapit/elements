import figma from '@figma/code-connect'
import { StatusIndicator } from './status-indicator'

figma.connect(StatusIndicator, '<STATUS_INDICATOR_URL>', {
  props: {
    children: figma.string('Label'),
    variant: figma.enum('Style', {
      Neutral: 'neutral',
      Success: 'success',
      Pending: 'pending',
      Warning: 'warning',
      Danger: 'danger',
      Inactive: 'inactive',
      'Accent 1': 'accent_1',
      'Accent 2': 'accent_2',
    }),
  },
  example: (props) => <StatusIndicator variant={props.variant}>{props.children}</StatusIndicator>,
})
