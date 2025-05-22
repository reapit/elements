import AppAvatar from '../app-avatar/app-avatar'
import { AppSwitcherMenuItem } from '../app-switcher-menu-item/app-switcher-menu-item'
import { appNames } from '../appNames'

type ReapitWebsitesMenuItemProps = {
  url: string
  isFocused?: boolean
}

export default function ReapitWebsitesMenuItem({ url, isFocused = false }: ReapitWebsitesMenuItemProps) {
  const { name, description } = appNames.reapitWebsites

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
