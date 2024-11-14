import { DeprecatedAvatar } from '.'
import { Icon } from '../icon'

{
  /* TODO: update the stories once the new v5 Avatar ready */
}
export default {
  title: 'Avatar',
  component: DeprecatedAvatar,
}

export const BasicUsage = {
  render: ({}) => (
    <DeprecatedAvatar>
      <Icon icon="placeholderSmall" />
    </DeprecatedAvatar>
  ),
}

export const WithSrc = {
  render: ({}) => <DeprecatedAvatar alt="A stock image randomly generated" src="https://picsum.photos/200" />,
}

export const WithImage = {
  render: ({}) => (
    <DeprecatedAvatar type="image" alt="A stock image randomly generated" src="https://picsum.photos/200/300" />
  ),
}
