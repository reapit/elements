import AppAvatar from '../app-avatar/app-avatar'
import { AppSwitcherMenuItem } from '../menu-item/menu-item'
import { appNames } from '../appNames'

type ReapitFormsMenuItemProps = {
  url: string
  isFocused?: boolean
}

export default function ReapitFormsMenuItem({ url, isFocused = false }: ReapitFormsMenuItemProps) {
  const { name, description } = appNames.reapitForms

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
