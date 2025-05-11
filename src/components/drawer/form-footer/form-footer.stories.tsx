import { Button } from '../../button'
import { ButtonGroup } from '../../button-group'
import DrawerFormFooter from './form-footer'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Drawer/FormFooter',
  component: DrawerFormFooter,
  argTypes: {
    children: {
      control: false,
    },
    supplementaryAction: {
      control: 'radio',
      mapping: {
        Delete: 'Delete',
        None: null,
      },
      options: ['Delete', 'None'],
    },
  },
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
} satisfies Meta<typeof DrawerFormFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: (
      <ButtonGroup>
        <form>
          <Button formMethod="dialog" type="submit">
            Cancel
          </Button>
        </form>
        <Button variant="primary">Add</Button>
      </ButtonGroup>
    ),
    supplementaryAction: 'Delete',
  },
}
