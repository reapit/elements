import AppAvatar from '../app-avatar/app-avatar'
import { AppSwitcherMenuItem } from '../menu-item/menu-item'
import { appNames } from '../appNames'

type ReapitSalesMenuItemProps = {
  url: string
  isFocused?: boolean
}

export default function ReapitSalesMenuItem({ url, isFocused = false }: ReapitSalesMenuItemProps) {
  const { name, description } = appNames.reapitSales

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
