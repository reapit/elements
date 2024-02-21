import { StatusIndicator } from '.'

export default {
  title: 'StatusIndicator',
  component: StatusIndicator,
}

export const BasicUsage = {
  render: () => (
    <div>
      <StatusIndicator />
      Something is happening
    </div>
  ),

  name: 'Basic usage',
}

export const IntentPrimary = {
  render: () => (
    <div>
      <StatusIndicator intent="primary" />
      Primary
    </div>
  ),

  name: 'Intent: Primary',
}

export const IntentNeutral = {
  render: () => (
    <div>
      <StatusIndicator intent="neutral" />
      Neutral
    </div>
  ),

  name: 'Intent: Neutral',
}

export const IntentSuccess = {
  render: () => (
    <div>
      <StatusIndicator intent="success" />
      Success
    </div>
  ),

  name: 'Intent: Success',
}

export const IntentPending = {
  render: () => (
    <div>
      <StatusIndicator intent="pending" />
      Pending
    </div>
  ),

  name: 'Intent: Pending',
}

export const IntentWarning = {
  render: () => (
    <div>
      <StatusIndicator intent="warning" />
      Warning
    </div>
  ),

  name: 'Intent: Warning',
}

export const IntentDanger = {
  render: () => (
    <div>
      <StatusIndicator intent="danger" />
      Danger
    </div>
  ),

  name: 'Intent: Danger',
}

export const IntentDefault = {
  render: () => (
    <div>
      <StatusIndicator intent="default" />
      Default
    </div>
  ),

  name: 'Intent: Default',
}
