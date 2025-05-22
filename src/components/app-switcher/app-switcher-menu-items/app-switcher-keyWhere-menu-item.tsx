import AppAvatar from '../app-avatar/app-avatar'
import { AppSwitcherMenuItem } from '../app-switcher-menu-item/app-switcher-menu-item'
import { appNames } from '../appNames'

type KeyWhereMenuItemItemProps = {
  url: string
  isFocused?: boolean
}

export default function KeyWhereMenuItem({ url, isFocused = false }: KeyWhereMenuItemItemProps) {
  const { name, description } = appNames.keyWhere

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
