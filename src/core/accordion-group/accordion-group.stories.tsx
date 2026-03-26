import { Accordion } from '../accordion'
import { AccordionGroup } from './accordion-group'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/AccordionGroup',
  component: AccordionGroup,
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof AccordionGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
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
}
