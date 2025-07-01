import { useState } from 'react'
import { PersistentNotification } from './index'

export default {
  title: 'Deprecated/PersistentNotification',
  component: PersistentNotification,
}

export const FullReactExampleFixedPosition = {
  render: ({}) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
      <>
        <PersistentNotification isExpanded={isExpanded} onExpansionToggle={setIsExpanded} isFixed>
          Here is a persistent notification. Here is more content. Here is more content. Here is more content. Here is
          more content. Here is more content.
        </PersistentNotification>
      </>
    )
  },

  name: 'Full React example (fixed position)',
}

export const DefaultUsageInline = {
  render: ({}) => (
    <PersistentNotification isExpanded isInline>
      Here is a persistent notification
    </PersistentNotification>
  ),
}

export const WithADifferentIcon = {
  render: ({}) => (
    <PersistentNotification isExpanded isInline icon="warning" intent="warning">
      Here&apos;s some infomation about the thing you should be warned about, so bad things don&apos;t happen.
    </PersistentNotification>
  ),
  name: 'With a different icon',
}

export const InlineNotifcationIntentPrimary = {
  render: ({}) => (
    <PersistentNotification isExpanded intent="primary" isInline isFullWidth>
      Here&apos;s an inline full width notification with a primary intent.
    </PersistentNotification>
  ),
  name: 'Inline notifcation, intent: primary',
}

export const InlineNotifcationIntentNeutral = {
  render: ({}) => (
    <PersistentNotification isExpanded intent="neutral" isInline isFullWidth>
      Here&apos;s an inline full width notification with a neutral intent.
    </PersistentNotification>
  ),
  name: 'Inline notifcation, intent: neutral',
}

export const InlineNotifcationIntentSuccess = {
  render: ({}) => (
    <PersistentNotification isExpanded intent="success" isInline isFullWidth>
      Here&apos;s an inline full width notification with a success intent.
    </PersistentNotification>
  ),
  name: 'Inline notifcation, intent: success',
}

export const InlineNotifcationIntentPending = {
  render: ({}) => (
    <PersistentNotification isExpanded intent="pending" isInline isFullWidth>
      Here&apos;s an inline full width notification with a pending intent.
    </PersistentNotification>
  ),
  name: 'Inline notifcation, intent: pending',
}

export const InlineNotifcationIntentWarning = {
  render: ({}) => (
    <PersistentNotification isExpanded intent="warning" isInline isFullWidth>
      Here&apos;s an inline full width notification with a warning intent.
    </PersistentNotification>
  ),
  name: 'Inline notifcation, intent: warning',
}

export const InlineNotifcationIntentDanger = {
  render: ({}) => (
    <PersistentNotification isExpanded intent="danger" isInline isFullWidth>
      Here&apos;s an inline full width notification with a danger intent.
    </PersistentNotification>
  ),
  name: 'Inline notifcation, intent: danger',
}

export const InlineNotifcationIntentDefault = {
  render: ({}) => (
    <PersistentNotification isExpanded intent="default" isInline isFullWidth>
      Here&apos;s an inline full width notification with a default intent.
    </PersistentNotification>
  ),
  name: 'Inline notifcation, intent: default',
}
