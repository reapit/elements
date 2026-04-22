import preview from '#.storybook/preview'
import { useDrawer } from '../use-drawer'
import { DeprecatedDrawer as Drawer, DeprecatedDrawerBg as DrawerBg } from './drawer'
import { Button } from '../../core/button'
import { ButtonGroup } from '../../core/button-group'
import { TextBase } from '../typography'

const meta = preview.meta({
  title: 'Deprecated/DeprecatedDrawer',
  component: Drawer,
})

export const BasicUsageClosed = meta.story({
  render: () => <DrawerBg />,
  name: 'Basic Usage - Closed',
})

export const ReactUsage = meta.story({
  render: () => {
    const [ExampleDrawer, openDrawer, closeDrawer] = useDrawer('portal-root')

    return (
      <>
        <Button variant="primary" onClick={openDrawer}>
          Open Drawer
        </Button>
        <ExampleDrawer
          title="Demo Drawer Title"
          subtitle="Demo Drawer Subtitle"
          footerItems={
            <ButtonGroup>
              <Button onClick={closeDrawer}>Close the Drawer</Button>
            </ButtonGroup>
          }
        >
          <TextBase>Here&apos;s some nice content for the inside of the drawer.</TextBase>
        </ExampleDrawer>
      </>
    )
  },
})

export const ReactUsageCanDismiss = meta.story({
  render: () => {
    const [ExampleDrawer, openDrawer, closeDrawer] = useDrawer('portal-root')

    return (
      <>
        <Button variant="primary" onClick={openDrawer}>
          Open Drawer
        </Button>
        <ExampleDrawer
          title="Demo Drawer Title"
          subtitle="Demo Drawer Subtitle"
          canDismiss
          footerItems={
            <ButtonGroup>
              <Button onClick={closeDrawer}>Close the Drawer</Button>
            </ButtonGroup>
          }
        >
          <TextBase>Here&apos;s some nice content for the inside of the drawer.</TextBase>
        </ExampleDrawer>
      </>
    )
  },
  name: 'React Usage canDismiss',
})
