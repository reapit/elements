import figma from '@figma/code-connect'
import { SupplementaryInfo } from './supplementary-info'

figma.connect(SupplementaryInfo.Item, '<SUPPLEMENTARY_INFO_ITEM_BASE_URL>', {
  props: {
    children: figma.textContent('Value'),
    colour: figma.enum('Style', {
      Primary: 'primary',
      Secondary: 'secondary',
      Neutral: 'neutral',
      Success: 'success',
      Pending: 'pending',
      Warning: 'warning',
      Danger: 'danger',
      'Accent 1': 'accent_1',
      'Accent 2': 'accent_2',
    }),
  },
  example: (props) => <SupplementaryInfo.Item colour={props.colour}>{props.children}</SupplementaryInfo.Item>,
})

figma.connect(SupplementaryInfo.Item, '<SUPPLEMENTARY_INFO_ITEM_SM_URL>', {
  props: {
    children: figma.textContent('Value'),
    colour: figma.enum('Style', {
      Primary: 'primary',
      Secondary: 'secondary',
      Neutral: 'neutral',
      Success: 'success',
      Pending: 'pending',
      Warning: 'warning',
      Danger: 'danger',
      'Accent 1': 'accent_1',
      'Accent 2': 'accent_2',
    }),
  },
  example: (props) => <SupplementaryInfo.Item colour={props.colour}>{props.children}</SupplementaryInfo.Item>,
})

figma.connect(SupplementaryInfo.Item, '<SUPPLEMENTARY_INFO_ITEM_XS_URL>', {
  props: {
    children: figma.textContent('Value'),
    colour: figma.enum('Style', {
      Primary: 'primary',
      Secondary: 'secondary',
      Neutral: 'neutral',
      Success: 'success',
      Pending: 'pending',
      Warning: 'warning',
      Danger: 'danger',
      'Accent 1': 'accent_1',
      'Accent 2': 'accent_2',
    }),
  },
  example: (props) => <SupplementaryInfo.Item colour={props.colour}>{props.children}</SupplementaryInfo.Item>,
})
