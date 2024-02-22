import { UseSnackHookStory } from './use-snack-hook.story-component'
import { SnackProvider } from '../../hooks/use-snack'
import { Snack } from './snack'

export default {
  title: 'Snack',
  component: Snack,
}

export const BasicUsage = {
  render: ({}) => <Snack>Message goes here</Snack>,
}

export const WithAnIcon = {
  render: ({}) => <Snack icon="info">Message goes here</Snack>,
  name: 'With an icon',
}

export const IntentPrimary = {
  render: ({}) => (
    <Snack icon="info" intent="primary">
      Primary message goes here
    </Snack>
  ),
  name: 'Intent: Primary',
}

export const IntentNeutral = {
  render: ({}) => (
    <Snack intent="neutral" icon="info">
      Neutral message goes here
    </Snack>
  ),
  name: 'Intent: Neutral',
}

export const IntentSuccess = {
  render: ({}) => (
    <Snack intent="success" icon="statusGood">
      Success message goes here
    </Snack>
  ),
  name: 'Intent: Success',
}

export const IntentPending = {
  render: ({}) => (
    <Snack intent="pending" icon="statusUnknown">
      Pending message goes here
    </Snack>
  ),
  name: 'Intent: Pending',
}

export const IntentWarning = {
  render: ({}) => (
    <Snack intent="warning" icon="warning">
      Warning message goes here
    </Snack>
  ),
  name: 'Intent: Warning',
}

export const IntentDanger = {
  render: ({}) => (
    <Snack intent="danger" icon="warning">
      Danger message goes here
    </Snack>
  ),
  name: 'Intent: Danger',
}

export const IntentDefault = {
  render: ({}) => (
    <Snack intent="default" icon="info">
      Default message goes here
    </Snack>
  ),
  name: 'Intent: Default',
}

export const UseSnackHookExample = {
  render: ({}) => (
    <SnackProvider>
      <UseSnackHookStory />
    </SnackProvider>
  ),

  name: 'useSnack hook example',
}
