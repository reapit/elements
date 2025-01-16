import { DeprecatedTag, DeprecatedTagGroup } from '.'

export default {
  title: 'Tag',
  component: DeprecatedTag,
}

export const BasicUsage = {
  render: ({}) => (
    <div>
      <DeprecatedTag>Some Content</DeprecatedTag>
    </div>
  ),
}

export const IntentPrimary = {
  render: ({}) => (
    <div>
      <DeprecatedTag intent="primary">Primary</DeprecatedTag>
    </div>
  ),

  name: 'Intent: Primary',
}

export const IntentNeutral = {
  render: ({}) => (
    <div>
      <DeprecatedTag intent="neutral">Neutral</DeprecatedTag>
    </div>
  ),

  name: 'Intent: Neutral',
}

export const IntentSuccess = {
  render: ({}) => (
    <div>
      <DeprecatedTag intent="success">Success</DeprecatedTag>
    </div>
  ),

  name: 'Intent: Success',
}

export const IntentPending = {
  render: ({}) => (
    <div>
      <DeprecatedTag intent="pending">Pending</DeprecatedTag>
    </div>
  ),

  name: 'Intent: Pending',
}

export const IntentWarning = {
  render: ({}) => (
    <div>
      <DeprecatedTag intent="warning">Warning</DeprecatedTag>
    </div>
  ),

  name: 'Intent: Warning',
}

export const IntentDanger = {
  render: ({}) => (
    <div>
      <DeprecatedTag intent="danger">Danger</DeprecatedTag>
    </div>
  ),

  name: 'Intent: Danger',
}

export const IntentDefault = {
  render: ({}) => (
    <div>
      <DeprecatedTag intent="default">Default</DeprecatedTag>
    </div>
  ),

  name: 'Intent: Default',
}

export const TagGroupUsage = {
  render: ({}) => (
    <DeprecatedTagGroup>
      <DeprecatedTag intent="primary">Some Content</DeprecatedTag>
      <DeprecatedTag intent="default">Some Content</DeprecatedTag>
    </DeprecatedTagGroup>
  ),
}
