import { ButtonGroup } from './button-group'
import { DeprecatedButton } from '../deprecated-button'
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
      <DeprecatedButton>Button 1</DeprecatedButton>
      <DeprecatedButton>Button 2</DeprecatedButton>
      <DeprecatedButton>Button 3</DeprecatedButton>
      <DeprecatedButton>Button 4</DeprecatedButton>
      <DeprecatedButton>Button 5</DeprecatedButton>
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
      <DeprecatedButton>Button 1</DeprecatedButton>
      <DeprecatedButton>Button 2</DeprecatedButton>
      <DeprecatedButton>Button 3</DeprecatedButton>
      <DeprecatedButton>Button 4</DeprecatedButton>
      <DeprecatedButton variant="primary">Button 5</DeprecatedButton>
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
      <DeprecatedButton>Button 1</DeprecatedButton>
      <DeprecatedButton>Button 2</DeprecatedButton>
      <DeprecatedButton>Button 3</DeprecatedButton>
      <DeprecatedButton>Button 4</DeprecatedButton>
      <DeprecatedButton iconLeft={<DeprecatedIcon icon="more" fontSize="1rem" />} />
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
