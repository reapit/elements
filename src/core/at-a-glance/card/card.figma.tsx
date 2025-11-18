import { AtAGlanceCard } from './card'
import { AtAGlanceCardContent } from '../card-content'
import { AtAGlanceCardLink } from '../card-link'
import { AtAGlanceCardRadio } from '../card-radio'
import figma from '@figma/code-connect'

figma.connect(AtAGlanceCard, '<AT_A_GLANCE_CARD_URL>', {
  variant: { Variant: 'Simple' },
  props: {
    children: figma.children('*'),
  },
  example: (props) => <AtAGlanceCard>{props.children}</AtAGlanceCard>,
})

figma.connect(AtAGlanceCard, '<AT_A_GLANCE_CARD_URL>', {
  variant: { Variant: 'With link' },
  props: {
    contentProps: figma.nestedProps('AAG card content', {
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
    }),
  },
  example: (props) => (
    <AtAGlanceCard>
      <AtAGlanceCardLink href="<REPLACE ME>">
        <AtAGlanceCardContent
          icon={props.contentProps.icon}
          description={props.contentProps.description}
          label={props.contentProps.label}
          layout={props.contentProps.layout}
          value={props.contentProps.value}
        />
      </AtAGlanceCardLink>
    </AtAGlanceCard>
  ),
})

figma.connect(AtAGlanceCard, '<AT_A_GLANCE_CARD_URL>', {
  variant: { Variant: 'Selectable' },
  props: {
    contentProps: figma.nestedProps('AAG card content', {
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
    }),
  },
  example: (props) => (
    <AtAGlanceCard>
      <AtAGlanceCardRadio name="<REPLACE ME>" value="<REPLACE_ME>">
        <AtAGlanceCardContent
          icon={props.contentProps.icon}
          description={props.contentProps.description}
          label={props.contentProps.label}
          layout={props.contentProps.layout}
          value={props.contentProps.value}
        />
      </AtAGlanceCardRadio>
    </AtAGlanceCard>
  ),
})
