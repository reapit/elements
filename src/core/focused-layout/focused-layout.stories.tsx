import preview from '#.storybook/preview'
import { Button } from '#src/core/button'
import { ButtonGroup } from '#src/core/button-group'
import { Pattern } from '#src/core/drawer/__story__/Pattern'
import { CloseIcon } from '#src/icons/close'
import { MainContainer } from '../main-container'
import { FocusedLayout } from './focused-layout'
import { FocusedLayoutProductLogo } from './product-logo'

const meta = preview.meta({
  title: 'Core/FocusedLayout',
  component: FocusedLayout,
  argTypes: {
    background: {
      control: 'radio',
      options: ['light', 'dark'],
    },
    children: {
      control: 'select',
      options: ['Simple', 'MultiStep', 'ContentOnly'],
      mapping: {
        Simple: [
          <FocusedLayout.TopBar key="top-bar" logo={<FocusedLayoutProductLogo product="Reapit" />} title="Page title">
            <ButtonGroup>
              <Button size="large" variant="secondary">
                Cancel
              </Button>
              <Button size="large" variant="primary">
                Save
              </Button>
            </ButtonGroup>
          </FocusedLayout.TopBar>,
          <FocusedLayout.Content key="content">
            <MainContainer size="wide">
              <Pattern height="100px" />
            </MainContainer>
          </FocusedLayout.Content>,
        ],
        MultiStep: [
          <FocusedLayout.TopBar key="top-bar" logo={<FocusedLayoutProductLogo product="Reapit" />} title="Page title">
            <Button aria-label="Cancel" iconLeft={<CloseIcon />} size="large" variant="tertiary" />
          </FocusedLayout.TopBar>,
          <FocusedLayout.Content key="content">
            <MainContainer size="wide">
              <Pattern height="100px" />
            </MainContainer>
          </FocusedLayout.Content>,
          <FocusedLayout.BottomBar key="bottom-bar">
            <ButtonGroup>
              <Button size="medium" variant="secondary">
                Back
              </Button>
              <Button size="medium" variant="secondary">
                Skip
              </Button>
              <Button size="medium" variant="primary">
                Next
              </Button>
            </ButtonGroup>
          </FocusedLayout.BottomBar>,
        ],
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
})

/**
 * A simple focused layout with a light background. The top bar contains the logo, title, and
 * action buttons on larger breakpoints (MD+). On smaller breakpoints, the action buttons appear
 * in the bottom bar.
 *
 * **Note:** It is up to consumers to show/hide actions across breakpoints.
 */
export const Example = meta.story({
  args: {
    background: 'light',
    children: 'Simple',
  },
})

/**
 * A focused layout with a dark (grey) background. This is suitable for complex content
 * layouts that use cards or other elevated elements.
 */
export const Background = meta.story({
  args: {
    background: 'dark',
    children: 'Simple',
  },
})

/**
 * A multi-step focused layout with navigation buttons. This layout is suitable for wizards
 * or multi-step forms where users need to navigate between steps.
 *
 * On smaller breakpoints (XS/SM), the navigation buttons appear in the bottom bar. On larger
 * breakpoints (MD+), they appear in the top bar.
 *
 * **Note:** Again, it is up to consumers to show/hide actions across breakpoints.
 */
export const MultiStep = Example.extend({
  args: {
    children: 'MultiStep',
  },
})

/**
 * If the content overflows the viewport, the page will scroll. When actions are present in the top bar,
 * it will stick to the top of the viewport. Likewise, if the bottom bar is present with actions, it will
 * stick to the bottom of the viewport.
 *
 * **Note:** Again, it is up to consumers to show/hide actions and the bottom bar across breakpoints.
 */
export const Scrolling = Example.extend({
  args: {
    children: [
      <FocusedLayout.TopBar key="top-bar" logo={<FocusedLayoutProductLogo product="Reapit" />} title="Page title" />,
      <FocusedLayout.Content key="content">
        <MainContainer size="wide">
          <Pattern height="120svh" />
        </MainContainer>
      </FocusedLayout.Content>,
      <FocusedLayout.BottomBar key="bottom-bar">
        <ButtonGroup>
          <Button size="medium" variant="secondary">
            Cancel
          </Button>
          <Button size="medium" variant="primary">
            Save
          </Button>
        </ButtonGroup>
      </FocusedLayout.BottomBar>,
    ],
  },
})
