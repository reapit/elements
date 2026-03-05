import { useDrawer } from '../use-drawer'
import { DeprecatedDrawer as Drawer, DeprecatedDrawerBg as DrawerBg } from './drawer'
import { Button } from '../../core/button'
import { ButtonGroup } from '../../core/button-group'
import { FormLayout, InputWrapFull, InputWrapHalf } from '../../deprecated/form-layout'
import { InputGroup } from '../input-group'
import { DeprecatedLabel } from '../label'
import { DeprecatedSelect } from '../select'
import { Textarea } from '../../core/textarea'
import { TextBase } from '../typography'

export default {
  title: 'Deprecated/DeprecatedDrawer',
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
            <ButtonGroup>
              <Button onClick={closeDrawer}>Close the Drawer</Button>
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
                <DeprecatedLabel>Under 18?</DeprecatedLabel>
                <DeprecatedSelect>
                  <option>Yes</option>
                  <option>No</option>
                </DeprecatedSelect>
              </InputGroup>
            </InputWrapHalf>
            <InputWrapFull>
              <InputGroup>
                <DeprecatedLabel>Notes</DeprecatedLabel>
                <Textarea fieldSizing="content" />
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
}
