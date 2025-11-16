import { AtAGlanceCardContent } from './card-content'
import figma from '@figma/code-connect'

figma.connect(AtAGlanceCardContent, '<AT_A_GLANCE_CARD_CONTENT_URL>', {
  props: {
    icon: figma.boolean('Show icon', {
      true: figma.instance('Icon'),
      false: undefined,
    }),
    description: figma.boolean('Show description', {
      true: figma.string('Description'),
      false: undefined,
    }),
    label: figma.string('Label'),
    layout: figma.enum('Layout', {
      // TODO: Update these once the Figma component is updated with the name swap.
      Vertical: 'vertical',
      Horizontal: 'compact',
      Compact: 'horizontal',
    }),
    value: figma.string('Value'),
  },
  example: (props) => (
    <AtAGlanceCardContent
      icon={props.icon}
      description={props.description}
      label={props.label}
      layout={props.layout}
      value={props.value}
    />
  ),
})
