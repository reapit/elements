import { useContext } from 'react'
import AppAvatar from '../app-avatar/app-avatar'
import { apps } from '../appNames'
import { AppMenuGroupHasAccessContext } from '../menu-group-context'
import { AppSwitcherMenuItem } from '../menu-item/menu-item'

type KeyWhereMenuItemItemProps = {
  url: string
}

export default function KeyWhereMenuItem({ url }: KeyWhereMenuItemItemProps) {
  const hasAccess = useContext(AppMenuGroupHasAccessContext)
  const { name, description } = apps.keyWhere

  return (
    <AppSwitcherMenuItem
      logo={<AppAvatar appName={name} hasAccess={hasAccess} />}
      appName={name}
      description={description}
      url={url}
    />
  )
}
