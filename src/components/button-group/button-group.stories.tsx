import { ButtonGroup } from './button-group'
import { Button } from '../button'
import { Meta } from '@storybook/react-vite'
import { figmaDesignUrls } from '../../storybook/figma'
import { DeprecatedIcon } from '../deprecated-icon'

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
}

export default meta

export const Default = {
  render: ({}) => (
    <ButtonGroup>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
      <Button>Button 4</Button>
      <Button>Button 5</Button>
    </ButtonGroup>
  ),
  parameters: {
    design: {
      type: 'figma',
      url: figmaDesignUrls.buttonGroup,
      allowFullscreen: true,
    },
  },
}

export const WithPrimaryButton = {
  render: ({}) => (
    <ButtonGroup>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
      <Button>Button 4</Button>
      <Button variant="primary">Button 5</Button>
    </ButtonGroup>
  ),
  parameters: {
    design: {
      type: 'figma',
      url: figmaDesignUrls.buttonGroup,
      allowFullscreen: true,
    },
  },
}

export const WithIconOnlyButton = {
  render: ({}) => (
    <ButtonGroup>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
      <Button>Button 4</Button>
      <Button iconLeft={<DeprecatedIcon icon="more" fontSize="1rem" />} />
    </ButtonGroup>
  ),
  parameters: {
    design: {
      type: 'figma',
      url: figmaDesignUrls.buttonGroup,
      allowFullscreen: true,
    },
  },
}
