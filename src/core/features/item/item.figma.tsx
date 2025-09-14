import { Features } from '../features'
import figma from '@figma/code-connect'

figma.connect(Features.Item, '<FEATURE_ITEM_URL>', {
  props: {
    icon: figma.instance('Icon'),
    value: figma.string('Value'),
  },
  example: (props) => <Features.Item icon={props.icon} label="replace me" value={props.value} />,
})
