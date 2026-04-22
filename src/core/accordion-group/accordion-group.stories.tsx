import preview from '#.storybook/preview'
import { Accordion } from '../accordion'
import { AccordionGroup } from './accordion-group'

const meta = preview.meta({
  title: 'Core/AccordionGroup',
  component: AccordionGroup,
  argTypes: {
    children: {
      control: false,
    },
  },
})

export const Example = meta.story({
  args: {
    children: [
      <Accordion key="1" summary={<Accordion.Summary>Accordion Title</Accordion.Summary>}>
        Content for the first accordion.
      </Accordion>,
      <Accordion key="2" summary={<Accordion.Summary>Accordion Title</Accordion.Summary>}>
        Content for the second accordion.
      </Accordion>,
      <Accordion key="3" summary={<Accordion.Summary>Accordion Title</Accordion.Summary>}>
        Content for the third accordion.
      </Accordion>,
    ],
  },
})
