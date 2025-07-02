import { Accordion } from './accordion'
import { BathIcon } from '#src/icons/bath'
import { BedIcon } from '#src/icons/bed'
import { DeprecatedButton } from '#src/components/deprecated-button/button'
import { CarIcon } from '#src/icons/car'
import { Features } from '#src/components/features'
import { Pattern } from '../drawer/__story__/Pattern'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    children: {
      control: false,
    },
    summary: {
      control: 'select',
      options: ['Basic', 'With Features', 'With Clear Button'],
      mapping: {
        Basic: <Accordion.Summary>Accordion Title</Accordion.Summary>,
        'With Features': (
          <Accordion.Summary
            rightInfo={
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
            }
          >
            Accordion Title
          </Accordion.Summary>
        ),
        'With Clear Button': (
          <Accordion.Summary
            rightInfo={
              <DeprecatedButton variant="tertiary" hasNoPadding>
                Clear
              </DeprecatedButton>
            }
          >
            Accordion Title
          </Accordion.Summary>
        ),
      },
    },
  },
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: <Pattern height="100px" />,
    open: false,
    summary: 'Basic',
  },
}

/**
 * Use of the `open` prop does not result in the accordion's open state being controlled in the same way as controlled
 * inputs. This is because clicking the accordion's summary element will, by default, remove the `open` attribute
 * directly in the DOM.
 *
 * If you need to control the open state of the accordion, you will need to handle click events on the accordion's
 * summary element and update the stateful value wired up to the `open` prop accordingly.
 */
export const InitiallyOpen: Story = {
  args: {
    ...Example.args,
    open: true,
  },
}

/**
 * Accordions are block-level elements, so multiple accordions will simply stack on top of each other. By default,
 * users should be able to open as many accordions as they want.
 */
export const Group: Story = {
  args: {
    ...Example.args,
  },
  render: (args) => (
    <>
      <Accordion {...args} summary={<Accordion.Summary>Accordion 1</Accordion.Summary>}>
        <Pattern height="100px" />
      </Accordion>
      <Accordion {...args} summary={<Accordion.Summary>Accordion 2</Accordion.Summary>}>
        <Pattern height="100px" />
      </Accordion>
      <Accordion {...args} summary={<Accordion.Summary>Accordion 3</Accordion.Summary>}>
        <Pattern height="100px" />
      </Accordion>
    </>
  ),
}
