import { Avatar } from '.'
import { Icon } from '../icon'

export default {
  title: 'Avatar',
  component: Avatar,
}

export const BasicUsage = {
  render: () => (
    <Avatar>
      <Icon icon="placeholderSmall" />
    </Avatar>
  ),
}

export const WithSrc = {
  render: () => <Avatar src="https://picsum.photos/200" />,
}

export const WithImage = {
  render: () => <Avatar type="image" src="https://picsum.photos/200/300" />,
}
