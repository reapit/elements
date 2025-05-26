import AppAvatar from '../app-avatar/app-avatar'
import { AppSwitcherMenuItem } from '../menu-item/menu-item'
import { appNames } from '../appNames'

type AutoResponderMenuItemProps = {
  url: string
  isFocused?: boolean
}

export default function AutoResponderMenuItem({ url, isFocused = false }: AutoResponderMenuItemProps) {
  const { name, description } = appNames.autoResponder

  return (
    <AppSwitcherMenuItem
      logo={<AppAvatar appName={name} />}
      appName={name}
      description={description}
      url={url}
      isFocused={isFocused} // (AA)TODO: Can this be handled by the child component?
    />
  )
}
