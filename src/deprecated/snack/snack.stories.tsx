import { UseSnackHookStory } from './use-snack-hook.story-component'
import { SnackProvider } from '../use-snack'
import { Snack } from './snack'
import { InfoIcon } from '#src/icons/info'
import { StatusGoodIcon } from '#src/icons/status-good'
import { StatusUnknownIcon } from '#src/icons/status-unknown'
import { WarningIcon } from '#src/icons/warning'

export default {
  title: 'Deprecated/Snack',
  component: Snack,
}

export const BasicUsage = {
  render: ({}) => <Snack>Message goes here</Snack>,
}

export const WithAnIcon = {
  render: ({}) => <Snack icon={<InfoIcon />}>Message goes here</Snack>,
  name: 'With an icon',
}

export const IntentPrimary = {
  render: ({}) => (
    <Snack icon={<InfoIcon />} intent="primary">
      Primary message goes here
    </Snack>
  ),
  name: 'Intent: Primary',
}

export const IntentNeutral = {
  render: ({}) => (
    <Snack intent="neutral" icon={<InfoIcon />}>
      Neutral message goes here
    </Snack>
  ),
  name: 'Intent: Neutral',
}

export const IntentSuccess = {
  render: ({}) => (
    <Snack intent="success" icon={<StatusGoodIcon />}>
      Success message goes here
    </Snack>
  ),
  name: 'Intent: Success',
}

export const IntentPending = {
  render: ({}) => (
    <Snack intent="pending" icon={<StatusUnknownIcon />}>
      Pending message goes here
    </Snack>
  ),
  name: 'Intent: Pending',
}

export const IntentWarning = {
  render: ({}) => (
    <Snack intent="warning" icon={<WarningIcon />}>
      Warning message goes here
    </Snack>
  ),
  name: 'Intent: Warning',
}

export const IntentDanger = {
  render: ({}) => (
    <Snack intent="danger" icon={<WarningIcon />}>
      Danger message goes here
    </Snack>
  ),
  name: 'Intent: Danger',
}

export const IntentDefault = {
  render: ({}) => (
    <Snack intent="default" icon={<InfoIcon />}>
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
