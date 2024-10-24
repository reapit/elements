import { Meta } from '@storybook/react'
import { Button } from './button'
import { ButtonGroup } from '../button-group'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
}

export default meta

export const Default = {
  render: ({}) => <Button>Button</Button>,
}

export const ButtonVariants = {
  render: ({}) => (
    <ButtonGroup>
      <Button isPrimary iconLeft="star" iconRight="star">
        Button
      </Button>
      <Button isSecondary iconLeft="star" iconRight="star">
        Button
      </Button>
      <Button isTertiary iconLeft="star" iconRight="star">
        Button
      </Button>
      <Button isDestructive iconLeft="star" iconRight="star">
        Button
      </Button>
    </ButtonGroup>
  ),
}

export const ButtonBusy = {
  render: ({}) => (
    <ButtonGroup>
      <Button isBusy>Submit</Button>
      <Button isBusy />
    </ButtonGroup>
  ),
}

export const ButtonWithIcon = {
  render: ({}) => (
    <ButtonGroup>
      <Button iconLeft="star" iconRight="star">
        Button
      </Button>
      <Button iconOnly="star" />
    </ButtonGroup>
  ),
}

export const ButtonSize = {
  render: ({}) => (
    <Button size="large" iconLeft="star" iconRight="star">
      Button
    </Button>
  ),
}

// export const ButtonDisabled = {
//   render: ({}) => (
//     <Button iconLeft="star" iconRight="star" disabled aria-disabled="true">
//       Button
//     </Button>
//   ),
// }

export const ButtonDisabled = {
  args: {
    isDisabled: true,
    children: 'Button Text',
  },
}

export const ButtonWithHref = {
  render: ({}) => (
    <Button iconLeft="add" href="./?path=/story/components-button--button-with-href">
      Add Item
    </Button>
  ),
}

export const StandardAttributes = {
  name: 'Standard attributes',

  args: {
    onClick: action('Button was clicked'),
    type: 'submit',
    children: 'Button Text',
    'aria-label': 'Button aria label',
  },
}
