import { EmptyState } from './empty-state'
import figma from '@figma/code-connect'

figma.connect(EmptyState, '<EMPTY_STATE_URL>', {
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
    <EmptyState>
      <EmptyState.Description secondaryText={props.secondaryText}>{props.description}</EmptyState.Description>
      {/* NOTE: for actions that should act as a button, use EmptyState.ActionButton */}
      <EmptyState.Action href="#replace-me">{props.action.label}</EmptyState.Action>
    </EmptyState>
  ),
})

figma.connect(EmptyState, '<EMPTY_STATE_URL>', {
  variant: { Content: 'Description' },
  props: {
    description: figma.textContent('Description'),
    secondaryText: figma.enum('Content', {
      Description: figma.textContent('Secondary text'),
    }),
  },
  example: (props) => (
    <EmptyState>
      <EmptyState.Description secondaryText={props.secondaryText}>{props.description}</EmptyState.Description>
    </EmptyState>
  ),
})

figma.connect(EmptyState, '<EMPTY_STATE_URL>', {
  variant: { Content: 'Action' },
  props: {
    action: figma.nestedProps('Button', {
      label: figma.string('Label'),
    }),
  },
  example: (props) => (
    <EmptyState>
      {/* NOTE: for actions that should act as a button, use EmptyState.ActionButton */}
      <EmptyState.Action href="#replace-me">{props.action.label}</EmptyState.Action>
    </EmptyState>
  ),
})
