import { AtAGlance } from '../at-a-glance'
import figma from '@figma/code-connect'

figma.connect(AtAGlance.ArticleCard, '<AT_A_GLANCE_CARD_URL>', {
  variant: { Variant: 'Simple' },
  props: {
    content: figma.nestedProps('AAG card content', {
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
    }),
  },
  example: (props) => (
    <AtAGlance.GridItem>
      <AtAGlance.ArticleCard
        icon={props.content.icon}
        description={props.content.description}
        displayValue={props.content.displayValue}
        label={props.content.label}
        layout={props.content.layout}
      />
    </AtAGlance.GridItem>
  ),
})
