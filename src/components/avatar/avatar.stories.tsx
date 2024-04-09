import { Avatar } from '.'
import { Icon } from '../icon'

export default {
  title: 'Avatar',
  component: Avatar,
}

export const BasicUsage = {
  render: ({}) => (
    <Avatar>
      <Icon icon="placeholderSmall" />
    </Avatar>
  ),
}

export const WithSrc = {
  render: ({}) => <Avatar alt="A stock image randomly generated" src="https://picsum.photos/200" />,
}

export const WithImage = {
  render: ({}) => <Avatar type="image" alt="A stock image randomly generated" src="https://picsum.photos/200/300" />,
}
