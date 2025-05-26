import AppAvatar from '../app-avatar/app-avatar'
import { AppSwitcherMenuItem } from '../menu-item/menu-item'
import { appNames } from '../appNames'

type ReapitPMMenuItemProps = {
  url: string
  isFocused?: boolean
}

export default function ReapitPMMenuItem({ url, isFocused = false }: ReapitPMMenuItemProps) {
  const { name, description } = appNames.reapitPM

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
