import { useContext } from 'react'
import AppAvatar from '../app-avatar/app-avatar'
import { apps } from '../appNames'
import { AppMenuGroupHasAccessContext } from '../menu-group-context'
import { AppSwitcherMenuItem } from '../menu-item/menu-item'

type ReapitWebsitesMenuItemProps = {
  url: string
}

export default function ReapitWebsitesMenuItem({ url }: ReapitWebsitesMenuItemProps) {
  const hasAccess = useContext(AppMenuGroupHasAccessContext)
  const { name, description } = apps.reapitWebsites

  return (
    <AppSwitcherMenuItem
      logo={<AppAvatar appName={name} hasAccess={hasAccess} />}
      appName={name}
      description={description}
      url={url}
    />
  )
}
