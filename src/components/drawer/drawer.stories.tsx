import { useDrawer } from '../../hooks/use-drawer'
import { Drawer, DrawerBg } from './index'
import { Button, ButtonGroup } from '../button'
import { FormLayout, InputWrapFull, InputWrapHalf } from '../form-layout'
import { InputGroup } from '../input-group'
import { Label } from '../label'
import { Select } from '../select'
import { TextArea } from '../textarea'
import { TextBase } from '../typography'

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
    const [ExampleDrawer, openDrawer, closeDrawer] = useDrawer('portal-root')

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
                <Label>Under 18?</Label>
                <Select>
                  <option>Yes</option>
                  <option>No</option>
                </Select>
              </InputGroup>
            </InputWrapHalf>
            <InputWrapFull>
              <InputGroup>
                <Label>Notes</Label>
                <TextArea />
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
          <TextBase>Here&apos;s some nice content for the inside of the drawer.</TextBase>
        </ExampleDrawer>
      </>
    )
  },
  name: 'React Usage canDismiss',
}
