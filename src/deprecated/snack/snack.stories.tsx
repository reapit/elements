import preview from '#.storybook/preview'
import { UseSnackHookStory } from './use-snack-hook.story-component'
import { SnackProvider } from '../use-snack'
import { Snack } from './snack'
import { InfoIcon } from '#src/icons/info'
import { StatusGoodIcon } from '#src/icons/status-good'
import { StatusUnknownIcon } from '#src/icons/status-unknown'
import { WarningIcon } from '#src/icons/warning'

const meta = preview.meta({
  title: 'Deprecated/Snack',
  component: Snack,
})

export default meta

export const BasicUsage = meta.story({
  render: () => <Snack>Message goes here</Snack>,
})

export const WithAnIcon = meta.story({
  render: () => <Snack icon={<InfoIcon />}>Message goes here</Snack>,
  name: 'With an icon',
})

export const IntentPrimary = meta.story({
  render: () => (
    <Snack icon={<InfoIcon />} intent="primary">
      Primary message goes here
    </Snack>
  ),
  name: 'Intent: Primary',
})

export const IntentNeutral = meta.story({
  render: () => (
    <Snack intent="neutral" icon={<InfoIcon />}>
      Neutral message goes here
    </Snack>
  ),
  name: 'Intent: Neutral',
})

export const IntentSuccess = meta.story({
  render: () => (
    <Snack intent="success" icon={<StatusGoodIcon />}>
      Success message goes here
    </Snack>
  ),
  name: 'Intent: Success',
})

export const IntentPending = meta.story({
  render: () => (
    <Snack intent="pending" icon={<StatusUnknownIcon />}>
      Pending message goes here
    </Snack>
  ),
  name: 'Intent: Pending',
})

export const IntentWarning = meta.story({
  render: () => (
    <Snack intent="warning" icon={<WarningIcon />}>
      Warning message goes here
    </Snack>
  ),
  name: 'Intent: Warning',
})

export const IntentDanger = meta.story({
  render: () => (
    <Snack intent="danger" icon={<WarningIcon />}>
      Danger message goes here
    </Snack>
  ),
  name: 'Intent: Danger',
})

export const IntentDefault = meta.story({
  render: () => (
    <Snack intent="default" icon={<InfoIcon />}>
      Default message goes here
    </Snack>
  ),
  name: 'Intent: Default',
})

export const UseSnackHookExample = meta.story({
  render: () => (
    <SnackProvider>
      <UseSnackHookStory />
    </SnackProvider>
  ),
  name: 'useSnack hook example',
})
