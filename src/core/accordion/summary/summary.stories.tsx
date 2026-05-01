import preview from '#.storybook/preview'
import { AccordionContext } from '../context'
import { Accordion } from '../accordion'
import { BathIcon } from '#src/icons/bath'
import { Button } from '#src/core/button/button'
import { BedIcon } from '#src/icons/bed'
import { CarIcon } from '#src/icons/car'
import { Features } from '#src/core/features/index'

const meta = preview.meta({
  title: 'Core/Accordion/Summary',
  component: Accordion.Summary,
  argTypes: {
    accessory: {
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
          <Button variant="tertiary" hasNoPadding>
            Clear
          </Button>
        ),
      },
    },
  },
  decorators: [
    (Story) => (
      <AccordionContext.Provider value={{ labelId: 'test-label-id' }}>
        <details>
          <Story />
        </details>
      </AccordionContext.Provider>
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
})

export const Example = meta.story({
  args: {
    children: 'Accordion Title',
    accessory: 'None',
  },
})

/**
 * The `accessory` prop allows for additional summary information to be displayed. For example, the `Features`
 * component can be used to display useful information about the property to which the accordion is related.
 */
export const WithFeatures = Example.extend({
  args: {
    accessory: 'Features',
  },
})

/**
 * The `accessory` prop also allows for an action to be displayed. This is typically used when the accordion
 * represents a filter. The action in this case is typically a clear button that allows the user to clear any
 * currently active filters related to the accordion.
 */
export const WithClearButton = Example.extend({
  args: {
    accessory: 'Clear Button',
  },
})

/**
 * Titles should typically be concise for better scannability, but if they exceed the available space, they will wrap
 * to another line
 */
export const Overflow = Example.extend({
  args: {
    children: 'This is a very long title that wraps to a second line',
  },
  parameters: {
    width: '330px',
  },
})
