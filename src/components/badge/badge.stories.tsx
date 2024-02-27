import { Badge, BadgeGroup } from '.'
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Badge> = {
  component: Badge,
};

export default {
  title: 'Badge',
  component: Badge,
}

export const BasicUsage = {
  render: ({}) => (
    <BadgeGroup>
      <Badge>100</Badge>
    </BadgeGroup>
  ),
}

export const WithIntent = {
  render: ({}) => (
    <BadgeGroup>
      <Badge intent="primary">primary</Badge>
      <Badge intent="neutral">neutral</Badge>
      <Badge intent="success">success</Badge>
      <Badge intent="pending">pending</Badge>
      <Badge intent="warning">warning</Badge>
      <Badge intent="danger">danger</Badge>
      <Badge intent="default">default</Badge>
    </BadgeGroup>
  ),
}
