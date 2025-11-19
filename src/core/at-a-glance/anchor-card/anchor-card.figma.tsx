import { AtAGlanceAnchorCard } from '../anchor-card'
import figma from '@figma/code-connect'

figma.connect(AtAGlanceAnchorCard, '<AT_A_GLANCE_LINK_CARD_URL>', {
  variant: { Variant: 'With link' },
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
      Vertical: 'vertical',
      Horizontal: 'horizontal',
      Compact: 'compact',
    }),
    displayValue: figma.string('Value'),
  },
  example: (props) => (
    <AtAGlanceAnchorCard
      href="<REPLACE ME>"
      icon={props.icon}
      description={props.description}
      label={props.label}
      layout={props.layout}
      displayValue={props.displayValue}
    />
  ),
})
