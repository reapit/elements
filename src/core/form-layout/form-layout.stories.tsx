import preview from '#.storybook/preview'
import { Button } from '#src/core/button'
import { ButtonGroup } from '#src/core/button-group'
import { Divider } from '#src/core/divider'
import { FormLayout } from './form-layout'

const meta = preview.meta({
  title: 'Core/FormLayout',
  component: FormLayout,
  argTypes: {
    children: {
      control: 'radio',
      options: ['Default', 'Header only', 'With footer', 'No header'],
      mapping: {
        Default: (
          <>
            <FormLayout.Header>
              <FormLayout.Title>Contact details</FormLayout.Title>
              <FormLayout.Description>Add the primary contact information for this record.</FormLayout.Description>
            </FormLayout.Header>
            <ExampleContentPlaceholder label="Form fields" />
            <Divider />
            <ExampleContentPlaceholder label="More form fields" />
          </>
        ),
        'Header only': (
          <>
            <FormLayout.Header>
              <FormLayout.Title>Edit property</FormLayout.Title>
              <FormLayout.Description>Update the details for this property listing.</FormLayout.Description>
            </FormLayout.Header>
            <ExampleContentPlaceholder label="Form fields" />
          </>
        ),
        'With footer': (
          <>
            <FormLayout.Header>
              <FormLayout.Title>Create tenancy</FormLayout.Title>
              <FormLayout.Description>
                Complete the details below to set up a new tenancy agreement.
              </FormLayout.Description>
            </FormLayout.Header>
            <ExampleContentPlaceholder label="Tenant details" />
            <Divider />
            <ExampleContentPlaceholder label="Property details" />
            <FormLayout.Footer>
              <ButtonGroup>
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">Create tenancy</Button>
              </ButtonGroup>
            </FormLayout.Footer>
          </>
        ),
        'No header': (
          <>
            <ExampleContentPlaceholder label="Form fields" />
            <FormLayout.Footer>
              <ButtonGroup>
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">Save</Button>
              </ButtonGroup>
            </FormLayout.Footer>
          </>
        ),
      },
    },
  },
})

export const Example = meta.story({
  args: {
    children: 'Default',
  },
})

function ExampleContentPlaceholder({ label }: { label: string }) {
  return (
    <div
      style={{
        background: 'rgba(255, 0, 175, 0.05)',
        border: '1px dashed rgba(255, 0, 175, 0.2)',
        borderRadius: 'var(--border-radius-m)',
        color: '#ff00af',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        width: '100%',
      }}
    >
      {label}
    </div>
  )
}
