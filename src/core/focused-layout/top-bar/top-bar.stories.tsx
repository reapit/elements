import preview from '#.storybook/preview'
import { Button } from '#src/core/button'
import { ButtonGroup } from '#src/core/button-group'
import { Pattern } from '#src/core/drawer/__story__/Pattern'
import { FocusedLayout } from '../focused-layout'
import { FocusedLayoutProductLogo, supportedProductLogos } from '../product-logo'
import { FocusedLayoutTopBar } from './top-bar'

const meta = preview.meta({
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
})

/**
 * Without any actions, the top bar will scroll away with the page content.
 */
export const Example = meta.story({
  args: {
    logo: 'Reapit',
    title: 'Page title',
    children: 'None',
  },
})

/**
 * When the top bar contains some actions, it will stick to the top of the page.
 */
export const Sticky = Example.extend({
  args: {
    children: 'Simple',
  },
})

/**
 * Long titles will wrap within the top bar.
 */
export const Wrapping = meta.story({
  args: {
    logo: 'Reapit',
    title: 'This is a very long page title that will wrap to additional lines when it exceeds the available space',
    children: 'Simple',
  },
})
