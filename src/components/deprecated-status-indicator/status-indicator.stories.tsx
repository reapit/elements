import { DeprecatedStatusIndicator } from '.'

export default {
  title: 'Deprecated/DeprecatedStatusIndicator',
  component: DeprecatedStatusIndicator,
}

export const BasicUsage = {
  render: ({}) => (
    <div>
      <DeprecatedStatusIndicator />
      Something is happening
    </div>
  ),

  name: 'Basic usage',
}

export const IntentPrimary = {
  render: ({}) => (
    <div>
      <DeprecatedStatusIndicator intent="primary" />
      Primary
    </div>
  ),

  name: 'Intent: Primary',
}

export const IntentNeutral = {
  render: ({}) => (
    <div>
      <DeprecatedStatusIndicator intent="neutral" />
      Neutral
    </div>
  ),

  name: 'Intent: Neutral',
}

export const IntentSuccess = {
  render: ({}) => (
    <div>
      <DeprecatedStatusIndicator intent="success" />
      Success
    </div>
  ),

  name: 'Intent: Success',
}

export const IntentPending = {
  render: ({}) => (
    <div>
      <DeprecatedStatusIndicator intent="pending" />
      Pending
    </div>
  ),

  name: 'Intent: Pending',
}

export const IntentWarning = {
  render: ({}) => (
    <div>
      <DeprecatedStatusIndicator intent="warning" />
      Warning
    </div>
  ),

  name: 'Intent: Warning',
}

export const IntentDanger = {
  render: ({}) => (
    <div>
      <DeprecatedStatusIndicator intent="danger" />
      Danger
    </div>
  ),

  name: 'Intent: Danger',
}

export const IntentDefault = {
  render: ({}) => (
    <div>
      <DeprecatedStatusIndicator intent="default" />
      Default
    </div>
  ),

  name: 'Intent: Default',
}
