import { useContext } from 'react'
import AppAvatar from '../app-avatar/app-avatar'
import { apps } from '../appNames'
import { AppMenuGroupHasAccessContext } from '../menu-group-context'
import { AppSwitcherMenuItem } from '../menu-item/menu-item'

type ReapitLettingMenuItemProps = {
  url: string
}

export default function ReapitLettingMenuItem({ url }: ReapitLettingMenuItemProps) {
  const hasAccess = useContext(AppMenuGroupHasAccessContext)
  const { name, description } = apps.reapitLetting

  return (
    <AppSwitcherMenuItem
      logo={<AppAvatar appName={'reapitLetting'} hasAccess={hasAccess} />}
      appName={name}
      description={description}
      url={url}
    />
  )
}
