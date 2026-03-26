import { Accordion } from './accordion'
import figma from '@figma/code-connect'

figma.connect(Accordion, '<ACCORDION_URL>', {
  props: {
    accessory: figma.children('Accordion header'),
    content: figma.slot('Content slot'),
    open: figma.boolean('Expanded'),
  },
  example: (props) => (
    <Accordion open={props.open} summary={props.accessory}>
      {props.content}
    </Accordion>
  ),
})

//
// Deprecated Figma component support.
//

figma.connect(Accordion, '<ACCORDION_URL_DEPRECATED>', {
  props: {
    content: figma.children('Content'),
    open: figma.boolean('Expanded'),
    accessory: figma.enum('Variant', {
      Filters: figma.boolean('With selection', {
        true: figma.children('Button'),
        false: undefined,
      }),
      Standard: figma.boolean('Show right info', {
        true: figma.children('Right info'),
        false: undefined,
      }),
    }),
    title: figma.string('Title'),
  },
  example: (props) => (
    <Accordion
      open={props.open}
      summary={<Accordion.Summary accessory={props.accessory}>{props.title}</Accordion.Summary>}
    >
      {props.content}
    </Accordion>
  ),
})
