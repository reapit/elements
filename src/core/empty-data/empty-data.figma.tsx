import { EmptyData } from './empty-data'
import figma from '@figma/code-connect'

figma.connect(EmptyData, '<EMPTY_DATA_URL>', {
  variant: { Content: 'Description & Action' },
  props: {
    action: figma.nestedProps('Button', {
      label: figma.string('Label'),
    }),
    description: figma.textContent('Description'),
    secondaryText: figma.enum('Content', {
      'Description & Action': figma.textContent('Secondary text'),
    }),
  },
  example: (props) => (
    <EmptyData>
      <EmptyData.Description secondaryText={props.secondaryText}>{props.description}</EmptyData.Description>
      {/* NOTE: for actions that should act as a button, use EmptyData.ActionButton */}
      <EmptyData.Action href="#replace-me">{props.action.label}</EmptyData.Action>
    </EmptyData>
  ),
})

figma.connect(EmptyData, '<EMPTY_DATA_URL>', {
  variant: { Content: 'Description' },
  props: {
    description: figma.textContent('Description'),
    secondaryText: figma.enum('Content', {
      Description: figma.textContent('Secondary text'),
    }),
  },
  example: (props) => (
    <EmptyData>
      <EmptyData.Description secondaryText={props.secondaryText}>{props.description}</EmptyData.Description>
    </EmptyData>
  ),
})

figma.connect(EmptyData, '<EMPTY_DATA_URL>', {
  variant: { Content: 'Action' },
  props: {
    action: figma.nestedProps('Button', {
      label: figma.string('Label'),
    }),
  },
  example: (props) => (
    <EmptyData>
      {/* NOTE: for actions that should act as a button, use EmptyData.ActionButton */}
      <EmptyData.Action href="#replace-me">{props.action.label}</EmptyData.Action>
    </EmptyData>
  ),
})
