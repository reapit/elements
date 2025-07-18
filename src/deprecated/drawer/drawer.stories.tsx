import { useDrawer } from '../use-drawer'
import { DeprecatedDrawer as Drawer, DeprecatedDrawerBg as DrawerBg } from './drawer'
import { DeprecatedButton, DeprecatedButtonGroup } from '../button'
import { FormLayout, InputWrapFull, InputWrapHalf } from '../../deprecated/form-layout'
import { InputGroup } from '../input-group'
import { DeprecatedLabel } from '../label'
import { Select } from '../select'
import { TextArea } from '../../core/textarea'
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
        <DeprecatedButton variant="primary" onClick={openDrawer}>
          Open Drawer
        </DeprecatedButton>
        <ExampleDrawer
          title="Demo Drawer Title"
          subtitle="Demo Drawer Subtitle"
          footerItems={
            <DeprecatedButtonGroup alignment="right">
              <DeprecatedButton onClick={closeDrawer}>Close the Drawer</DeprecatedButton>
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
        <DeprecatedButton variant="primary" onClick={openDrawer}>
          Open Drawer
        </DeprecatedButton>
        <ExampleDrawer
          title="Demo Drawer Title"
          subtitle="Demo Drawer Subtitle"
          footerItems={
            <DeprecatedButtonGroup alignment="right">
              <DeprecatedButton onClick={closeDrawer}>Close the Drawer</DeprecatedButton>
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
        <DeprecatedButton variant="primary" onClick={openDrawer}>
          Open Drawer
        </DeprecatedButton>
        <ExampleDrawer
          title="Demo Drawer Title"
          subtitle="Demo Drawer Subtitle"
          canDismiss
          footerItems={
            <DeprecatedButtonGroup alignment="right">
              <DeprecatedButton onClick={closeDrawer}>Close the Drawer</DeprecatedButton>
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
