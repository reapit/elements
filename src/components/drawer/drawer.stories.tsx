import { useDrawer } from '../../hooks/use-drawer'
import { Drawer, DrawerBg } from './index'
import { Button, ButtonGroup } from '../button'
import { BodyText } from '../typography'

export default {
  title: 'Drawer',
  component: Drawer,
}

export const BasicUsageClosed = {
  render: ({}) => <DrawerBg />,
  name: 'Basic Usage - Closed',
}

export const ReactUsage = {
  render: ({}) => {
    const [ExampleDrawer, openDrawer, closeDrawer] = useDrawer('storybook-docs')

    return (
      <>
        <Button intent="primary" onClick={openDrawer}>
          Open Drawer
        </Button>
        <ExampleDrawer
          title="Demo Drawer Title"
          subtitle="Demo Drawer Subtitle"
          footerItems={
            <ButtonGroup alignment="right">
              <Button intent="default" onClick={closeDrawer}>
                Close the Drawer
              </Button>
            </ButtonGroup>
          }
        >
          <BodyText>Here&apos;s some nice content for the inside of the drawer.</BodyText>
        </ExampleDrawer>
      </>
    )
  },
}

export const ReactUsageCanDismiss = {
  render: ({}) => {
    const [ExampleDrawer, openDrawer, closeDrawer] = useDrawer('storybook-docs')

    return (
      <>
        <Button intent="primary" onClick={openDrawer}>
          Open Drawer
        </Button>
        <ExampleDrawer
          title="Demo Drawer Title"
          subtitle="Demo Drawer Subtitle"
          canDismiss
          footerItems={
            <ButtonGroup alignment="right">
              <Button intent="default" onClick={closeDrawer}>
                Close the Drawer
              </Button>
            </ButtonGroup>
          }
        >
          <BodyText>Here&apos;s some nice content for the inside of the drawer.</BodyText>
        </ExampleDrawer>
      </>
    )
  },
  name: 'React Usage canDismiss',
}
