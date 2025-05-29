import { useContext } from 'react'
import AppAvatar from '../app-avatar/app-avatar'
import { apps } from '../appNames'
import { AppMenuGroupHasAccessContext } from '../menu-group-context'
import { AppSwitcherMenuItem } from '../menu-item/menu-item'

type ReapitSalesMenuItemProps = {
  url: string
}

export default function ReapitSalesMenuItem({ url }: ReapitSalesMenuItemProps) {
  const hasAccess = useContext(AppMenuGroupHasAccessContext)
  const { name, description } = apps.reapitSales

  return (
    <AppSwitcherMenuItem
      logo={<AppAvatar appName={'reapitSales'} hasAccess={hasAccess} />}
      appName={name}
      description={description}
      url={url}
    />
  )
}
