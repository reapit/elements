import { AccordionLabelIdContext } from '../accordion-label-id-context'
import { AccordionSummary } from './accordion-summary'
import { BathIcon } from '#src/icons/bath'
import { BedIcon } from '#src/icons/bed'
import { CarIcon } from '#src/icons/car'
import { Features } from '#src/components/features'

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '#src/components/button/button'
import { Pattern } from '#src/components/drawer/__story__/Pattern'

const meta = {
  title: 'Components/Accordion/Summary',
  component: AccordionSummary,
  argTypes: {
    rightInfo: {
      control: 'radio',
      options: ['None', 'Features', 'Value', 'Clear Button'],
      mapping: {
        None: undefined,
        Features: (
          <Features>
            <Features.Item icon={<BedIcon />} aria-label="3">
              3
            </Features.Item>
            <Features.Item icon={<BathIcon />} aria-label="3">
              2
            </Features.Item>
            <Features.Item icon={<CarIcon />} aria-label="3">
              2
            </Features.Item>
          </Features>
        ),
        Value: '2',
        'Clear Button': (
          <Button variant="tertiary" hasNoPadding>
            Clear
          </Button>
        ),
      },
    },
  },
  decorators: [
    (Story) => (
      <AccordionLabelIdContext.Provider value="test-label-id">
        <details>
          <Story />
          <Pattern height="100px" />
        </details>
      </AccordionLabelIdContext.Provider>
    ),
  ],
} satisfies Meta<typeof AccordionSummary>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Accordion Title',
    rightInfo: 'None',
  },
}

/**
 * The `rightInfo` prop allows for additional summary information to be displayed. For example, the `Features`
 * component can be used to display useful information about the property to which the accordion is related.
 */
export const WithFeatures: Story = {
  args: {
    ...Example.args,
    rightInfo: 'Features',
  },
}

/**
 * The `rightInfo` prop also allows for an action to be displayed. This is typically used when the accordion
 * represents a filter. The action in this case is typically a clear button that allows the user to clear any
 * currently active filters related to the accordion.
 *
 * **Note:** ⚠️ Our `Button` component does not currently support the Design System's `linkStyle` property, so
 * the visual outcome in this story is not as expected.
 */
export const WithClearButton: Story = {
  args: {
    ...Example.args,
    rightInfo: 'Clear Button',
  },
}
