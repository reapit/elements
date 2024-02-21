import { Tag, TagGroup } from '.'

export default {
  title: 'Tag',
  component: Tag,
}

export const BasicUsage = {
  render: () => (
    <div>
      <Tag>Some Content</Tag>
    </div>
  ),
}

export const IntentPrimary = {
  render: () => (
    <div>
      <Tag intent="primary">Primary</Tag>
    </div>
  ),

  name: 'Intent: Primary',
}

export const IntentNeutral = {
  render: () => (
    <div>
      <Tag intent="neutral">Neutral</Tag>
    </div>
  ),

  name: 'Intent: Neutral',
}

export const IntentSuccess = {
  render: () => (
    <div>
      <Tag intent="success">Success</Tag>
    </div>
  ),

  name: 'Intent: Success',
}

export const IntentPending = {
  render: () => (
    <div>
      <Tag intent="pending">Pending</Tag>
    </div>
  ),

  name: 'Intent: Pending',
}

export const IntentWarning = {
  render: () => (
    <div>
      <Tag intent="warning">Warning</Tag>
    </div>
  ),

  name: 'Intent: Warning',
}

export const IntentDanger = {
  render: () => (
    <div>
      <Tag intent="danger">Danger</Tag>
    </div>
  ),

  name: 'Intent: Danger',
}

export const IntentDefault = {
  render: () => (
    <div>
      <Tag intent="default">Default</Tag>
    </div>
  ),

  name: 'Intent: Default',
}

export const TagGroupStory = {
  render: () => (
    <TagGroup>
      <Tag intent="primary">Some Content</Tag>
      <Tag intent="default">Some Content</Tag>
    </TagGroup>
  ),

  name: 'Tag Group',
}
