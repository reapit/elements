import { Button } from '#src/core/button'
import { ButtonGroup } from '#src/core/button-group'
import { Pattern } from '#src/core/drawer/__story__/Pattern'
import { FocusedLayout } from '../focused-layout'
import { FocusedLayoutProductLogo, supportedProductLogos } from '../product-logo'
import { FocusedLayoutTopBar } from './top-bar'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/FocusedLayout/TopBar',
  component: FocusedLayoutTopBar,
  argTypes: {
    title: {
      control: 'text',
    },
    logo: {
      control: 'select',
      options: ['None', ...supportedProductLogos],
      mapping: {
        None: undefined,
        ...Object.fromEntries(
          supportedProductLogos.map((product) => [
            product,
            <FocusedLayoutProductLogo key={product} product={product} />,
          ]),
        ),
      },
    },
    children: {
      control: 'select',
      options: ['Simple', 'MultiStep', 'None'],
      mapping: {
        Simple: (
          <ButtonGroup>
            <Button size="large" variant="secondary">
              Cancel
            </Button>
            <Button size="large" variant="primary">
              Save
            </Button>
          </ButtonGroup>
        ),
        MultiStep: (
          <ButtonGroup>
            <Button size="large" variant="secondary">
              Cancel
            </Button>
            <Button size="large" variant="secondary">
              Back
            </Button>
            <Button size="large" variant="secondary">
              Skip
            </Button>
            <Button size="large" variant="primary">
              Next
            </Button>
          </ButtonGroup>
        ),
        None: undefined,
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <FocusedLayout>
        <Story />
        <FocusedLayout.Content>
          <Pattern />
        </FocusedLayout.Content>
      </FocusedLayout>
    ),
  ],
} satisfies Meta<typeof FocusedLayoutTopBar>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Without any actions, the top bar will scroll away with the page content.
 */
export const Example: Story = {
  args: {
    logo: 'Reapit',
    title: 'Page title',
    children: 'None',
  },
}

/**
 * When the top bar contains some actions, it will stick to the top of the page.
 */
export const Sticky: Story = {
  args: {
    ...Example.args,
    children: 'Simple',
  },
}

/**
 * Long titles will wrap within the top bar.
 */
export const Wrapping: Story = {
  args: {
    logo: 'Reapit',
    title: 'This is a very long page title that will wrap to additional lines when it exceeds the available space',
    children: 'Simple',
  },
}
