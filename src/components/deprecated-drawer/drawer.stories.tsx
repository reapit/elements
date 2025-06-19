import { useDrawer } from '../../hooks/use-drawer'
import { DeprecatedDrawer as Drawer, DeprecatedDrawerBg as DrawerBg } from './drawer'
import { Button, DeprecatedButtonGroup } from '../button'
import { FormLayout, InputWrapFull, InputWrapHalf } from '../form-layout'
import { InputGroup } from '../input-group'
import { DeprecatedLabel } from '../deprecated-label'
import { Select } from '../select'
import { TextArea } from '../textarea'
import { TextBase } from '../typography'

export default {
  title: 'DeprecatedDrawer',
  component: Drawer,
}

export const BasicUsageClosed = {
  render: ({}) => <DrawerBg />,
  name: 'Basic Usage - Closed',
}

export const ReactUsage = {
  render: ({}) => {
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
            <DeprecatedButtonGroup alignment="right">
              <Button onClick={closeDrawer}>Close the Drawer</Button>
            </DeprecatedButtonGroup>
          }
        >
          <TextBase>Here&apos;s some nice content for the inside of the drawer.</TextBase>
        </ExampleDrawer>
      </>
    )
  },
}

export const ReactUsageWithForm = {
  render: ({}) => {
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
            <DeprecatedButtonGroup alignment="right">
              <Button onClick={closeDrawer}>Close the Drawer</Button>
            </DeprecatedButtonGroup>
          }
        >
          <FormLayout>
            <InputWrapHalf>
              <InputGroup label="Forename" name="forename" />
            </InputWrapHalf>
            <InputWrapHalf>
              <InputGroup label="Surname" name="surname" />
            </InputWrapHalf>
            <InputWrapHalf>
              <InputGroup label="Email" name="email" type="email" />
            </InputWrapHalf>
            <InputWrapHalf>
              <InputGroup>
                <DeprecatedLabel>Under 18?</DeprecatedLabel>
                <Select>
                  <option>Yes</option>
                  <option>No</option>
                </Select>
              </InputGroup>
            </InputWrapHalf>
            <InputWrapFull>
              <InputGroup>
                <DeprecatedLabel>Notes</DeprecatedLabel>
                <TextArea fieldSizing="content" />
              </InputGroup>
            </InputWrapFull>
          </FormLayout>
        </ExampleDrawer>
      </>
    )
  },
}

export const ReactUsageCanDismiss = {
  render: ({}) => {
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
            <DeprecatedButtonGroup alignment="right">
              <Button onClick={closeDrawer}>Close the Drawer</Button>
            </DeprecatedButtonGroup>
          }
        >
          <TextBase>Here&apos;s some nice content for the inside of the drawer.</TextBase>
        </ExampleDrawer>
      </>
    )
  },
  name: 'React Usage canDismiss',
}
