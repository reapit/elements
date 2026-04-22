import preview from '#.storybook/preview'
import { useState } from 'react'
import { PersistentNotification } from './index'

const meta = preview.meta({
  title: 'Deprecated/PersistentNotification',
  component: PersistentNotification,
})

export const FullReactExampleFixedPosition = meta.story({
  render: () => {
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
})

export const DefaultUsageInline = meta.story({
  render: () => (
    <PersistentNotification isExpanded isInline>
      Here is a persistent notification
    </PersistentNotification>
  ),
})

export const WithADifferentIcon = meta.story({
  render: () => (
    <PersistentNotification isExpanded isInline icon="warning" intent="warning">
      Here&apos;s some infomation about the thing you should be warned about, so bad things don&apos;t happen.
    </PersistentNotification>
  ),
  name: 'With a different icon',
})

export const InlineNotifcationIntentPrimary = meta.story({
  render: () => (
    <PersistentNotification isExpanded intent="primary" isInline isFullWidth>
      Here&apos;s an inline full width notification with a primary intent.
    </PersistentNotification>
  ),
  name: 'Inline notifcation, intent: primary',
})

export const InlineNotifcationIntentNeutral = meta.story({
  render: () => (
    <PersistentNotification isExpanded intent="neutral" isInline isFullWidth>
      Here&apos;s an inline full width notification with a neutral intent.
    </PersistentNotification>
  ),
  name: 'Inline notifcation, intent: neutral',
})

export const InlineNotifcationIntentSuccess = meta.story({
  render: () => (
    <PersistentNotification isExpanded intent="success" isInline isFullWidth>
      Here&apos;s an inline full width notification with a success intent.
    </PersistentNotification>
  ),
  name: 'Inline notifcation, intent: success',
})

export const InlineNotifcationIntentPending = meta.story({
  render: () => (
    <PersistentNotification isExpanded intent="pending" isInline isFullWidth>
      Here&apos;s an inline full width notification with a pending intent.
    </PersistentNotification>
  ),
  name: 'Inline notifcation, intent: pending',
})

export const InlineNotifcationIntentWarning = meta.story({
  render: () => (
    <PersistentNotification isExpanded intent="warning" isInline isFullWidth>
      Here&apos;s an inline full width notification with a warning intent.
    </PersistentNotification>
  ),
  name: 'Inline notifcation, intent: warning',
})

export const InlineNotifcationIntentDanger = meta.story({
  render: () => (
    <PersistentNotification isExpanded intent="danger" isInline isFullWidth>
      Here&apos;s an inline full width notification with a danger intent.
    </PersistentNotification>
  ),
  name: 'Inline notifcation, intent: danger',
})

export const InlineNotifcationIntentDefault = meta.story({
  render: () => (
    <PersistentNotification isExpanded intent="default" isInline isFullWidth>
      Here&apos;s an inline full width notification with a default intent.
    </PersistentNotification>
  ),
  name: 'Inline notifcation, intent: default',
})
