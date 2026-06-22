import preview from '#.storybook/preview'
import { PageLayout } from './page-layout'
import { TopBarPlaceholder, SideBarPlaceholder, BodyPlaceholder, BottomBarPlaceholder } from './__story__/placeholders'

const meta = preview.meta({
  title: 'Containers and layout/PageLayout',
  component: PageLayout,
  argTypes: {
    backgroundColour: {
      control: 'select',
      options: ['--colour-fill-white', '--colour-fill-neutral-lightest'],
    },
    children: {
      control: 'select',
      options: ['Simple', 'SideBar', 'Mobile'],
      mapping: {
        Simple: [
          <PageLayout.TopBarRegion key="top-bar">
            <TopBarPlaceholder />
          </PageLayout.TopBarRegion>,
          <PageLayout.BodyRegion key="body">
            <BodyPlaceholder />
          </PageLayout.BodyRegion>,
        ],
        SideBar: [
          <PageLayout.TopBarRegion key="top-bar">
            <TopBarPlaceholder />
          </PageLayout.TopBarRegion>,
          <PageLayout.SideBarRegion key="side-bar">
            <SideBarPlaceholder />
          </PageLayout.SideBarRegion>,
          <PageLayout.BodyRegion key="body">
            <BodyPlaceholder />
          </PageLayout.BodyRegion>,
        ],
        Mobile: [
          <PageLayout.BodyRegion key="body">
            <BodyPlaceholder />
          </PageLayout.BodyRegion>,
          <PageLayout.BottomBarRegion key="bottom-bar">
            <BottomBarPlaceholder />
          </PageLayout.BottomBarRegion>,
        ],
      },
    },
    scroll: {
      control: 'select',
      options: ['self', 'body'],
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
})

/**
 * A simple, common layout uses the top bar and body regions. Navigation within the app is
 * handled by the top bar's main and secondary navigation areas.
 */
export const Example = meta.story({
  args: {
    backgroundColour: '--colour-fill-white',
    children: 'Simple',
    id: 'my-app-layout',
    scroll: 'body',
  },
})

/**
 * A more complex layout uses the top bar, side bar and body regions. The side bar provides the main
 * navigation items on the LG breakpoint and above. The side bar should not be used on smaller breakpoints.
 * Instead, it's navigation items should be handled by the top bar.
 */
export const SideBar = Example.extend({
  args: {
    children: 'SideBar',
  },
})

/**
 * On mobile devices, the bottom bar can be used in place of the top bar. In this case, the root
 * app layout element can scroll, allowing the bottom bar to extend or retract as the page is scrolled.
 *
 * **Note:** The bottom bar is only displayed on XS breakpoints, so this story is best viewed directly
 * or with a narrow viewport.
 */
export const Mobile = Example.extend({
  args: {
    children: 'Mobile',
    scroll: 'self',
  },
  globals: {
    viewport: { value: 'XS' },
  },
})

/**
 * When the content of the body region flows beyond the viewport, either the root element of the page
 * layout or the body region itself can scroll. This is controlled using the `scroll` prop.
 *
 * In this example, the root element of the page layout is configured to scroll, which results in the
 * top bar region scrolling out of view.
 */
export const Scroll = Example.extend({
  args: {
    scroll: 'self',
  },
})

/**
 * The background colour of all regions can be set using the `backgroundColour` prop. This will
 * typically be `--colour-fill-white` or `--colour-fill-neutral-lightest`.
 */
export const BackgroundColour = SideBar.extend({
  args: {
    backgroundColour: '--colour-fill-neutral-lightest',
  },
})
