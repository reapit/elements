import { AccordionGroup } from './accordion-group'
import figma from '@figma/code-connect'

figma.connect(AccordionGroup, '<ACCORDION_GROUP_URL>', {
  props: {
    children: figma.slot('Accordion list'),
  },
  example: (props) => <AccordionGroup>{props.children}</AccordionGroup>,
})
