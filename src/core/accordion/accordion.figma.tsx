import { Accordion } from './accordion'
import figma from '@figma/code-connect'

figma.connect(Accordion, '<ACCORDION_URL>', {
  props: {
    content: figma.children('Content'),
    open: figma.boolean('Expanded'),
    rightInfo: figma.enum('Variant', {
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
      summary={<Accordion.Summary rightInfo={props.rightInfo}>{props.title}</Accordion.Summary>}
    >
      {props.content}
    </Accordion>
  ),
})
