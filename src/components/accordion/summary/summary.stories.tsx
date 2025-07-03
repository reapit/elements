import { AccordionLabelIdContext } from '../accordion-label-id-context'
import { AccordionSummary } from './summary'
import { BathIcon } from '#src/icons/bath'
import { DeprecatedButton } from '#src/components/deprecated-button/button'
import { BedIcon } from '#src/icons/bed'
import { CarIcon } from '#src/icons/car'
import { Features } from '#src/components/features'

import type { Meta, StoryObj } from '@storybook/react-vite'

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
          <Features size="xs">
            <Features.Item icon={<BedIcon />} label="Bedrooms" value="3" />
            <Features.Item icon={<BathIcon />} label="Bathrooms" value="2" />
            <Features.Item icon={<CarIcon />} label="Cars" value="2" />
          </Features>
        ),
        Value: '2',
        'Clear Button': (
          <DeprecatedButton variant="tertiary" hasNoPadding>
            Clear
          </DeprecatedButton>
        ),
      },
    },
  },
  decorators: [
    (Story) => (
      <AccordionLabelIdContext.Provider value="test-label-id">
        <details>
          <Story />
        </details>
      </AccordionLabelIdContext.Provider>
    ),
    (Story, { parameters: { width } }) => {
      if (width) {
        return (
          <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width }}>
            <Story />
          </div>
        )
      } else {
        return <Story />
      }
    },
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

/**
 * Titles should typically be concise for better scannability, but if they exceed the available space, they will wrap
 * to another line
 */
export const Overflow: Story = {
  args: {
    ...Example.args,
    children: 'This is a very long title that wraps to a second line',
  },
  parameters: {
    width: '330px',
  },
}
