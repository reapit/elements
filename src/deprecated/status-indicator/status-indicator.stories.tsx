import preview from '#.storybook/preview'
import { DeprecatedStatusIndicator } from '.'

const meta = preview.meta({
  title: 'Deprecated/DeprecatedStatusIndicator',
  component: DeprecatedStatusIndicator,
})

export const BasicUsage = meta.story({
  render: () => (
    <div>
      <DeprecatedStatusIndicator />
      Something is happening
    </div>
  ),

  name: 'Basic usage',
})

export const IntentPrimary = meta.story({
  render: () => (
    <div>
      <DeprecatedStatusIndicator intent="primary" />
      Primary
    </div>
  ),

  name: 'Intent: Primary',
})

export const IntentNeutral = meta.story({
  render: () => (
    <div>
      <DeprecatedStatusIndicator intent="neutral" />
      Neutral
    </div>
  ),

  name: 'Intent: Neutral',
})

export const IntentSuccess = meta.story({
  render: () => (
    <div>
      <DeprecatedStatusIndicator intent="success" />
      Success
    </div>
  ),

  name: 'Intent: Success',
})

export const IntentPending = meta.story({
  render: () => (
    <div>
      <DeprecatedStatusIndicator intent="pending" />
      Pending
    </div>
  ),

  name: 'Intent: Pending',
})

export const IntentWarning = meta.story({
  render: () => (
    <div>
      <DeprecatedStatusIndicator intent="warning" />
      Warning
    </div>
  ),

  name: 'Intent: Warning',
})

export const IntentDanger = meta.story({
  render: () => (
    <div>
      <DeprecatedStatusIndicator intent="danger" />
      Danger
    </div>
  ),

  name: 'Intent: Danger',
})

export const IntentDefault = meta.story({
  render: () => (
    <div>
      <DeprecatedStatusIndicator intent="default" />
      Default
    </div>
  ),

  name: 'Intent: Default',
})
