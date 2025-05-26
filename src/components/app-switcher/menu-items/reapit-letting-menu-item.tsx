import AppAvatar from '../app-avatar/app-avatar'
import { AppSwitcherMenuItem } from '../menu-item/menu-item'
import { appNames } from '../appNames'

type ReapitLettingMenuItemProps = {
  url: string
  isFocused?: boolean
}

export default function ReapitLettingMenuItem({ url, isFocused = false }: ReapitLettingMenuItemProps) {
  const { name, description } = appNames.reapitLetting

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
