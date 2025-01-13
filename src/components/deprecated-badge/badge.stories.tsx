import { DeprecatedBadge, DeprecatedBadgeGroup } from '.'

export default {
  title: 'DeprecatedBadge',
  component: DeprecatedBadge,
}

export const BasicUsage = {
  render: ({}) => (
    <DeprecatedBadgeGroup>
      <DeprecatedBadge>100</DeprecatedBadge>
    </DeprecatedBadgeGroup>
  ),
}

export const WithIntent = {
  render: ({}) => (
    <DeprecatedBadgeGroup>
      <DeprecatedBadge intent="primary">primary</DeprecatedBadge>
      <DeprecatedBadge intent="neutral">neutral</DeprecatedBadge>
      <DeprecatedBadge intent="success">success</DeprecatedBadge>
      <DeprecatedBadge intent="pending">pending</DeprecatedBadge>
      <DeprecatedBadge intent="warning">warning</DeprecatedBadge>
      <DeprecatedBadge intent="danger">danger</DeprecatedBadge>
      <DeprecatedBadge intent="default">default</DeprecatedBadge>
    </DeprecatedBadgeGroup>
  ),
}
